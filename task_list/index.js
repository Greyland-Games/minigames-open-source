let listElemHeight
const dropAction = (el) => {
    el.className += ' ex-moved';
    let response = isCorrect(el)

    if (response == 0) {
        el.classList.add('horizontal-shake')

        setTimeout(() => {
            el.classList.remove('horizontal-shake')
            document.getElementById("slot0").appendChild(el);
        }, 1000)
    }
    else if (response > 0) {
        const count = document.querySelectorAll('#slot0 > div[data-class]').length;
        document.getElementById("slot0").setAttribute("style", `height: ${10 + listElemHeight * count}px!important; `)

        if (count == 0) {
            success()
        }
    }
}

function initDragula(slots) {
    dragula(slots)
        .on('drag', function (el) {
            // add 'is-moving' class to element being dragged
            el.classList.add('is-moving');
        }).on('drop', function (el) { dropAction(el) })
        .on('dragend', function (el) {

            // remove 'is-moving' class from element after dragging has stopped
            el.classList.remove('is-moving');

            // add the 'is-moved' class for 600ms then remove it
            window.setTimeout(function () {
                el.classList.add('is-moved');
                window.setTimeout(function () {
                    el.classList.remove('is-moved');
                }, 600);
            }, 100);
        });
}
function shuffleElemsInPlace(query) {
    var ul = document.querySelector(query);
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }
}

function isCorrect(el) {
    if (!el.parentNode) {
        return 0
    }
    if (el.parentNode.children.length != 1) {
        return 0
    }
    let dragid = el.parentNode.id.replace("slot", "")
    let dropid = el.getAttribute("data-class").replace("item", "")
    if (dragid != dropid) return 0
    return parseInt(dragid)
}

function success() {
    document.getElementById("continue").classList.remove('invisible');
}

function setParent(elem, parent_idx) {
    const parent = document.getElementById(`slot${parent_idx}`)
    const child = elem
    parent.appendChild(child); 1
}

function initKeyboardControls(slot_count) {
    const li_elems = document.querySelectorAll("#slot0 .draggable")
    document.body.addEventListener("keypress", function (event) {

        const isNumber = /^[0-9]$/i.test(event.key)
        if (!isNumber || event.key > slot_count) {
            return
        }

        const elem = this.querySelector('.active-item')
        event.preventDefault();
        setParent(elem, event.key)
        dropAction(elem)

    });
    li_elems.forEach(element => {
        element.addEventListener("mouseover", (event) => {
            li_elems.forEach(element => {
                element.classList.remove('active-item');
            });
            element.classList.add('active-item');
        });
    });
}
