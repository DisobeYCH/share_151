/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

var fkRub;
$(document).ready(function() {
    $.getScript("../javascripts/services/servicesHttp.js", function() {
        console.log("servicesHttp.js chargé !");
        allUpload();
        document.getElementById("modal").style.display = "none";
    });

    $.getScript("../javascripts/beans/Upload.js", function() {
        console.log("Upload.js chargé !");
    });
    $.getScript("../javascripts/beans/rubrique.js", function() {
        console.log("rubrique.js chargé !");
    });
    $.getScript("../javascripts/helpers/alert.js", function() {
        console.log("alert.js chargé !");
    });


});

function successCallback(data) {
    txt = "";
    $(data)
        .find("upload")
        .each(function() {
            var upload = new Upload();
            upload.setTitle($(this).find("title").text());
            upload.setPk($(this).find("id").text());
            upload.setFkRubrique($(this).find("fkRubrique").text());
            upload.setDescription($(this).find("description").text());

            txt += "<div class='upload'>";
            txt += "<div class='titleUpload'>" + upload.getTitle() + "</div>";
            txt += "<div class='descr'>" + upload.getDescription() + "</div>";
            txt += "<div class='uploadFile uploadEdition'>";
            txt += "<div onclick='deleteUpload(" + upload.getPk() + ")'><span class='material-symbols-outlined downloadIcon'>delete</span></div>";
            txt += "<div id='modifyUpload' onclick='modifyUpload(" + upload.getPk() + ',"' + upload.getTitle() + '", ' + upload.getFkRubrique() + ',"' + upload.getDescription() + '"' + ")'><span class='material-symbols-outlined downloadIcon'>edit</span></div></div></div>";
            txt += "</div>";

            txt += "</div>";
        });

    document.getElementById("uploads").innerHTML = txt;

}
/**

Modifie un upload avec les nouvelles informations.

@param {number} id - L'ID de l'upload à modifier.

@param {string} title - Le titre de l'upload.

@param {number} fk - La clé étrangère de la rubrique de l'upload.

@param {string} descr - La description de l'upload.

@returns {void}
*/
function modifyUpload(id, title, fk, descr) {

    document.getElementById("modal").style.display = "block";


    document
        .getElementById("modal-back")
        .addEventListener("click", function(e) {
            document.getElementById("modal").style.display = "none";
        });
    let codeJS = "";
    codeJS += '<div class="container-title">';
    codeJS += '    <div class="col">';
    codeJS += '        Modifier un document';
    codeJS += '    </div>';
    codeJS += '</div>';
    codeJS += '<div id="alert"></div>';
    codeJS += '<div class="container-champ">';
    codeJS += '    <div class="col-champ">';
    codeJS += '        <input class="input-champ" type="text" id="titrePostModif" name="titrePostModif">';
    codeJS += '    </div>';
    codeJS += '    <div class="col-champ">';
    codeJS += '        <textarea class="input-champ" type="textarea" rows="1" id="descriptionModif" name="descriptionModif" placeholder="Description"></textarea>';
    codeJS += '    </div>';
    codeJS += '    <div class="col-champ">';
    codeJS += '        <select class=" input-champ select-rubriques" id="selectRubriquePostModif" name="selectRubriquePost"></select>';
    codeJS += '    </div>';
    codeJS += '    <div class="col-champ">';
    codeJS += '        <input class="button-champ" type="file" id="fileInput">';
    codeJS += '    </div>';
    codeJS += '</div>';
    codeJS += '<div class="col-champ">';
    codeJS += '    <input class="button-champ" id="formModifPost" value="Envoyer" type="submit">';
    codeJS += '    <div class="col-champ">';
    codeJS += '        <a href="#" id="modal-close">Fermer</a>';
    codeJS += '    </div>';
    codeJS += '</div>';
    document.getElementById("modal-container").innerHTML = codeJS;
    document
        .getElementById("modal-close")
        .addEventListener("click", function(e) {
            console.log("close");
            document.getElementById("modal").style.display = "none";
        });

    document.getElementById("alert").style.display = "none";

    title = document.getElementById("titrePostModif").value = title;
    description = document.getElementById("descriptionModif").value = descr;
    fkRub = fk;
    afficherToutesLesRubriques(successList, errorCallback);


    var modifPost = document.getElementById("formModifPost");
    modifPost.addEventListener("click", function() {

        var titre = document.getElementById("titrePostModif").value;
        var description = document.getElementById("descriptionModif").value;
        var selectElement = document.getElementById("selectRubriquePostModif");
        var selectedValueModif = selectElement.value;
        var inputElement = document.getElementById("fileInput");
        var file = inputElement.files[0];
        if (file == null) {
            file = "";
            console.log(id);

            modifieUploads(id, titre, description, selectedValueModif, file, allUpload, errorCallback);

        } else {
            encodeFileToBase64(file, function(base64String) {
                modifieUploads(id, titre, description, selectedValueModif, base64String, allUpload, errorCallback);
            });
        }
    });

}
/**

Encodage d'un fichier en base64.
@param {File} file - Le fichier à encoder en base64.
@param {function} callback - La fonction appelée une fois que le fichier est encodé en base64.
@throws {string} - Si le fichier est nul ou inexistant, une erreur est lancée avec le message "Veuillez ajouter un fichier".
@returns {void}
*/
function encodeFileToBase64(file, callback) {
    if (file != null) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
            var base64String = reader.result.split(",")[1];
            callback(base64String);
        };
        reader.onerror = function(error) {
            setError(error, alert);
        };
    } else {
        setError("Veuillez ajouter un fichier", "alertPost", "fileInput");
    }
}



/**

Fonction de succès pour remplir la liste.

@param {object} data - Les données renvoyées par la requête.

@param {number} fk - La clé étrangère à utiliser pour filtrer les résultats.

@returns {void}
*/

function successList(data, fk) {
    var txt = "";
    $(data)
        .find("rubrique")
        .each(function() {
            var rubrique = new Rubrique();
            rubrique.setNom($(this).find("nom").text());
            rubrique.setPk($(this).find("id").text());
            rubrique.setFk($(this).find("fk").text());
            $fk = rubrique.getFk();

            txt +=
                "    <option value='" +
                rubrique.getPk() +
                "'>" +
                rubrique.getNom() +
                "</option>";
        });
    document.getElementById("selectRubriquePostModif").innerHTML = txt;
    const selectElement = document.getElementById("selectRubriquePostModif");
    //const selectedValue = 34; // La valeur que vous voulez sélectionner
    for (let i = 0; i < selectElement.options.length; i++) {
        if (selectElement.options[i].value == fkRub) {
            selectElement.selectedIndex = i;
            break;
        }
    }
}

function errorCallback(jqXHR) {
    setError(jqXHR.responseText, "alert");

}

function successSuppCallback(data) {
    allUpload();
}

function deleteUpload(id) {
    var answer = window.confirm("Voullez vous supprimer le documents ?");
    if (answer) {
        deleteUploads(id, successSuppCallback, errorCallback);
    }
}

function allUpload(data) {
    afficherTousUploads(successCallback, errorCallback);
    setSucces(data, "alert");
}