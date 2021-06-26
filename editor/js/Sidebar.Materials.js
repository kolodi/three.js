import { UIPanel, UIRow, UIButton, UIDiv, UIText, UISpan, UILabel, UICheckbox } from './libs/ui.js';

function SidebarMaterials(editor) {

    const explorer = editor.explorer;

    // Layout
    const container = new UISpan();

    function render(materials) {

        container.clear();

        const panel = new UIPanel();
        panel.setBorderTop('0');
        panel.setPaddingTop('20px');
        container.add(panel);

        const itemsRow = new UIRow();

        const keys = Object.keys(materials);
        keys.forEach(key => {
            const label = new UILabel().setClass('mat-label');
            const checkbox = new UICheckbox(false).setClass('mat-check');
            const matTitle = new UIText(key);
            const matArrow = new UIText();
            matArrow.dom.innerHTML = '<i class="fas fa-angle-down"></i>';

            const matItem = new UIDiv().setClass('mat-item').add(matTitle).add(matArrow);
            const matContent = new UIDiv().setClass('mat-content');

            checkbox.onChange(function () {
                if (checkbox.getValue()) {
                    matItem.addClass('mat-i-expanded');
                    matContent.addClass('mat-c-expanded');
                    matArrow.dom.innerHTML = '<i class="fas fa-angle-left"></i>';
                } else {
                    matItem.removeClass('mat-i-expanded');
                    matContent.removeClass('mat-c-expanded');
                    matArrow.dom.innerHTML = '<i class="fas fa-angle-down"></i>';
                }
            });

            label.add(checkbox);
            label.add(matItem);

            const variants = Object.keys(materials[key].Variants);
            variants.forEach(variant => {
                const varTitle = new UIText(variant);
                const varBtn = new UIButton();
                varBtn.dom.innerHTML = '<i class="fas fa-sync"></i>';
                const varItem = new UIDiv().setClass('geo-item').add(varTitle).add(varBtn);
                varItem.onClick(() => explorer.applyMaterialToSelected(materials[key].Variants[variant], variant, true));
                varBtn.onClick(() => explorer.applyMaterialToSelected(materials[key].Variants[variant], variant, false));
                matContent.add(varItem);
            });

            itemsRow.add(label);
            itemsRow.add(matContent);
        });

        panel.add(itemsRow);
    }

    return {container, render};

}

export { SidebarMaterials };