function DropList(length) {
    let list = '<ul class="dropslots">'
    for (let index = 1; index < length + 1; index++) {
        list += `<li>  <span>${index}</span><div id="slot${index}" class="drop-zone">
      
        </div></li>`
    }
    list += "</ul>"
    return list
}