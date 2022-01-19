const app = {
    init : function () {
        console.log('initialisation en cours ...');

        tasksList.init();

        categoriesList.init();

        newTaskForm.init();
    },
}



// on ajoute un écouteur d'événement pour lancer l'initialisation de l'app
document.addEventListener('DOMContentLoaded', app.init);