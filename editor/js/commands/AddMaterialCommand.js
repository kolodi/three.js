import { Command } from '../Command.js';
import { ObjectLoader } from '../../../build/three.module.js';

/**
 * @param editor Editor
 * @param object THREE.Object3D
 * @constructor
 */
class AddMaterialCommand extends Command {

    constructor(editor, material) {

        super(editor);

        this.type = 'AddMaterialCommand';

        this.selected = null;
        this.newSelected = null;
        this.newMaterial = material;

        const selected = editor.selected;

        if (!selected || !selected.isMesh || !selected.material) return;

        const selectedMaterial = selected.material;

        this.oldMap = selectedMaterial.map;
        this.oldNormalMap = selectedMaterial.normalMap;
        this.oldNormalScale = selectedMaterial.normalScale;
        this.oldMetalnessMap = selectedMaterial.metalnessMap;
        this.oldMetalness = selectedMaterial.metalness;
        this.oldRoughness = selectedMaterial.roughness;
        this.oldRoughnessMap = selectedMaterial.roughnessMap;

        if (material !== undefined) {
            this.name = `Add Material: ${material.name}`;
        }

    }

    execute() {

        let selected = editor.selected;

        if (!selected || !selected.isMesh || !selected.material) return;

        this.selected = selected;

        const selectedMaterial = selected.material;
        const newMaterial = this.newMaterial;

        selectedMaterial.map = newMaterial.map;
        selectedMaterial.normalMap = newMaterial.normalMap;
        selectedMaterial.normalScale = newMaterial.normalScale;
        selectedMaterial.metalnessMap = newMaterial.metalnessMap;
        selectedMaterial.metalness = newMaterial.metalness;
        selectedMaterial.roughness = newMaterial.roughness;
        selectedMaterial.roughnessMap = newMaterial.roughnessMap;
        selected.userData.material = newMaterial.userData.material;

        selectedMaterial.needsUpdate = true;

        editor.signals.objectChanged.dispatch(selected);

        this.newSelected = selected;

    }

    undo() {

        const selected = this.selected;
        const curMaterial = this.newSelected.material;

        curMaterial.map = this.oldMap;
        curMaterial.normalMap = this.oldNormalMap;
        curMaterial.normalScale = this.oldNormalScale;
        curMaterial.metalnessMap = this.oldMetalnessMap;
        curMaterial.metalness = this.oldMetalness;
        curMaterial.roughness = this.oldRoughness;
        curMaterial.roughnessMap = this.oldRoughnessMap;

        curMaterial.needsUpdate = true;

        editor.signals.objectChanged.dispatch(selected);

    }

    // toJSON() {

    // 	const output = super.toJSON( this );

    // 	output.object = this.object.toJSON();

    // 	return output;

    // }

    // fromJSON( json ) {

    // 	super.fromJSON( json );

    // 	this.object = this.editor.objectByUuid( json.object.object.uuid );

    // 	if ( this.object === undefined ) {

    // 		const loader = new ObjectLoader();
    // 		this.object = loader.parse( json.object );

    // 	}

    // }

}

export { AddMaterialCommand };
