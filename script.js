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

const joueursContainer = document.querySelector("#joueurs-container");
const listeJoueurs = document.querySelector("#liste-joueurs");
let joueurs = [];

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


// 6. affichage et ajout des players:

function afficherJoueur(joueur) {
  const carte = document.createElement("div");
  carte.className =
    "rounded-xl border-l border-red-500 bg-slate-700 p-3 mt-4";

  const contenu = document.createElement("div");
  contenu.className = "flex gap-3 items-center";

  const numero = document.createElement("span");
  numero.className =
    "rounded-full border border-red-500 h-9 w-9 flex items-center justify-center";
  numero.textContent = joueur.numero;

  const informations = document.createElement("div");
  informations.className = "flex-1";

  const nom = document.createElement("h3");
  nom.textContent = joueur.nom;

  const poste = document.createElement("p");
  poste.className = "text-orange-400 text-sm";
  poste.textContent = joueur.poste;

  informations.append(nom, poste);

  const btnModifier = document.createElement("button");
  btnModifier.type = "button";
  btnModifier.textContent = "🖊️";
  btnModifier.setAttribute("aria-label", "Modifier");

  const btnSupprimer = document.createElement("button");
  btnSupprimer.type = "button";
  btnSupprimer.textContent = "🗑️";
  btnSupprimer.setAttribute("aria-label", "Supprimer");

  contenu.append(numero, informations, btnModifier, btnSupprimer);
  carte.append(contenu);
  joueursContainer.append(carte);
}


numeroInput.addEventListener("input", valideNumber);


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nomValide = validateNom();
  const posteValide = validatePoste();
  const numeroValide = valideNumber();

  if (!nomValide || !posteValide || !numeroValide) {
    return;
  }

  const posteSelectionne = posteContainer.querySelector(
    'input[type="radio"]:checked'
  );

  const nouveauJoueur = {
    nom: nomInput.value.trim(),
    numero: Number(numeroInput.value),
    poste: posteSelectionne.value
  };

  joueurs.push(nouveauJoueur);

  afficherJoueur(nouveauJoueur);

  msgForm.textContent = "Joueur ajouté avec succès !";
  msgForm.className = "mt-4 text-sm text-green-400";

  form.reset();

  messageNom.textContent = "";
  messagePoste.textContent = "";
  messageNumero.textContent = "";
  msgForm.textContent= "";

  fermerModale();
});



// const posteChoisi = posteContainer.querySelector(
//   'input[type="radio"]:checked'
// );
// const nouveauJoueur = {
//   nom: nomInput.value.trim(),
//   poste: posteChoisi.value,
//   numero: Number(numeroInput.value)
// };
// joueurs.push(nouveauJoueur);

// afficherJoueur(nouveauJoueur);
// addPlayer(nouveauJoueur);







