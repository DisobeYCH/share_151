<?php
include_once('configConnexion.php');
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * Classe qui permet de se connecter à une base de données.
 */
class Connection
{
    /**
     * L'instance unique de la connexion.
     *
     * @var Connection
     */
    private static $instance = null;
    /**
     * L'objet PDO utilisé pour se connecter à la base de données.
     *
     * @var PDO
     */
    private $pdo;

    /**
     * Constructeur privé qui empêche l'instanciation directe de la classe.
     */
    private function __construct()
    {
        try {
            $this->pdo = new PDO(DB_TYPE . ':host=' . DB_HOST . ';dbname=' . DB_NAME, DB_USER, DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }
    /**
     * Méthode qui retourne l'instance unique de la connexion.
     *
     * @return Connection L'instance unique de la connexion.
     */
    public static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Connection();
        }

        return self::$instance;
    }
    /**
     * Méthode qui exécute une requête SELECT sur la base de données.
     *
     * @param string $query La requête SQL à exécuter.
     * @param array $params Les paramètres à passer à la requête.
     * @return array Les résultats de la requête sous forme de tableau associatif.
     */
    public function selectQuery($query, $params)
    {
        // Préparation et exécution de la requête avec les paramètres passés en argument.

        try {

            $queryPrepared = $this->pdo->prepare($query);
            $queryPrepared->execute($params);
            // Récupération des résultats de la requête sous forme de tableau associatif.

            return $queryPrepared->fetchAll();
        } catch (PDOException $e) {
            // Affichage de l'erreur et arrêt du script en cas d'erreur d'exécution de la requête.

            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }
    /**
     * Méthode qui exécute une requête INSERT, UPDATE ou DELETE sur la base de données.
     *
     * @param string $query La requête SQL à exécuter.
     * @param array $params Les paramètres à passer à la requête.
     * @return string Le nombre de lignes affectées par la requête suivi de la chaîne "exec".
     */
    public function executeQuery($query, $params)
    {
        try {
            // Préparation et exécution de la requête avec les paramètres passés en argument.

            $queryPrepared = $this->pdo->prepare($query);
            $queryRes = $queryPrepared->execute($params);
            // Retourne le nombre de lignes affectées par la requête suivi de la chaîne "exec".

            return $queryRes . "exec";
        } catch (PDOException $e) {
            print "Erreur !: " . $e->getMessage() . "<br/>";
            die();
        }
    }
}
