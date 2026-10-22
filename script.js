
// 1. Sélection des éléments
const modale = document.querySelector("#modale");
const ouvrir = document.querySelector("#ouvrir");
const fermer = document.querySelector("#fermer");
const annuler = document.querySelector("#annuler");

const form = document.querySelector("#formulaire");
const nomInput = document.querySelector("#nom");
const posteContainer = document.querySelector("#check");
const numeroInput = document.querySelector("#numero");

const messageNom = document.querySelector("#valide");
const messagePoste = document.querySelector("#poste-message");
const messageNumero = document.querySelector("#numero-message");
const msgForm = document.querySelector("#form-msg");


// 2. Ouvrir et fermer la modale
ouvrir.addEventListener("click", function () {
  modale.classList.remove("hidden");
  modale.classList.add("flex");
});

function fermerModale() {
  modale.classList.add("hidden");
  modale.classList.remove("flex");
}

fermer.addEventListener("click", fermerModale);
annuler.addEventListener("click", fermerModale);


// 3. Validation du nom
const regexNom = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,30}$/;

function validateNom() {
  const nom = nomInput.value.trim();

  if (nom === "") {
    messageNom.textContent = "Le nom est obligatoire.";
    messageNom.className = "message mt-2 text-sm text-red-400";
    return false;
  }

  if (!regexNom.test(nom)) {
    messageNom.textContent =
      "lettres, 3 à 30 caractères";
    messageNom.className = "message mt-2 text-sm text-red-400";
    return false;
  }

  messageNom.textContent = "";
  return true;
}

nomInput.addEventListener("input", validateNom);


// 4. Validation du poste avec Event Delegation
function validatePoste() {
  const posteChoisi = posteContainer.querySelector(
    'input[type="radio"]:checked'
  );

  if (!posteChoisi) {
    messagePoste.textContent = "choisir un poste";
    messagePoste.className = "message mt-2 text-sm text-red-400";
    return false;
  }

  messagePoste.textContent = "";
  return true;
}

posteContainer.addEventListener("change", function (event) {
  if (event.target.matches('input[type="radio"]')) {
    validatePoste();
  }
});

// 6. Valide :
form.addEventListener("submit", function (event) {
  event.preventDefault();

  msgForm.textContent = "";

  const nomValide = validateNom();
  const posteValide = validatePoste();

  if (!nomValide || !posteValide) {
    return;
  }

  msgForm.textContent = "Le formulaire est valide !";
  msgForm.className = "mt-4 text-sm text-green-400";
});

