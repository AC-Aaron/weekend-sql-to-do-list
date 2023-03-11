$(document).ready(onReady);

function onReady(){
    //here are where the event listeners will go:
    $('#addTaskButton').on('click', addTask);

};
console.log('client file is working')

function addTask(){
    let taskToAdd = {
        task: $('#taskInput').val(),
        complete:'false'
    }
    console.log('in addTask', taskToAdd);

    // send to server
    $.ajax({
        type:'POST',
        url:'/tasks',
        data:taskToAdd
    }).then((response)=>{
        console.log('back from POST:', response);
        
        //to clear input field
        $('#taskInput').val('');

        //refresh data and DOM
        getTasks();
    }).catch((error) => {
        alert('Error adding task', error);
    })
};


function getTasks(){
    console.log('in getTasks')
    $.ajax({
        type:'GET',
        url:'/tasks'
    }).then((result) => {
        console.log('in get tasks')
        render(result);
    }).catch((error) => {
        alert('Error getting tasks:', error);
    })
};

//function to mark tasks as complete on DOM
function markComplete(){
    console.log('in mark complete:');
    const idToMarkReady = $(this).parent().data().id;
    
    $.ajax({
        method:'PUT',
        url:``
    })
}

function render(object){
    console.log('in render', object);
    
    $('#tableContent').empty();
    //for loop
    for (let i = 0; i<object.length; i++){
        
        $('#tableContent').append(`
        <tr data-id=${object[i].id}>
            <td>${object.task}</td>
            <td>${object.complete}</td>
            <td id="markCompleteButton"><button id="completeButton">Task Complete</button></td>
            <td><button id="deleteButton">Delete Task</button></td>
        </tr>
        `)
        
    }
}
