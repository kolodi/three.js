import * as THREE from '../../build/three.module.js';

import { UIPanel, UIRow, UISpan, UIDiv, UIButton, UIText } from './libs/ui.js';

function SidebarGeometryTab( editor, group ) {
    const ASSETS_BASE_URL = 'https://s3.eu-south-1.amazonaws.com/k3.varplus.it/res/ab/LTS2019/web/dev';
    const ext = '.glb';

    const container = new UISpan();

	const settings = new UIPanel();
	settings.setBorderTop( '0' );
	settings.setPaddingTop( '20px' );
	container.add( settings );

    const itemsRow = new UIRow();

    const keys = Object.keys(group.Items);
    keys.forEach(key => {
        const itemTitle = new UIText(key)
        const itemBtn = new UIButton('add').onClick(() => addGeometry(group.Items[key].Path))
        const item = new UIDiv().add(itemTitle).add(itemBtn)
        
        itemsRow.add( item )
    })

    async function addGeometry(path) {
        const fullPath = `${ASSETS_BASE_URL}/${path}${ext}`;
        editor.loader.loadFromWeb(fullPath);
    }

    settings.add( itemsRow );

    return container;
}

export { SidebarGeometryTab };