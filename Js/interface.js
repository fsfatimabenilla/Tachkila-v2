import { optionsPositions } from "./donnees-initiales.js"

let timeMssg ;
export function CompteurPlayer(joueurs , compteur) {
  compteur.textContent = joueurs.length + " joueurs";
}

export function messageshow(message,texte, type = "erreur") {
  message.textContent = texte;

  message.className =
    type === "erreur"
      ? "mt-3 text-sm text-red-500"
      : "mt-3 text-sm text-green-500";

  clearTimeout(timeMssg);

  timeMssg = setTimeout(function () {
    message.textContent = "";
  }, 3000);
}

export function ouvrirModale(
  form,
  modale,
  messageNom,
  messagePoste,
  messageNumero
) {
  form.reset();
  messageNom.textContent = "";
  messagePoste.textContent = "";
  messageNumero.textContent = "";
  modale.classList.remove("hidden");
  modale.classList.add("flex");
}

export function fermerModale(modale) {
  modale.classList.add("hidden");
  modale.classList.remove("flex");
}

export function carteColoree(poste) {
  if (poste === "Gardien") {
    return "border-l-4 border-amber-400 bg-amber-400/10";
  }

  if (poste === "Défenseur") {
    return "border-l-4 border-blue-400 bg-blue-400/10";
  }

  if (poste === "Milieu") {
    return "border-l-4 border-green-400 bg-green-400/10";
  }

  return "border-l-4 border-red-400 bg-red-400/10";
}



export function afficherJoueur(joueur) {
  const carte = document.createElement("div");

  
carte.className =
  "rounded-xl p-3 " +"w-[260px] shrink-0 " +"flex flex-col gap-3 break-words " +
  carteColoree(joueur.poste);


  carte.dataset.numero = joueur.numero;

  const contenu = document.createElement("div");
contenu.className =
  "flex items-center gap-3 min-w-0";

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

  const selectPosition = document.createElement("select");

  selectPosition.className =
    "mt-3 w-full rounded-md border border-slate-500 bg-slate-700 p-2 text-sm text-white";

  optionsPositions.forEach(function (optionJoueur) {
    const option = document.createElement("option");

    option.value = optionJoueur.value;
    option.textContent = optionJoueur.nom;

    selectPosition.append(option);
  });

  selectPosition.value = joueur.position || "banc";

  const btnModifier = document.createElement("button");

  btnModifier.type = "button";
  btnModifier.textContent = "✏️ Modifier";
  btnModifier.className = "modifier";

  const btnSupprimer = document.createElement("button");

  btnSupprimer.type = "button";
  btnSupprimer.textContent = "🗑️";
  btnSupprimer.className = "supprimer";
  btnSupprimer.setAttribute("aria-label", "Supprimer");

  contenu.append(
    numero,
    informations,
    btnModifier,
    btnSupprimer
  );

  carte.append(contenu, selectPosition);

  joueursContainer.append(carte);
}


// Liberer :

export function libre(joueur) {
  if (!joueur.position || joueur.position === "banc") {
    return;
  }

  const ancienneCase = document.querySelector(
    ".containir ." + joueur.position
  );

  if (
    ancienneCase &&
    ancienneCase.dataset.numero === String(joueur.numero)
  ) {
    delete ancienneCase.dataset.numero;

    const statut = ancienneCase.querySelector("p");

    if (statut) {
      statut.textContent = "Libre";
    }
  }
}