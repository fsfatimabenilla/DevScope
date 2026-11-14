export async function  mockapi() {
    try{
        const response =  await fetch(`https://6af58659f6270fa08d682dbf.mockapi.io/api/v1/developer`);
        if(!response.ok){
          throw new Error(`http erreur: ${response.status}`);
        }
        return await response.json();
    }catch (e) {
    console.error("Failed to fetch profile:", e.message);
    return null; 

    }
}

export async function ajoutDevelopper(developer) {

    try {
        const response = await fetch("https://6af58659f6270fa08d682dbf.mockapi.io/api/v1/developer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(developer)
        });
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const data = await response.json();
        console.log("Developer ajouté :", data);
        return data;
    } catch (e) {
        console.log("Erreur :", e.message);
    }
}
