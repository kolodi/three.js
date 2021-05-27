import * as THREE from '../../build/three.module.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';

function AssetsExplorer( editor ) {

    let selected;
    let _source;

	const signals = editor.signals;

    signals.objectSelected.add(function (object) {
        selected = object
    });

    signals.sourceChanged.add(source => {
        _source = source;
    });

	this.addGeometry = async function ( item ) {
        const url = `${_source.BasePath}/${item.Data.Path}.glb`;

		const gltf = await loadAsync(url);

		gltf.scene.name = item.Name;
		editor.execute( new AddObjectCommand( editor, gltf.scene ) );

	};

	this.applyMaterialToSelected = async function ( materialVariant ) {

		if ( !selected || !selected.isMesh || !selected.material ) return;

        const url = `${_source.BasePath}/${materialVariant.Path}.glb`;

		const matGlb = await loadAsync(url);

        const selectedMaterial = selected.material;
        const newMaterial = matGlb.scene.children[0].material;
        
        selectedMaterial.map = newMaterial.map;
        selectedMaterial.normalMap = newMaterial.normalMap;
        selectedMaterial.normalScale = newMaterial.normalScale;
        selectedMaterial.metalnessMap = newMaterial.metalnessMap;
        selectedMaterial.metalness = newMaterial.metalness;
        selectedMaterial.roughness = newMaterial.roughness;
        selectedMaterial.roughnessMap = newMaterial.roughnessMap;

        selectedMaterial.needsUpdate = true;


		editor.signals.objectChanged.dispatch(selected);

	};

	async function loadAsync(url, progressCb) {
		const loader = new GLTFLoader();
		return new Promise((resolve, reject) => {
			loader.load(url, gltf => {
				resolve(gltf);
			}, progress => { if (!!progressCb) progressCb(progress) }, err => reject(err))
		})
	}

}

export { AssetsExplorer };
