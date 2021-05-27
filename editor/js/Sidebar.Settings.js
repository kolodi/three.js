import { UIPanel, UIRow, UISelect, UISpan, UIText, UIInteger } from './libs/ui.js';

import { SidebarSettingsViewport } from './Sidebar.Settings.Viewport.js';
import { SidebarSettingsShortcuts } from './Sidebar.Settings.Shortcuts.js';
import { SidebarSettingsHistory } from './Sidebar.Settings.History.js';

function SidebarSettings( editor ) {

	var config = editor.config;
	var strings = editor.strings;

	var container = new UISpan();

	var settings = new UIPanel();
	settings.setBorderTop( '0' );
	settings.setPaddingTop( '20px' );
	container.add( settings );

	// sources
	const sourcesRow = new UIRow();
	settings.add( sourcesRow );

	// language

	var options = {
		en: 'English',
		fr: 'Français',
		zh: '中文'
	};

	var languageRow = new UIRow();
	var language = new UISelect().setWidth( '150px' );
	language.setOptions( options );

	if ( config.getKey( 'language' ) !== undefined ) {

		language.setValue( config.getKey( 'language' ) );

	}

	language.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'language', value );

	} );

	languageRow.add( new UIText( strings.getKey( 'sidebar/settings/language' ) ).setWidth( '90px' ) );
	languageRow.add( language );

	settings.add( languageRow );

	// export precision

	var exportPrecisionRow = new UIRow();
	var exportPrecision = new UIInteger( config.getKey( 'exportPrecision' ) ).setRange( 2, Infinity );

	exportPrecision.onChange( function () {

		var value = this.getValue();

		editor.config.setKey( 'exportPrecision', value );

	} );

	exportPrecisionRow.add( new UIText( strings.getKey( 'sidebar/settings/exportPrecision' ) ).setWidth( '90px' ) );
	exportPrecisionRow.add( exportPrecision );

	settings.add( exportPrecisionRow );

	//

	container.add( new SidebarSettingsViewport( editor ) );
	container.add( new SidebarSettingsShortcuts( editor ) );
	container.add( new SidebarSettingsHistory( editor ) );

	async function renderSources() {
		let sources = config.getKey('explorer/sources');
		let index = config.getKey('explorer/selectedSourceIndex');

		if(!sources) {
			const r = await fetch(config.getKey('explorer/sourcesListUrl'));
			sources = await r.json();
			index = 0;
			config.setKey('explorer/sources', sources, 'explorer/selectedSourceIndex', 0);
		}

		if(!sources || sources.length === 0) {
			const err = new Error('no sources');
			console.error(err);
			throw err;
		}

		function selectSourse(value) {
			editor.config.setKey( 'explorer/selectedSourceIndex', value );
			const index = parseInt(value, 10);
			editor.signals.sourceChanged.dispatch(sources[index]);
		}

		const options = {};

		for(let i = 0; i < sources.length; i++) {
			options[i] = sources[i].Name;
		}

		const sourceSelect = new UISelect().setWidth( '150px' );
		sourceSelect.setOptions( options );

		sourceSelect.setValue( index );
		selectSourse(index);

		sourceSelect.onChange( function () {

			const value = this.getValue();

			selectSourse(value);

		} );

		sourcesRow.add( new UIText( strings.getKey( 'sidebar/settings/source' ) ).setWidth( '90px' ) );
		sourcesRow.add( sourceSelect );

		settings.add( sourcesRow );
		


	}

	


	return { container, renderSources };

}

export { SidebarSettings };
