// 1-modale :
const modale = document.querySelector("#modale");
const ouvrir = document.querySelector("#ouvrir");
const fermer = document.querySelector("#fermer");
const annuler = document.querySelector("#annuler");

ouvrir.addEventListener("click", function () {
  modale.classList.remove("hidden");
  modale.classList.add("flex");
});

fermer.addEventListener("click", function () {
  modale.classList.add("hidden");
  modale.classList.remove("flex");
});

annuler.addEventListener("click", function () {
  modale.classList.add("hidden");
  modale.classList.remove("flex");
});
