class CorrectList {
    constructor() {
        this.correct_items_list = [];
    }
    success() {
        document.getElementById("continue").classList.remove('invisible');
    }
    checkCards() {
        return this.correct_items_list.length <= 0
    }
    addToList(id) {
        this.correct_items_list.push(id)
    }
    removeFromList(id) {
        this.correct_items_list = this.correct_items_list.filter(function (item) {
            return item !== id;
        })
    }
    printList() {
        console.log(this.correct_items_list)
    }

}