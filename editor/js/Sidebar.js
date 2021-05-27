import { UITabbedPanel, UISpan } from './libs/ui.js';

import { SidebarScene } from './Sidebar.Scene.js';
import { SidebarProperties } from './Sidebar.Properties.js';
import { SidebarScript } from './Sidebar.Script.js';
import { SidebarAnimation } from './Sidebar.Animation.js';
import { SidebarProject } from './Sidebar.Project.js';
import { SidebarSettings } from './Sidebar.Settings.js';
import { SidebarGeometries } from './Sidebar.Geometries.js';
import { SidebarMaterials } from './Sidebar.Materials.js';

function Sidebar(editor) {

	const signals = editor.signals;
	var strings = editor.strings;

	var container = new UITabbedPanel();
	container.setId('sidebar');

	var scene = new UISpan().add(
		new SidebarScene(editor),
		new SidebarProperties(editor),
		new SidebarAnimation(editor),
		new SidebarScript(editor)
	);
	var geometries = new SidebarGeometries(editor);
	var materials = new SidebarMaterials(editor);
	var project = new SidebarProject(editor);
	var settings = new SidebarSettings(editor);

	container.addTab('scene', strings.getKey('sidebar/scene'), scene);
	container.addTab('geometries', strings.getKey('sidebar/geometries'), geometries.container);
	container.addTab('materials', strings.getKey('sidebar/materials'), materials.container);
	container.addTab('project', strings.getKey('sidebar/project'), project);
	container.addTab('settings', strings.getKey('sidebar/settings'), settings.container);
	container.select('scene');

	signals.sourceChanged.add(function (source) {

        renderAssetsTabs(source);

    });

	async function renderAssetsTabs(source) {

		const r = await fetch(source.AssetsList);
		const assets = await r.json();
		materials.render(assets.Materials);
		geometries.render(assets.Geometries);

	};

	function init() {

		settings.renderSources();
		
	};

	init();

	return container;

}

export { Sidebar };