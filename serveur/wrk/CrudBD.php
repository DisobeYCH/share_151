<?php
include_once('ConnexionDB.php');

/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/

/**
 * Classe qui permet d'effectuer des opérations CRUD sur la base de données.
 */
class CrudDB
{
	/**
	 * Instance de la connexion à la base de données.
	 *
	 * @var Connection
	 */
	private $connection;

	/**
	 * Constructeur de la classe qui initialise la connexion à la base de données.
	 */
	public function __construct()
	{
		$this->connection = Connection::getInstance();
	}

	/**
	 * Ajoute une nouvelle rubrique à la base de données.
	 *
	 * @param string $nom Le nom de la rubrique.
	 * @param int|null $parent L'identifiant de la rubrique parente, ou NULL si la rubrique n'a pas de parent.
	 * @return string Un message de succès indiquant que la rubrique a été ajoutée.
	 */
	public function ajoutRubrique($nom, $parent)
	{

		$parameters = array($nom, $parent);
		$request = "INSERT INTO t_rubrique (nomRubrique, FK_parent) VALUES (?,?)";
		$this->connection->executeQuery($request, $parameters);
		return "Ajout de la rubrique avec succès";
	}

	/**
	 * Ajoute un nouveau post à la base de données.
	 *
	 * @param string $titre Le titre du post.
	 * @param string $description La description du post.
	 * @param int $idRubrique L'identifiant de la rubrique à laquelle le post appartient.
	 * @param string $file Le nom du fichier téléchargé, ou une chaîne vide si aucun fichier n'a été téléchargé.
	 * @return string Un message de succès indiquant que le post a été ajouté.
	 */

	public function ajoutNewPost($titre, $description, $idRubrique, $file)
	{
		$parameters = array($titre, $description, $file, $_SESSION['idUser'], $idRubrique);
		$request = "INSERT INTO t_post (titre, descr,linkFile,FK_user,FK_rubrique) VALUES (?,?,?,?,?)";
		$this->connection->executeQuery($request, $parameters);
		return "Ajout du post avec succès";
	}
	/**
	 * Vérifie si un utilisateur est l'auteur d'un post donné.
	 *
	 * @param int $id L'identifiant du post.
	 * @return int|null L'identifiant de l'utilisateur qui a créé le post, ou NULL si le post n'existe pas.
	 */

	public function checkUser($id)
	{
		$connection = Connection::getInstance();
		$request = "SELECT * FROM `t_post` WHERE PK_post=:id";
		$parameters = array('id' => $id);
		$post = "";
		$query = $connection->selectQuery($request, $parameters);
		foreach ($query as $data) {
			$post = $data['FK_user'];
		}
		return $post;
	}
	/**
	 * Supprime un post de la base de données.
	 *
	 * @param int $id L'identifiant du post à supprimer.
	 * @return string Un message de succès indiquant que le post a été supprimé.
	 */
	public function deleteUpload($id)
	{
		$parameters = array('id' => $id);
		$request = "DELETE FROM t_post WHERE PK_post =  :id";
		$this->connection->executeQuery($request, $parameters);
		return "Suppression avec  du post avec succès";
	}
	public function modifieUpload($pk, $titre, $description, $fk, $file)
	{
		$parameters = array();
		if ($file == "") {
			$request = "UPDATE t_post
			SET titre = :titre, descr = :descr, FK_rubrique=:fk
			WHERE PK_post = :id";
			$parameters = array('id' => $pk, 'titre' => $titre, 'descr' => $description, 'fk' => $fk);
		} else {
			$request = "UPDATE t_post
			SET titre = :titre, descr = :descr, linkFile = :link, FK_rubrique=:fk
			WHERE PK_post = :id";
			$parameters = array('id' => $pk, 'titre' => $titre, 'descr' => $description, 'link' => $file, 'fk' => $fk);
		}
		$this->connection->executeQuery($request, $parameters);
		return "Post modifié avec succès";
	}
}
