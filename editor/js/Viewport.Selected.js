import { UIPanel, UIBreak, UIText } from './libs/ui.js';

function ViewportSelected( editor ) {

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

	signals.objectSelected.add( update );
	signals.objectChanged.add( update );

	//

	function update() {

		const selected = editor.selected;

		if (editor.selected) {
			selectedText.setValue( selected.userData?.name );
			materialText.setValue( selected.userData?.material );
		} else {
			selectedText.setValue( defaultObjText );
			materialText.setValue( defaultMatText );
		}

	}

	return container;

}

export { ViewportSelected };
