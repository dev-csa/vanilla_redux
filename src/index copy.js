import {createStore} from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;
const ADD = "ADD";
const MINUS = "MINUS";
const countModifier = (count = 0, action) => {   // 나의 데이터를 modify 하는 함수. return 하는 값이 내 데이터다 (?)  => 리듀서 라고 부름 
    // if(action.type === "ADD"){                  // 얘가 리턴하는 모든것이 이 어플리케이션의 state가 된다. 
    //     return count + 1;                        //  (첫번쨰인자=현재state, 두번쨰인자=state를 변경할작업)
    // } else if (action.type === "MINUS"){
    //     return count - 1;
    // }else{
    //     return count;
    // }
    switch(action.type){
        case "ADD":
            return count + 1;
        case "MINUS":
            return count - 1;
        default:
            return count;
    }
   
} 
const countStore = createStore(countModifier);  //데이터를 담을 곳 

const onChange = function() {
    number.innerText = countStore.getState();
};

countStore.subscribe(onChange);   //state 변화를 감지하는 함수 = subscribe

const handleAdd = function() {
    countStore.dispatch({ type: ADD });
};
const handleMinus = function() {
    countStore.dispatch({ type: MINUS });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);