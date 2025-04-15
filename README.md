# MealDB Recipe Finder

Ce projet permet de rechercher des recettes à partir de l'API [TheMealDB](https://www.themealdb.com/). Il offre une interface permettant de filtrer les recettes par pays, catégorie ou ingrédient, et de consulter les détails de chaque recette, y compris la liste des ingrédients et les instructions de préparation.

## Fonctionnalités

- **Recherche par catégorie** : Affiche les recettes selon la catégorie sélectionnée.
- **Recherche par pays** : Permet de filtrer les recettes en fonction du pays d'origine.
- **Recherche par ingrédient** : Recherche les recettes contenant un ingrédient spécifique.
- **Détails des recettes** : Affiche les détails complets d'une recette, y compris les ingrédients et les instructions.
- **Affichage dynamique** : Utilisation d'un affichage en grille pour les recettes et les détails sous forme de cartes interactives.

## Technologies utilisées

- **HTML** : Structure de base du site.
- **CSS** : Stylisation de l'interface utilisateur.
- **JavaScript** : Gestion de la logique dynamique et des appels API.
- **Fetch API** : Pour récupérer les données depuis [TheMealDB API](https://www.themealdb.com/api.php).

## Prérequis

Avant de pouvoir exécuter ce projet localement, tu dois avoir installé :

- Un navigateur moderne (Google Chrome, Firefox, etc.) pour visualiser l'application.

## Installation

1. **Clone le repository** sur ton machine locale :

   ```bash
   git clone https://github.com/ton-utilisateur/mealdb-recipe-finder.git
   ```

2. **Accède au répertoire du projet** :

   ```bash
   cd mealdb-recipe-finder
   ```

3. **Ouvre le fichier `index.html` dans ton navigateur**.

   Tu peux simplement double-cliquer sur le fichier `index.html` pour l'ouvrir dans ton navigateur, ou tu peux utiliser un serveur local pour exécuter le projet (par exemple, en utilisant une extension dans un éditeur comme VS Code).

## Utilisation

1. **Sélectionner une catégorie** : Choisis une catégorie de recettes dans le menu déroulant pour voir les recettes correspondantes.
2. **Filtrer par pays** : Sélectionne un pays dans le menu déroulant pour voir les recettes provenant de ce pays.
3. **Rechercher par ingrédient** : Entrez un ingrédient dans le champ de recherche pour voir les recettes qui contiennent cet ingrédient.
4. **Consulter les détails d'une recette** : Clique sur une recette pour voir sa description détaillée, ses ingrédients et les instructions de préparation.

## Structure du projet

```
mealdb-recipe-finder/
├── index.html        # Page principale
├── style.css         # Fichier CSS pour le style de l'interface
├── origin.js         # JavaScript pour la gestion des pays
├── search.js         # JavaScript pour la recherche par ingrédient
├── cat.recherche.js  # JavaScript pour la gestion des catégories et des détails des recettes
└── README.md         # Ce fichier
```
