$(document).ready(onReady);

function onReady(){
    //here are where the event listeners will go:
    $('#addTaskButton').on('click', addTask);
    $('#tableContent').on('click', '#markCompleteButton', markComplete);// this is for PUT
    $('#tableContent').on('click', '#deleteButton', deleteTask); //this is for delete
    getTasks();

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
    const idToMarkComplete = $(this).parent().data().id;
    
    $.ajax({
        method:'PUT',
        url:`/tasks/markComplete/${idToMarkComplete}`
    }).then((result) => {
        getTasks();
    }).catch((error) => {
        alert('error in mark clientside mark complete')
    })
}

function render(object){
    console.log('in render', object);
    
    $('#tableContent').empty();
    //for loop
    for (let i = 0; i<object.length; i++){
        
        $('#tableContent').append(`
        <tr data-id=${object[i].id}>
            <td>${object[i].task}</td>
            <td>${object[i].complete}</td>
            <td id="markCompleteButton"><button id="completeButton">Task Complete</button></td>
            <td><button id="deleteButton">Delete Task</button></td>
        </tr>
        `)
        
    }
}

//PUT
// function markComplete(){
//     console.log('in mark complete function');
//     const idToMarkComplete = $(this).parent().parent().data().id;

//     $.ajax({
//         method:'PUT',
//         url:`/tasks/markComplete/${idToMarkComplete}`
//     }).then((result) => {
//        getTasks();
//     }).catch((error) => {
//         console.log('error in markcomplete')
//     })
// }

//DELETE 
function deleteTask() {
    console.log('inside deleteButton', $(this).parent(),"P2", 
    $(this).parent().parent(), "P2Data", $(this).parent().parent().data() );
    const idToDelete = $(this).parent().parent().data().id;
    console.log("ID to delete:", idToDelete);


    $.ajax({
      method: 'DELETE',
      url: `/tasks/delete/${idToDelete}`
    })
    .then(function(response){
      console.log('Deleted task:',idToDelete);
      getKoalas();
    })
    .catch( function(error) {
      alert('Error deleting koala from database', error);
    })
  }
