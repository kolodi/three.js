import { UISpan, UIPanel, UITabbedPanel, UIButton } from './libs/ui.js';

import { SidebarGeometryTab } from './Sidebar.Geometry.Tab.js';

function SidebarGeometries(editor) {

    const explorer = editor.explorer;

    // Layout
    const container = new UISpan();

    const panel = new UIPanel();
    panel.setBorderTop('0');
    panel.setPaddingTop('10px');
    container.add(panel);

    const clearBtn = new UIButton('clear scene').addClass('geo-clear-btn');
    clearBtn.onClick(() => explorer.clearScene());
    panel.add(clearBtn);

    const tabbedPanel = new UITabbedPanel();

    function render(groups) {

        tabbedPanel.clear();

        const keys = Object.keys(groups);
        keys.forEach(key => {
            const geoTab = new SidebarGeometryTab(editor, groups[key]);
            tabbedPanel.addTab(key, key, geoTab)
        });
        tabbedPanel.select(keys[0]);
        container.add(tabbedPanel);

    }

    return { container, render };
    
}

export { SidebarGeometries };