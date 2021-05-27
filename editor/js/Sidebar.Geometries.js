import { UITabbedPanel } from './libs/ui.js';

import { SidebarGeometryTab } from './Sidebar.Geometry.Tab.js';

function SidebarGeometries(editor) {

    const container = new UITabbedPanel();

    function render(groups) {

        container.clear();
        // Geometries tabs
        const keys = Object.keys(groups);
        keys.forEach(key => container.addTab(key, key, new SidebarGeometryTab(editor, groups[key])));
        container.select(keys[0]);

    }

    return { container, render };
    
}

export { SidebarGeometries };