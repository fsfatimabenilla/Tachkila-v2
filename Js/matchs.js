
import {
    gesModal,
    ajouterMatch,
    supprimerMatch,
    adv,
    date,
    heure,
    lieu,
    lieuMatch,
    containir,
    fermerModale,
    ajoutBtn,
    match
} from "./donnees-initiales.js";

import {
    validateAdv,
    validateLieu,
    validateHeure,
    validateLieumatch,
    validateDate,
    validateAdvInit
} from "./validation.js";

import { refreshLocalStorageMatch , refreshMatch} from "./stockage.js";

gesModal();
validateAdvInit();
validateDate();
validateHeure();
validateLieu();
validateLieumatch();

// Affichage du match
export function afficherMatch(ball) {

    const carte = document.createElement("div");
    carte.className = "border rounded-xl bg-slate-700 w-full p-3 flex gap-3 justify-between";

    const infoMT = document.createElement("div");
    infoMT.className = "flex flex-col gap-3 flex-1";

    const adversaire = document.createElement("h3");
    adversaire.className = "text-sky-300 text-xl font-bold";
    adversaire.textContent = ball.adversaire;

    const lieuM = document.createElement("p");
    lieuM.className = "text-white text-sm";
    lieuM.textContent = ball.lieu;

    const lieuMT = document.createElement("p");
    lieuMT.className = "text-white text-sm";
    lieuMT.textContent = ball.lieuMatch;

    infoMT.append(adversaire, lieuM, lieuMT);

    const carteTime = document.createElement("div");
    carteTime.className = "border rounded-lg bg-slate-950 p-4 flex flex-col items-center justify-center gap-2";

    const dateM = document.createElement("p");
    dateM.className = "text-white text-lg";
    dateM.textContent = ball.date;

    const heureM = document.createElement("p");
    heureM.className = "text-sky-300 text-lg";
    heureM.textContent = ball.heure;

    carteTime.append(dateM, heureM);

    const btnModifier = document.createElement("button");
    btnModifier.type = "button";
    btnModifier.textContent = "✏️";

    const btnSupprimer = document.createElement("button");
    btnSupprimer.type = "button";
    btnSupprimer.textContent = "🗑️";

    btnSupprimer.addEventListener("click", () => {
        const confirmation = confirm("Voulez-vous vraiment supprimer ce match ?");
        if(confirmation){
            supprimerMatch(ball);
            refreshLocalStorageMatch();
            carte.remove();
        }
    });
    

    carte.append(carteTime, infoMT, btnModifier, btnSupprimer);

    containir.append(carte);
}

// Ajout du match
export function ajoutMatch(event) {

    event.preventDefault();

    const vaAdvd = validateAdv();
    const vaDate = validateDate();
    const vaHeure = validateHeure();
    const vaLieu = validateLieu();
    const vaLm = validateLieumatch();

    if (!vaAdvd || !vaDate || !vaHeure || !vaLieu || !vaLm) {
        return;
    }

    const ball = {
        adversaire: adv.value,
        date: date.value,
        heure: heure.value,
        lieu: lieu.value,
        lieuMatch: lieuMatch.querySelector(
            'input[name="lieu-match"]:checked'
        ).value
    };

    ajouterMatch(ball);
    refreshLocalStorageMatch();
    afficherMatch(ball);
    fermerModale();
}

export function ajoutMatchInit() {
    ajoutBtn.addEventListener("click", ajoutMatch);
}
refreshMatch();

match.forEach(function(ball) {
    afficherMatch(ball);
});
ajoutMatchInit();

