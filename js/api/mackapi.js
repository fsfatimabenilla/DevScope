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