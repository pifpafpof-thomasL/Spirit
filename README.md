# Spirit Projet

Maquette pour une Web Application de gestion de projets et de consultants.
Ceci valide l'interaction entre les librairies javascript adminonrest/materialize/react/redux/timeline

# Quelques copies d'écrans Projet

![Timeline projets](https://github.com/pifpafpof-thomasL/Spirit/blob/master/screenshot/timeline.png)
![Edition projet](https://github.com/pifpafpof-thomasL/Spirit/blob/master/screenshot/edition_projet.png)
![Consultants](https://github.com/pifpafpof-thomasL/Spirit/blob/master/screenshot/Lister_consultants.png)
![Affectations](https://github.com/pifpafpof-thomasL/Spirit/blob/master/screenshot/affectation.png)
A terme l'affectation des consultants se ferait directement depuis la timeline projet.

# Pour cloner ce projet depuis un repertoire sur votre machine:
+ `git clone https://github.com/pifpafpof-thomasL/Spirit.git`

## Installer les dépendances (une seule fois):
+ `npm install` dans le dossier backend (puis idem dans le dossier adminonrest)

## Démarrage du front et back:
+ `cd backend; npm start`
Le serveur mysql sous-jacent est déjà operationnel sur un site externe. 

Dans un autre terminal démarrer le front:
+ `cd adminonrest; npm start`

## Liste des Api 

+ [Starter React adminonrest](https://github.com/marmelab/admin-on-rest/blob/master/docs/Tutorial.md)
+ [React calendar timeline](https://www.npmjs.com/package/react-calendar-timeline)

Le starter front Adminonrest s'appuie sur CSS/front js Material Design:
+ [Material Design](https://material.io/guidelines/)

## Product Backlog (au sens Agile)

sprint v1 - version actuelle!

- CRUD consultants et projets
- fenetre liste consultants 
  - trier et filtrer dynamiquement
  - infos principales consultant
  - boutons ajout, edit, del
- idem projets
- affecter consultant à un projet
- afficher les projets sous forme d'une timeline, pouvoir modifier la date et le projet depuis cette timeline


sprint V2 - à venir un jour peut etre...
  - ergonomie (période d'affectation, portion de temps affecté - ex 10% 2j / sem)
  - jours ouvrés
  - possibilité de rajouter des jours sabbatiques
- vision sur le plan de charge


## Librairies Spirit Project

### Design
Material Design : MaterializeCSS

### Front-End
Reactjs → Redux

### Back-End
Nodesjs
Express
Sequelize
MySql
___

## Guidelines

#### Guidelines fichiers

Dans chaque fichier JS : `'use strict'`

Fichier server.js :

`app.use('/collections', Model(db)) ` => collection au pluriel + Model avec une majuscule

`const Model = require ('./routes/fichier-route')` => Model avec majuscule + fichier_route en minuscules au singulier


#### Guidelines Git pour l'équipe de dev:

La branche commune est **master**

###### créer une nouvelle branche de travail à partir de master

+ `git checkout master` => On se positionne sur la branche

+ `git pull` => Pour se mettre à jour par rapport au dépôt

+ `git checkout -b nom_new_branch` => Création d'une nouvelle branche pour travailler sur une fonctionnalité

+ `git push -u origin nom_new_branch` => Mettre la branche sur le dépôt Spirit (distant)


###### Pour validation

+ Demander à un collègue de vérifier le fonctionnement du code de la branche

+ Si OK, mettre à jour **nom_new_branch** avec **master** (et non pas le contraire) : 
  - `git checkout master && git pull` (mettre à jour master au cas ou des push ont été fait depuis)
  - `git checkout nom_new_branch && git merge master` (intégrer master à votre vranche de travail)

+ Si merge OK : demande de validation fonctionnelle (à Jérôme)

+ Si validé : merge request vers **master**


