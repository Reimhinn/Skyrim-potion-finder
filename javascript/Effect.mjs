export class Effect {
  constructor (name, value) {
    this.name = name;
    this.value = value;
  }

  createElement() {
    this.element = document.createElement('li');
    this.element.classList.add('flex');
    this.element.classList.add('effect-list-element');
    this.updateElement();
  }

  updateElement() {
    this.element.textContent = (
      `${this.name} (${this.value})`
    );
  }

  mountElement() {
    if (!this.element) {
      this.createElement();
    }

    document.querySelector('.effect-list').appendChild(this.element);
  }

  unmountElement() {
    document.querySelector('.effect-list').removeChild(this.element);
  }
}
