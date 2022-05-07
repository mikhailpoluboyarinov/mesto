export class Section {
    constructor({ items , renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        this._containerElement = document.querySelector(selector);
    }

    render() {
        this._items.forEach(item => {
            this._containerElement.append(this._renderer(item));
        });
    }

    addItem(element) {
        this._containerElement.prepend(element);
    }
}