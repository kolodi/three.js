import { UITabbedPanel, UISpan } from './libs/ui.js';

import { SidebarScene } from './Sidebar.Scene.js';
import { SidebarProperties } from './Sidebar.Properties.js';
import { SidebarScript } from './Sidebar.Script.js';
import { SidebarAnimation } from './Sidebar.Animation.js';
import { SidebarProject } from './Sidebar.Project.js';
import { SidebarSettings } from './Sidebar.Settings.js';
import { SidebarGeometries } from './Sidebar.Geometries.js';
import { SidebarMaterials } from './Sidebar.Materials.js';

function Sidebar(editor, assets) {

	var strings = editor.strings;

	var container = new UITabbedPanel();
	container.setId('sidebar');

	var scene = new UISpan().add(
		new SidebarScene(editor),
		new SidebarProperties(editor),
		new SidebarAnimation(editor),
		new SidebarScript(editor)
	);
	var geometries = new SidebarGeometries(editor, assets.Geometries);
	var materials = new SidebarMaterials(editor, assets.Materials);
	var project = new SidebarProject(editor);
	var settings = new SidebarSettings(editor);

	container.addTab('scene', strings.getKey('sidebar/scene'), scene);
	container.addTab('geometries', strings.getKey('sidebar/geometries'), geometries);
	container.addTab('materials', strings.getKey('sidebar/materials'), materials);
	container.addTab('project', strings.getKey('sidebar/project'), project);
	container.addTab('settings', strings.getKey('sidebar/settings'), settings);
	container.select('scene');

	return container;

}

export { Sidebar };
