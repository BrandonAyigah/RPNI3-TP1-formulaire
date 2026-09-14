import './style.css'

let messagesJSON:erreursJSON;

addEventListener("load",initialiser);
document.getElementById('suivant')?.addEventListener('click', ()=>{
    if(naviguerEtape(etapeActuelle) === true){
        naviguerEtape(++etapeActuelle); 
    }
   
});
document.getElementById('retour')?.addEventListener('click',()=>{
   naviguerEtape(--etapeActuelle);
});
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


async function obtenirMessages(): Promise<void> {
    const reponse = await fetch('objJSONMessages.json');
    messagesJSON = await reponse.json();
    console.log(messagesJSON);
}

obtenirMessages();

function initialiser(){
    console.log(messagesJSON);
    document.getElementById("etape2")?.classList.add("hidden");
    document.getElementById("etape3")?.classList.add("hidden");
    document.getElementById("bouton-submit")?.classList.add("hidden");
    document.getElementById('txt_etape2')?.classList.add('hidden');
    document.getElementById('txt_etape3')?.classList.add('hidden');

}

function naviguerEtape(etape:number){
    let etapeValide = false;
    
    switch(etape){
        
        case etape = 1:
            console.log('renvoie etape1');
            document.querySelector('span')?.classList.add('text-red-500');
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
            const idRadio = document.getElementById('montant') as HTMLInputElement;
            const validerRadio = validerChamp(idRadio);
            let radio = document.querySelector<HTMLInputElement>('input[name="montant"]:checked');
            let champMontant = document.getElementById('txt-montant') as HTMLInputElement;
            if(radio?.checked || champMontant.value.trim() !== ""){
                etapeValide = true;
                console.log("Le prix du don est bien choisit est " + etapeValide);
            }else{
                etapeValide = false;
                console.log("ne marche pas la verification donne: " + validerRadio);     
            }

            break;
        case etape = 2:
            console.log('renvoie etape 2');
            document.querySelector('span')?.classList.add('text-red-500');
            document.getElementById("etape1")?.classList.add('hidden')
            document.getElementById("etape2")?.classList.remove("hidden");
            document.getElementById('txt_etape1')?.classList.add('hidden');
            document.getElementById('txt_etape2')?.classList.remove('hidden');
            document.getElementById('txt_etape3')?.classList.add('hidden');
            document.getElementById("suivant")?.classList.remove("hidden");
            document.getElementById("bouton-submit")?.classList.add("hidden");
            document.getElementById("etape3")?.classList.add("hidden");

            //valider champ 
            const nomElement = document.getElementById('nom') as HTMLInputElement;
            const prenomElement = document.getElementById('prenom') as HTMLInputElement;
            const emailElement = document.getElementById('courriel') as HTMLInputElement;
            const telephoneElement = document.getElementById('numero') as HTMLInputElement;
            const paysElement = document.getElementById('pays') as HTMLInputElement;
            const villeElement = document.getElementById('ville') as HTMLInputElement;
            const adresseElement = document.getElementById('adresse1') as HTMLInputElement;
            const codePostalElement = document.getElementById('codePostal') as HTMLInputElement;


            const nomValide  = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerChamp(emailElement);
            const telephoneValide = validerChamp(telephoneElement);
            const paysValide = validerChamp(paysElement);
            const villeValide = validerChamp(villeElement);
            const adresseValide = validerChamp(adresseElement);
            const codePostalValide = validerChamp(codePostalElement);



            if(!nomValide || !prenomValide || !emailValide || !telephoneValide|| !paysValide || !villeValide|| !adresseValide|| !codePostalValide) {
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
            document.querySelector('span')?.classList.add('text-red-500');
            document.getElementById("etape1")?.classList.add("hidden");
            document.getElementById("etape2")?.classList.add("hidden");
            document.getElementById('txt_etape1')?.classList.add('hidden');
            document.getElementById('txt_etape2')?.classList.add('hidden');
            document.getElementById('txt_etape3')?.classList.remove('hidden');
            document.getElementById("etape3")?.classList.remove("hidden");
            document.getElementById("suivant")?.classList.add("hidden");
            document.getElementById("bouton-submit")?.classList.remove("hidden");

            //valider carte de credit 
            break;
        case etape = 4:
            console.log('renvoie etape 4');
            break;
        }
        return etapeValide
}


//validity
 function validerChamp(champ:HTMLInputElement):boolean{
    let valide = false;
    const id  = champ.id;
    const idErreur  = "erreur-" + id;
    const erreurElement = document.getElementById(idErreur) as HTMLSpanElement;

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






// function etape2(){
//     document.getElementById("suivant")?.removeEventListener("click",etape2);     
//     console.log("etape2");
//     document.getElementById("etape2")?.classList.remove("hidden");

// }

