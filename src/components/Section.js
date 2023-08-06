export default class Section {
    #container;
    #renderer;
    #initialArray;

    constructor ({items, renderer}, selector) {
        this.#initialArray = items;
        //console.log(items)
        this.#renderer = renderer;
        //console.log(renderer)
        this.#container = document.querySelector(selector); 
        //console.log(this.#container)
    }

    renderItems() {
        this.#initialArray.forEach(item => this.#renderer(item))
    }

    addItem(element, position = 'append') {
        switch (position) {
          case "append":
            this.#container.append(element);
            break;
          case "prepend":
            this.#container.prepend(element);
            break;
          case "before":
            this.#container.before(element);
            break;
          case "after":
            this.#container.after(element);
            break;
          default:
            break;
        }
    }
}