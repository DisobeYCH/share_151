/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

/**

Actualise le style des éléments HTML contenus dans un tableau.
@param {Array} arrayTab - Le tableau contenant les identifiants des éléments HTML à actualiser.
*/
function refreshStyle(arrayTab) {
    for (let i = 0; i < arrayTab.length; i++) {
        element = document.getElementById(arrayTab[i]);
        element.style.color = "var(--styleFont)";
        element.style.borderBottom = " 1px solid var(--styleFont)";
    }
}
/**

Vérifie si la valeur de l'élément HTML correspond à un motif donné.
@param {string} idToCheck - L'identifiant de l'élément HTML à vérifier.
@param {RegExp} pattern - Le motif à vérifier.
@returns {boolean} Vrai si la valeur de l'élément HTML ne correspond pas au motif, faux sinon.
*/
function checkPattern(idToCheck, pattern) {
    if (!pattern.test(document.getElementById(idToCheck).value)) {
        return true;
    } else {
        return false;
    }
}