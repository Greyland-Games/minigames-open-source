function ItemCardGrid(tasksJson, listObj) {
    let list = `<div class="item-card-grid">`
    if (!tasksJson.items || tasksJson.items.length < 1) {
        return list += "<span class ='errormsg'>No tasks defined</span>"
    }
    tasksJson.items.forEach((element, index) => {
        list += ItemCard(element.name, element.img, element.ok, index, false, listObj)
    });
    list += "</div>"
    return list
} 