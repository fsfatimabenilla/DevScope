
import { githubProfile , githubDepots, githublanguage } from "../api/github.js";
import { userName, login, bio , repos, totalDepots,avater, ajoutDev, messageBtn ,ville,followers,following, lienGithub , dateCreation, depotchercher, depotFiltrer} 
  from "./donnees-initiales.js";
import { mockapi , ajoutDevelopper } from "../api/mackapi.js";
import { getCache , setCache } from "./cache.js";

const username = new URLSearchParams(window.location.search).get("username");
let toutDepot = [];
let languageChoisi = "Tous";
let profil = null;

async function affichageProfile() {
    try {

        const key = "profile-" + username;
        // Vérifier si le Profile existe dans Cache
        let  data = getCache(key);
        if(data){
             console.log("Profil chargé depuis Cache");
        }else{
            // Récupérer profile depuis API
            data = await githubProfile(username);
            // Enregister profile dans cache
            setCache(key,data);
            console.log("Profil chargé depuis API");
        }

        avater.src = data.avatar_url;
        userName.textContent = data.name || data.login;
        login.textContent = `@${data.login}`;
        bio.textContent = data.bio || "Aucune bio disponible";
        ville.textContent = data.location || "Ville non spécifiée";
        followers.textContent = data.followers ?? 0;
        following.textContent = data.following ?? 0;
        lienGithub.href = data.html_url
        dateCreation.textContent = new Date(data.created_at).toLocaleDateString("fr-FR");

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
        const developers = await mockapi();
        // Vérifier léexistance du développeurs:
        const exist = developers.find(dev => dev.login === nouveauDev.login);
        if(exist){
            messageBtn.textContent = "Ce Developper est déja dans shortlist! "
            return ;
        }

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

async function affichageDepots() {
    try {
        const key = "depots-" + username;
        // Vérifier si les Dépôts existent dans Cache
        toutDepot = getCache(key);
        if(toutDepot){
             console.log("Dépôts chargé depuis Cache");
        }else{
            // Récupérer les Dépôts depuis API
            toutDepot = await githubDepots(username);
     
            if(!toutDepot){
                throw new Error("Dépôts introuvables");
            }
            // Récuperer languages de tous dépts en meme time
              const languages = await Promise.all(toutDepot.map(depot=> githublanguage(username, depot.name)));
                
            //   Ajout language pour chaque depot
            toutDepot.forEach((depot,index)=> {
                depot.languages = languages[index];
            });
             
            //  Enregister dépot et languages dans Cache
             setCache(key, toutDepot);
             console.log("Dépôts chargé depuis API");
        }

        repos.innerHTML = "";
        totalDepots.textContent = `${toutDepot.length} dépôts`;

        listeLanguage();
        searchFilre();


    } catch (e) {
        console.log("Erreur:", e.message);
    }

}


// chargement 
async function charge() {
    await Promise.all([
        affichageDepots(),
        affichageProfile(),
    ]);
}
charge();

async function verifierMockapi() {
    const developer = await mockapi() ;
    console.log(developer);
}

verifierMockapi();


// search an filtre :


function listeLanguage(){
    if(!depotFiltrer) return;
    const language = [...new Set(toutDepot.flatMap(depot => Object.keys(depot.languages || {})))];
    language.forEach(langage => {
        const option = document.createElement("option");
         option.value = langage;
        option.textContent = langage;
        depotFiltrer.append(option);
    });
}


function searchFilre(){
    const recherche = depotchercher.value.toLowerCase();

    const depotsFiltres = toutDepot.filter(data => {

        const nomCorrespond = data.name.toLowerCase().includes(recherche);

        const languageCorrespond =
            languageChoisi === "Tous" || Object.keys(data.languages || {}).includes(languageChoisi);

        return nomCorrespond && languageCorrespond;
    });

    repos.innerHTML = "";

    if (depotsFiltres.length === 0) {
        repos.textContent = "Aucun dépôt trouvé";
        return;
    }


      depotsFiltres.forEach(data =>{
            
            const article = document.createElement("div");
            article.className = " group flex flex-col justify-between rounded-2xl border border-rose-100 bg-white p-5 shadow-sm ";

            article.dataset.name = data.name.toLowerCase();
            article.dataset.language = data.language ;
            article.classList.add("depos-card");

            const name = document.createElement("h3");
            name.className = "text-lg font-bold text-rose-800";
            name.textContent = data.name;

            const description = document.createElement("p");
            description.className = "mt-3 min-h-12 text-sm  text-slate-500";
            description.textContent = data.description || "Aucune description disponible";

            const language = document.createElement("p");
             language.className = "inline-block w-fit rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700";
             language.textContent = Object.keys(data.languages || {}).join(" | ") || "Langage non spécifié";

            article.append(name, description, language);

            repos.append(article);
          });

}

if (depotchercher) {
    depotchercher.addEventListener("input", searchFilre);
}

if (depotFiltrer) {
    depotFiltrer.addEventListener("change", () => {
        languageChoisi = depotFiltrer.value;
        searchFilre();
    });
}

