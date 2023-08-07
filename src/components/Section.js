export default class Section {
    #container;
    #renderer;

    constructor ({renderer}, selector) {
        this.#renderer = renderer;
        this.#container = document.querySelector(selector); 
    }

    renderItems(items) {
        items.forEach(item => this.#renderer(item))
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