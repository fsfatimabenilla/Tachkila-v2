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

//  2- validation input nom :
const nomInput = document.querySelector("#nom");
const validation = document.querySelector("#valide");
const regexNom = /^[a-zA-Z]+$/;

nomInput.addEventListener("input", function () {
  const nom = nomInput.value.trim();

  if (nom === "") {
    validation.textContent = "";
    nomInput.classList.remove("border-red-500", "border-green-500");
    return;
  }

  if (regexNom.test(nom)) {
    validation.textContent = "Nom valide ";
    validation.className = "mt-2 text-sm text-green-400";

    nomInput.classList.remove("border-red-500");
    nomInput.classList.add("border-green-500");
  } else {
    validation.textContent = "Nom invalide : utilisez des lettres.";
    validation.className = "mt-2 text-sm text-red-400";

    nomInput.classList.remove("border-green-500");
    nomInput.classList.add("border-red-500");
  }
});

