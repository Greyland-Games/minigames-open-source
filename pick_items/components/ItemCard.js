
function ItemCard(item_name, item_img, isCorrect = true, index = 0, isSelected = false) {
    return `
    <figure class="itemcard ${isSelected ? 'selected' : ''}"
        onclick="setSelected('item-${index}', ${isCorrect})" id="item-${index}">
        <div class="box"><img src="img/${item_img}" alt="${item_name}"></div>
        <figcaption>${item_name}</figcaption>
        <span class="icon"></span>
    </figure>
    `
}

const setSelected = (id, isCorrect) => {
    const elem = document.getElementById(id)
    if (!isCorrect) {
        elem.classList.add('horizontal-shake')
        setTimeout(() => {
            elem.classList.remove('horizontal-shake')
        }, 1000)
        return
    }
    elem.classList.contains('selected') ? correctList.addToList(id) : correctList.removeFromList(id)
    elem.classList.contains('selected') ? elem.classList.remove('selected') : elem.classList.add('selected')

    if (correctList.checkCards()) {
        correctList.success()
    }
}