const categoriesList = {
    init: function () {
        categoriesList.loadCategoriesFromAPI();
    },
    createSelect: function (jsonCategoryList, firstOptionText) {
        const selectEl = document.createElement('select');

        // on rajoute la première option
        const firstOptionEl = document.createElement('option');
        /*
        Pour ajouter du texte on peut utiliser
        .innerHTML ou textContent ou innerText
            */
        firstOptionEl.textContent = firstOptionText;

        // on ajoute l'option au select
        selectEl.appendChild(firstOptionEl);

        // boucler sur la liste des catégories pour créer les options
        /* 
            On peut utiliser `for of` ou for
        */
        for (currentCategory of jsonCategoryList) {
            const currentOption = document.createElement('option');
            /*
            Pour ajouter du texte on peut utiliser
            .innerHTML ou textContent ou innerText
                */
            currentOption.textContent = currentCategory.name;
            // currentOption.value = currentCategory.id;

            // on ajoute l'option au select
            selectEl.appendChild(currentOption);
        }

        // console.log(selectEl);
        return selectEl;
    },
    loadCategoriesFromAPI: function() {

        // par défaut l'appel se fait en GET
        // mais on peut définir un tableau d'options pour spéficier le verbe par exemple
        let fetchOptions = {
            method: 'GET',
            mode:   'cors', // CORS 
            cache:  'no-cache'
        };

        // on appelle l'api
        // fetch('https://benoclock.github.io/S07-todolist/categories.json', fetchOptions)
        fetch('http://localhost:8080/categories', fetchOptions)
        // ensuite on convertit la réponse en JSON
        .then(
            function (categoryData) {
                // on convertit la réponse HTTP en json (car on sait que l'API renvoit du JSON)
                // console.log('réponse recue', categoryData);
                return categoryData.json();
            }
        )
        // ensuite on travaille avec le JSON
        .then(
            function (jsonCategoryList) {
                // on travaille avec le JSON
                // console.log('réponse en JSON', jsonCategoryList);

                // créer un select
                const selectEl = categoriesList.createSelect(jsonCategoryList, 'Toutes les catégories');
                selectEl.classList.add('filters__choice');

                // ajouter le select au HTML
                document.querySelector('.filters__task--category').appendChild(selectEl);
                // const filterCategoryDiv = document.querySelector('.filters__task--category');
                // filterCategoryDiv.appendChild(selectEl);

                /* 
                    remplissons le deuxième select 
                    soit par copier / coder
                    soit par clone du select actuel
                    soit en créant une fonction qui permet de créer un select
                */
               // par clone 
            //    const categoryFormSelect = selectEl.cloneNode(true);
            //    categoryFormSelect.classList.remove('filters__choice');
            //    categoryFormSelect.options[0].innerText = 'Sélectionner une catégorie';
            //    document.querySelector('.task__category .select').appendChild(categoryFormSelect);

                // en créant une fonction 

                const categoryFormSelect = categoriesList.createSelect(jsonCategoryList, 'Sélectionner une catégorie');
                document.querySelector('.task__category .select').appendChild(categoryFormSelect);
            }
        )
        .catch(
            function(error) {
                console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            }
        );
    }
}
