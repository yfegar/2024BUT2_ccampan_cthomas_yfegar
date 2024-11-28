# 2024BUT2_ccampan_cthomas_yfegar

## 1. Introduction

Locfit est un site web destiné à la location de matériel sportif. 

#### Fonctionnalités ajoutées depuis ce matin 28/11/2024

**Amélioration de la fonction inscription**
- envoi direct vers page connexion suite à l'inscription

**Ajout de la fonction inscription d'un agent**
- L'admin accède au formulaire d'inscription pour promouvoir un agent
- Il rentre les informations et soumet le formulaire : l'agent est ajouté à la base de données


#### Contributions par membres du projet

**Cyléa CAMPAN :**
- pages 'A propos', F.A.Q.
- page Catalogue
- page Détails : description du produit
- page Index
- page Locations
- page Profil
- fonction 'Supprimer un compte'
- tentatives : fonction 'Supprimer un produit', fonction 'Calcul du prix total de location'


**Camille THOMAS :**
- pages Inscription et Connexion
- page Détails : formulaire de location
- page Index
- fonction 'Calcul des jours'

**Youna FEGAR :**
- page Footer
- page Header
- page Index
- fonctions inscription et connexion
- fonction ajout d'un produit
- fonction louer un produit

#### Les technologies utilisées

**Front end :** 
- HTML
- CSS
- JS

**Back end :** 
- Node.js
- Express

**Base de donnée :** 
- MySQL

**Extensions :**
- md5 (hachage du mot de passe)
-  jwt (token)

## 2. Base de données

### 2. 1. Schémas des tables de données

| utilisateur |             |
| ----------- | ----------- |
| **id** | INTEGER |
| login | VARCHAR(50) NN |
| password | VARCHAR(50) NN |
| nom | VARCHAR(50) NN |
| prenom | VARCHAR(50) NN |
| ddn | DATE NN |
| email | VARCHAR(50) NN |
| type_utilisateur | VARCHAR(10) NN |

| location |             |
| ----------- | ----------- |
| **id** | INTEGER |
| date_debut | DATE NN |
| date_retour_prevue | DATE NN |
| date_retour_effective | DATE NN |
| prix_total | FLOAT NN |
| #utilisateur_id | INTEGER NN |
| #produit_id | INTEGER NN |

| produit   |             |
| ----------- | ----------- |
| **id** | INTEGER |
| type | VARCHAR(100) NN |
| description | VARCHAR(255) NN |
| marque | VARCHAR(100) NN |
| modele | VARCHAR(100) NN |
| prix_location | FLOAT NN |
| etat | VARCHAR(20) NN |

### 2. 2. Script complémentaire

Afin de personnaliser le fonctionnement du site, des produits ont été ajoutés à la table 'produit' : 

INSERT INTO `produit` (`id`, `type`, `description`, `marque`, `modele`, `prix_location`, `etat`) VALUES
(1, 'lot', 'Idéal pour vos séances de fitness, parfait pour un usage intensif.', 'Technogym', 'Tapis + Banc', 182, 'Bon état'),
(2, 'lot', 'Parfait pour vos entraînements et adapté aux utilisations régulières. ', 'Technogym', 'Elliptique + Banc', 182, 'Bon état'),
(3, 'lot', 'Complet pour vos séances de cardio, il convient à un usage prolongé.', 'Technogym', 'Vélo + Banc', 177, 'Bon état'),
(4, 'altère', 'Idéal pour la musculation et prêt pour une utilisation fréquente.', 'Technogym', 'Altères en hexagone', 80, 'Bon état'),
(5, 'tapis', 'Parfait pour les exercices à haute intensité, il convient aux entraînements intensifs.', 'Technogym', 'Tapis HIIT', 330, 'Bon état');
COMMIT;

## 3. Fonctionnalités principales

### 3.1. Gestion des utilisateurs 

**Inscription**

Condition : 
- L'utilisateur doit être majeur pour s'inscrire

Contrôleur : authController.inscription

**Connexion**

Condition : 
- L'utilisateur doit déjà posséder un compte pour se connecter

Contrôleur : authController.connexion

**Déconnexion**

Contrôleur : authController.deconnexion

**Suppression de compte**

Condition : 
- L'utilisateur doit être un client qui n'a pas de locations en cours pour supprimer son compte 

Contrôleur : userController.deleteAccount

**Inscrire un agent**

Condition : 
- L'utilisateur doit être identifié comme admin pour inscrire un utilisateur en tant qu'agent

Contrôleur : authController.inscriptionAgent

### 3.2. Gestion des produits

**Ajouter un produit**

Condition : 
- L'utilisateur doit être un agent pour ajouter un produit (le formulaire ne s'affiche que sur la page agent)

Contrôleur : productController.addProduct

**Supprimer un produit**

Condition : 
- L'utilisateur doit être un agent pour supprimer un produit 

Contrôleur : productController.deleteProduct

### 3.3. Gestion des locations

**Louer un produit**

Condition : 
- L'utilisateur doit être un client (inscrit ou non) pour louer un produit 
- Le produit doit être disponible sur la période de location

Contrôleur : productController.rentProduct

**Valider une location**

Condition : 
- L'utilisateur doit être un agent pour valider une location 
- Le client doit avoir rendu le matériel et payé le prix total de location

Contrôleur : productController.validerRent

## 4. Arborescence des fichiers

```bash
├── app.js
├── controllers/
│   ├── authController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── database.js
│   ├── produits.js
│   └── user.js
├── node_modules/
├── public/
│   ├── css/
│   ├── img/
│   └── js/
├── routes/
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── views/
│   ├── 404.ejs
│   ├── apropos.ejs
│   ├── catalogue.ejs
│   ├── connexion.ejs
│   ├── details.ejs
│   ├── faq.ejs
│   ├── footer.ejs
│   ├── header.ejs
│   ├── index.ejs
│   ├── inscription.ejs
│   ├── inscriptionagent.ejs
│   ├── locations.ejs
│   └── profil.ejs
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
└── README.md
```