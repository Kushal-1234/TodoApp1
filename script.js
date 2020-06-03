let i = 0;
let todoData = [];


function submitTodo()
{  
    let todoVal = document.querySelector('.todo').value;
    let err = document.getElementById('error');

    if ( todoVal === '' && err===null)
    {
        let element = document.createElement('h6');
        element.textContent = 'Please enter something that you need todo!';
        element.setAttribute('id','error');
        element.classList.add('err','text-center', 'text-danger')
        let pos = document.getElementById('todo-head1');
        pos.appendChild(element);   

    }
    else if(todoVal !== '')
    {   
        if(err!==null){err.remove()};

        let element = document.createElement('div');
        element.classList.add('test','p-2','bd-highlight','single-line');
        element.setAttribute('id','flex-item' + i);
        let pos1 = document.getElementById('todo-list');
        pos1.appendChild(element);
        
        //position of the element where input and label fields are added
        let pos2 = document.getElementById('flex-item' + i);
        createInputField(pos2);
        

        //create label field with pos and value of label
        createLabel(todoVal,pos2);

        document.querySelector('.todo').value = '';

        //to del button
        addDeleteButton(pos2);

        //add edit button
        addEditButton(pos2);

        //checkboxes functionality
        checkboxDone();
        
        //to identify repeated tasks
        // identifyRepeated(todoVal);
        
        i++;
        
    }
        
}


//input checkbox field
function createInputField(pos){
    let input = document.createElement('input');
    input.classList.add('check','m-2','text-secondary')
    input.setAttribute('type','checkbox');
    input.setAttribute('id','check');
    pos.appendChild(input);

}

//label field and content
function createLabel(val,pos){
    let label = document.createElement('label');
    label.classList.add('label');
    label.setAttribute('id','label');
    label.textContent = val;
    pos.appendChild(label);
}

// create delete button
function addDeleteButton(pos){
    let del_btn = document.createElement('button');
    del_btn.setAttribute('id','delete_btn');
    del_btn.classList.add('del_btn','float-right','btn', 'btn-sm' , 'btn-dark');
    del_btn.textContent = 'Delete';
    pos.appendChild(del_btn);
    //Call del functionality
    deleteButton();
}

//add Edit button
function addEditButton(pos){
    let edit_btn = document.createElement('button');
    edit_btn.setAttribute('id','edit_btn');
    edit_btn.setAttribute('contenteditable','false')
    edit_btn.classList.add('edit_btn','mr-3','float-right','btn','btn-sm','btn-dark');
    edit_btn.textContent = 'Edit';
    pos.appendChild(edit_btn);
    
    editButton();
}

//edit button functionality


function editButton(){

    let edit_button = document.getElementsByClassName('edit_btn');

        for(let n=0; n < edit_button.length; n++){ 
            let i=0;
            edit_button[n].onclick = function(){ 

                let currentEdit = this.parentNode;

                for(let n=0; n<edit_button.length; n++){  

                    if(edit_button[n].parentNode === currentEdit){
                        currentEdit.getElementsByClassName('del_btn')[i].remove(); 
                        currentEdit.getElementsByClassName('check')[i].remove();
                        currentEdit.setAttribute('contenteditable','true');
                        saveButton(currentEdit)
                        restrictEnter();
                        this.remove();
                        i++;
                        
                    }                             
                }        
            }
        }
    }

function restrictEnter(){
    addEventListener('keydown',function(e){
        if(e.keyCode === 13){
            e.preventDefault();
        }
    });
}



function saveButton(currentSave){
    let save_btn = document.createElement('button');
    save_btn.classList.add('save_btn','btn','float-right','btn-sm','btn-dark','inline');
    save_btn.textContent = 'Save';
    pos = currentSave;
    pos.insertAdjacentElement('afterend',save_btn); 
    saveButtonFunction();  
}

function saveButtonFunction(){

    let save_button = document.getElementsByClassName('save_btn');
    
    for(let n=0; n < save_button.length; n++){        
     
        save_button[n].onclick = function(){
       
            currentSave = this.previousSibling;   
            currentSave.setAttribute('contenteditable','false');
            let value = this.previousSibling.textContent;
            
            if(value.length !== 0){
                this.previousSibling.textContent = '';
                this.remove(); 
                createInputField(currentSave);
                if(value.length>90){
                    value = value.slice(0,50);   
                    createLabel(value,currentSave);
                    checkboxDone();
                    
                    addDeleteButton(currentSave);
                    addEditButton(currentSave);        
                }
                else{ 
                    createLabel(value,currentSave);
                    checkboxDone();
                    
                    addDeleteButton(currentSave);
                    addEditButton(currentSave);
                }      
            }
            else{
                this.previousSibling.remove();
                this.remove();
            }
                
        }
    }
}

//del Button functionality
function deleteButton(){
    let delete_btn = document.getElementsByClassName('del_btn');
        for(let n=0; n < delete_btn.length; n++)
        {
            delete_btn[n].onclick = function(){
                let currentDelete = this.parentNode; 
                for(let n=0; n < delete_btn.length; n++)
                {
                    if(delete_btn[n].parentNode === currentDelete)
                    {
                        delete_btn[n].parentNode.remove();  
                    }
                }
            }   
        }
}


//Error Check and add data on "Enter" button press

function inputCheck(){
    
    let todoVal = document.querySelector('.todo').value;
    let err = document.getElementById('error');
    if(todoVal !== '' && err !== null){
        err.remove();
    }   
    else if(event.keyCode === 13){
        submitTodo();
    }

}



//Checked data displayed under Todo's done

function checkboxDone(){
    let todo_list = document.getElementsByClassName('check');   
    for(let n=0; n < todo_list.length; n++)
    {   
        todo_list[n].onclick = function(){
            for(let n=0; n < todo_list.length; n++){
                
                if(this.checked === true){ 
                    let todoData = this.parentNode;
                    let todoDone = document.getElementsByClassName('todo-items-done');                          
                    todoDone[n].appendChild(todoData);
                    todoData.children[2].remove();
                    todoData.children[2].remove();
                    todoItemsDone_DeleteAll();
                    break;
                } 
                else{
                    let todoData = this.parentNode;
                    let todoAddAgain = document.getElementById('todo-list');    
                    addDeleteButton(todoData);
                    addEditButton(todoData);
                    todoAddAgain.appendChild(todoData);
                    todoItemsDone_DeleteAll();    
                    break;
                }                   
            }
        }
    }
}



let n=0;
function todoItemsDone_DeleteAll(){
    let todoItemsDoneLength = document.getElementById('todo-done').children.length;
    let deleteAllexists = document.getElementsByClassName('deleteAll')[0];   
    // if(todoItemsDoneLength > 2 && n === 0){
    if(deleteAllexists == null){
        let pos = document.querySelector('.todo-head2');
        var deleteAll = document.createElement('button');
        deleteAll.classList.add('deleteAll', 'btn','btn-dark','btn-sm','float-right');
        deleteAll.textContent = 'Delete All';
        pos.append(deleteAll);
    
        deleteAll.onclick = function(){           
            try {
                for(let k=0; k<todoItemsDoneLength-1 ;i++){
                    this.parentNode.parentNode.children[todoItemsDoneLength-1].remove();
                }
            }
            catch (error) {    
                deleteAll.remove();
                n=0;
            }            
        }
    }
    else if(todoItemsDoneLength === 2)
    {
        document.getElementsByClassName('deleteAll')[0].remove();
    }    
    n++; 
}





//to identify repeated todos
// function identifyRepeated(todoAdding){
    
//     const obj = {
//         data: todoAdding,
//     }

//     if(todoData && todoData.length){
//         let index =0;
//         todoData.forEach((res) => {
//             if(res.data === obj.data){
//                 console.log('matched');
//                 index =1;
//             }    
//         });
//         if (index === 0){
//             todoData.push(obj);
//             console.log(todoData);
//         } else {
//             // submitTodo();
//         }

//     }
//     else{
//         todoData.push(obj);
//         console.log(todoData);
//     }
// }  

//RESPONSIVE TO LAPTOP










