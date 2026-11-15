
import { githubProfile , githubDepots, githublanguage } from "../api/github.js";
import { userName, login, bio , repos, totalDepots,avater, ajoutDev, messageBtn ,ville,followers,following, lienGithub} 
  from "./donnees-initiales.js";
import { mockapi , ajoutDevelopper } from "../api/mackapi.js";

const username = new URLSearchParams(window.location.search).get("username");
async function affichageProfile() {
    try {
        const data = await githubProfile(username);

        avater.src = data.avatar_url;
        userName.textContent = data.name || data.login;
        login.textContent = `@${data.login}`;
        bio.textContent = data.bio || "Aucune bio disponible";
        ville.textContent = data.location || "Ville non spécifiée";
        followers.textContent = data.followers ?? 0;
        following.textContent = data.following ?? 0;
        lienGithub.href = data.html_url

          ajoutDev.addEventListener("click", async()=>{
    const nouveauDev = {
        name: data.name || data.login,
        login: data.login,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        language: "Non spécifié",
        rating: 0,
        statuts: "A contacter",
        note: "",
        created_at: data.created_at
    }
    try{
        const resultat = await ajoutDevelopper(nouveauDev);
        messageBtn.textContent = "Developper ajouter avec succés" ;
        console.log("Developer : " , resultat);
        window.location.href= "shortlist.html";

    }catch (e) {
        console.log(e.message);
    }
} );

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

        depots.forEach(async(data)=>{

            
            const languages = await  githublanguage(username,data.name);
            
            const article = document.createElement("div");
            article.className = " group flex flex-col justify-between rounded-2xl border border-rose-100 bg-white p-5 shadow-sm ";

            const name = document.createElement("h3");
            name.className = "text-lg font-bold text-rose-800";
            name.textContent = data.name;

            const description = document.createElement("p");
            description.className = "mt-3 min-h-12 text-sm  text-slate-500";
            description.textContent = data.description || "Aucune description disponible";

            const language = document.createElement("p");
             language.className = "inline-block w-fit rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700";
             language.textContent = Object.keys(languages).join(" | ") || "Langage non spécifié";

            article.append(name, description, language);

            repos.append(article);
          });

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


// async function ajoutDevelopper() {
//     const nouveauDev = {
//         name: "Fatima",
//         avatar_url: "https://i.pravatar.cc/150",
//         language: "JavaScript",
//         rating: 5,
//         statuts: "Actif",
//         note: " Developer"
//     };
//     try {
//         const response = await fetch("https://6af58659f6270fa08d682dbf.mockapi.io/api/v1/developer", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(nouveauDev)
//         });
//         if (!response.ok) {
//             throw new Error(`Erreur HTTP : ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Developer ajouté :", data);
//     } catch (e) {
//         console.log("Erreur :", e.message);
//     }
// }
// ajoutDevelopper();


