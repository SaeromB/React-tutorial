해당글은 react tutorial 변역글입니다.
Square 컴포넌트가 <button> 이라는 element 만 render 하게 하라. Game 컴포넌트가 value 를 지니고 있는 보드를 render 한다. 현재는 상호작용하는 컴포넌트가 없다.

props 를 통해 데이터를 전달하다

board 컴포넌트에서 square 컴포넌트로 데이터를 전달해보자.

해당 Board 의 renderSquare 매소드를 보면 value 라는 porp(프라미터) square 에 전달하라 

<!--
-->
```Javascript
class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />;
    }
}
```
Square 의 render 메소드를 {/*TODO *}에서 {this.props.value} 로 변경합니다.
-->
```Javascript
class Square extends React.Component {
    render(){
        return (
            <button className='square'>
            {this.props.value}
            </button>
        )
    }
}
```
축하합니다! 방금 부모(parent)board의 컴포넌트에서 prop를 자식(child) Square 컴포넌트에 전달을 했습니다. passing props 는 리액트 앱에서 부모(parent)에서 자식(child)로 정보가 흘러드는 방법입니다.

#상호작용하는 컴포넌트 만들기
우리가 Square 컴포넌트를 클릭을 했을때 Square 컴포넌트를'X'로 체우자. 우선, Square 컴포넌트에 되돌아오는 버튼 태그를 바꿔라.

--> 
```Javascript
class Square extends React.Component {
    render() {
        return (
            <button className='square' onClick={function(){ alert('click');}}>{this.props.value}
            </button>
        );
    }
}
```
만약 지금 Square 를 클릭한다면 브라우저에서 alert를 볼 수 있다.

#NOTE 
타이핑 할 시간을 줄이고 헷갈리고 this 의 헷갈리는 행동을 안할려면 event handlers 를 사용할때 화살표 함수 문법(arrow function syntax) 를 사용하는 것이 좋다.

-->
```Javascript
class Square extends React.component {
    render() {
        return (
            <button className='square' onClick={()=>alert('click')}>{this.props.value}
            </button>
        );
    }
}
```
onClick={()=> alert('click)} 
를 통해 우리가 함수(function)를 onClick prop 로 전달하고 있다. 래액트는 이 함수를 클릭한 후에 실행할 것이다. 
()=> 를 까먹고 onClick={alert('click)} 를 하는 것은 누구나 할 수 있는 실수이다. 그리고 해당 함수를 실행하면 컴포넌트가 다시 render 하자마자 alert가 계속 실행될 것이다.

다음 단계에서 우리는 Square 컴포넌트가 클릭이 작동이 되었는지 기억할수 있도록 만들고 'X' 마크로 채워진 것을 원한다. 
# 컴포넌트가 실행되었는지 기억(remember) 하기 위해서 컴포넌트는 'state'를 사용한다.

리액트 컴포넌트는 state를 사용하기 의해서 constructor 안에 this.state 를 집어 넣으면 된다. this.state 는 해당 규정하는 리액트 컴포넌트에 전용으로 사용된다고 생각하면 된다. 그럼 현재 Square 의 현재 value 를 this.state 에 넣으면 그리고 클릭이 되었을때 이를 바꾸자.

우선, 우리는 class 안에 constructor 를 더해서 state를 초기화한다.

-->
```Javascript
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            value:null,
        };
    }
    render() {
        return (
            <button className='square' onClick={() => alert('click')}>{this.props.value}
            </button>
        );
    }
}
```
-->
#NOTE
자바스크립트 클래스에서 constructor의 subclass를 정의할때 항상 super 를 붙어야한다. 모든 리액트 컴포넌트 constructor를 가지고 있는 클래스들은 super(props) 를 사용해야한다.

이제 우리는 Square render 메서드를 바꿔서 클릭할때마다 현재 상태의 value가 나타나게 해야한다 .

<button> 태그 안에 this.props.value 대신 this.state.value 를 적어라.
onClic={..} event handler 대신에 onClick={()=> this.setState({value: 'X})} 를 대신한다.
className과 onClick props를 읽기 좋게 다른 라인에 적어놓는다.

해당 변화가 이루어지면 Square <button> 태그는 

