/**
 * This module manage everything about multiple tasks at once
 * */
const tasksList = {
    init: function() {
        tasksList.attachListenersToAllTasks();
        
        tasksList.loadTasksFromAPI();
        // la 
    },
    attachListenersToAllTasks: function() {

        /*
         * rajouter un écouteur sur chaque tache
         */ 
        // on récupère tous les éléments dont la classe est `task`

        // attention on ne veut que les taches qui sont dans la liste des taches ( le formulaire d'ajout a aussi une classe `task` )
        const taskElementList = document.querySelectorAll('.tasks .task');

        // console.log(taskElementList);

        // et on leur ajoute un écouteur
        for (currentTaskElement of taskElementList) {

            task.attachAllListenersToOneTask(currentTaskElement); 
        }
    },
    createAndAddTaskToList :function(taskCategory, taskName, taskId, completion = 0) {

        // ajouter un nouvel élément dans le DOM

        let emptyTask = task.createTask(taskCategory, taskName, taskId, completion);
        // récupérer le template


        // ne reste plus qu'à ajouter ce 'record' à notre liste
        document.querySelector('.tasks').prepend(emptyTask);

    },
    loadTasksFromAPI: function() {
        console.log('loadTasksFromApi');
        let fetchOptions = {
            method: 'GET',
            mode:   'cors', // CORS 
            cache:  'no-cache'
        };

        // fetch('https://benoclock.github.io/S07-todolist/tasks.json', fetchOptions)
        fetch('http://localhost:8080/tasks', fetchOptions)
        .then(
            function(taskData) {
                return taskData.json();
            }
        )
        .then(
            function(jsonTaskList) {
                console.log(jsonTaskList);
                // pour chaque tache récupérée
                for (currentTask of jsonTaskList) {
                    
                    //   on va créer une nouvelle tache avec les bonnes infos
                    tasksList.createAndAddTaskToList(currentTask.category.name, currentTask.title, currentTask.id, currentTask.completion);
                    // et l'ajouter au html
                }
            }
        )
        
    }
}