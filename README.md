# Cognac Altran Projet

Outil/Applicatif de gestion de projet et de consultants

![Timeline projets](https://git.altran.com/aso/COGNAC/raw/V1/screenshot/timeline.png)

## Installer les dépendances:
+ `npm install` dans un dossier contenant un `package.json`

## Démarrage du front et back:
+ `cd backend; npm start`

Dans un autre terminal démarrer le front:
+ `cd adminonrest; npm start`

## Liste des Api 

+ [Starter React adminonrest](https://github.com/marmelab/admin-on-rest/blob/master/docs/Tutorial.md)
+ [React calendar timeline](https://www.npmjs.com/package/react-calendar-timeline)

Le starter front Adminonrest s'appuie sur CSS/front js Material Design:
[Material Design](https://material.io/guidelines/)

## Librairies Cognac Project

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

#### Guidelines Git

La branche commune est **master**

###### créer une nouvelle branche de travail à partir de master

+ `git checkout master` => On se positionne sur la branche

+ `git pull` => Pour se mettre à jour par rapport au dépôt

+ `git checkout -b nom_new_branch` => Création d'une nouvelle branche pour travailler sur une fonctionnalité

+ `git push -u origin nom_new_branch` => Mettre la branche sur le dépôt cognac (distant)


###### Pour validation

+ Demander à un collègue de vérifier le fonctionnement du code de la branche

+ Si OK, mettre à jour **nom_new_branch** avec **master** (et non pas le contraire) : 
  - `git checkout master && git pull` (mettre à jour master au cas ou des push ont été fait depuis)
  - `git checkout nom_new_branch && git merge master` (intégrer master à votre vranche de travail)

+ Si merge OK : demande de validation fonctionnelle (à Jérôme)

+ Si validé : merge request vers **master**


## Product Backlog

v1 -

- CRUD consultants et projets
- fenetre liste consultants 
  - trier et filtrer dynamiquement
  - infos principales consultant
  - boutons ajout, edit, del
- idem projets
- affecter consultant à un projet
- afficher les projets sous forme d'une timeline, pouvoir modifier la date et le projet depuis cette timeline

V2 - à venir
  - ergonomie (période d'affectation, portion de temps affecté - ex 10% 2j / sem)
  - jours ouvrés
  - possibilité de rajouter des jours sabbatiques
- vision sur le plan de charge