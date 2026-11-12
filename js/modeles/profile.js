
import { githubProfile , githubDepots, githublanguage } from "../api/github.js";
import { userName, login, bio , repos, totalDepots,avater } from "./donnees-initiales.js";
import { mockapi } from "../api/mackapi.js";

const username = new URLSearchParams(window.location.search).get("username");
async function affichageProfile() {
    try {
        const data = await githubProfile(username);

        avatar.src = data.avatar_url;
        userName.textContent = data.name || data.login;
        login.textContent = `@${data.login}`;
        bio.textContent = data.bio || "Aucune bio disponible";

    } catch (e) {
        console.log("Erreur:", e.message);
    }
}
affichageProfile();

async function affichageDepots() {
    try {
        const depots = await githubDepots(username);

        repos.innerHTML = "";
        totalDepots.textContent = `${depots.length} dépôts`;

        for(const data of depots){
            
            const languages = await githublanguage(username,data.name);
            
            const article = document.createElement("div");
            article.className = " bg-white border border-rose-200 rounded-xl p-4";

            const name = document.createElement("h3");
            name.className = "text-xl font-bold text-rose-800";
            name.textContent = data.name;

            const description = document.createElement("p");
            description.className = "text-gray-600 mt-3";
            description.textContent = data.description || "Aucune description disponible";

            const language = document.createElement("p");
             language.className = "text-rose-300 mt-3 font-semibold";
             language.textContent = Object.keys(languages).join(" | ") || "Langage non spécifié";

            article.append(name, description, language);

            repos.append(article);
        }

    } catch (e) {
        console.log("Erreur:", e.message);
    }
}

affichageDepots();

async function verifierMockapi() {
    const developer = await mockapi() ;
    console.log(developer);
}

verifierMockapi();


async function ajoutDevelopper() {
    const nouveauDev = {
        name: "Fatima",
        avatar_url: "https://i.pravatar.cc/150",
        language: "JavaScript",
        rating: 5,
        statuts: "Actif",
        note: " Developer"
    };
    try {
        const response = await fetch("https://6af58659f6270fa08d682dbf.mockapi.io/api/v1/developer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nouveauDev)
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Developer ajouté :", data);
    } catch (e) {
        console.log("Erreur :", e.message);
    }
}
ajoutDevelopper();
