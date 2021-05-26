import { UIPanel, UIRow, UISpan, UIDiv, UIButton, UIText } from './libs/ui.js';

function SidebarGeometryTab( editor, group ) {

    const ASSETS_BASE_URL = 'https://s3.eu-south-1.amazonaws.com/k3.varplus.it/res/ab/LTS2019/web/dev';
    const ext = '.glb';

    function addGeometry( path ) {
        const glbUrl = `${ASSETS_BASE_URL}/${path}${ext}`;

        editor.loader.loadRemote( glbUrl );
    };

    // Layout
    const container = new UISpan();

	const settings = new UIPanel();
	settings.setBorderTop( '0' );
	settings.setPaddingTop( '20px' );
	container.add( settings );

    const itemsRow = new UIRow();

    const keys = Object.keys( group.Items );
    keys.forEach(key => {
        const geoTitle = new UIText( key );
        const geoBtn = new UIButton( '+' );
        const geoItem = new UIDiv().setClass( 'geo-item' ).add( geoTitle ).add( geoBtn );
        geoItem.onClick( () => addGeometry( group.Items[key].Path ) );

        itemsRow.add( geoItem );
    });

    settings.add( itemsRow );

    return container;
    
}

export { SidebarGeometryTab };