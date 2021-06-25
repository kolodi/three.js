import { UIPanel, UIRow, UISpan, UIDiv, UIButton, UIText, UIInput } from './libs/ui.js';

function SidebarGeometryTab(editor, group) {

    const explorer = editor.explorer;
    const geometries = Object.keys(group.Items);
    let filtered = geometries;

    function searchHandler() {
        let value = this.getValue();
        
        filtered = geometries.filter(item =>
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

    function render() {
        
        itemsRow.clear();
        
        filtered.forEach(key => {
            const geoTitle = new UIText(key);
            const geoBtn = new UIButton();
            geoBtn.dom.innerHTML = '<i class="fas fa-plus"></i>';
            const geoItem = new UIDiv().setClass('geo-item').add(geoTitle).add(geoBtn);
            const item = {
                Name: key,
                Data: group.Items[key]
            }
            geoItem.onClick(() => explorer.addGeometry(item));

            itemsRow.add(geoItem);
            panel.add(itemsRow);

        });
        
    }
    
    panel.add(searchRow);
    render();

    return container;

}

export { SidebarGeometryTab };