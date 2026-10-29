
import { position_player } from "./donnees-initiales.js";
import { sauvegarderJoueurs } from "./stockage.js";
import {
  afficherJoueur,
  CompteurPlayer,
  fermerModale,
  libre,
  messageshow
} from "./interface.js";
import {
  validateNom,
  validatePoste,
  valideNumber
} from "./validation.js";

export function gererPlayer(elements, etat) {
  const {
    modale, ouvrir, fermer, annuler, form, nomInput, posteContainer,
    numeroInput, messageNom, messagePoste, messageNumero, message,
    joueursContainer, compteur
  } = elements;

  function enregistrer() {
    sauvegarderJoueurs(etat.joueurs);
  }

  function rendreCartes() {
    joueursContainer.innerHTML = "";
    etat.joueurs.forEach(function (joueur) {
      afficherJoueur(joueur, joueursContainer);
    });
  }

  function compter() {
    CompteurPlayer(etat.joueurs, compteur);
  }

  function ouvrirPourAjout() {
    etat.joueurAModifier = null;
    form.reset();
    messageNom.textContent = "";
    messagePoste.textContent = "";
    messageNumero.textContent = "";
    modale.classList.remove("hidden");
    modale.classList.add("flex");
  }

  ouvrir.addEventListener("click", ouvrirPourAjout);

  function fermerLaModale() {
    fermerModale(modale);
  }

  fermer.addEventListener("click", fermerLaModale);
  annuler.addEventListener("click", fermerLaModale);

  nomInput.addEventListener("input", function () {
    validateNom(nomInput, messageNom);
  });

  posteContainer.addEventListener("change", function (event) {
    if (event.target.matches('input[type="radio"]')) {
      validatePoste(posteContainer, messagePoste);
    }
  });

  numeroInput.addEventListener("input", function () {
    valideNumber(numeroInput, messageNumero, etat.joueurs, etat.joueurAModifier);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nomValide = validateNom(nomInput, messageNom);
    const posteValide = validatePoste(posteContainer, messagePoste);
    const numeroValide = valideNumber(
      numeroInput, messageNumero, etat.joueurs, etat.joueurAModifier
    );

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

    if (etat.joueurAModifier) {
      const joueur = etat.joueurAModifier;
      const ancienNumero = joueur.numero;
      const anciennePosition = joueur.position;
      const ancienPoste = joueur.poste;

      if (ancienPoste !== nouveauJoueur.poste) {
        libre(joueur);
        joueur.position = "banc";
      } else if (anciennePosition !== "banc") {
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

      joueur.nom = nouveauJoueur.nom;
      joueur.numero = nouveauJoueur.numero;
      joueur.poste = nouveauJoueur.poste;
      etat.joueurAModifier = null;

      rendreCartes();
      compter();
      messageshow(message, "Joueur modifié avec succès !", "succes");
    } else {
      etat.joueurs.push(nouveauJoueur);
      afficherJoueur(nouveauJoueur, joueursContainer);
      compter();
      messageshow(message, "Joueur ajouté avec succès !", "succes");
    }

    enregistrer();
    form.reset();
    messageNom.textContent = "";
    messagePoste.textContent = "";
    messageNumero.textContent = "";
    fermerModale(modale);
  });

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
    const index = etat.joueurs.findIndex(function (joueur) {
      return joueur.numero === numero;
    });

    if (index === -1) {
      return;
    }

    const confirmation = confirm("Voulez-vous supprimer ce joueur ?");
    if (!confirmation) {
      return;
    }

    const joueur = etat.joueurs[index];
    libre(joueur);
    etat.joueurs.splice(index, 1);
    carte.remove();

    compter();
    enregistrer();
    messageshow(message, "Joueur supprimé avec succès !", "succes");
  });

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
    const joueur = etat.joueurs.find(function (j) {
      return j.numero === numero;
    });

    if (!joueur) {
      return;
    }

    etat.joueurAModifier = joueur;
    nomInput.value = joueur.nom;
    numeroInput.value = joueur.numero;

    const posteInput = posteContainer.querySelector(
      `input[name="poste"][value="${joueur.poste}"]`
    );

    if (posteInput) {
      posteInput.checked = true;
    }

    messageNom.textContent = "";
    messagePoste.textContent = "";
    messageNumero.textContent = "";
    modale.classList.remove("hidden");
    modale.classList.add("flex");
  });

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
    const joueur = etat.joueurs.find(function (j) {
      return j.numero === numero;
    });

    if (!joueur) {
      return;
    }

    const nouvellePosition = select.value;

    if (nouvellePosition === "banc") {
      libre(joueur);
      joueur.position = "banc";
      enregistrer();
      messageshow(message, joueur.nom + " est retourné sur le banc.", "succes");
      return;
    }

    if (position_player[nouvellePosition] !== joueur.poste) {
      messageshow(message, "Ce joueur ne correspond pas à cette position !");
      select.value = joueur.position || "banc";
      return;
    }

    const caseTerrain = document.querySelector(
      ".containir ." + nouvellePosition
    );

    if (!caseTerrain) {
      messageshow(message, "Position introuvable !");
      select.value = joueur.position || "banc";
      return;
    }

    if (
      caseTerrain.dataset.numero &&
      caseTerrain.dataset.numero !== String(joueur.numero)
    ) {
      messageshow(message, "Cette position est déjà occupée !");
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
    enregistrer();
    messageshow(
      message,
      joueur.nom + " a été assigné à cette position.",
      "succes"
    );
  });

  compter();
}
