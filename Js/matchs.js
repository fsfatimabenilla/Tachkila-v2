
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
    ouvrirModaleUpdate,
    rechercheInput,
    ouvrirModaleScore,
    fermerModaleScore,
    scoreEquipe,
    scoreAdv,
    messageScore,
    formulaireSc,
    score
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

const filtre = document.querySelector("#filtre");
let filtreChoisi = "Tous";

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

    const action = document.createElement("div");
    action.className = "flex  items-center  gap-2"
    // vérification si le match est passé :
    const dateMatch = new Date(`${ball.date}T${ball.heure}`).getTime();
    if(Date.now() > dateMatch){
            console.log("Match passé :", ball.adversaire);

        const btnScore = document.createElement("button");
        btnScore.type = "button";
        btnScore.textContent = "Saisir le score";
        btnScore.className = "bg-blue-600 text-white font-semibold py-2 px-3 rounded-xl";
        btnScore.addEventListener("click",function(){
        ouvrirModaleScore(ball);
    });

        action.append(btnScore);
    }
        carte.append(carteTime, infoMT,action, btnModifier, btnSupprimer);
    

    containir.append(carte);

    
}

export function searchNDfiltre(){
    const recherche = rechercheInput.value.trim().toLowerCase();
    const choiFiltre = match.filter(function(ball){
        const dateMatch = new Date (`${ball.date}T${ball.heure}`).getTime();
        const Now = Date.now();
        const matchFiltr = filtreChoisi === "Tous" || (filtreChoisi ===  "A-venir" && dateMatch>Now)||
         (filtreChoisi === "Jouee" && dateMatch <= Now);
         const matchSearch = ball.adversaire.toLowerCase().includes(recherche);
         return matchFiltr && matchSearch;
    });

    containir.innerHTML ="";
    if(choiFiltre.length === 0){
        const message = document.createElement("p");
        message.textContent ="Aucun match trouvé !";
        message.className = "text-center text-white text-lg p-4";
        containir.append(message);
        return;
    }

    choiFiltre.forEach(function(ball){
        afficherMatch(ball)
    });
}
filtre.addEventListener("click", function(event){
    const btn = event.target.closest("button[data-poste]");
    if(!btn) return;
    filtreChoisi = btn.dataset.poste;
    filtre.querySelectorAll("button").forEach(function(btn){
        btn.classList.remove("bg-green-500");
        btn.classList.add("hover:bg-slate-700");
    });
    btn.classList.add("bg-green-500");
    btn.classList.remove("hover:bg-slate-700");
    searchNDfiltre();
});
rechercheInput.addEventListener("input",searchNDfiltre);

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

   searchNDfiltre();
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

searchNDfiltre();
ajoutMatchInit();

export function enregistreScore(event){
    event.preventDefault();
    const nosScore = Number(scoreEquipe.value);
    const scAdversaire = Number(scoreAdv.value);
    if(nosScore <0 || scAdversaire <0 || scoreEquipe.value === "" || scoreAdv.value === ""){
        messageScore.textContent = "Ecrire un score valide !";
        messageScore.className = "text-red-500 mt-3 text-sm";
        return;
    }
    score.scoreEquipe = nosScore;
    score.scoreAdv = scAdversaire;

    refreshLocalStorageMatch();
    fermerModaleScore();
    searchNDfiltre();
    messageshow("Score est enregistrée avec succès !", "succes");
}
formulaireSc.addEventListener("submit",enregistreScore);
