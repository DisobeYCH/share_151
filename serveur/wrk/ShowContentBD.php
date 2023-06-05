<?php
include_once('ConnexionDB.php');
include_once('./beans/Rubrique.php');
include_once('./beans/Upload.php');
/*

Auteur : Luvisotto Marco
Version : 1.0 / 12.03.2023
Date de création : 24.02.2023
*/
/**
 * La classe ShowContentBD contient des fonctions pour extraire et afficher les données de la base de données.
 */
class ShowContentBD
{
	/**
	 * La fonction getInXML récupère les données de la base de données pour une rubrique donnée et les retourne sous forme de chaîne de caractères XML.
	 * @param int $id L'identifiant de la rubrique dont les données doivent être récupérées.
	 * @return string Les données de la rubrique sous forme de chaîne de caractères XML.
	 */
	public function getInXML($id)
	{
		$data = $this->readContentDBRubrique($id);
		$result = '<list>';
		$result = $result . '<listRubrique>';
		for ($i = 0; $i < sizeof($data); $i++) {
			$result = $result . $data[$i]->toXML();
		}
		$result = $result . '</listRubrique>';
		$result = $result . '<listPost>';
		$data = $this->readContentDBPost($id);

		for ($i = 0; $i < sizeof($data); $i++) {
			$result = $result . $data[$i]->toXML();
		}
		$result = $result . '</listPost>';

		$result = $result . '</list>';


		return $result;
	}

	/**
	 * La fonction toutesRubriquesInXML récupère toutes les rubriques de la base de données et les retourne sous forme de chaîne de caractères XML.
	 * @return string Toutes les rubriques de la base de données sous forme de chaîne de caractères XML.
	 */
	public function toutesRubriquesInXML()
	{
		$data = $this->readContentDBRubrique("all");
		$result = '<list>';
		$result = $result . '<listRubrique>';
		for ($i = 0; $i < sizeof($data); $i++) {
			$result = $result . $data[$i]->toXML();
		}
		$result = $result . '</listRubrique>';
		$result = $result . '</list>';

		return $result;
	}
	/**
	 * La fonction tousPostsXml récupère tous les posts de la base de données et les retourne sous forme de chaîne de caractères XML.
	 * @return string Tous les posts de la base de données sous forme de chaîne de caractères XML.
	 */
	public function tousPostsXml()
	{
		$data = $this->readContentDBPost("all");
		$result = '<list>';
		$result = $result . '<listPosts>';
		for ($i = 0; $i < sizeof($data); $i++) {
			$result = $result . $data[$i]->toXML();
		}
		$result = $result . '</listPosts>';
		$result = $result . '</list>';

		return $result;
	}

	/**
	 * Récupère les rubriques correspondant à un id donné.
	 *
	 * @param string|int $id L'identifiant de la rubrique parente ou 'all' pour récupérer toutes les rubriques.
	 * @return array Un tableau d'objets Rubrique.
	 */
	public function readContentDBRubrique($id)
	{

		$count = 0;
		$liste = array();
		$connection = Connection::getInstance();
		$parameters = array();


		if ($id == "home") {
			$request = "SELECT t_rubrique.*
			FROM t_rubrique
			INNER JOIN t_post ON t_post.FK_rubrique = t_rubrique.PK_rubrique
			WHERE `FK_parent` IS NULL
			GROUP BY t_rubrique.PK_rubrique;";
		} else if ($id == "all") {
			$request = "SELECT * FROM `t_rubrique`";
		} else {
			$parameters = array('id' => $id);
			$request = "		SELECT t_rubrique.*
			FROM t_rubrique
			LEFT JOIN t_post ON t_post.FK_rubrique = t_rubrique.PK_rubrique
			WHERE t_rubrique.FK_parent = :id
			GROUP BY t_rubrique.PK_rubrique;";
		}


		$query = $connection->selectQuery($request, $parameters);

		foreach ($query as $data) {
			$rubrique = new Rubrique($data['PK_rubrique'], $data['nomRubrique'], $data['FK_parent']);
			$liste[$count++] = $rubrique;
		}
		return $liste;
	}
	/**
	 *Récupère les informations sur les publications depuis la base de données
	 *@param string|int $id Identifiant de la rubrique ou "all" pour toutes les publications de l'utilisateur actuel
	 *@return array Tableau contenant les informations des publications
	 */
	public function readContentDBPost($id)
	{

		$count = 0;
		$liste = array();
		$connection = Connection::getInstance();


		if ($id == "all") {
			$request = "SELECT * FROM `t_post` WHERE FK_user = :id";
			$parameters = array('id' => $_SESSION['idUser']);
		} else {
			$request = "SELECT * FROM `t_post` WHERE FK_rubrique =  :id";
			$parameters = array('id' => $id);
		}



		$query = $connection->selectQuery($request, $parameters);
		foreach ($query as $data) {

			$post = new Upload($data['PK_post'], $data['titre'], $data['FK_rubrique'], $data['linkFile'], $data['descr']);
			$liste[$count++] = $post;
		}
		return $liste;
	}
}
