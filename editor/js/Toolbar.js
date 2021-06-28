import { UIPanel, UIButton, UICheckbox } from './libs/ui.js';

function Toolbar( editor ) {

	var signals = editor.signals;
	var strings = editor.strings;

	var container = new UIPanel();
	container.setId( 'toolbar' );

	// translate / rotate / scale

	var translateIcon = document.createElement( 'img' );
	translateIcon.title = strings.getKey( 'toolbar/translate' );
	translateIcon.src = 'images/translate.svg';

	var translate = new UIButton();
	translate.dom.className = 'Button selected';
	translate.dom.appendChild( translateIcon );
	translate.onClick( function () {

		var selected = editor.selected;

		if ( translate.dom.classList.contains( 'selected' ) ) {

			signals.transformModeChanged.dispatch( 'disabled' );

		} else {

			if ( !selected.userData.locked ) {

				signals.transformModeChanged.dispatch( 'translate' );

			}

		}

	} );
	container.add( translate );

	var rotateIcon = document.createElement( 'img' );
	rotateIcon.title = strings.getKey( 'toolbar/rotate' );
	rotateIcon.src = 'images/rotate.svg';

	var rotate = new UIButton();
	rotate.dom.appendChild( rotateIcon );
	rotate.onClick( function () {

		var selected = editor.selected;

		if ( rotate.dom.classList.contains( 'selected' ) ) {

			signals.transformModeChanged.dispatch( 'disabled' );

		} else {

			if ( !selected.userData.locked ) {

				signals.transformModeChanged.dispatch( 'rotate' );

			}

		}

	} );
	container.add( rotate );

	var scaleIcon = document.createElement( 'img' );
	scaleIcon.title = strings.getKey( 'toolbar/scale' );
	scaleIcon.src = 'images/scale.svg';

	var scale = new UIButton();
	scale.dom.appendChild( scaleIcon );
	scale.onClick( function () {

		var selected = editor.selected;

		if ( scale.dom.classList.contains( 'selected' ) ) {

			signals.transformModeChanged.dispatch( 'disabled' );

		} else {

			if ( !selected.userData.locked ) {

				signals.transformModeChanged.dispatch( 'scale' );

			}

		}

	} );
	container.add( scale );

	var local = new UICheckbox( false );
	local.dom.title = strings.getKey( 'toolbar/local' );
	local.onChange( function () {

		signals.spaceChanged.dispatch( this.getValue() === true ? 'local' : 'world' );

	} );
	container.add( local );

	var lockIcon = document.createElement( 'img' );
	lockIcon.title = strings.getKey( 'toolbar/lock' );
	lockIcon.src = 'images/unlock.svg';

	var lock = new UIButton();
	lock.dom.className = 'Button';
	lock.dom.appendChild( lockIcon );
	lock.onClick( function () {

		var selected = editor.selected;

		if ( lock.dom.classList.contains( 'selected' ) && selected ) {

			signals.transformModeChanged.dispatch( 'translate' );

		} else if ( !lock.dom.classList.contains( 'selected' ) && selected ) {

			signals.transformModeChanged.dispatch( 'locked' );

		}

	} );
	container.add( lock );

	//

	signals.transformModeChanged.add( function ( mode ) {

		var selected = editor.selected;

		translate.dom.classList.remove( 'selected' );
		rotate.dom.classList.remove( 'selected' );
		scale.dom.classList.remove( 'selected' );

		switch ( mode ) {

			case 'translate':
				translate.dom.classList.add( 'selected' );
				lock.dom.classList.remove( 'selected' );
				lockIcon.src = 'images/unlock.svg';
				selected.userData.locked = false;
				break;
			case 'rotate':
				rotate.dom.classList.add( 'selected' );
				break;
			case 'scale':
				scale.dom.classList.add( 'selected' );
				break;
			case 'disabled':
				translate.dom.classList.remove( 'selected' );
				rotate.dom.classList.remove( 'selected' );
				scale.dom.classList.remove( 'selected' );
				break;
			case 'locked' :
				translate.dom.classList.remove( 'selected' );
				rotate.dom.classList.remove( 'selected' );
				scale.dom.classList.remove( 'selected' );
				lock.dom.classList.add( 'selected' );
				lockIcon.src = 'images/lock.svg';
				selected.userData.locked = true;
				break;

		}

	} );

	return container;

}

export { Toolbar };
