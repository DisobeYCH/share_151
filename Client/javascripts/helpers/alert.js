/*
 * @author Luvisotto Marco
 * @version 1.0 / 12.03.2023
 * @creation 24.02.2023
 */

function setError(txt, erreurID, champID) {
    error = document.getElementById(erreurID);
    error.style.display = "block";
    error.innerHTML = txt;
    error.style.color = "var(--error)";
    error.style.border = " solid 1px var(--error)";
    if (champID != null) {
        champ = document.getElementById(champID);
        champ.style.borderBottom = "1px solid var(--error)";
        champ.style.color = "var(--error)";
    }

}

function setSucces(txt, idalert) {
    information = document.getElementById(idalert);
    information.style.display = "block";
    information.innerHTML = txt;
    information.style.color = "var(--succes)";
    information.style.border = " solid 1px var(--succes)";
}

function delMsg(id) {
    document.getElementById(id).style.display = "none";
}

function refreshStyle(id) {
    document.getElementById(id).style.display = "block";
    document.getElementById(id).style.color = "var(--styleFont)";
    document.getElementById(id).style.border = "none";



}