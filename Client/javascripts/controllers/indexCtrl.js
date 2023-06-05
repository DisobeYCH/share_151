/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

let nomRub = [];

$(document).ready(function() {

    $.getScript("./javascripts/helpers/dateHelper.js", function() {
        console.log("dateHelper.js chargé !");
    });

    $.getScript("./javascripts/beans/rubrique.js", function() {
        console.log("rubrique.js chargé !");
    });
    $.getScript("./javascripts/beans/Upload.js", function() {
        console.log("upload.js chargé !");
    });
    $.getScript("./javascripts/helpers/alert.js", function() {
        console.log("alert.js chargé !");
    });
    $.getScript("./javascripts/services/servicesHttp.js", function() {
        console.log("servicesHttp.js chargé !");

        checkSession(sessionCallback, sessionCallbackError);
        chargerRubriques("home", chargerRubriquesSuccess, chargerRubriquesError);
    });

});
/**
Fonction appelée en cas de succès lors du chargement des rubriques.
Met à jour l'affichage des rubriques et des fichiers en fonction des données reçues.
@param {Object} data - Les données reçues en réponse à la requête AJAX.

@param {string} text - Le statut de la requête.

@param {Object} jqXHR - L'objet XMLHttpRequest utilisé pour effectuer la requête AJAX.
*/
function chargerRubriquesSuccess(data, text, jqXHR) {
    isHome = true;

    txt = "";
    $(data)
        .find("rubrique")
        .each(function() {
            var rubrique = new Rubrique();
            rubrique.setNom($(this).find("nom").text());
            rubrique.setPk($(this).find("id").text());
            rubrique.setFk($(this).find("fk").text());
            fk = rubrique.getFk();
            txt += "<div class='rubrique' onclick='afficherRubrique(" + rubrique.getPk() + ",\"" + rubrique.getNom() + "\")'>";
            txt += "<div >" + rubrique.getNom() + "</div>";
            txt += "</div>";
        });

    //CONFIG BUTTON RETURN
    if (fk != "" || txt == "") {
        isHome = false;
        document.getElementById("retour").innerHTML =
            "<div onclick='afficherRubriqueParent()' id='back'><span class='material-symbols-outlined'>  arrow_circle_left </span></div>";
    } else {
        isHome = true;
        if (checkSession(successCallbackSession, errorCallbackSession)) {

        }
        document.getElementById('title-upload').innerHTML = "";

        document.getElementById("retour").innerHTML = "";
    }

    document.getElementById("rubriques").innerHTML = txt;

    txt = "";
    nbrUpload = 0;
    $(data)
        .find("upload")
        .each(function() {
            nbrUpload++;
            var upload = new Upload();
            upload.setPk($(this).find("id").text());
            upload.setTitle($(this).find("title").text());
            upload.setDescription($(this).find("description").text());
            upload.setFile($(this).find("file").text());

            txt += "<div class='upload'>";
            txt += "<div class='titleUpload'>" + upload.getTitle() + "</div>";
            txt += "<div class='descr'>" + upload.getDescription() + "</div>";
            txt += "<div class='uploadFile'><a download='nom_du_fichier.pdf' href='data:application/octet-stream;base64, " + upload.getFile() + "'><span class='material-symbols-outlined downloadIcon'>download</span></a></div>";
            txt += "</div>";
        });
    if (nbrUpload == 0 && isHome == false) {
        document.getElementById("uploads").innerHTML = "";
        setError("il n'y a pas de documents dans cette rubrique", "documents");
    } else {
        delMsg("documents");


        document.getElementById("uploads").innerHTML = txt;
    }
}

function chargerRubriquesError(request, status, error) {
    setError("Erreur lors de la lecture des rubriques", "alert");
}
/**

Fonction qui affiche la rubrique sélectionnée.

Elle ajoute le nom de la rubrique au tableau "nomRub", puis affiche le nom de la rubrique dans la balise HTML "titleRubrique".

Elle met également à jour la balise HTML "title-upload".

Enfin, elle appelle la fonction "chargerRubriques" pour charger les publications de la rubrique sélectionnée.

@param {string} id - Identifiant de la rubrique sélectionnée.

@param {string} name - Nom de la rubrique sélectionnée.

@returns {void}
*/
function afficherRubrique(id, name) {
    nomRub.push(name);
    delMsg("alert");
    document.getElementById('titleRubrique').innerHTML = name;
    document.getElementById('title-upload').innerHTML = "publications";

    chargerRubriques(id, chargerRubriquesSuccess, chargerRubriquesError);
}
/**

Fonction qui affiche la rubrique parente.
Elle supprime le dernier élément du tableau "nomRub", puis affiche le titre de la rubrique parente dans la balise HTML "titleRubrique".
Enfin, elle appelle la fonction "afficherRubriqueParents" pour afficher les rubriques parentes.
@param {any} param - Paramètre inutilisé dans la fonction.
@returns {void}
*/
function afficherRubriqueParent(param) {
    nomRub.pop();
    document.getElementById('titleRubrique').innerHTML = nomRub[nomRub.length - 1];
    delMsg("alert");
    afficherRubriqueParents(chargerRubriquesSuccess, chargerRubriquesError);
}
/**

Fonction qui affiche un message de succès ou de bienvenue selon le résultat de la session.
@param {boolean} data - Résultat de la session, vrai si l'utilisateur est connecté, faux sinon.
@returns {void}
*/
function successCallbackSession(data) {
    console.log(data + "DATA")
    if (data == true) {
        document.getElementById('titleRubrique').innerHTML = "Home <div class='description-home'>Vous êtes <span style='color:var(--succes);'>connecté</span> sur ShareP, notre site de partage de fichiers PDF en ligne !<br><br> Téléchargez et partagez facilement vos fichiers PDF en <a href='view/add.html'>créant</a> des publications avec des titres et des descriptions. Si vous avez des questions, n'hésitez pas à nous <A HREF='mailto:marbaluv@gmail.com'>contacter</A>.</div>";
    } else {
        document.getElementById('titleRubrique').innerHTML = "Home <div class='description-home'>Bienvenue sur ShareP, notre site de partage de fichiers PDF en ligne !<br><br> Téléchargez et partagez facilement vos fichiers PDF en <a href='view/login.html'>créant</a> des publications avec des titres et des descriptions. Si vous avez des questions, n'hésitez pas à nous <A HREF='mailto:marbaluv@gmail.com'>contacter</A>.</div>";
    }
}

function errorCallbackSession(data) {
    console.log(data);
}