
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
    match,
    ouvrirModaleUpdate
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
import {
    messageshow
} from "./interface.js";

gesModal();
validateAdvInit();
validateDate();
validateHeure();
validateLieu();
validateLieumatch();


let matchUpdate = null;
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

    btnModifier.addEventListener("click",() => {
        matchUpdate = ball ;
        adv.value = ball.adversaire;
        date.value = ball.date;
        heure.value = ball.heure;
        lieu.value = ball.lieu;
      const radio = lieuMatch.querySelector(
        `input[name="lieu-match"][value="${ball.lieuMatch}"]`
      );
      if(radio){
        radio.checked = true ; 
      }
    ouvrirModaleUpdate();
    });

    //  suppression :
    const btnSupprimer = document.createElement("button");
    btnSupprimer.type = "button";
    btnSupprimer.textContent = "🗑️";

    btnSupprimer.addEventListener("click", () => {
        const confirmation = confirm("Voulez-vous vraiment supprimer ce match ?");
        if(confirmation){
            supprimerMatch(ball);
            refreshLocalStorageMatch();
            carte.remove();
             messageshow("Match supprimé avec succès !", "succes");
        }
    });
    

    carte.append(carteTime, infoMT, btnModifier, btnSupprimer);

    containir.append(carte);
}

// Ajout du match
export function ajoutMatch(event) {

    event.preventDefault();
    const modification = matchUpdate !== null;

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
    if(!modification){
        ajouterMatch(ball);
    }else{
        const index = match.indexOf(matchUpdate);
        if(index !== -1){
            match[index] = ball
        }
        matchUpdate = null ;
    }

    refreshLocalStorageMatch();
containir.innerHTML = "";

    match.forEach(function(ball) {
        afficherMatch(ball);
    });
    fermerModale();

if (modification) {
    messageshow("Match modifié avec succès !", "succes");
} else {
    messageshow("Match ajouté avec succès !", "succes");
}
}

export function ajoutMatchInit() {
    ajoutBtn.addEventListener("click", ajoutMatch);
}
refreshMatch();

match.forEach(function(ball) {
    afficherMatch(ball);
});
ajoutMatchInit();
