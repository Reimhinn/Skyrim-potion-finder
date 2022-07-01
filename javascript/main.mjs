import { Effect } from './Effect.mjs';
import { EffectFinder } from './EffectFinder.mjs';
import { Ingredient } from './Ingredient.mjs';

// éléments du DOM

const effect = document.querySelector('.effect')
const effectInput = document.getElementById('effect-input')
const effectListContainer = document.querySelector('.effect-list')
const buttonAddEffect = document.getElementById('add-effect')
const effectValueInput = document.getElementById('effect-value-input')
const buttonAddIngredient = document.querySelector('.add-ingredient')
const ingredientInput = document.getElementById('ingredient-input')
const ingredientListContainer = document.querySelector('.ingredient-list')
const findIngredientSelect = document.querySelector('.find-ingredient-select');

const deleteCross = document.querySelector('.delete-cross')

const effectList = [];
const valueList = [];
const ingredientList = [];

const effectFinder = new EffectFinder(effectList, ingredientList);
effectFinder.initializeElement();

// supprimer l'effet à l'aide la croix

deleteCross.addEventListener('click', () => {
  let currentOption =
    effectSelectContainer.options[effectSelectContainer.selectedIndex]
  if (currentOption) {
    let targetValue = currentOption.value
    let effectToDelete = effectList.find(object => object.name === targetValue)
    let indexOfEffect = effectList.indexOf(effectToDelete)
    effectList.splice(indexOfEffect, 1)

    dataUpdate()
    // targetValue = "aucun effet"
  }
})

// déclarations des tableaux



// création de l'objet de l'effet, ajouts des valeurs de l'objet dans les tableaux et invocation de la fonction addEffect au moment du clic sur la bouton

buttonAddEffect.addEventListener('click', () => {
  const newEffectName = effectInput.value;
  const newEffectValue = effectValueInput.value;

  if (!newEffectName || !newEffectName) {
    return;
  }

  const newEffect = new Effect(newEffectName, newEffectValue);
  newEffect.mountElement();
  effectList.push(newEffect);

  ingredientList.forEach((ingredient) => {
    ingredient.availableEffectNames.push(newEffect.name);
    ingredient.updateElement();
  });

  effectFinder.updateElement();

  effectInput.value = '';
  effectValueInput.value = '';
});

buttonAddIngredient.addEventListener('click', () => {
  const newIngredientName = ingredientInput.value;

  if (!newIngredientName) {
    return;
  }

  const availableEffectNames = effectList.map(({ name }) => name);
  const newIngredient = new Ingredient(newIngredientName, null, availableEffectNames);
  newIngredient.mountElement();
  newIngredient.onUpdate = () => {
    effectFinder.updateElement();
  };

  ingredientList.push(newIngredient);

  effectFinder.updateElement();

  ingredientInput.value = '';
});

// utilisation de la touche enter pour ajouter un effet

effectInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    buttonAddEffect.click()
  }
})

effectValueInput.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    buttonAddEffect.click()
  }
})
