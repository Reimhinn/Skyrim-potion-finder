export class Ingredient {
  constructor (name, effectNames, availableEffectNames) {
    this.name = name;
    this.effectNames = effectNames || ['', '', '', ''];
    this.availableEffectNames = availableEffectNames || effectNames?.slice() || [];
  }

  createElement() {
    this.element = document.createElement('li');
    this.element.classList.add('flex');
    this.element.innerHTML = `
      <span class="ingredient-list-element"></span>
      <select data-effect-index="0" class="effect-select">
        <option value="" disabled selected>Effet 1</option>
      </select>
      <select data-effect-index="1" class="effect-select">
        <option value="" disabled selected>Effet 2</option>
      </select>
      <select data-effect-index="2" class="effect-select">
        <option value="" disabled selected>Effet 3</option>
      </select>
      <select data-effect-index="3" class="effect-select">
        <option value="" disabled selected>Effet 4</option>
      </select>
    `;

    this.element.querySelectorAll('.effect-select').forEach((selectElement) => {
      selectElement.addEventListener('change', () => {
        const updatedEffectIndex = selectElement.dataset.effectIndex;
        this.effectNames[updatedEffectIndex] = selectElement.value;
        this.onUpdate?.();
      });
    });

    this.updateElement();
  }

  updateElement() {
    this.element.querySelector('.ingredient-list-element').textContent = this.name;
    this.element.querySelectorAll('.effect-select').forEach((selectElement, effectIndex) => {
      Array.from(selectElement.querySelectorAll('option'))
        .slice(1)
        .forEach((optionElement) => optionElement.remove());

      this.availableEffectNames.forEach((availableEffectName) => {
        selectElement.innerHTML += `
          <option value="${availableEffectName}">${availableEffectName}</option>
        `
      });

      selectElement.value = this.effectNames[effectIndex] || '';
    });
  }

  mountElement() {
    if (!this.element) {
      this.createElement();
    }

    document.querySelector('.ingredient-list').appendChild(this.element);
  }

  unmountElement() {
    document.querySelector('.ingredient-list').removeChild(this.element);
  }
}
