const newTaskForm = {
    init: function() {
        // récupérer le formulaire
        const formEl = document.querySelector('.task--add form');

        console.log(formEl);
        // ajouter un listener
        formEl.addEventListener('submit', newTaskForm.handleAddFormSubmit);
    }, 
    handleAddFormSubmit : function(evt) {
        console.log('soumission du formulaire d ajout');
        // désactivation de la soumission par le navigateur 
        evt.preventDefault();

        // différentes manières de récupérer les valeurs
        // document.querySelector('form .task__title-field');
        
        // Ici si le html change il faudra changer les instructions
        // let titleName = document.forms[0].querySelector('input').value;
        // let selectCat = document.forms[0].querySelector('select').value;
        // let form = document.querySelector('.task');
        // let inputElement = form.querySelector('input');
        

        // récupérer le formulaire 
        const formEl = evt.currentTarget;
        // récupérer les informations saisies par l'utilisateur

        //   on récupère les différents éléments du formulaire
        const taskNameEl = formEl.querySelector('.task__title-field');
        const taskCategoryEl = formEl.querySelector('select');

        //   puis leurs valeurs
        const taskName = taskNameEl.value;
        const taskCategory = taskCategoryEl.value;

        // console.log(taskName, taskCategory);
        // TODO il faudra récupérer l'identifiant de la tache qui a été créé par l'API
        const taskId = 500;
        tasksList.createAndAddTaskToList(taskCategory, taskName, taskId);

        // vider les sélections
        taskNameEl.value = '';

        // on peut également réinitialiser complètement le formulaire.
        // formEl.reset();
        taskNameEl.focus();
    }
}