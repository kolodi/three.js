import { UIPanel, UIRow, UIButton, UIDiv, UIText, UISpan, UILabel, UICheckbox, UIImg } from './libs/ui.js';

function SidebarMaterials(editor, materials) {

    const ASSETS_BASE_URL = 'https://s3.eu-south-1.amazonaws.com/k3.varplus.it/res/ab/LTS2019/web/dev';
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
        const label = new UILabel().setClass('mat-label');
        const checkbox = new UICheckbox(false).setClass('mat-check');
        const matTitle = new UIText(key);
        const matBtn = new UIButton();
        matBtn.dom.innerHTML = '<i class="fas fa-angle-down"></i>';

        const matItem = new UIDiv().setClass('mat-item').add(matTitle).add(matBtn);
        const matContent = new UIDiv().setClass('mat-content');

        checkbox.onChange(function () {
            if (checkbox.getValue()) {
                matItem.addClass('mat-i-expanded');
                matContent.addClass('mat-c-expanded');
                matBtn.dom.innerHTML = '<i class="fas fa-angle-left"></i>';
            } else {
                matItem.removeClass('mat-i-expanded');
                matContent.removeClass('mat-c-expanded');
                matBtn.dom.innerHTML = '<i class="fas fa-angle-down"></i>';
            }
        });
        
        label.add(checkbox);
        label.add(matItem);

        const variants = Object.keys(materials[key].Variants);
        variants.forEach(variant => {
            const varTitle = new UIText(variant);
            const varBtn = new UIButton('+');
            const varItem = new UIDiv().setClass('geo-item').add(varTitle).add(varBtn);
            varItem.onClick(() => applyMaterial(materials[key].Variants[variant].Path));
            matContent.add(varItem);
        });

        itemsRow.add(label);
        itemsRow.add(matContent);
    });

    settings.add(itemsRow);

    return container;

}

export { SidebarMaterials };