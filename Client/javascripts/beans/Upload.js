/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */
/**

Classe représentant un objet de téléchargement.
@constructor
*/
var Upload = function() {};
/**

Définit le titre de l'objet de téléchargement.
@param {string} title - Le titre de l'objet de téléchargement.
*/
Upload.prototype.setTitle = function(title) {
    this.title = title;
};
/**

Définit le fichier de l'objet de téléchargement.
@param {File} file - Le fichier de l'objet de téléchargement.
*/
Upload.prototype.setFile = function(file) {
    this.file = file;
};
/**

Définit la description de l'objet de téléchargement.
@param {string} description - La description de l'objet de téléchargement.
*/
Upload.prototype.setDescription = function(description) {
    this.description = description;
};
/**

Définit la clé primaire de l'objet de téléchargement.
@param {number} pk - La clé primaire de l'objet de téléchargement.
*/
Upload.prototype.setPk = function(pk) {
    this.pk = pk;
};
/**
Définit la clé étrangère de la rubrique de l'objet de téléchargement.
@param {number} fkRubrique - La clé étrangère de la rubrique de l'objet de téléchargement.
*/
Upload.prototype.setFkRubrique = function(fkRubrique) {
    this.fkRubrique = fkRubrique;
};
/**
Renvoie la description de l'objet de téléchargement.
@returns {string} La description de l'objet de téléchargement.
*/
Upload.prototype.getDescription = function() {
    return this.description;
};
/**
Renvoie la clé primaire de l'objet de téléchargement.
@returns {number} La clé primaire de l'objet de téléchargement.
*/
Upload.prototype.getPk = function() {
    return this.pk;
};
/**
Renvoie le titre de l'objet de téléchargement.
@returns {string} Le titre de l'objet de téléchargement.
*/
Upload.prototype.getTitle = function() {
    return this.title;
};
/**
Renvoie la clé étrangère de la rubrique de l'objet de téléchargement.
@returns {number} La clé étrangère de la rubrique de l'objet de téléchargement.
*/
Upload.prototype.getFkRubrique = function() {
    return this.fkRubrique;
};
/**

Renvoie le fichier de l'objet de téléchargement.
@returns {File} Le fichier de l'objet de téléchargement.
*/
Upload.prototype.getFile = function() {
    return this.file;
};