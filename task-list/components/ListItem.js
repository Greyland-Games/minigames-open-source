function ListItem(task, audiofile, locale, index) {
  const icon = `<i class="material-symbols-outlined">volume_up</i>`
  var audiosrc = `audio/${locale}/${audiofile}.mp3`

  return `<audio id="${audiofile}" src="${audiosrc}"></audio>
     <div data-class="item${index + 1}" class="draggable">
        <p>${task}</p>${IconButton(icon, audiofile)}
        <div class="drag-handle js-drag-handle"></div>
      </div>`
}
