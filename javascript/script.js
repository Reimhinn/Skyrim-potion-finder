let effectList = []

const effectListContainer = document.querySelector(".effect-list")
function addEffect() {
    let template = effectList.map(effect => `<span class="li-flex"><li class="effect">${effect}</li><i class="fa-solid fa-xmark delete-cross"></i></span>`).join('\n');
    effectListContainer.innerHTML = template;
    const allDeleteCross = document.querySelectorAll(".delete-cross")

    allDeleteCross.forEach(deleteCross => {
      deleteCross.addEventListener("click", (event) => {
        let target = event.target
        let targetValue = target.previousElementSibling.innerText
        let effectToDelete = effectList.find(effect => effect === targetValue)
        let indexOfEffect = effectList.indexOf(effectToDelete)
        effectList.splice(indexOfEffect, 1)
        addEffect()
    })
    });
}

const effect = document.querySelector(".effect")
const effectInput = document.getElementById("effect-input")
const buttonAddEffect = document.getElementById("add-effect")
buttonAddEffect.addEventListener("click", () => {
  if (effectInput.value != "") {
    effectList.push(effectInput.value)
  }

  effectInput.value = ""
  addEffect()
})

effectInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    buttonAddEffect.click()
  }
})
