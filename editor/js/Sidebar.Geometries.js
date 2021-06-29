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

    const clearSceneBtn = new UIButton('clear scene').addClass('geo-clear-btn');
    clearSceneBtn.onClick(() => explorer.clearScene());
    panel.add(clearSceneBtn);

    const tabbedPanel = new UITabbedPanel();
    const tabs = new Map();

    function render(groups) {

        tabbedPanel.clear();
        tabs.clear();

        const keys = Object.keys(groups);
        keys.forEach(key => {
            const tab = new SidebarGeometryTab(editor, groups[key]);
            tabbedPanel.addTab(key, key, tab.container);
            tabs.set(key, tab);
        });
        tabbedPanel.select(keys[0]);
        container.add(tabbedPanel);
        
    }
    
    tabbedPanel.dom.addEventListener('selected', e => {
        const tab = tabs.get(e.detail.tab.getId());
        if(tab) {
            tab.render();
        }
    });

    return { container, render };
    
}

export { SidebarGeometries };