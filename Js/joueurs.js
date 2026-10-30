import {
  modale,
  form,
  nomInput,
  posteContainer,
  numeroInput,
  messageNom,
  messagePoste,
  messageNumero,
  joueursContainer,
  joueurs,
  joueurAModifier,
  setJoueurAModifier,
  CompteurPlayer,
  messageshow,
  fermerModale
} from "./interface.js";
import {
  validateNom,validatePoste,valideNumber
} from "./validation.js";
import { refreshLocalStorage } from "./stockage.js";

function carteColoree(poste) {
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

const optionsPositions = [
  { value: "banc", nom: "Sur le banc" },
  { value: "gb", nom: "GB - Gardien" },
  { value: "dg", nom: "DG - Défenseur gauche" },
  { value: "dc1", nom: "DC - Défenseur central 1" },
  { value: "dc2", nom: "DC - Défenseur central 2" },
  { value: "dd", nom: "DD - Défenseur droit" },
  { value: "mg", nom: "MG - Milieu gauche" },
  { value: "mc1", nom: "MC - Milieu central 1" },
  { value: "mc2", nom: "MC - Milieu central 2" },
  { value: "md", nom: "MD - Milieu droit" },
  { value: "bu1", nom: "BU - Buteur 1" },
  { value: "bu2", nom: "BU - Buteur 2" }
];


export function afficherJoueur(joueur, page = "effectif") {
  if (!joueursContainer) {
    return;
  }

  const carte = document.createElement("div");

  carte.className =
    "rounded-xl p-3 w-[300px]  flex flex-col gap-3  " +
    carteColoree(joueur.poste);

  carte.dataset.numero = joueur.numero;

  const contenu = document.createElement("div");
  contenu.className = "flex items-center gap-3 min-w-0";

  const numero = document.createElement("span");
  numero.className =
    "rounded-full border border-red-500 h-9 w-9 flex items-center justify-center";
  numero.textContent = joueur.numero;

  const informations = document.createElement("div");
  informations.className = "flex-1 min-w-0";

  const nom = document.createElement("h3");
  nom.textContent = joueur.nom;

  const poste = document.createElement("p");
  poste.className = "text-orange-400 text-sm";
  poste.textContent = joueur.poste;

  informations.append(nom, poste);
  contenu.append(numero, informations);

  if (page === "composition") {
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
    carte.append(contenu, selectPosition);
  } else {
    const btnModifier = document.createElement("button");
    btnModifier.type = "button";
    btnModifier.textContent = "✏️ Modifier";
    btnModifier.className = "modifier";

    const btnSupprimer = document.createElement("button");
    btnSupprimer.type = "button";
    btnSupprimer.textContent = "🗑️";
    btnSupprimer.className = "supprimer";
    btnSupprimer.setAttribute("aria-label", "Supprimer");

    contenu.append(btnModifier, btnSupprimer);
    carte.append(contenu);
  }

  joueursContainer.append(carte);
}

// Libérer une position occupée par un joueur

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

export function initJoueurs() {
  if (
    !form ||
    !joueursContainer ||
    !nomInput ||
    !posteContainer ||
    !numeroInput ||
    !modale
  ) {
    return;
  }

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
      poste: posteSelectionne.value,
      position: "banc"
    };

    if (joueurAModifier) {
      const ancienNumero = joueurAModifier.numero;
      const anciennePosition = joueurAModifier.position;
      const ancienPoste = joueurAModifier.poste;

      // Si le poste change, le joueur retourne au banc
      if (ancienPoste !== nouveauJoueur.poste) {
        libre(joueurAModifier);
        joueurAModifier.position = "banc";
      } else if (anciennePosition !== "banc") {
        // Le poste ne change pas : conserver la position
        const caseTerrain = document.querySelector(
          ".containir ." + anciennePosition
        );

        if (
          caseTerrain &&
          caseTerrain.dataset.numero === String(ancienNumero)
        ) {
          caseTerrain.dataset.numero = String(nouveauJoueur.numero);

          const statut = caseTerrain.querySelector("p");

          if (statut) {
            statut.textContent = nouveauJoueur.nom;
          }
        }
      }

      joueurAModifier.nom = nouveauJoueur.nom;
      joueurAModifier.numero = nouveauJoueur.numero;
      joueurAModifier.poste = nouveauJoueur.poste;

      joueursContainer.innerHTML = "";

      joueurs.forEach(function (joueur) {
        afficherJoueur(joueur, "effectif");
      });

      setJoueurAModifier(null);
      CompteurPlayer();
      messageshow("Joueur modifié avec succès !", "succes");
    } else {
      joueurs.push(nouveauJoueur);
      afficherJoueur(nouveauJoueur, "effectif");
      CompteurPlayer();
      messageshow("Joueur ajouté avec succès !", "succes");
    }

    refreshLocalStorage();
    form.reset();

    if (messageNom) messageNom.textContent = "";
    if (messagePoste) messagePoste.textContent = "";
    if (messageNumero) messageNumero.textContent = "";

    fermerModale();
  });

  // Suppression

  joueursContainer.addEventListener("click", function (event) {
    const btn = event.target.closest(".supprimer");

    if (!btn || !joueursContainer.contains(btn)) {
      return;
    }

    const carte = btn.closest("[data-numero]");

    if (!carte) {
      return;
    }

    const numero = Number(carte.dataset.numero);

    const index = joueurs.findIndex(function (joueur) {
      return joueur.numero === numero;
    });

    if (index === -1) {
      return;
    }

    const confirmation = confirm(
      "Voulez-vous supprimer ce joueur ?"
    );

    if (!confirmation) {
      return;
    }

    const joueur = joueurs[index];

    libre(joueur);
    joueurs.splice(index, 1);
    carte.remove();

    CompteurPlayer();
    refreshLocalStorage();
    messageshow("Joueur supprimé avec succès !", "succes");
  });

  // Modification

  joueursContainer.addEventListener("click", function (event) {
    const btn = event.target.closest(".modifier");

    if (!btn || !joueursContainer.contains(btn)) {
      return;
    }

    const carte = btn.closest("[data-numero]");

    if (!carte) {
      return;
    }

    const numero = Number(carte.dataset.numero);

    const joueur = joueurs.find(function (j) {
      return j.numero === numero;
    });

    if (!joueur) {
      return;
    }

    setJoueurAModifier(joueur);

    nomInput.value = joueur.nom;
    numeroInput.value = joueur.numero;

    const posteInput = posteContainer.querySelector(
      `input[name="poste"][value="${joueur.poste}"]`
    );

    if (posteInput) {
      posteInput.checked = true;
    }

    if (messageNom) messageNom.textContent = "";
    if (messagePoste) messagePoste.textContent = "";
    if (messageNumero) messageNumero.textContent = "";

    modale.classList.remove("hidden");
    modale.classList.add("flex");
  });
}
