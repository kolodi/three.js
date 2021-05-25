import { UITabbedPanel } from './libs/ui.js';

import { SidebarGeometryTab } from './Sidebar.Geometry.Tab.js';

function SidebarGeometries( editor, groups ) {

    const container = new UITabbedPanel();

    // Geometries tabs
    const keys = Object.keys( groups );
    keys.forEach(key => container.addTab( key, key, new SidebarGeometryTab( editor, groups[key] ) ));
    container.select(keys[0]);

    return container;
}

export { SidebarGeometries };