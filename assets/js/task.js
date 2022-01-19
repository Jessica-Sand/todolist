const task = {
    init: function() {
        
    },
    attachAllListenersToOneTask: function(taskElement) {
        // on ajoute un 1er écouteur sur le title
        const titleElement = taskElement.querySelector('.task__title-label');
        titleElement.addEventListener('click', task.handleTaskLabelClick);

        // on ajoute un 2eme écouteur sur le champ type text
        const inputTitleField = taskElement.querySelector('.task__title-field');
        inputTitleField.addEventListener('blur', task.handleNewTitleBlur);

        // on ajoute un 3eme écouteur sur le champ type text qui écoute l'appuie sur une touche
        inputTitleField.addEventListener('keydown', task.handleValideNewTaskTitleOnEnterKey);


        /*
         * Validation d'une tache
         */
        // récupération du bouton de validation (.task__button--validate)
        // console.log(taskElement);
        const validationButtonEl = taskElement.querySelector('.task__button--validate');

        // console.log(validationButtonEl);
        // ajout de l'écouteur
        validationButtonEl.addEventListener('click', task.handleValidationButtonClick);
    },
    createTask: function (categoryName, taskName, taskId, completion = 0) {

        // console.log(document.getElementById('taskTemplate').content);
        let newTaskFragment = document.getElementById('taskTemplate').content.cloneNode(true);

        // vanina est un clone 'vide', ajoutons les infos dans ses enfants
        newTaskFragment.querySelector('.task__title-label').textContent = taskName;

        // attention pour modifier la valeur d'un champ de type input, il faut modifier sa value
        newTaskFragment.querySelector('.task__title-field').value = taskName;
        newTaskFragment.querySelector('.task__category p').textContent = categoryName;
        newTaskFragment.querySelector('.task').dataset.category = categoryName;
        newTaskFragment.querySelector('.task').dataset.id = taskId;
        
        // pour gérer la complétion de la tache
        newTaskFragment.querySelector('.progress-bar__level').style.width = completion+'%';
        if (completion == 100) {
            // changer la classe au niveau de la tache
            // console.log(newTaskFragment);
            newTaskFragment.querySelector('.task').classList.remove('task--todo');
            newTaskFragment.querySelector('.task').classList.add('task--complete');
        }
        // on ajoute les écouteurs sur cette nouvelle tache
        task.attachAllListenersToOneTask(newTaskFragment); 

        return newTaskFragment;
    },
    handleNewTitleBlur: function(evt) {
        // on récupère l'élément sur lequel l'événement a été attaché (ici le label sur lequel on a cliqué)
        const inputElement = evt.currentTarget;

        const taskElement = inputElement.closest('.task');

        // grace au dataset on a accès à l'identifiant de la tache
        console.log(taskElement.dataset.id);

        // on modifie la classe du parent
        taskElement.classList.remove('task--edit');
        taskElement.classList.add('task--todo');


        // il faut également modifier la valeur du title
        const titleElement = taskElement.querySelector('.task__title-label');
        titleElement.innerHTML = inputElement.value;
    },
    handleTaskLabelClick: function(evt) {

        // on récupère l'élément sur lequel l'événement a été attaché (ici le label sur lequel on a cliqué)
        const labelElement = evt.currentTarget;

        /*
            maintenant que l'on a récupéré le bon élément, on veut changer la classe task--todo en en task--edit
        */ 
        // récupérer la div qui a la classe task--todo
        // console.log(labelElement);
        // une première méthode est de récupérer successivement les parents
        // console.log(labelElement.parentElement);
        // console.log(labelElement.parentElement.parentElement);
        // console.log(labelElement.parentElement.parentElement.parentElement);

        // ou alors ou peut récupérer directement le bon élément grâce à la méthode closest
        const taskElement = labelElement.closest('.task');

        // on vérifie que la tache est bien en édition
        if (taskElement.classList.contains('task--todo')) 
        {
            taskElement.classList.remove('task--todo');
            taskElement.classList.add('task--edit');

            // on veut mettre le focus sur le champ d'édition

            const inputTitleField = taskElement.querySelector('.task__title-field');
            inputTitleField.focus();
        }
    },
    handleValidationButtonClick: function(evt) {
        /*
         * Validation d'une tache
         */
        // on récupère l'élément sur lequel l'événement a été attaché (ici le label sur lequel on a cliqué)
        const buttonElement = evt.currentTarget;
        // récupérer l'élément task parent grâce à la méthode closest
        const taskElement = buttonElement.closest('.task');

        taskElement.classList.remove('task--todo');
        taskElement.classList.add('task--complete');
    },
    handleValideNewTaskTitleOnEnterKey: function(evt) {
        // console.log('touche appuyée : ' + evt.key);

        // si l'on a appuyé sur entrée, on va vouloir valider le champ
        // le code se trouve déjà dans la méthode handleNewTitleBlur
        // et l'événement est attaché au même élément, alors on peut appeler cette fonction directement
        if (evt.key == 'Enter') {
            task.handleNewTitleBlur(evt);
        }
    }
}