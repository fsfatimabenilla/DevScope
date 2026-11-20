
import { githubProfile } from "../api/github.js";
import { mockapi , updateDevelopper , deleteDevelopper } from "../api/mackapi.js";
import { profile , totalDevlopers } from "./donnees-initiales.js";
import { searchFiltre , initRecherche } from "./search.js";

const STATUTS = [
    "A contacter",
    "En cours",
    "Accepté",
    "Refusé"
];
let timeDelete ;


async function affichageUser() {
    try {
        const dev = await mockapi();

        totalDevlopers.textContent = `${dev.length} Devlopers`

        profile.innerHTML = "";

        const existDev = [];
        const resultat = searchFiltre(dev);
        if(resultat.length === 0){
            const message = document.createElement("p");
            message.className = "py-10 text-center text-red-600 font-semibold"
            message.textContent = "Aucun user trouvé.";
            profile.append(message);
            return ;
        }

        for(const data of resultat) {
            if(existDev.includes(data.login)){
                continue;
            }
            existDev.push(data.login);

            const carte = document.createElement("article");
            carte.className = "flex flex-col gap-5 rounded-2xl border border-rose-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center";

            const avatar = document.createElement("img");
            avatar.src = data.avatar_url;
            avatar.alt = `Avatar de ${data.name}`;
            avatar.className = "h-20 w-20 rounded-full border-4 border-rose-50 object-cover";

            const info = document.createElement("div");
            info.className = "min-w-0 flex-1";

            const name = document.createElement("h3");
            name.textContent = data.name;
            name.className = "text-lg font-bold text-rose-900";

            const rating = document.createElement("p");
            rating.textContent = `⭐ ${data.rating || 0}/5`;
            rating.className = "mt-2 text-sm text-slate-600";

            const status = document.createElement("p");
            status.textContent = data.statuts || "A contacter";
            status.className = "mt-2 text-sm font-semibold text-rose-500";

            const note = document.createElement("p");
            note.textContent = data.noteInterne || "Aucune note";
            note.className = "mt-2 text-sm text-slate-500";

            const dateCreate = document.createElement("p");
            const userData = await githubProfile(data.login);
             if (userData && userData.created_at) {
                 const date = new Date(userData.created_at);
                 dateCreate.textContent =`Compte créé le : ${date.toISOString().slice(0, 10)}`;
         } else {
        dateCreate.textContent = "Date non disponible";
          }
            dateCreate.className = "mt-2 text-sm text-slate-500";

            const action = document.createElement("div");
            action.className = "flex flex-wrap gap-2";

            const update = document.createElement("button");
            update.className = "rounded-xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-800"
            update.textContent = "Modifier";
            update.type = "button";

            const delet = document.createElement("Button");
            delet.className = "rounded-xl bg-rose-200 px-4 py-2 text-sm font-semibold text-rose-700"
            delet.textContent = "Supprimer";
            delet.type = "button";

            update.addEventListener("click", () => updateModale(data, carte));
            delet.addEventListener("click", () => deletModal(data,delet));


            const lien = document.createElement("a");
            lien.href = data.html_url;
            lien.textContent = "Voir le profil GitHub ";
            lien.className = "inline-block rounded-xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-200";


            info.append(name, rating, status, note, dateCreate, lien);
            action.append(update,delet)
            carte.append(avatar, info, action);
            profile.append(carte);
        }

    } catch (e) {
        console.log("Erreur:", e.message);
    }
}
initRecherche(affichageUser);
affichageUser();


// test u,d:

// async function testUpdate() {
//          const developer = {
//         statut: "Accepté",
//         rating: 4,
//         note: "Très bon profil"
//     };

//     const res = await updateDevelopper(1,developer);
//     console.log(res);
// }
// testUpdate();

// async function testDelete() {
    
//     const res = await deleteDevelopper(1);
//     console.log(res);
// }
// testDelete();



function updateModale(developer, carte) {

    const modal = document.createElement("div");
    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4";

    const contenu = document.createElement("form");
    contenu.className = "w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl";

    const title = document.createElement("h2");
    title.className = "text-xl font-bold text-rose-900";
    title.textContent = "Modifier ce développeur";

    // Statut
    const status = document.createElement("label");
    status.className = "block text-sm font-semibold text-slate-700";
    status.textContent = "Statut";

    const select = document.createElement("select");
    select.className = "w-full rounded-xl border border-rose-200 p-3";

    STATUTS.forEach(statut => {
        const option = document.createElement("option");
        option.value = statut;
        option.textContent = statut;
        select.append(option);
    });

    select.value = developer.statuts || "A contacter";
    status.append(select);

    // Note
    const note = document.createElement("label");
    note.className = "block text-sm font-semibold text-slate-700";
    note.textContent = "Note (1 à 5)";

    const inputNote = document.createElement("input");
    inputNote.type = "number";
    inputNote.min = "1";
    inputNote.max = "5";
    inputNote.required = true;
    inputNote.value = developer.rating || 1;
    inputNote.className = "mt-1 w-full rounded-xl border border-rose-200 p-3";

    note.append(inputNote);

    // Note interne
    const noteInterne = document.createElement("label");
    noteInterne.className = "block text-sm font-semibold text-slate-700";
    noteInterne.textContent = "Note interne";

    const textarea = document.createElement("textarea");
    textarea.value = developer.noteInterne || "";
    textarea.placeholder = "Ajouter une note interne...";
    textarea.className = "mt-1 w-full rounded-xl border border-rose-200 p-3";

    noteInterne.append(textarea);

    // Message
    const message = document.createElement("p");
    message.className = "text-sm text-red-500";

    // Buttons
    const cntBtn = document.createElement("div");
    cntBtn.className = "flex justify-end gap-2";

    const annuleBtn = document.createElement("button");
    annuleBtn.className = "rounded-xl border px-4 py-2";
    annuleBtn.textContent = "Annuler";
    annuleBtn.type = "button";

    const saveBtn = document.createElement("button");
    saveBtn.className = "rounded-xl bg-rose-500 px-4 py-2 text-white";
    saveBtn.textContent = "Enregistrer";
    saveBtn.type = "submit";

    cntBtn.append(annuleBtn, saveBtn);
    contenu.append(title, status, note, noteInterne, message, cntBtn);
    modal.append(contenu);
    document.body.append(modal);

    annuleBtn.addEventListener("click", () => modal.remove());
    contenu.addEventListener("submit", async event => {

        event.preventDefault();

        const valeur = Number(inputNote.value);

        if (!Number.isInteger(valeur) || valeur < 1 || valeur > 5) {
            message.textContent = "La note doit être comprise entre 1 et 5.";
            return;
        }

        saveBtn.disabled = true;
        saveBtn.textContent = "Enregistrement...";

        try {

            const infos = {
                statuts: select.value, rating: valeur, noteInterne: textarea.value.trim()
            };

            const resultat = await updateDevelopper(developer.id, infos);

            if (!resultat) {
                throw new Error("Modification échouée");
            }
            modal.remove();
            affichageUser();

        } catch (e) {
            console.log("Erreur :", e.message);
            message.textContent = "Erreur lors de la modification";
            saveBtn.disabled = false;
            saveBtn.textContent = "Enregistrer";
        }
    });
}


function deletModal(developer,carte){
    // modale
    const modal = document.createElement("div");
    modal.className = "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4";

    const contenu = document.createElement("div");
    contenu.className = "w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl";

    const title = document.createElement("h2");
    title.className = "text-xl font-bold text-rose-900";
    title.textContent = "Supprimer ce developpeur";

    const message = document.createElement("p");
    message.className = "text-sm text-slate-600"; 
    message.textContent = `Voulze-vous vraiment supprimer ${developer.name} ?`;

    // btn 
    
    // Buttons
    const cntBtn = document.createElement("div");
    cntBtn.className = "flex justify-end gap-2";

    const annuleBtn = document.createElement("button");
    annuleBtn.className = "rounded-xl border px-4 py-2";
    annuleBtn.textContent = "Annuler";
    annuleBtn.type = "button";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "rounded-xl bg-rose-500 px-4 py-2 text-white";
    deleteBtn.textContent = "Supprimer";
    deleteBtn.type = "submit";

    cntBtn.append(annuleBtn,deleteBtn);
    contenu.append(title, message, cntBtn);
    modal.append(contenu);
    document.body.append(modal);

    annuleBtn.addEventListener("click", () => modal.remove());
    
    deleteBtn.addEventListener("click", async event =>{
        event.preventDefault();
        modal.remove();

        // Message avec bouton Annuler
        const notification = document.createElement("div");
        notification.className = "fixed bottom-5 right-5 z-50 flex items-center gap-4 rounded-xl bg-slate-800 p-4 text-white shadow-lg";

        const texte = document.createElement("p");
        texte.textContent = `${developer.name} sera supprimé dans 5 secondes`;

        const btnAnnuler = document.createElement("button");
        btnAnnuler.className = "font-bold text-rose-300";
        btnAnnuler.textContent = "Annuler";
        btnAnnuler.type = "button";

         notification.append(texte, btnAnnuler);
        document.body.append(notification);


        deleteBtn.disabled = true;
        deleteBtn.textContent = "Suppression ...";

        timeDelete = setTimeout(async () => {
        try{
           const resultat = await deleteDevelopper(developer.id);

            if (!resultat) {
                throw new Error("Suppresion échouée");
            }
            modal.remove();
            affichageUser();
            notification.remove();

        } catch (e) {
            console.log("Erreur :", e.message);
            message.textContent = "Erreur lors de la suppression";
            deleteBtn.disabled = false;
            deleteBtn.textContent = "Supprimer";
        }
        
    },5000);

    btnAnnuler.addEventListener("click",()=>{
        clearTimeout(timeDelete);
        notification.remove();
    });
    
});

}



