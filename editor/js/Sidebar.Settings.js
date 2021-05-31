import { UIPanel, UIRow, UISelect, UISpan, UIText, UIInteger, UIButton, UIDiv } from './libs/ui.js';

import { SidebarSettingsViewport } from './Sidebar.Settings.Viewport.js';
import { SidebarSettingsShortcuts } from './Sidebar.Settings.Shortcuts.js';
import { SidebarSettingsHistory } from './Sidebar.Settings.History.js';

function SidebarSettings(editor) {

	const signals = editor.signals;
	const config = editor.config;
	const strings = editor.strings;

	const container = new UISpan();

	const panel = new UIPanel();
	panel.setBorderTop('0');
	panel.setPaddingTop('20px');
	container.add(panel);

	// sources

	const sourcesRow = new UIRow().addClass('source-row');
	panel.add(sourcesRow);

	// language

	const options = {
		en: 'English',
		fr: 'Français',
		zh: '中文'
	};

	const languageRow = new UIRow();
	const language = new UISelect().setWidth('150px');
	language.setOptions(options);

	if (config.getKey('language') !== undefined) {
		language.setValue(config.getKey('language'));
	}

	language.onChange(function () {
		const value = this.getValue();

		config.setKey('language', value);
	});

	languageRow.add(new UIText(strings.getKey('sidebar/settings/language')).setWidth('90px'));
	languageRow.add(language);

	panel.add(languageRow);

	// export precision

	const exportPrecisionRow = new UIRow();
	const exportPrecision = new UIInteger(config.getKey('exportPrecision')).setRange(2, Infinity);

	exportPrecision.onChange(function () {
		const value = this.getValue();

		config.setKey('exportPrecision', value);
	});

	exportPrecisionRow.add(new UIText(strings.getKey('sidebar/settings/exportPrecision')).setWidth('90px'));
	exportPrecisionRow.add(exportPrecision);

	panel.add(exportPrecisionRow);

	//

	container.add(new SidebarSettingsViewport(editor));
	container.add(new SidebarSettingsShortcuts(editor));
	container.add(new SidebarSettingsHistory(editor));

	async function renderSources() {

		let sources = config.getKey('explorer/sources');
		let index = config.getKey('explorer/selectedSourceIndex');

		async function setSources() {
			const res = await fetch(config.getKey('explorer/sourcesListUrl'));
			sources = await res.json();
			index = 0;

			config.setKey('explorer/sources', sources, 'explorer/selectedSourceIndex', index);
		}

		async function refreshSources() {
			await setSources();
			sourcesRow.remove(selectBox);
			sourcesRow.remove(refreshBtn);
			renderSources();
		}

		function selectSourse(value) {
			const index = parseInt(value);

			config.setKey('explorer/selectedSourceIndex', index);
			signals.sourceChanged.dispatch(sources[index]);
		}

		if (!sources) await setSources();

		if (!sources || sources.length === 0) {
			const err = new Error('no sources');
			console.error(err);
			throw err;
		}

		const options = {};

		for (const i in sources) {
			options[i] = sources[i].Name;
		}

		const sourceSelect = new UISelect().setWidth('150px');
		sourceSelect.setOptions(options);
		sourceSelect.setValue(index);
		sourceSelect.onChange(function () {
			selectSourse(this.getValue());
		});
		selectSourse(index);

		const refreshBtn = new UIButton('refresh').addClass('set-refresh-btn');
		refreshBtn.onClick(() => refreshSources());

		const selectBox = new UIDiv();
		const selectTitle = new UIText(strings.getKey('sidebar/settings/source')).setWidth('90px');
		selectBox.add(selectTitle).add(sourceSelect);
		sourcesRow.add(selectBox);
		sourcesRow.add(refreshBtn);

	};

	return { container, renderSources };

}

export { SidebarSettings };
