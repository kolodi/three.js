import { UIPanel, UIBreak, UIText, UIColor, UIInput } from './libs/ui.js';
import { SetMaterialColorCommand } from './commands/SetMaterialColorCommand.js';

function SelectedToolbar( editor ) {

	const signals = editor.signals;
	const strings = editor.strings;
	const defaultObjText = 'no object selected';
	const defaultMatText = 'no material applied';

	const container = new UIPanel();
	container.setId( 'selected' );
	container.setPosition( 'absolute' );
	container.setLeft( '150px' );
	container.setBottom( '10px' );
	container.setFontSize( '12px' );
	container.setColor( '#fff' );

	const selectedText = new UIText( defaultObjText ).setMarginLeft( '6px' );
	const materialText = new UIText( defaultMatText ).setMarginLeft( '6px' );

	container.add( new UIText( strings.getKey( 'viewport/selected/selected' ) ).setTextTransform( 'lowercase' ) );
	container.add( selectedText, new UIBreak() );
	container.add( new UIText( strings.getKey( 'viewport/selected/material' ) ).setTextTransform( 'lowercase' ) );
	container.add( materialText, new UIBreak() );
	const materialColor = new UIColor();
	materialColor.onInput( e => updateColor( materialColor.getHexValue()) );
	container.add(materialColor);
    const materialColorInput = new UIInput('#ffffff');
    materialColorInput.onChange( e => {
		const hexString = materialColorInput.getValue().replace('#','');
		const hexNumber = parseInt( hexString, 16 );
        updateColor(hexNumber);
    } );
    //materialColorInput.setDisabled(true);
	container.add(materialColorInput); 

	signals.objectSelected.add( update );
	signals.objectChanged.add( update );

	function updateColor(hex) {
		const selected = editor.selected;

        if(!selected) return;

        const material = selected.material;
        
        if(!material) return;

        if ( material.color !== undefined && material.color.getHex() !== hex ) {

            editor.execute( new SetMaterialColorCommand( editor, selected, 'color', hex, 0 ) );

            const materialData = selected.userData.material;
            updateColorUI(material, materialData);

        }
	}

	//

	function update() {

		const selected = editor.selected;

		if (editor.selected) {
			selectedText.setValue( selected.name );

			const materialData = selected.userData.material;

            
            updateColorUI(selected.material, materialData);
            materialColor.setDisabled(false);

		} else {
			selectedText.setValue( defaultObjText );
			materialText.setValue( defaultMatText );

            materialColor.setHexValue( '#ffffff');
            materialColor.setDisabled(true);
            materialColorInput.setValue('');
		}
	}

    function updateColorUI(material, materialData) {
        if(materialData) {
            const matText = `Group: ${materialData.groupName}, Variant: ${materialData.variant.name}, File path: ${materialData.variant.data.Path}`;
            materialText.setValue( matText );
        }
        if(material !== undefined) {
            const hex = material.color.getHexString();
            materialColor.setHexValue(hex);
            materialColorInput.setValue(`#${hex}`);
        }
    }

	return container;

}

export { SelectedToolbar };
