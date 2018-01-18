var todos = [];
var done = [];

var addTodoButton = document.getElementById('add-todo-button');

addTodoButton.addEventListener('click',addTodoButtonClicked);

function addTodoButtonClicked(e) {
    var addTodoForm = document.getElementById('add-todo-form');
    var todo = addTodoForm.value;
    todos.push(todo);
    done.push(false);
    addTodoForm.value = '';
    render();
}

function render() {
    console.log(todos);
    var outerBox = document.querySelector('.outer-box');
    outerBox.innerHTML = '';

    for(var i=0; i < todos.length; i++) {

        var innerDiv = document.createElement('div');
        innerDiv.setAttribute('class','todo-item');
        innerDiv.setAttribute('id','todo-item-'+i);

        var todoItem = document.createElement('input');
        todoItem.setAttribute('type','form');
        todoItem.setAttribute('disabled','true');
        todoItem.setAttribute('value',todos[i]);
        todoItem.setAttribute('id','form-'+i);
        todoItem.addEventListener('keyup',onKeyUp);
        if(done[i] === true) {
            todoItem.setAttribute('style','text-decoration: line-through');
        }
        var todoItemSpan = document.createElement('span');
        todoItemSpan.appendChild(todoItem);
        innerDiv.appendChild(todoItemSpan);

        var editButton = document.createElement('input');
        editButton.setAttribute('type', 'button');
        editButton.setAttribute('value', 'Edit');
        editButton.setAttribute('id','button-'+i);
        editButton.addEventListener('click',editButtonClicked);
        var editButtonSpan = document.createElement('span');
        editButtonSpan.setAttribute('class', 'todo-item-edit');
        editButtonSpan.appendChild(editButton);
        innerDiv.appendChild(editButtonSpan);

        var deleteButton = document.createElement('input');
        deleteButton.setAttribute('type', 'button');
        deleteButton.setAttribute('value', 'Delete');
        deleteButton.setAttribute('id','delete-'+i);
        deleteButton.addEventListener('click',deleteButtonClicked);
        var deleteButtonSpan = document.createElement('span');
        deleteButtonSpan.setAttribute('class', 'todo-item-delete');
        deleteButtonSpan.appendChild(deleteButton);
        //console.log(deleteButtonSpan);
        innerDiv.appendChild(deleteButtonSpan);

        var doneButton = document.createElement('input');
        doneButton.setAttribute('type', 'button');
        doneButton.setAttribute('id','done-'+i);
        if(done[i] === false) {
            doneButton.setAttribute('value', 'Done');
        }
        else {
            doneButton.setAttribute('value','Undone');
        }
        doneButton.addEventListener('click',doneButtonClicked);
        var doneButtonSpan = document.createElement('span');
        doneButtonSpan.setAttribute('class', 'todo-item-done-undone');
        doneButtonSpan.appendChild(doneButton);
        //console.log(doneButtonSpan);
        innerDiv.appendChild(doneButtonSpan);

        outerBox.appendChild(innerDiv);

    }

    //console.log(outerBox);
}

function editButtonClicked(e) {
    if(e.target.value === 'Edit') {
        e.target.parentNode.parentNode.children[0].children[0].removeAttribute('disabled');
        e.target.parentNode.parentNode.children[0].children[0].removeAttribute('style');
        e.target.value = 'Done Editing';
        var x = e.target.getAttribute('id').split('-');
        var idx = x[x.length-1];
        done[idx] = false;
        e.target.parentNode.parentNode.children[3].children[0].setAttribute('disabled',true);
    }
    else {
        e.target.parentNode.parentNode.children[0].children[0].setAttribute('disabled','true');
        e.target.value = 'Edit';
        render();
    }
}

function deleteButtonClicked(e) {
    var toDelete = e.target.parentNode.parentNode.children[0].children[0].value;
    console.log(toDelete);
    var index = todos.indexOf(toDelete);
    todos.splice(index,1);
    done.splice(index,1);
    console.log(todos);
    e.target.parentNode.parentNode.setAttribute('hidden','true');
}

function doneButtonClicked(e) {
    if(e.target.value === 'Done') {
        done[todos.indexOf(e.target.parentNode.parentNode.children[0].children[0].value)] = true;
        e.target.parentNode.parentNode.children[0].children[0].setAttribute('style', 'text-decoration: line-through');
        e.target.value = 'Undone';
    }
    else {
        done[todos.indexOf(e.target.parentNode.parentNode.children[0].children[0].value)] = false;
        e.target.parentNode.parentNode.children[0].children[0].removeAttribute('style');
        e.target.value = 'Done';
    }
}

function onKeyUp(e) {
    var id = e.target.getAttribute('id');
    id = id.split('-');
    var idx = id[id.length-1];
    done[idx] = false;
    todos[idx] = e.target.value;
    console.log(e.target);
}