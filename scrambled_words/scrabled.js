class ScrambledWords {
    constructor(data, callback) {
        this.words = data.words
        this.images = data.images
        this.currentIndex = 0
        this.slots = []
        this.callback = callback
    }
    shuffleElemsInPlace(query) {
        var ul = document.querySelector(query);
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);
        }
    }
    setSlots(slots) {
        this.slots = slots
    }
    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    addClickControls() {
        document.querySelectorAll(".draggable").forEach(element => {
            element.addEventListener("click", () => {
                if (element.parentNode.id == "drag_letters") {
                    document.getElementById("drop_letters").appendChild(element)
                    if (document.getElementById("drag_letters").children.length == 0) {
                        this.checkWord()
                    }
                }
                else if (element.parentNode.id == "drop_letters") {
                    document.getElementById("drag_letters").appendChild(element)
                }
            });
        });
    }
    render() {
        let html = `<img src="img/${this.images[this.currentIndex]}" alt="Hint image">`
        html += '<div id="drag_letters">'
        let arr = this.words[this.currentIndex].split("")
        this.shuffleArray(arr)
        arr.forEach(element => {
            html += `<span class="draggable">${element}</span>`

        });

        html += `</div><div class="row">
        <div id="drop_letters"></div>
        <button id="drop_letters_button" class="invisible" onclick="scrambledGame.next()">
            <span class="material-symbols-outlined">arrow_forward</span>
        </button></div>`

        const scrabled_game_div = document.getElementById("scrabled_game_div")
        scrabled_game_div.innerHTML = html
        scrabled_game_div.style = `width:${this.words[this.currentIndex].length * 52}px`
        this.addClickControls()
    }
    next() {
        document.getElementById("drop_letters_button").classList.add("invisible")
        this.currentIndex++
        if (this.currentIndex >= this.words.length) {
            success()
            return
        }
        this.render()
        this.slots = [document.getElementById("drag_letters"), document.getElementById("drop_letters")]
        initDragula(this.slots, this.callback)
    }
    setCorrect() {
        const drop_letters_button = document.getElementById("drop_letters_button")
        drop_letters_button.classList.remove("invisible")
        drop_letters_button.focus()
        const el = document.getElementById("drop_letters")
        el.classList.add('correct-fx')

        setTimeout(() => {
            el.classList.remove('correct-fx')
        }, 1000)

    }
    setIncorrect() {
        const el = document.getElementById("drop_letters")
        el.classList.add('horizontal-shake')

        setTimeout(() => {
            el.classList.remove('horizontal-shake')
        }, 1000)
    }

    checkWord() {
        let guess_word = ""
        let correct_word = this.words[this.currentIndex]
        Array.from(document.getElementById("drop_letters").children).forEach(element => {
            guess_word += element.textContent
        });
        if (guess_word == correct_word) {

            this.setCorrect()
        }
        else {
            this.setIncorrect()
        }

    }
}

function initDragula(slots, callback) {
    dragula(slots)
        .on('drag', function (el) {
            // add 'is-moving' class to element being dragged
            el.classList.add('is-moving');
        }).on('drop', function (el) {
            el.className += ' ex-moved';
            if (document.getElementById("drag_letters").children.length == 0) {
                callback()
            }
        })
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