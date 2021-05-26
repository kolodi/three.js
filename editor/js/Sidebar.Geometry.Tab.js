import { UIPanel, UIRow, UISpan, UIDiv, UIButton, UIText } from './libs/ui.js';

function SidebarGeometryTab(editor, group) {

    const ASSETS_BASE_URL = 'https://s3.eu-south-1.amazonaws.com/k3.varplus.it/res/ab/LTS2019/web/dev';
    const ext = '.glb';

    const explorer = editor.explorer;

    // Layout
    const container = new UISpan();

    const settings = new UIPanel();
    settings.setBorderTop('0');
    settings.setPaddingTop('20px');
    container.add(settings);

    const itemsRow = new UIRow();

    const keys = Object.keys(group.Items);
    keys.forEach(key => {
        const geoTitle = new UIText(key);
        const geoBtn = new UIButton('+');
        const geoItem = new UIDiv().setClass('geo-item').add(geoTitle).add(geoBtn);
        const item = {
            Name: key,
            Path: `${ASSETS_BASE_URL}/${group.Items[key].Path}${ext}`,
        };
        geoItem.onClick(() => explorer.addGeometry(item));

        itemsRow.add(geoItem);
    });

    settings.add(itemsRow);

    return container;

}

export { SidebarGeometryTab };