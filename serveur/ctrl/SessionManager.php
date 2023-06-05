<?php

session_start();
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
class SessionManager
{
    /**
     * Retourne la dernière rubrique visitée par l'utilisateur.
     *
     * @return string La dernière rubrique visitée.
     */
    public function getLasRubrique()
    {
        array_pop($_SESSION['lastRubrique']);
        $lastValue = end($_SESSION['lastRubrique']);

        return $lastValue;
    }
    /**
     * Définit la dernière rubrique visitée par l'utilisateur.
     *
     * @param string $rubrique Le nom de la rubrique visitée.
     * @return void
     */
    public function setLastRubrique($rubrique)
    {
        if (!isset($_SESSION['lastRubrique'])) {
            $_SESSION['lastRubrique'] = array();
            $arr = $_SESSION['lastRubrique'];
            $arr[] = "home";
            $_SESSION['lastRubrique'] = $arr;
        }
        $arr = $_SESSION['lastRubrique'];
        $arr[] = $rubrique;
        $_SESSION['lastRubrique'] = $arr;
    }

    /**
     * Ouvre une session pour l'utilisateur.
     *
     * @param string $email L'adresse email de l'utilisateur.
     * @param int $pk L'identifiant de l'utilisateur.
     * @return void
     */
    function opensession($email, $pk)
    {
        $_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp

        $_SESSION['user'] = $email;
        $_SESSION['idUser'] = $pk;
    }
    /**
     * Ferme la session de l'utilisateur.
     *
     * @return void
     */
    function logout()
    {
        // destruction de la session
        session_destroy();
    }
    /**
     * Vérifie si l'utilisateur est connecté.
     *
     * @return bool true si l'utilisateur est connecté, false sinon.
     */
    function isLoggedIn()
    {
        // vérification de la variable de session
        if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 1800)) {
            // last request was more than 30 minutes ago
            session_unset();     // unset $_SESSION variable for the run-time 
            session_destroy();   // destroy session data in storage
            return false;
        }
        $_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp
        if (isset($_SESSION['user'])) {
            return true;
        } else {
            return false;
        }
    }
}
