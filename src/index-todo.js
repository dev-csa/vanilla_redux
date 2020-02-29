import {createStore} from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = function(text){
    return { 
        type: ADD_TODO, 
        text 
    };
}

const deleteToDo = function(id){
    return { 
        type: DELETE_TODO, 
        id 
    };
}

const reducer = function(state = [], action) {
    switch(action.type){
        case ADD_TODO:
            // return [...state, {text: action.text, id: Date.now()}];
            return [{ text: action.text, id: Date.now() }, ...state];
        case DELETE_TODO:
            return state.filter(toDo => toDo.id !== action.id);
        default:
            return state;
    }
}
const store = createStore(reducer);

store.subscribe(()=>console.log(store.getState()));


const dispatchAddToDo = function(text){
    store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = function(e){
    const id = parseInt(e.target.parentNode.id)
    store.dispatch(deleteToDo(id));
}; 

const paintToDos = function(){
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(function(toDo) {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.innerText = "Del";
        btn.addEventListener("click", dispatchDeleteToDo);
        li.id = toDo.id;
        li.innerText = toDo.text;
        li.appendChild(btn);
        ul.appendChild(li);
    });
};
store.subscribe(paintToDos);

const onSubmit = function(e){
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);