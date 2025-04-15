
// Catégories : https://www.themealdb.com/api/json/v1/1/categories.php

// Ingrédients : https://www.themealdb.com/api/json/v1/1/list.php?i=list

// Recettes : https://www.themealdb.com/api/json/v1/1/search.php?s=

// Détails d'une recette : https://www.themealdb.com/api/json/v1/1/lookup.php?i=<<id_recette>>




//----------------------AJOUT LISTE CATEGORIES---------------------------------------------------------//


const categories = document.getElementById("categories");
const options = document.createElement("option");

console.log("1- affiche categories", categories);
console.log("2- affiche options", options);

const cat = () => {
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((response) => response.json())
        .then((data) => {

            console.log("3- affiche données catégories json : ", data);

            data.categories.forEach((item) => { //faire ça pour chaque element de catgories :

                const options = document.createElement("option"); //creation balise option
                options.style.fontFamily = "Montserrat, sans serif";

                categories.appendChild(options);// affectation de la balise option comme eft de <select id:categories
                options.value = item.strCategory; //la valeur de chq balise option prends la valeur de strCategorie
                options.textContent = item.strCategory;//chq balise option contient le txt de strCategories

            });


        })

        .catch((error) => alert("4-Erreur : " + error));
};

cat();

//----------------------------------------------------AFFICHAGE LISTE RECETTES SELON CATEGORIE CHOISIE-------------------------------------//


function affichageListe() {
    categories.addEventListener("change", () => {

        console.log("5- j'ai séléctionné", categories.value);

        const prez = document.querySelector(".presentation"); // disparution section:"presentation"
        console.log("6- selection section:pres : ", prez);
        prez.style.display = "none";

        const listeRecettes = document.getElementById("listeRecettes"); // recup de la div qui contiendra les images et titres des recettes

        const categorieChoisie = categories.value; // recup valeur choisie


        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorieChoisie}`) //api en json
            .then(res => res.json())
            .then(data => {
                console.log("7- recettes trouvées selon la selection:", data.meals);

                listeRecettes.innerHTML = "";//vider avant d'ajouter de nouvelles recettes

                listeRecettes.style.display = "grid";
                listeRecettes.style.gridTemplateColumns = "repeat(4, 1fr)";
                listeRecettes.style.gap = "20px";
                listeRecettes.style.padding = "20px";

                //--------------BOUCLE QUI TRIE ET AFFICHE SELON LA SELECTION----------------------------------//
                data.meals.forEach(meal => {// a faire pour chaque elementqu'on selectionne


                    // crea div class="recettes"
                    const div = document.createElement("div");
                    div.classList.add("recette");


                    div.style.border = "1px solid #ccc";
                    div.style.padding = "10px";
                    div.style.borderRadius = "8px";
                    div.style.boxShadow = "0 2px 5px rgba(0,0,0,0.4)";
                    div.style.textAlign = "center";
                    div.style.backgroundColor = "#f9f9f9";
                    div.style.flexOrientation = "row";
                    div.style.width = "100%";


                    // crea titre h2
                    const titre = document.createElement("h3");
                    titre.textContent = meal.strMeal;
                    titre.fontFamily = "Montserrat, sans-serif";
                    titre.style.color = "#9E9E9E";
                    titre.style.fontSize = "1rem";
                    titre.style.padding = "20px";

                    // crea imag avec source dans l'API
                    const image = document.createElement("img");
                    image.src = meal.strMealThumb;
                    image.alt = meal.strMeal;
                    image.style.maxWidth = "100%";
                    image.style.borderRadius = "5px";


                    console.log("8- crea div recette et titres ", div, titre, image)

                    div.appendChild(titre);
                    div.appendChild(image);
                    listeRecettes.appendChild(div);


                    div.addEventListener("click", () => {

                        div.addEventListener("click", () => {
                            console.log("9- Recette cliquée:", meal.idMeal);
                            const id = meal.idMeal;
                            console.log("-----------------------", id);
                            afficherDetailRecette(meal.idMeal);
                        })

                    })

                })

            })
            .catch(error => console.error("10- Erreur lors du chargement des recettes :", error));
    })

}
affichageListe();
//----------------------------------------------------AFFICHAGE D'UNE RECETTES-------------------------------------//

function afficherDetailRecette(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const divDetails = document.getElementById("details");
            const listeRecettes = document.getElementById("listeRecettes");

            const recette = data.meals[0];

            // Vider et afficher
            divDetails.innerHTML = "";
            divDetails.style.display = "flex";
            divDetails.style.flexDirection = "column";
            divDetails.style.gap = "20px";
            listeRecettes.style.display = "none";
            
            //bouton retour
            const boutonRetour = document.createElement("button");
            boutonRetour.textContent = "← Return to list";
            boutonRetour.style.alignSelf = "flex-start";
            boutonRetour.style.marginBottom = "20px";
            boutonRetour.style.padding = "8px 16px";
            boutonRetour.style.fontSize = "1rem";
            boutonRetour.style.backgroundColor = "#FF9800";
            boutonRetour.style.color = "#fff";
            boutonRetour.style.border = "none";
            boutonRetour.style.borderRadius = "5px";
            boutonRetour.style.cursor = "pointer";
            boutonRetour.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";

            // Fonction du bouton : cacher détails, montrer liste
            boutonRetour.addEventListener("click", () => {
                document.getElementById("details").style.display = "none";
                document.getElementById("listeRecettes").style.display = "grid";
                document.getElementById("details").innerHTML = ""; // Vide les détails
            });


            // Titre
            const titre = document.createElement("h3");
            titre.textContent = recette.strMeal;
            titre.style.fontFamily = "Montserrat, sans-serif";
            titre.style.fontSize = "1.5rem";
            titre.style.color = "#9E9E9E";
            titre.style.padding = "20px";
            titre.style.textAlign = "center";

            // Image
            const image = document.createElement("img");
            image.src = recette.strMealThumb;
            image.style.width = "300px";
            image.style.margin = "0 auto";

            // Liste des ingrédients
            const listeIngredients = document.createElement("ul");
            listeIngredients.style.listStyle = "none";
            listeIngredients.style.padding = "0";
            listeIngredients.style.textAlign = "center";
            listeIngredients.style.display = "flex";
            listeIngredients.style.flexWrap = "wrap";
            listeIngredients.style.justifyContent = "center";
            listeIngredients.style.gap = "20px";
            listeIngredients.style.margin = "30px 0";

            for (let i = 1; i <= 20; i++) {
                const ingredient = recette[`strIngredient${i}`];
                const measure = recette[`strMeasure${i}`];

                if (ingredient && ingredient.trim() !== "") {// verifie si ingredient n'est pas un chaine vide ou juste un espace pour eviter que la liste stipule du vide
                    const li = document.createElement("li");
                    li.style.display = "flex";
                    li.style.flexDirection = "column";
                    li.style.alignItems = "center";
                    li.style.width = "100px";
                    li.style.fontFamily = "Montserrat, sans-serif";
                    li.style.fontSize = "0.9rem";

                    // Image de l'ingrédient
                    const img = document.createElement("img");
                    img.src = `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
                    img.alt = ingredient;
                    img.style.width = "60px";
                    img.style.height = "60px";
                    img.style.objectFit = "contain";
                    img.style.marginBottom = "8px";

                    // Texte sous l'image
                    const text = document.createElement("span");
                    text.textContent = `${ingredient} - ${measure}`;

                    li.appendChild(img);
                    li.appendChild(text);
                    listeIngredients.appendChild(li);
                }
            }

            // Instructions
            const instructions = document.createElement("p");
            instructions.textContent = recette.strInstructions;
            instructions.style.textAlign = "justify";
            instructions.style.padding = "10px";

            // Ajout dans le DOM
            divDetails.appendChild(boutonRetour);
            divDetails.appendChild(titre);
            divDetails.appendChild(image);
            divDetails.appendChild(listeIngredients);
            divDetails.appendChild(instructions);
        })
        .catch(err => console.error("Erreur de récupération des détails :", err));
}