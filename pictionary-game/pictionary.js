class Pictionary {
    constructor(lang, data) {
        this.lang = lang;
        this.sentences = data.sentences
        this.images = data.images
        this.currentIndex = 0
    }
    addToIndex() {
        this.currentIndex++
    }
    addImage(image) {
        this.images.push(image)
    }
    addSentence(sentence) {
        this.sentences.push(sentence)
    }
    figureElement(sentence, image) {
        return `
        <figure>
            <figcaption>${sentence}</figcaption>
            <img src="${image}" alt="Hint image">
        </figure>
    
        <div class="answer_form">
            <input type="text" id="pictionary_answer">
            <button onClick = "pictionary.checkAnswer()" id="checkAnswerButton">
                <span class="material-symbols-outlined">arrow_right_alt</span>
            </button>
        </div>`
    }
    answerElement(sentence, image, audiosrc) {

        const icon = `<i class="material-symbols-outlined">volume_up</i>`

        let html = `<figure>
            <figcaption>${sentence.replaceAll("___", this.sentences[this.currentIndex].word)} `

        if (audiosrc) {
            var audiosrc = `audio/${this.lang}/${audiosrc}.mp3`
            html += `<audio id="${audiosrc}" src="${audiosrc}"></audio>`
            html += `<button onClick = "playAudio('${audiosrc}')" class="iconbutton" id="playaudiobutton"> ${icon}</button >`
        }
        html += `</figcaption>`


        return html += `
        <img src="${image}" alt="Hint image">
        </figure>
    
        <div class="answer_form">
            <button onClick = "pictionary.next()" id="answerElementButton">
                <span class="material-symbols-outlined">arrow_right_alt</span>
            </button>
        </div>`
    }

    renderPuzzle() {
        const elem = document.getElementById("pictionary_div")
        elem.innerHTML = this.figureElement(this.sentences[this.currentIndex].full, this.images[this.currentIndex])
        document.getElementById('pictionary_answer').focus();
        document.getElementById('pictionary_answer').addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("checkAnswerButton").click();
            }
        });
    }
    renderAnswer() {
        const elem = document.getElementById("pictionary_div")
        elem.innerHTML = this.answerElement(this.sentences[this.currentIndex].full, this.images[this.currentIndex], this.sentences[this.currentIndex].audio)

        document.getElementById('playaudiobutton').click();
        document.getElementById('answerElementButton').focus();
    }
    next() {
        this.addToIndex()
        if (this.currentIndex >= this.sentences.length) {
            success()
            return
        }
        this.renderPuzzle()
    }
    checkAnswer() {
        const pictionary_answer = document.getElementById("pictionary_answer")
        let answer = pictionary_answer.value

        if (answer.toLowerCase() == this.sentences[this.currentIndex].word.toLowerCase()) {
            // correct: display full sentence and audio play button
            this.renderAnswer()

        }
        else {
            // incorrect: shake effect
            pictionary_answer.classList.add("horizontal-shake")
            setTimeout(() => {
                pictionary_answer.classList.remove('horizontal-shake')
            }, 1000)
        }
    }

}
