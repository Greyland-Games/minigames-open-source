function TaskList(tasksJson) {
    let list = `<div class="list" id="slot0" style="min-height:${45 * tasksJson.tasks.length}px">`
    if (!tasksJson.tasks || tasksJson.tasks.length < 1) {
        return list += "<span class ='errormsg'>No tasks defined</span>"
    }
    tasksJson.tasks.forEach((element, index) => {
        list += ListItem(element.note, element.audiofile, index)
    });
    list += "</div>"
    return list
}