import * as THREE from '../../build/three.module.js';
import { GLTFLoader } from '../../examples/jsm/loaders/GLTFLoader.js';

import { AddObjectCommand } from './commands/AddObjectCommand.js';

function AssetsExplorer( editor ) {

	const signals = editor.signals;
    let selected

    signals.objectSelected.add(function (object) {
        selected = object
    });

	this.loadRemote = async function ( item ) {

		const gltf = await loadAsync(item.Path);

		gltf.scene.name = item.Name;
		editor.execute( new AddObjectCommand( editor, gltf.scene ) );

	};

	this.addMaterial = async function ( url ) {

		if ( !selected ) return;

		const matGlb = await loadAsync(url);

		selected.traverse( function ( obj ) {
			
			const geometry = obj.material;
			const material = matGlb.scene.children[0].material;
			
			geometry.map = material.map;
			geometry.normalMap = material.normalMap;
			geometry.normalScale = material.normalScale;
			geometry.metalnessMap = material.metalnessMap;
			geometry.metalness = material.metalness;
			geometry.roughness = material.roughness;
			geometry.roughnessMap = material.roughnessMap;

			geometry.needsUpdate = true;

		} );

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
