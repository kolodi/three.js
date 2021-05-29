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
	const strings = editor.strings;

	async function renderAssetsTabs(source) {
		const r = await fetch(source.AssetsList);
		const assets = await r.json();

		materials.render(assets.Materials);
		geometries.render(assets.Geometries);
	};

	const container = new UITabbedPanel();
	container.setId('sidebar');

	const scene = new UISpan().add(
		new SidebarScene(editor),
		new SidebarProperties(editor),
		new SidebarAnimation(editor),
		new SidebarScript(editor)
	);
	const geometries = new SidebarGeometries(editor);
	const materials = new SidebarMaterials(editor);
	const project = new SidebarProject(editor);
	const settings = new SidebarSettings(editor);

	container.addTab('scene', strings.getKey('sidebar/scene'), scene);
	container.addTab('geometries', strings.getKey('sidebar/geometries'), geometries.container);
	container.addTab('materials', strings.getKey('sidebar/materials'), materials.container);
	container.addTab('project', strings.getKey('sidebar/project'), project);
	container.addTab('settings', strings.getKey('sidebar/settings'), settings.container);
	container.select('scene');

	signals.sourceChanged.add(function (source) {
        renderAssetsTabs(source);
    });

	settings.renderSources();

	return container;

}

export { Sidebar };