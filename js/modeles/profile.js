
import { githubProfile } from "../api/github.js";
import { userName, login, bio } from "./donnees-initiales.js";

const username = new URLSearchParams(window.location.search).get("username");
async function affichageProfile() {
    try {
        const data = await githubProfile(username);
        userName.textContent = data.name || data.login;
        login.textContent = `@${data.login}`;
        bio.textContent = data.bio || "Aucune bio disponible";

    } catch (e) {
        console.log("Erreur:", e.message);
    }
}
affichageProfile();
