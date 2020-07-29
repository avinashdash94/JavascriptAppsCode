///Storing data in an object so that we can see it even when we open the browser again
//localStorage.getItem() retuns true or false if data is exist or not acccordingly
//So in below we created data object that contans data form localstorage if exist if not then it will create an empty Object with two key todo:[] , completed:[]
var data = (localStorage.getItem('todoList'))?JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

//console.log(data);
//To get the stored item form local storege initialy when we start app
//renderTodoList();
//console.log(JSON.parse(localStorage.getItem('todoList')));

// Remove and complete icons in SVG format
var removeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var completeSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';
     
//To get the stored item form local storege initialy when we start app
renderTodoList();

//User clicked on button 
//If there is any text inside the item, add that text to the todo list on click event
document.getElementById('add').addEventListener('click', function(){
   // console.log("saffdsad")
    var value = document.getElementById('item').value;
    if(value){
        addItem(value); // passed value to add item into the list of dom
        // addItemTodo(value);
        // document.getElementById('item').value = '';

        // data.todo.push(value); // before add data to list add it to todo list of data object above defined so that we can store it in browser storage 
        // dataObjectUpdated();
        //console.log(data);
    }      
});

document.getElementById('item').addEventListener('keydown', function(e){  // on input field if we click enter button after enter some data
    var value = this.value;
    //console.log(e.code === 'Enter');
    if(e.code === 'Enter' && value)
    {
        addItem(value);
        //console.log(value);
    }
})

function addItem(value)
{
    addItemToDOM(value);
    document.getElementById('item').value = '';

    data.todo.push(value); // before add data to list add it to todo list of data object above defined so that we can store it in browser storage 
    dataObjectUpdated();

}
function addItemToDOM(text, completed)
{
    var list = (completed)?document.getElementById('completed') : document.getElementById('todo');//ul tag// check which ul it is completed or todo 
    var item = document.createElement('li');  //li tag
    item.innerText = text;    // text inside li

    var buttons = document.createElement('div'); //  li + text + div(remove button, complete button )
    buttons.classList.add('buttons');

    var remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    //Add click event for removing item
    remove.addEventListener('click', removeItem);// while creating remove button we added an event with it so when we click on  remove it will remove the item from list

    var complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;
    complete.addEventListener('click', completeItem);// while creating remove button we added an event with it so when we click on  complete it will add into completed item list

    buttons.appendChild(remove);
    buttons.appendChild(complete);

    item.appendChild(buttons);

    list.insertBefore(item, list.children[0]);// to append newly added item  append before the 1st child of ul

    //console.log(item)
}


function removeItem()
{
    //console.log(this.parentNode.parentNode);// button parent is button class and it's further parent is <li>
    var item = this.parentNode.parentNode; //current <li>
    var parent = item.parentNode; // will give ul tag og current <li>
    var id = parent.id ; //Taking id of <uL> as we will move from  uncomplete item list to complete
    //console.log(item.innerText); // will give the inner text
    var value = item.innerText;
    if(id === 'todo'){ // As value toggles from todo list  to complete list so to check in which list we have to add data
        data.todo.splice(data.todo.indexOf(value),1);      

    }
    else{
        data.completed.splice(data.completed.indexOf(value),1);
    }
    dataObjectUpdated();
    //console.log(data);
    //console.log(parent);  // 
    
    parent.removeChild(item); // Removing current list child from <ul> (parent tag)

}

function completeItem()
{
     //console.log(this.parentNode.parentNode);// button parent is button class and it's further parent is <li>
     var item = this.parentNode.parentNode; //current <li>
     var parent = item.parentNode; // will give ul tag og current <li>
     var id = parent.id ; //Taking id of <uL> as we will move from  uncomplete item list to complete
    //console.log(item.innerText); // will give the inner text
    var value = item.innerText;
    if(id === 'todo'){ // As value toggles from todo list  to complete list so to check in which list we have to add data
        data.todo.splice(data.todo.indexOf(value), 1);
        data.completed.push(value);

    }
    else{
        data.completed.splice(data.completed.indexOf(value), 1);
        data.todo.push(value);
    }
    dataObjectUpdated();
    //console.log(data); // To chek data in which lis it is moving 
     // to get  Id of targe list (either complet list or uncomplete list)
    //if it is in todo so it means it will go to complete or vice vers
     var target = (id == 'todo')? document.getElementById('completed') : document.getElementById('todo'); 

     parent.removeChild(item); // removing item form current list (compelt or uncomplete accordingly)

     target.insertBefore(item, target.children[0]);// add that item to target before its first child
     

}

function dataObjectUpdated()
{
    //console.log(data);  
    //console.log(JSON.stringify(data));  
    localStorage.setItem('todoList', JSON.stringify(data));
}

function renderTodoList(){
    if(!data.todo.length && !data.completed.length) return;  // if there is no data in the list ten return 
    
    for (var i = 0; i < data.todo.length; i++) {
        var value = data.todo[i];
        addItemToDOM(value);
      }
    
      for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addItemToDOM(value, true); // true for  saying that 
      }

}