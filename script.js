
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

// 5.numéro obligatoire de 1 à 99 et unique :
function valideNumber(){
 const valeur = numeroInput.value.trim();
  const numero = Number(valeur);
  if(valeur === "" ||numero<1 || numero>99){
     messageNumero.textContent =
      "Le numéro entre 1 et 99.";
    messageNumero.className = "message mt-2 text-sm text-red-400";
    return false;
  }



   messageNumero.textContent = "";
  return true;

}

const listeJoueurs = document.querySelector("#liste-joueurs");
// 6. Ajouter et afficher un joueur :
function addPlayer(player) {
  const option = document.createElement("option");

  option.value = player.numero;
  option.textContent =
    `${player.nom} - ${player.numero} - ${player.poste}`;

  listeJoueurs.append(option);
}

// 7. Validation du formulaire + ajout du joueur :
form.addEventListener("submit", function (event) {
  event.preventDefault();

  msgForm.textContent = "";

  const nomValide = validateNom();
  const posteValide = validatePoste();
  const numeroValide = valideNumber();

  if (!nomValide || !posteValide || !numeroValide) {
    return;
  }

  const posteChoisi = posteContainer.querySelector(
    'input[type="radio"]:checked'
  );

  const nouveauJoueur = {
    nom: nomInput.value.trim(),
    poste: posteChoisi.value,
    numero: Number(numeroInput.value)
  };

  addPlayer(nouveauJoueur);

  msgForm.textContent = "Joueur ajouté avec succès !";
  msgForm.className = "mt-4 text-sm text-green-400";


  form.reset();
  messageNom.textContent = "";
  messagePoste.textContent = "";
  messageNumero.textContent = "";
});
