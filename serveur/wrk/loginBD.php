<?php
include_once('ConnexionDB.php');
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * Classe LoginDB : Gère les opérations de récupération de données utilisateur liées à l'authentification
 */
class LoginDB
{
	/**
	 * @var Connection $connection Objet de connexion à la base de données
	 */
	private $connection;

	/**
	 * Constructeur de la classe LoginDB
	 */
	public function __construct()
	{
		$this->connection = Connection::getInstance();
	}
	/**
	 * Récupère un utilisateur en fonction de son email
	 * @param string $email Email de l'utilisateur
	 * @return array|null Tableau associatif contenant les informations de l'utilisateur ou null si l'utilisateur n'est pas trouvé
	 */
	public function getUserByEmail($email)
	{
		$request = "SELECT * FROM t_user WHERE email = :email";
		$parameters = array('email' => $email);
		$query = $this->connection->selectQuery($request, $parameters);
		return $query[0] ?? null;
	}
}
