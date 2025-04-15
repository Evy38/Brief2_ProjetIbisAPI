// Récupérer les éléments du DOM
const searchInput = document.getElementById('ingredients'); // champ de recherche
const searchButton = document.getElementById('search'); // bouton de recherche
const recetteList = document.getElementById('listeRecettes'); // div où seront affichées les recettes
const prez = document.querySelector('.presentation'); // section de présentation

// Fonction recherche
function searchRecipes() {

    const searchTerm = searchInput.value.trim(); // Récupère le contenu de recherche
    if (searchTerm === "") {
        alert("Veuillez entrer un ingrédient à rechercher.");
        return;
    }

    // Masquer la présentation
    prez.style.display = "none";
    recetteList.innerHTML = "";

    // appel API ingredient
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`)
        .then(response => response.json())
        .then(data => {

            if (data.meals) {

                recetteList.style.display = "grid";
                recetteList.style.gridTemplateColumns = "repeat(4, 1fr)";
                recetteList.style.gap = "20px";
                recetteList.style.padding = "20px";


                data.meals.forEach(meal => {

                    // Div recettes
                    const div = document.createElement("div");
                    div.classList.add("recette");
                    div.style.border = "1px solid #ccc";
                    div.style.padding = "10px";
                    div.style.borderRadius = "8px";
                    div.style.boxShadow = "0 2px 5px rgba(0,0,0,0.4)";
                    div.style.textAlign = "center";
                    div.style.backgroundColor = "#f9f9f9";
 //titre
                    const titre = document.createElement("h3");
                    titre.textContent = meal.strMeal;
                    titre.style.fontFamily = "Montserrat, sans-serif";
                    titre.style.color = "#9E9E9E";
                    titre.style.fontSize = "1rem";
                    titre.style.padding = "20px";

                    //images
                    const image = document.createElement("img");
                    image.src = meal.strMealThumb;
                    image.alt = meal.strMeal;
                    image.style.maxWidth = "100%";
                    image.style.borderRadius = "5px";

                    //ajout DOM
                    div.appendChild(titre);
                    div.appendChild(image);
                    recetteList.appendChild(div);

                    // Événement au clic sur une recette
                    div.addEventListener("click", () => {
                        afficherDetailRecette(meal.idMeal);
                    });
                });
            } else {
                alert("Aucune recette trouvée avec cet ingrédient.");
            }
        })
        .catch(error => console.error("Erreur lors de la recherche des recettes : ", error));
}

// Fonction pour afficher les détails d'une recette
function afficherDetailRecette(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            const recette = data.meals[0];
            // Code pour afficher les détails de la recette (comme dans ton code précédent)
            console.log(recette);
        })
        .catch(err => console.error("Erreur lors de la récupération des détails de la recette : ", err));
}

// Ajouter l'événement au bouton de recherche
searchButton.addEventListener("click", searchRecipes);
