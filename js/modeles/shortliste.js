
import { mockapi } from "../api/mackapi.js";
import { profile } from "./donnees-initiales.js";

async function affichageUser() {
    try {
        const dev = await mockapi();

        profile.innerHTML = "";

        dev.forEach(data => {
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
            note.textContent = data.note || "Aucune note";
            note.className = "mt-2 text-sm text-slate-500";

            const lien = document.createElement("a");
            lien.href = data.html_url;
            lien.textContent = "Voir le profil GitHub ";
            lien.className = "inline-block rounded-xl bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-800  hover:bg-rose-200";

            info.append(name, rating, status, note);
            carte.append(avatar, info, lien);
            profile.append(carte);
        });

    } catch (e) {
        console.log("Erreur:", e.message);
    }
}

affichageUser();
