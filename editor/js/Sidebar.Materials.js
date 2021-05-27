import { UIPanel, UIRow, UIButton, UIDiv, UIText, UISpan } from './libs/ui.js';

function SidebarMaterials(editor, materials) {

    const ASSETS_BASE_URL = 'https://s3.eu-central-1.amazonaws.com/k3.perdormire.com/res/ab/LTS2019/web/DEV';
    const ext = '.glb';

    function applyMaterial(path) {
        const glbUrl = `${ASSETS_BASE_URL}/${path}${ext}`;

        editor.explorer.applyMaterialToSelected(glbUrl)
    };

    // Layout
    const container = new UISpan();

    const settings = new UIPanel();
    settings.setBorderTop('0');
    settings.setPaddingTop('20px');
    container.add(settings);

    const itemsRow = new UIRow();

    const keys = Object.keys(materials);
    keys.forEach(key => {
        const matBox = new UIDiv().setClass('mat-box');
        const matTitle = new UIText(key);
        const matBtn = new UIButton('+');
        const matItem = new UIDiv().setClass('mat-item').add(matTitle).add(matBtn);
        matBox.add(matItem);

        const matContent = new UIDiv().setClass('mat-content');
        matBox.add(matContent);

        const variants = Object.keys(materials[key].Variants);
        variants.forEach(variant => {
            const varTitle = new UIText(variant);
            const varBtn = new UIButton('+');
            const varItem = new UIDiv().setClass('geo-item').add(varTitle).add(varBtn);
            varItem.onClick(() => applyMaterial(materials[key].Variants[variant].Path));
            matContent.add(varItem);
        });

        itemsRow.add(matBox);
    });

    settings.add(itemsRow);

    return container;

}

export { SidebarMaterials };