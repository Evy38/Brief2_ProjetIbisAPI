const pays = document.getElementById("pays");
console.log("2.1- pays", pays);

//--------------------------------Charger les zones (pays) dans le select-------------------------------

//---Appel pour recuperer les noms des pays
fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then((response) => response.json())// recup promesse puis transfo en json
    .then((data) => {

        console.log("2.2- Zones récupérées :", data);

        data.meals.forEach((zone) => {// pour chaque option faire:
            const option = document.createElement("option");//crea options pour chaque pays présent dans l'API
            option.style.fontFamily = "Montserrat, sans serif";

            option.value = zone.strArea;// recup nom pays dans API  
            option.textContent = zone.strArea;// integration de chque nom dans un option
            pays.appendChild(option); // integration option das DOM
        });
    })
    .catch((error) => alert("2.3- Erreur : " + error));


//------------------------------------Ajouter l'écouteur de changement---------------------------------
function affichageListe() {
    pays.addEventListener("change", () => {
        const prez = document.querySelector(".presentation"); // recup div de presentation
        prez.style.display = "none";// disp


        const listeRecettes = document.getElementById("listeRecettes");
        listeRecettes.innerHTML = ""; // vider avant d'ajouter

        const paysChoisi = pays.value; //recup valeur du pays choisi
        console.log("2.4- Pays sélectionné :", paysChoisi);

        // Appel pour récupérer les recettes selon le pays
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${paysChoisi}`)
            .then((response) => response.json()) // recup promesse puis transfo en json
            .then((data) => {
                console.log("2.5- Recettes récupérées :", data);

                listeRecettes.innerHTML = "";//vider avant d'ajouter de nouvelles recettes

                listeRecettes.style.display = "grid";
                listeRecettes.style.gridTemplateColumns = "repeat(4, 1fr)";
                listeRecettes.style.gap = "20px";
                listeRecettes.style.padding = "20px";

                data.meals.forEach(meal => {// pour chq recette

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
                    titre.style.color = "black";
                    titre.style.fontSize = "1.5rem";
                    titre.style.paddingTop = "20px";
                    titre.style.paddingRight = "20px";
                    titre.style.paddingLeft = "20px";


                    // crea p nom pays d'origine
                    const nomPays = document.createElement("p");
                    nomPays.textContent = paysChoisi;
                    nomPays.fontFamily = "Montserrat, sans-serif";
                    nomPays.style.color = "#9E9E9E";
                    nomPays.style.fontSize = "100";
                    nomPays.style.padding = "20px 0px";

                    // crea imag avec source dans l'API
                    const image = document.createElement("img");
                    image.src = meal.strMealThumb;
                    image.alt = meal.strMeal;
                    image.style.maxWidth = "100%";
                    image.style.borderRadius = "5px";


                    console.log("2.6- crea div recette et titres ", div, titre, image)

                    
                    div.appendChild(titre);
                    div.appendChild(nomPays);
                    div.appendChild(image);
                    listeRecettes.appendChild(div);


                    div.addEventListener("click", () => {

                        div.addEventListener("click", () => {
                            console.log("2.7- Recette cliquée:", meal.idMeal);
                            const id = meal.idMeal;
                            console.log("-----------------------", id);
                            afficherDetailRecette(meal.idMeal);
                        })
                    })
                })
            })

        .catch(error => console.error("2.8- Erreur lors du chargement des recettes :", error));
    }); 
} 

affichageListe();
