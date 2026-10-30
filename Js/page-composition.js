import {
  joueursContainer,
  joueurs,
  messageshow
} from "./interface.js";
import {
  restaurerJoueurs,
  refreshLocalStorage
} from "./stockage.js";
import {
  afficherJoueur,
  libre
} from "./joueurs.js";

// Compatibilité entre les postes des joueurs et les positions du terrain

const position_player = {
  gb: "Gardien",
  dg: "Défenseur",
  dc1: "Défenseur",
  dc2: "Défenseur",
  dd: "Défenseur",
  mg: "Milieu",
  mc1: "Milieu",
  mc2: "Milieu",
  md: "Milieu",
  bu1: "Attaquant",
  bu2: "Attaquant"
};

function initComposition() {
  if (!joueursContainer) {
    return;
  }

  // Attribution d'un joueur à une position avec le select de sa carte

  joueursContainer.addEventListener("change", function (event) {
    if (!event.target.matches("select")) {
      return;
    }

    const select = event.target;
    const carte = select.closest("[data-numero]");

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

    const nouvellePosition = select.value;

    if (nouvellePosition === "banc") {
      libre(joueur);
      joueur.position = "banc";
      refreshLocalStorage();

      messageshow(
        joueur.nom + " est retourné sur le banc.",
        "succes"
      );

      return;
    }

    if (position_player[nouvellePosition] !== joueur.poste) {
      messageshow(
        "Ce joueur ne correspond pas à cette position !"
      );

      select.value = joueur.position || "banc";
      return;
    }

    const caseTerrain = document.querySelector(
      ".containir ." + nouvellePosition
    );

    if (!caseTerrain) {
      messageshow("Position introuvable !");
      select.value = joueur.position || "banc";
      return;
    }

    if (
      caseTerrain.dataset.numero &&
      caseTerrain.dataset.numero !== String(joueur.numero)
    ) {
      messageshow("Cette position est déjà occupée !");
      select.value = joueur.position || "banc";
      return;
    }

    libre(joueur);

    caseTerrain.dataset.numero = String(joueur.numero);

    const statut = caseTerrain.querySelector("p");

    if (statut) {
      statut.textContent = joueur.nom;
    }

    joueur.position = nouvellePosition;
    refreshLocalStorage();

    messageshow(
      joueur.nom + " a été assigné à cette position.",
      "succes"
    );
  });


  restaurerJoueurs(function (joueur) {
    afficherJoueur(joueur, "composition");
  });
}

initComposition();
