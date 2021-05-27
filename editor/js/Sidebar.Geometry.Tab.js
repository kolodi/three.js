import { UIPanel, UIRow, UISpan, UIDiv, UIButton, UIText } from './libs/ui.js';

function SidebarGeometryTab(editor, group) {

    const explorer = editor.explorer;

    // Layout
    const container = new UISpan();

    const panel = new UIPanel();
    panel.setBorderTop('0');
    panel.setPaddingTop('20px');
    container.add(panel);

    const itemsRow = new UIRow();

    const keys = Object.keys(group.Items);
    keys.forEach(key => {
        const geoTitle = new UIText(key);
        const geoBtn = new UIButton('+');
        const geoItem = new UIDiv().setClass('geo-item').add(geoTitle).add(geoBtn);
        const item = {
            Name: key,
            Data: group.Items[key]
        }
        geoItem.onClick(() => explorer.addGeometry(item));

        itemsRow.add(geoItem);
    });

    panel.add(itemsRow);

    return container;

}

export { SidebarGeometryTab };