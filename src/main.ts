import './style.css';

let messagesJSON:erreursJSON;
addEventListener("load",initialiser);

document.getElementById('suivant')?.addEventListener('click', ()=>{
     if(validerEtape(etapeActuelle) === true){
         naviguerEtape(++etapeActuelle); 
     }
   
});

document.getElementById('retour')?.addEventListener('click',()=>{
   naviguerEtape(--etapeActuelle);
});

//blur ou change pour les input 
let etapeActuelle = 1;
let arrResume = {
    "don":{
        "prix": "",
    },
    "information":{
        "nom": "",
        "prenom" : "",
        "courriel": "",
        "pays" : "",
        "ville": "",
        "codePostal": "",
        "province": "",
        "adresse1": "",
        "numero": "",
    },
    "paiement":{
        "nomCarte": "",
        "carteNumero": "",
        "dateExpiration": "",
        "code": "",
    }

}

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
    document.getElementById("retour")?.classList.add("hidden");
    document.getElementById("formulaire")?.setAttribute('noValidate','');
    document.getElementById("etape3")?.classList.add("hidden");
    document.getElementById("etape4")?.classList.add("hidden");
    document.getElementById('txt_etape1')?.classList.add('border-red-500');
    document.getElementById("bouton-submit")?.classList.add("hidden");
}

function naviguerEtape(etape:number){
    
    switch(etape){
        case etape = 1:
            console.log('renvoie etape1');
            document.getElementById("retour")?.classList.add("hidden");
            document.getElementById("etape1")?.classList.remove("hidden");
            document.getElementById("etape2")?.classList.add("hidden");
            document.getElementById("etape3")?.classList.add("hidden");
            document.getElementById("etape4")?.classList.add("hidden");
            document.getElementById('txt_etape1')?.classList.add('border-red-500');
            document.getElementById("bouton-submit")?.classList.add("hidden");
            document.getElementById("suivant")?.classList.remove("hidden");

            break;
        case 2:
            console.log('renvoie etape 2');
            document.getElementById("retour")?.classList.remove("hidden");
            document.getElementById('txt_etape1')?.classList.remove('border-red-500');
            document.getElementById('txt_etape1')?.classList.add('bg-red-500');
            document.getElementById('txt_etape2')?.classList.add('border-red-500');
            document.getElementById("etape1")?.classList.add('hidden')
            document.getElementById("etape2")?.classList.remove("hidden");

            document.getElementById("suivant")?.classList.remove("hidden");
            document.getElementById("bouton-submit")?.classList.add("hidden");
            document.getElementById("etape3")?.classList.add("hidden");

            break;

        case 3:
            console.log('renvoie etape 3');
            document.getElementById("retour")?.classList.remove("hidden");
            document.getElementById('txt_etape1')?.classList.remove('border-red-500');
            document.getElementById('txt_etape1')?.classList.add('bg-red-500');
            document.getElementById('txt_etape2')?.classList.remove('border-red-500');
            document.getElementById('txt_etape2')?.classList.add('bg-red-500');
            document.getElementById('txt_etape3')?.classList.add('border-red-500');
            document.getElementById("etape1")?.classList.add("hidden");
            document.getElementById("etape2")?.classList.add("hidden");
            document.getElementById("etape3")?.classList.remove("hidden");

            break;
        case  4:
            console.log('renvoie etape 4');
            document.getElementById("retour")?.classList.remove("hidden");
            document.getElementById('txt_etape1')?.classList.remove('border-red-500');
            document.getElementById('txt_etape1')?.classList.add('bg-red-500');
            document.getElementById('txt_etape2')?.classList.remove('border-red-500');
            document.getElementById('txt_etape2')?.classList.add('bg-red-500');
            document.getElementById('txt_etape3')?.classList.remove('border-red-500');
            document.getElementById('txt_etape3')?.classList.add('bg-red-500');
            document.getElementById('txt_etape4')?.classList.add('border-red-500');
            document.getElementById("etape1")?.classList.add("hidden");
            document.getElementById("etape2")?.classList.add("hidden");
            document.getElementById("etape3")?.classList.add("hidden");
            document.getElementById("etape4")?.classList.remove("hidden");

            // Retroaction pour les dons
            const refUlDon = document.getElementById('liste_don');
            const refLiDon = document.createElement('li') as HTMLElement;
            refLiDon.innerText = 'Le prix du don est de : ' + arrResume['don']['prix'] ;
            refUlDon?.append(refLiDon);

            //retroaction des informations
            //nom
            const refUlInfo = document.getElementById('liste_information');
            const refLiNom = document.createElement('li') as HTMLElement;
            refLiNom.innerText = 'Nom : ' + arrResume['information']['nom'] ;
            refUlInfo?.append(refLiNom);

            //prenom
            const refLiPrenom = document.createElement('li') as HTMLElement;
            refLiPrenom.innerText = 'Prenom: ' + arrResume['information']['prenom'] ;
            refUlInfo?.append(refLiNom);

            //adresse
            const refLiCourriel = document.createElement('li') as HTMLElement;
            refLiCourriel.innerText = 'Courriel: ' + arrResume['information']['courriel'] ;
            refUlInfo?.append(refLiCourriel);

            //pays
            const refLiPays = document.createElement('li') as HTMLElement;
            refLiPays.innerText = 'Pays: ' + arrResume['information']['pays'] ;
            refUlInfo?.append(refLiPays);
            
            //Ville
            const refLiVille = document.createElement('li') as HTMLElement;
            refLiVille.innerText = 'Ville: ' + arrResume['information']['ville'] ;
            refUlInfo?.append(refLiVille);

            //code postal
            const refLiPostal = document.createElement('li') as HTMLElement;
            refLiPostal.innerText = 'Code postal: ' + arrResume['information']['codePostal'] ;
            refUlInfo?.append(refLiPostal);

            //province
            const refLiProvince = document.createElement('li') as HTMLElement;
            refLiProvince.innerText = 'Province: ' + arrResume['information']['province'] ;
            refUlInfo?.append(refLiProvince);

            //adresse civique 
            const refLiAdresse = document.createElement('li') as HTMLElement;
            refLiAdresse.innerText = 'Adresse civique: ' + arrResume['information']['adresse1'] ;
            refUlInfo?.append(refLiAdresse);

            //Numero de telephone
            const refLiNumero = document.createElement('li') as HTMLElement;
            refLiNumero.innerText = 'Numero de telephone: ' + arrResume['information']['numero'] ;
            refUlInfo?.append(refLiNumero);

            //Mode de paiement 
            //Nom de la carte 
            const refUlPaiement = document.getElementById('liste_paiement');
            const refLiNomCarte = document.createElement('li') as HTMLElement;
            refLiNomCarte.innerText = 'Nom sur la carte : ' + arrResume['paiement']['nomCarte'] ;
            refUlPaiement?.append(refLiNomCarte); 
            

            //Nom de la carte 
            const refLiNumCarte = document.createElement('li') as HTMLElement;
            refLiNumCarte.innerText = 'Numero de la carte : ' + arrResume['paiement']['carteNumero'] ;
            refUlPaiement?.append(refLiNomCarte);

            //Nom de la carte 
            const refLiExpCarte = document.createElement('li') as HTMLElement;
            refLiExpCarte.innerText = "Date d'expiration : " + arrResume['paiement']['dateExpiration'] ;
            refUlPaiement?.append(refLiExpCarte);

            //Nom de la carte 
            const refLiCode = document.createElement('li') as HTMLElement;
            refLiCode.innerText = 'Code de la carte: ' + arrResume['paiement']['code'] ;
            refUlPaiement?.append(refLiCode);
            break;
        }
}


function validerEtape(etape:number){
    let etapeValide = false;
    
    switch(etape){
        case 1:

        // Effacer tous les messages d<erreur
            console.log('debut de la validation');
            //Validation du bouton radio
            const idRadio = document.getElementById('montant') as HTMLInputElement;
            const validerRadio = validerChamp(idRadio);
            let radio = document.querySelector('input[name="montant"]:checked') as HTMLInputElement;
            let champMontant = document.getElementById('txt-montant') as HTMLInputElement;
            arrResume['don']['prix'] = radio.value;
            if(radio.value.trim() == ""){
                console.log('lalala');
            }
            if(radio?.checked || champMontant.value.trim() !== ""){
                etapeValide = true;
                console.log("Le prix du don est bien choisit est " + radio?.value);
            }else{
                etapeValide = false;
                console.log("ne marche pas la verification donne: " + validerRadio);     
            }

            break;
        case 2:
            console.log('renvoie valider etape 2');
            //valider champ 
            const nomElement = document.getElementById('nom') as HTMLInputElement;
            arrResume['information']['nom'] = nomElement.value;
            const prenomElement = document.getElementById('prenom') as HTMLInputElement;
            arrResume['information']['prenom'] = prenomElement.value;
            const emailElement = document.getElementById('courriel') as HTMLInputElement;
            arrResume['information']['courriel'] = emailElement.value;
            const telephoneElement = document.getElementById('numero') as HTMLInputElement;
            arrResume['information']['numero'] = telephoneElement.value
            const paysElement = document.getElementById('pays') as HTMLInputElement;
            arrResume['information']['pays'] = paysElement.value;
            const villeElement = document.getElementById('ville') as HTMLInputElement;
            arrResume['information']['ville'] = villeElement.value;
            const adresseElement = document.getElementById('adresse1') as HTMLInputElement;
            arrResume['information']['adresse1'] = adresseElement.value;
            const codePostalElement = document.getElementById('codePostal') as HTMLInputElement;
            arrResume['information']['codePostal'] = codePostalElement.value;
            const provinceElement = document.getElementById('province') as HTMLInputElement;
            arrResume['information']['province'] = provinceElement.value;



            const nomValide  = validerChamp(nomElement);
            const prenomValide = validerChamp(prenomElement);
            const emailValide = validerChamp(emailElement);
            const telephoneValide = validerChamp(telephoneElement);
            const paysValide = validerChamp(paysElement);
            const villeValide = validerChamp(villeElement);
            const adresseValide = validerChamp(adresseElement);
            const provinceValide = validerChamp(provinceElement);
            const codePostalValide = validerChamp(codePostalElement);

            if(!nomValide || !prenomValide || !emailValide || !telephoneValide|| !paysValide || !villeValide|| !adresseValide|| !codePostalValide || !provinceValide) {
                etapeValide = false;
                console.log("non valide")
            }
            else{
                etapeValide = true;
                console.log("yesssss")
            }
            break;
        case etape = 3:
            console.log('renvoie valider etape 3');
            //valider carte de credit 
            const creditElement = document.getElementById('nomCarte') as HTMLInputElement;
            arrResume['paiement']['nomCarte'] = creditElement.value;
            const numeroElement = document.getElementById('carteNumero') as HTMLInputElement;
            arrResume['paiement']['carteNumero'] = numeroElement.value;
            const expirationElement = document.getElementById('dateExpiration') as HTMLInputElement;
            arrResume['paiement']['dateExpiration'] = creditElement.value;
            const codeElement = document.getElementById('code') as HTMLInputElement;
            arrResume['paiement']['dateExpiration'] = codeElement.value;

            const creditValide  = validerChamp(creditElement);
            const numeroValide = validerChamp(numeroElement);
            const expirationValide = validerChamp(expirationElement);
            const codeValide = validerChamp(codeElement);

            if( !creditValide || !numeroValide|| !expirationValide|| !codeValide){
                etapeValide = false;
            }else{
                etapeValide = true;
            }
            break;
        case etape = 4:
            console.log('renvoie etape 4');
            console.log(arrResume['information']['nom']);          
           

            // //Retroaction pour le nom
            // const refUlInfo = document.getElementById('liste_information');
            // const refLiNom = document.createElement('li') as HTMLElement;
            // const refNom = document.getElementById('nom') as HTMLInputElement;
            // refLiNom.innerText = 'Nom: ' + refNom.value;
            // refUlInfo?.append(refLiNom);
            // //Retroaction prenom
            // const refLiPrenom = document.createElement('li') as HTMLElement;
            // const refPrenom = document.getElementById('prenom') as HTMLInputElement;
            // refLiPrenom.innerText = 'Prenom: ' + refPrenom.value;
            // refUlInfo?.append(refLiPrenom);
            // //retroaction courriel
            // const refLiCourriel = document.createElement('li') as HTMLElement;
            // const refCourriel= document.getElementById('courriel') as HTMLInputElement;
            // refLiCourriel.innerText = 'Courriel: ' + refCourriel.value;
            // refUlInfo?.append(refLiCourriel);
            // //retroaction pays 
            // const refLiPays = document.createElement('li') as HTMLElement;
            // const refPays = document.getElementById('pays') as HTMLInputElement;
            // refLiPays.innerText = 'Pays: ' + refPays.value;
            // refUlInfo?.append(refLiPays);
            // //retroaction ville
            // const refLiVille = document.createElement('li') as HTMLElement;
            // const refVille = document.getElementById('ville') as HTMLInputElement;
            // refLiVille.innerText = 'Ville: ' + refVille.value;
            // refUlInfo?.append(refLiVille);
            // //retroaction code postal
            // const refLiPostal = document.createElement('li') as HTMLElement;
            // const refPostal = document.getElementById('codePostal') as HTMLInputElement;
            // refLiPays.innerText = 'Code postal: ' + refPostal.value;
            // refUlInfo?.append(refLiPostal);
            // //rectroaction province 
            // const refLiProvince = document.createElement('li') as HTMLElement;
            // const refProvince = document.getElementById('province') as HTMLInputElement;
            // refLiProvince.innerText = 'Province: ' + refProvince.value;
            // refUlInfo?.append(refLiProvince);
            // //retroaction adresse civique 
            // const refLiAdresse = document.createElement('li') as HTMLElement;
            // const refAdresse = document.getElementById('adresse1') as HTMLInputElement;
            // refLiAdresse.innerText = 'Adresse civique 1: ' + refAdresse.value;
            // refUlInfo?.append(refLiPays);

            // const refUlPaiement = document.getElementById('liste_paiement');
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

