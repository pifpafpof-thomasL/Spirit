# Cognac Altran Projet

Outil/Applicatif de gestion de projet et de personnel


## Liste des Api 

[List Charts Google](https://developers.google.com/chart/interactive/docs/)

[Api Google Calendar](https://developers.google.com/google-apps/calendar/)

[Api Gantt Charts](https://developers.google.com/chart/interactive/docs/gallery/ganttchart)

[Api Calendar Charts](https://developers.google.com/chart/interactive/docs/gallery/calendar)


## Exemple de Dashboard

[Material Design Lite Dashboard Template](https://getmdl.io/templates/dashboard/index.html)

## Librairies Cognac Project

### Design
Material Design : MaterializeCSS

### Front-End
Reactjs → Redux ?

API Google Calendar ?

Fullcalendar + jquery + moment ?

### Back-End
Nodesjs

Express → Express session

Sequelize

MySql

Body-Parser

Cookie-Parser

___

## Guidelines

#### Guidelines fichiers

Dans chaque fichier JS : `'use strict'`

Fichier server.js :

`app.use('/collections', Model(db)) ` => collection au pluriel + Model avec une majuscule

`const Model = require ('./routes/fichier-route')` => Model avec majuscule + fichier_route en minuscules au singulier

#### Guidelines Git

La branche commune est **development**

###### créer une novuelle branche de travail à partir de development

+ `git checkout development` => On se positionne sur la branche

+ `git pull` => Pour se mettre à jour par rapport au dépôt

+ `git checkout -b nom_new_branch` => Création d'une nouvelle branche pour travailler sur une fonctionnalité

+ `git push -u origin nom_new_branch` => Mettre la branche sur le dépôt cognac (distant)



###### Pour 1ère validation

+ Demander à un collègue de vérifier le fonctionnement du code de la branche

+ Si OK, mettre à jour **nom_new_branch** avec **development** (et non pas le contraire) : 
  - `git checkout development && git pull` (mettre à jour development au cas ou des push ont été fait depuis)
  - `git checkout nom_new_branch && git merge development` (intégrer development à votre vranche de travail)

+ Si merge OK : demande de validation fonctionnelle (à Jérôme)

+ Si validé : merge request vers **development**

## Visualisation Du Front-End

Installer Browser Sync

> `npm install -g browser-sync`

Dans le treminal : positionnez vous sur le dossier front_end et entrez la commande suivante

> `browser-sync start --server --files "*.html, css/*.css, js/*.js"`

Cela va ouvrir une fenêtre dans votre navigateur et tous les changements que vous effectuez sur les fichers html, css et js en temps réel

## Product Backlog

v1 app standalone

- CRUD consultants et projets
- fenetre liste consultants 
  - trier et filtrer dynamiquement
  - infos principales consultant
  - boutons ajout, edit, del
- idem projets
- affecter consultant à un projet
  - ergonomie (période d'affectation, portion de temps affecté - ex 10% 2j / sem)
  - jours ouvrés
  - possibilité de rajouter des jours sabbatiques
- vision sur le plan de charge