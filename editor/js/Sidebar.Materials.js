import { UIPanel, UIRow, UIButton, UIDiv, UIText, UISpan, UILabel, UICheckbox, UIInput } from './libs/ui.js';

function SidebarMaterials(editor) {

    const explorer = editor.explorer;
    let materialGroups;
    let filtered;

    function searchHandler() {
        let value = this.getValue();

        filtered = Object.keys(materialGroups).filter(item =>
            item.toLowerCase().includes(value)
        );

        render();
    }

    // Layout
    const container = new UISpan();

    const panel = new UIPanel();
    panel.setBorderTop('0');
    panel.setPaddingTop('10px');
    container.add(panel);

    const searchRow = new UIRow().addClass('Search');

    const search = new UIInput('').addClass('search').onChange(searchHandler);
    search.dom.setAttribute('placeholder', 'search');
    search.dom.setAttribute('spellcheck', false);
    const icon = new UIText().addClass('search-icon').onChange(searchHandler);
    icon.dom.innerHTML = '<i class="fas fa-search"></i>';
    searchRow.add(search);
    searchRow.add(icon);

    const itemsRow = new UIRow();

    function render(materials) {
        
        itemsRow.clear();

        if (!filtered) {
            materialGroups = materials;
            filtered = Object.keys(materials);
        } else {
            filtered = filtered;
        }

        filtered.forEach(group => {
            const label = new UILabel().setClass('mat-label');
            const checkbox = new UICheckbox(false).setClass('mat-check');
            const matTitle = new UIText(group);
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

            const matVariants = Object.keys(materialGroups[group].Variants);
            matVariants.forEach(variant => {
                const varTitle = new UIText(variant);
                const varBtn = new UIButton();
                varBtn.dom.innerHTML = '<i class="fas fa-plus"></i>';
                const varItem = new UIDiv().setClass('geo-item').add(varTitle).add(varBtn);
                varItem.onClick(() => explorer.applyMaterialToSelected(
                    materialGroups[group].Variants[variant],
                    variant
                ));
                matContent.add(varItem);
            });

            itemsRow.add(label);
            itemsRow.add(matContent);
            
        });
        
        panel.add(searchRow);
        panel.add(itemsRow);

    }

    return {container, render};

}

export { SidebarMaterials };