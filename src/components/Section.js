export class Section {
    constructor(renderer, selector) {
        this._renderer = renderer;
        this._containerElement = document.querySelector(selector);
    }

    render(items) {
        items.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element) {
        this._containerElement.prepend(element);
    }
}