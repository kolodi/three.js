import * as THREE from '../../build/three.module.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { AddMaterialCommand } from './commands/AddMaterialCommand.js';

function AssetsExplorer(editor) {

    let _source;

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
        const loader = new GLTFLoader();

        return new Promise((resolve, reject) => {
            loader.load(
                url,
                gltf => resolve(gltf),
                progress => !!progressCb && progressCb(progress),
                err => reject(err)
            );
        });
    };

}

export { AssetsExplorer };