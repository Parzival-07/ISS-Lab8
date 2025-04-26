document.addEventListener('DOMContentLoaded', () => {
    const TaskInput = document.getElementById('taskInput');
    const AddTaskButton = document.getElementById('addTaskBtn');
    const TaskList = document.getElementById('taskList');

    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      #taskCounter {
        text-align: center;
        margin-top: 20px; /* Adjusted margin */
        margin-bottom: 10px; /* Added margin */
        font-weight: bold;
        color: #555; /* Added color */
      }
    `;
    document.head.appendChild(styleSheet);

    const TaskCounter = document.createElement('div');
    TaskCounter.id = 'taskCounter';
    TaskList.parentNode.insertBefore(TaskCounter, TaskList);
    let Tasks = [];

    const UpdateTaskCounter = () => {
      const TasksRemaining = Tasks.filter(task => !task.completed).length;
      TaskCounter.textContent = `${TasksRemaining} task${TasksRemaining !== 1 ? 's' : ''} remaining`;
    };
    const RenderTasks = () => {
      TaskList.innerHTML = '';

      Tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text; 
        if (task.completed) {
          li.classList.add('completed');
        }
        li.addEventListener('click', (e) => {
          if (e.target.tagName !== 'BUTTON') {
            Tasks[index].completed = !Tasks[index].completed;
            RenderTasks(); 
          }
        });

        const DeleteButton = document.createElement('button');
        DeleteButton.textContent = 'Delete';
        DeleteButton.classList.add('delete-btn'); 

        DeleteButton.addEventListener('click', () => {
          Tasks.splice(index, 1); 
          RenderTasks();
        });
        li.appendChild(DeleteButton);
        TaskList.appendChild(li);
      });

      UpdateTaskCounter();
    };
    const AddTask = () => {
        const TaskText = TaskInput.value.trim(); 

        if (TaskText !== '') {
          Tasks.push({
            text: TaskText,
            completed: false 
          });

          TaskInput.value = ''; 
          TaskInput.focus(); 
          RenderTasks(); 
        }
    };


    AddTaskButton.addEventListener('click', AddTask);

    TaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        AddTask(); 
      }
    });

    RenderTasks();
  });