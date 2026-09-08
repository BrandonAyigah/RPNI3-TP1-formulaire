import './style.css'
addEventListener("load",initialiser);
document.getElementById('suivant')?.addEventListener('click', ()=>{
    naviguerEtape(++etapeActuelle);
});
document.getElementById('retour')?.addEventListener('click',()=>{
   naviguerEtape(--etapeActuelle);
});
addEventListener('change',validerEtape)
//blur ou change pour les input 
let etapeActuelle = 1;

interface messageErreur {
    vide?: string;
    pattern?: string;
    type?: string;
}

interface erreursJSON {
    [fieldName: string]: messageErreur;
}

let messagesJSON:erreursJSON;
async function obtenirMessages(): Promise<void> {
    const reponse = await fetch('objJSONMessages.json');
    messagesJSON = await reponse.json();
    console.log(messagesJSON);
}


function initialiser(){
    console.log("initialisation");
    
    document.getElementById("etape2")?.classList.add("hidden");
    document.getElementById("etape3")?.classList.add("hidden");
    document.getElementById("bouton-submit")?.classList.add("hidden");
    document.getElementById('txt_etape2')?.classList.add('hidden');
    document.getElementById('txt_etape3')?.classList.add('hidden');

    obtenirMessages();
}

function naviguerEtape(etape:number){
    let etapeValide = false;
    
    switch(etape){
        case etape = 1:
            console.log('renvoie etape1');
            document.getElementById("etape1")?.classList.remove("hidden");
            document.getElementById("etape2")?.classList.add("hidden");
            document.getElementById("etape3")?.classList.add("hidden");
            document.getElementById('txt_etape1')?.classList.remove('hidden');
            document.getElementById('txt_etape2')?.classList.add('hidden');
            document.getElementById('txt_etape3')?.classList.add('hidden');
            document.getElementById("bouton-submit")?.classList.add("hidden");
            document.getElementById("suivant")?.classList.remove("hidden");

            console.log('debut de la validation');
            //Validation du bouton radio
            let radio = document.querySelector<HTMLInputElement>('input[name="montant"]:checked');
            let champMontant = document.getElementById('txt-montant') as HTMLInputElement;
            if(radio?.checked || champMontant.value.trim() !== ""){
                console.log("Le prix du don est bien choisit");  
            }else{
                console.log("ne marche pas "+ radio?.value);
            }
            break;
        case etape = 2:
            console.log('renvoie etape 2');
            document.getElementById("etape1")?.classList.add('hidden')
            document.getElementById("etape2")?.classList.remove("hidden");
            document.getElementById('txt_etape1')?.classList.add('hidden');
            document.getElementById('txt_etape2')?.classList.remove('hidden');
            document.getElementById('txt_etape3')?.classList.add('hidden');
            document.getElementById("suivant")?.classList.remove("hidden");
            document.getElementById("bouton-submit")?.classList.add("hidden");
            document.getElementById("etape3")?.classList.add("hidden");

            const nomElement = document.getElementById('nom') as HTMLInputElement;
            const prenomElement = document.getElementById('prenom') as HTMLInputElement;
            const emailElement = document.getElementById('courriel') as HTMLInputElement;
            const telephoneElement = document.getElementById('numero') as HTMLInputElement;

            const nomValide  = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerChamp(emailElement);
            const telephoneValide = validerChamp(telephoneElement);

            if(!nomValide || !prenomValide || !emailValide || !telephoneValide) {
                etapeValide = false;
                console.log("non valide")
            }
            else{
                etapeValide = true;
                console.log("yesssss")
            }
            break;
        case etape = 3:
            console.log('renvoie etape 3');
            document.getElementById("etape1")?.classList.add("hidden");
            document.getElementById("etape2")?.classList.add("hidden");
            document.getElementById('txt_etape1')?.classList.add('hidden');
            document.getElementById('txt_etape2')?.classList.add('hidden');
            document.getElementById('txt_etape3')?.classList.remove('hidden');
            document.getElementById("etape3")?.classList.remove("hidden");
            document.getElementById("suivant")?.classList.add("hidden");
            document.getElementById("bouton-submit")?.classList.remove("hidden");

            break;
        case etape = 4:
            console.log('renvoie etape 4');
            break;
        }
}


//validity
 function validerChamp(champ:HTMLInputElement):boolean{
    let valide = false;
    const id  = champ.id;
    const idErreur  = "erreur-" + id;
    const erreurElement = document.getElementById(idErreur) as HTMLDivElement;

    console.log('valider champ', champ.validity);

    if (champ.validity.valueMissing && messagesJSON[id].vide) {
        console.log('erreur', id);
        
        valide = false;
        erreurElement.innerText = messagesJSON[id].vide;
    } 
    else if (champ.validity.typeMismatch && messagesJSON[id].type) {
        // Type de données incorrect (email, url, tel, etc.)
        valide = false;
        erreurElement.innerText = messagesJSON[id].type;
    } 
    else if (champ.validity.patternMismatch && messagesJSON[id].pattern) {
        // Ne correspond pas au pattern regex défini
        valide = false;
        erreurElement.innerText = messagesJSON[id].pattern;
    }
    else {
        // La validation n'a pas d'erreur, donc on assigne la variable vraie
        valide = true;
    }

    return valide;

 }

 function validerEtape(){
    console.log('debut de la validation');
    //Validation du bouton radio
     let radio = document.querySelector<HTMLInputElement>('input[name="montant"]:checked');
     let champMontant = document.getElementById('txt-montant') as HTMLInputElement;
     if(radio?.checked || champMontant.value.trim() !== ""){
        console.log("Le prix du don est bien choisit");  
    }else{
        console.log("ne marche pas "+ radio?.value);
    }


    //Validation du 
 };






// function etape2(){
//     document.getElementById("suivant")?.removeEventListener("click",etape2);     
//     console.log("etape2");
//     document.getElementById("etape2")?.classList.remove("hidden");

// }

