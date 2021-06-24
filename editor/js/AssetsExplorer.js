import * as THREE from '../../build/three.module.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { AddMaterialCommand } from './commands/AddMaterialCommand.js';
import { RemoveObjectCommand } from './commands/RemoveObjectCommand.js';

function AssetsExplorer(editor) {

    const signals = editor.signals;
    const _cache = new Map();
    let _source;

    signals.sourceChanged.add(function (source) {

        _source = source;

    });

    this.addGeometry = async function (item) {

        const url = `${_source.BasePath}/${item.Data.Path}.glb`;

        const gltf = await loadAsync(url);

        gltf.scene.name = item.Name;
        editor.execute(new AddObjectCommand(editor, gltf.scene));

    };

    this.applyMaterialToSelected = async function (materialVariant, materialName) {
        
        const url = `${_source.BasePath}/${materialVariant.Path}.glb`;
        
        const matGlb = await loadAsync(url, true);

        const newMaterial = matGlb.scene.children[0].material;
        const newMat = {
            ...newMaterial,
            userData: {
                ...newMaterial.userData,
                name: materialName
            }
        };

        editor.execute(new AddMaterialCommand(editor, newMat));

    };

    this.clearMaterialsCache = function() {

        for (const [,g] of _cache) {
            g.scene.traverse(o => {
                if (o.geometry) {
                    o.geometry.dispose();
                    console.log("dispose geometry ", o.geometry);
                }
        
                if (o.material) {
                    if (o.material.length) {
                        for (let i = 0; i < o.material.length; ++i) {
                            o.material[i].dispose();
                            console.log("dispose material ", o.material[i]);
                        }
                    }
                    else {
                        o.material.dispose();
                        console.log("dispose material ", o.material);
                    }
                }
            });
        }

        _cache.clear();

    };

    this.clearScene = function() {

        const scene = editor.scene.children;
        const sceneClone = scene.map(obj => obj);

        sceneClone.forEach(object => {
            if ( object !== null && object.parent !== null ) {
                editor.execute( new RemoveObjectCommand(editor, object));
            }
        });

    };

    async function loadAsync(url, useCache = false, progressCb) {

        if (useCache) {
            const cached = _cache.get(url);

            if (!!cached) {
                console.log("loaded from cahce: " + url);
                return cached;
            }
        }

        const loader = new GLTFLoader();

        return new Promise((resolve, reject) => {
            loader.load(
                url,
                gltf => {
                    if (useCache) _cache.set(url, gltf);
                    resolve(gltf);
                },
                progress => !!progressCb && progressCb(progress),
                err => reject(err)
            );
        });

    };

}

export { AssetsExplorer };