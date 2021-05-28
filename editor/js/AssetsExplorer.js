import * as THREE from '../../build/three.module.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { AddMaterialCommand } from './commands/AddMaterialCommand.js';

function AssetsExplorer(editor) {

    let _source;

    const _cache = new Map();

    const signals = editor.signals;

    signals.sourceChanged.add(function (source) {
        _source = source;
    });

    this.addGeometry = async function (item) {
        const url = `${_source.BasePath}/${item.Data.Path}.glb`;

        const gltf = await loadAsync(url);

        gltf.scene.name = item.Name;
        editor.execute(new AddObjectCommand(editor, gltf.scene));
    };

    this.applyMaterialToSelected = async function (materialVariant) {

        const url = `${_source.BasePath}/${materialVariant.Path}.glb`;
        
        const matGlb = await loadAsync(url);

        const newMaterial = matGlb.scene.children[0].material;

        editor.execute(new AddMaterialCommand(editor, newMaterial));

    };

    async function loadAsync(url, progressCb) {
        const cached = _cache.get(url);
        if(!!cached) {
            console.log("loaded from cahce: " + url);
            return cached;
        }

        const loader = new GLTFLoader();

        return new Promise((resolve, reject) => {
            loader.load(
                url,
                gltf => {
                    _cache.set(url, gltf);
                    resolve(gltf);
                },
                progress => !!progressCb && progressCb(progress),
                err => reject(err)
            );
        });
    };

    this.clearAllAssets = function() {
        for (const [,g] of _cache) {
            g.scene.traverse(o => {

                if (o.geometry) {
                    o.geometry.dispose()
                    console.log("dispose geometry ", o.geometry)                        
                }
        
                if (o.material) {
                    if (o.material.length) {
                        for (let i = 0; i < o.material.length; ++i) {
                            o.material[i].dispose()
                            console.log("dispose material ", o.material[i])                                
                        }
                    }
                    else {
                        o.material.dispose()
                        console.log("dispose material ", o.material)                            
                    }
                }
            });
            if(!!g.scene.parent) {
                scene.parent.remove(g.scene);
            }    
        }
        _cache.clear();
    } 

}

export { AssetsExplorer };