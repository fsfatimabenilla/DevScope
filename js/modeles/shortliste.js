
import { mockapi } from "../api/mackapi.js";
import { profile } from "./donnees-initiales.js";

async function affichageUser() {
    try {
        const dev = await mockapi();

        profile.innerHTML = "";

        dev.forEach(data => {

            const carte = document.createElement("div");
            carte.className = "bg-white border border-rose-200 rounded-xl p-4";

            const avatar = document.createElement("img");
            avatar.src = data.avatar_url;
            avatar.className = "w-24 h-24 rounded-full object-cover";

            const name = document.createElement("h3");
            name.textContent = data.name;

            const language = document.createElement("p");
            language.textContent = data.language;

            const rating = document.createElement("p");
            rating.textContent = `${data.rating}/5`;

            const status = document.createElement("p");
            status.textContent = data.statuts;

            const note = document.createElement("p");
            note.textContent = data.note;

            const lien = document.createElement("a");
            lien.href = data.html_url;
            lien.textContent = "Voir profil GitHub";
            lien.target = "_blank";

            carte.append(avatar, name, language, rating, status, note, lien);
            profile.append(carte);
        });

    } catch (e) {
        console.log("Erreur:", e.message);
    }
}

affichageUser();
