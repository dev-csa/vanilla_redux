# nomade coder redux 강의 

## 개념 미리 정리하기
앞으로 접하게 될 키워드들에 대해서 미리 알아보는 시간을 가져보겠습니다. 대략적인 개념만 간략히 알아보는 것 이므로, 도중에 잘 이해가 안가는게 있더라도, 나중에 직접 사용해본 다음에 이 섹션으로 다시 돌아와서 다시 읽으시면 이해가 더욱 잘 될 것입니다.

### 액션 (Action)
상태에 어떠한 변화가 필요하게 될 땐, 우리는 액션이란 것을 발생시킵니다. 이는, 하나의 객체로 표현되는데요, 액션 객체는 다음과 같은 형식으로 이뤄져있습니다.
```js
{
  type: "TOGGLE_VALUE"
}
```

액션 객체는 type 필드를 필수적으로 가지고 있어야하고 그 외의 값들은 개발자 마음대로 넣어줄 수 있습니다.

예시:
```js
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
{
  type: "CHANGE_INPUT",
  text: "안ㄴ"
}
```
액션 생성함수 (Action Creator)
액션 생성함수는, 액션을 만드는 함수입니다. 단순히 파라미터를 받아와서 액션 객체 형태로 만들어주죠.

```js
function addTodo(data) {
  return {
    type: "ADD_TODO",
    data
  };
}

// 화살표 함수로도 만들 수 있습니다.
const changeInput = text => ({ 
  type: "CHANGE_INPUT",
  text
});
```

### 리듀서 (Reducer)
리듀서는 변화를 일으키는 함수입니다. 리듀서는 두가지의 파라미터를 받아옵니다.
```js
function reducer(state, action) {
  // 상태 업데이트 로직
  return alteredState;
}
```
리듀서는, 현재의 상태와, 전달 받은 액션을 참고하여 새로운 상태를 만들어서 반환합니다. 자세한건, 추후 직접 구현하면서 알아보겠습니다.

### 스토어 (Store)
리덕스에서는 한 애플리케이션 당 하나의 스토어를 만들게 됩니다. 스토어 안에는, 현재의 앱 상태와, 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있습니다.

### 디스패치 (dispatch)
디스패치는 스토어의 내장함수 중 하나입니다. 디스패치는, 액션을 발생 시키는 것 이라고 이해하시면 됩니다. dispatch 라는 함수에는 액션을 파라미터로 전달합니다.. dispatch(action) 이런식으로 말이죠.

그렇게 호출을 하면, 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 액션을 참고하여 새로운 상태를 만들어줍니다.

### 구독 (subscribe)
구독 또한 스토어의 내장함수 중 하나입니다. subscribe 함수는, 함수 형태의 값을 파라미터로 받아옵니다. subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출됩니다.

# 여기부턴 강의정리 
# 1.1 Store? where you store(=put) your data

```js
    const countModifier = (state = 0) => {   // 나의 데이터를 modify 하는 함수(=reducer). return 하는 값이 내 데이터다 (?)  
        console.log(state);                     //state = 0 로 초기값 지정 
        return state;
    } 
    const countStore = createStore(countModifier);  //데이터를 담을 곳 
```

## action
reduce함수로 state를 변경하려고 할 때 사용하는 것

액션을 어떻게 정의하느냐? dispatch() 이용

```js
    const countModifier = (count = 0, action) => {   // 나의 데이터를 modify 하는 함수. return 하는 값이 내 데이터다 (?)  => 리듀서 라고 부름 
        console.log(count, action);
        if(action.type === "ADD"){
            console.log("do Add");
        }
        return count;
    } 
    const countStore = createStore(countModifier);  //데이터를 담을 곳 

    countStore.dispatch({type: "ADD"});  //JSON 형식으로 들어가야함 
```

## 버튼에 추가하기
```js
    import {createStore} from "redux";

    const add = document.getElementById("add");
    const minus = document.getElementById("minus");
    const number = document.querySelector("span");

    const countModifier = (count = 0, action) => {   // 나의 데이터를 modify 하는 함수. return 하는 값이 내 데이터다 (?)  => 리듀서 라고 부름 
        if(action.type === "ADD"){
            return count + 1;
        } else if (action.type === "MINUS"){
            return count - 1;
        }else{
            return count;
        }
    
    } 
    const countStore = createStore(countModifier);  //데이터를 담을 곳 

    const handleAdd = function() {
        countStore.dispatch({type: "ADD"});
    }
    const handleMinus = function() {
        countStore.dispatch({type: "MINUS"});
    }

    add.addEventListener("click", handleAdd);
    add.addEventListener("click", handleMinus);
```
## subscribe 
```js
    state를 받아보는 놈 
    const onChange = function() {
        number.innerText = countStore.getState();
    };

    countStore.subscribe(onChange);   //state 변화를 감지하는 함수 = subscribe
````



