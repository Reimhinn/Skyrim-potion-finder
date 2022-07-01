export class EffectFinder {
  constructor(effects, ingredients) {
    this.effects = effects;
    this.ingredients = ingredients;
    this.selectedEffectName = '';
    this.foundIngredients = [];

    this.selectElement = document.querySelector('.find-ingredient-select');
    this.ingredientsElement = document.querySelector('.found-ingredients-list');
  }

  initializeElement() {
    this.selectElement.addEventListener('change', () => {
      this.selectedEffectName = this.selectElement.value;
      this.updateElement();
    });

    this.updateElement();
  }

  updateElement() {
    Array.from(this.selectElement.querySelectorAll('option'))
    .slice(1)
    .forEach((optionElement) => optionElement.remove());

    const availableEffectNames = this.effects.map(({ name }) => name);
    availableEffectNames.forEach((availableEffectName) => {
      this.selectElement.innerHTML += `
        <option value="${availableEffectName}">${availableEffectName}</option>
      `
    });

    this.selectElement.value = this.selectedEffectName;

    this.findIngredients();
    this.ingredientsElement.innerHTML = this.foundIngredients
      .map((ingredient) => `<li>${ingredient.name}</li>`)
      .join('\n');
  }

  findIngredients() {
    this.foundIngredients = this.ingredients.filter((ingredient) => (
      this.selectedEffectName !== ''
      && ingredient.effectNames.includes(this.selectedEffectName)
    ));
  }
}
