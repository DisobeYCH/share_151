/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

/**
Classe représentant une rubrique.
@constructor
*/
var Rubrique = function() {};
/**

Définit le nom de la rubrique.
@param {string} nom - Le nom de la rubrique.
*/
Rubrique.prototype.setNom = function(nom) {
    this.nom = nom;
};
/**

Définit la clé primaire de la rubrique.
@param {number} pk - La clé primaire de la rubrique.
*/
Rubrique.prototype.setPk = function(pk) {
    this.pk = pk;
};
/**

Définit la clé étrangère de la rubrique.
@param {number} fk - La clé étrangère de la rubrique.
*/
Rubrique.prototype.setFk = function(fk) {
    this.fk = fk;
};
/**

Renvoie la clé primaire de la rubrique.
@returns {number} La clé primaire de la rubrique.
*/
Rubrique.prototype.getPk = function() {
    return this.pk;
};
/**

Renvoie le nom de la rubrique.
@returns {string} Le nom de la rubrique.
*/
Rubrique.prototype.getNom = function() {
    return this.nom;
};
/**

Renvoie la clé étrangère de la rubrique.
@returns {number} La clé étrangère de la rubrique.
*/
Rubrique.prototype.getFk = function() {
    return this.fk;
};