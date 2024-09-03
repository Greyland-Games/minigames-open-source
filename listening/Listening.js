class ListeningGame {
    constructor(lang, data) {
        this.lang = lang;
        this.words = data.words
        this.currentIndex = 0
    }

    render() {
        const listening_game = document.getElementById("listening_game")
        let html = ""
        const icon = `<i class="material-symbols-outlined">volume_up</i>`
        var audiosrc = `audio/${this.lang}/${this.words[this.currentIndex].audio}.mp3`
        html += `<audio id="${audiosrc}" src="${audiosrc}"></audio>`
        html += `<button onClick = "playAudio('${audiosrc}')" class="iconbutton" id="playAudioButton"> ${icon}</button >`
        listening_game.innerHTML = html
    }
    setupKeyboardActions() {
        const elem = document.getElementById('ListeningGameInput')
        elem.focus()
        elem.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById('checkAnswerButton').click()
            }
        });
    }
    addToIndex() {
        this.currentIndex++
    }

    next() {
        this.addToIndex()
        if (this.currentIndex >= this.words.length) {
            success()
            return
        }
        this.render()
        document.getElementById('playAudioButton').click()
    }

    check() {
        const guess = document.getElementById("ListeningGameInput").value.toLowerCase()
        const correct = this.words[this.currentIndex].word.toLowerCase()
        if (guess == correct) {
            const el = document.getElementById("ListeningGameInput")
            el.classList.add('correct-fx')

            setTimeout(() => {
                el.classList.remove('correct-fx')
                el.value = ""
                this.next()
            }, 1000)
        }
        else {
            const el = document.getElementById("ListeningGameInput")
            el.classList.add('horizontal-shake')

            setTimeout(() => {
                el.classList.remove('horizontal-shake')
            }, 1000)
        }
    }
}