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
#subclasses 를 사용할때 꼭 super(props) 라고 정의해야한다.

이제 우리는 Square render 메서드를 바꿔서 클릭할때마다 현재 상태의 value가 나타나게 해야한다 .
->value 를 null로 하는 이유?

<button> 태그 안에 this.props.value 대신 this.state.value 를 적어라.
onClick={..} event handler 대신에 onClick={()=> this.setState({value: 'X})} 를 대신한다.
className과 onClick props를 읽기 좋게 다른 라인에 적어놓는다.

해당 변화가 이루어지면 Square reder 메소드로 return 된 Square <button> 태그는 
-->
```Javascript
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:null,
        };
    }

    render() {
        return (
            <button className='square' onClick={() => this.setState({value:'X'})}>
            {this.state.value}
            </button>
        );
    }
}
```
-->
Square 메소드 있는 onClick handler애 this.setState 우리는 <button> 이 클릭이 되었을떄마다 리액트가 square를 다시 render 하게한다. 업데이트 후에는 Square의 this.state.value 가 'X' 가 될 것이다. 그래서 우리가 게임보드에 X를 볼수 있는 것이다. 만약 아무 Square를 누른다면 X가 나타날 것이다. 그래서 해당 컴포넌트를 실행시키면 각 박스를 누를때마다 x가 나오는 것을 볼수가 있다.

? 그럼 여기에서 state 는 기억해야할 props 인데 여기에서 

setState 이라는 컴포넌트는 리액트에서 자동적으로 child component (자식 컴포넌트)를 업데이트를 한다.

# State 를 올려라
현재 각각의 Square 컴포넌트는 게임의 state 를 유지시킨다. 우승자를 확인하기 위해서 우리는 9칸에 각각의 value 를 넣을 것이다. 

우리가 생각하기에는 보드가 Square 에 각각의 Square 의 state를 물어봐야한다고 생각한다. 리액트에서 해당 접근이 가능하지만 코드가 복잡해지므로 이름 허용하지 않는다. 가장 좋은 밥법은 보드 컴포넌트가 각각의 Square의 props를 나열하면서 보여줄수 잇다.

multiple children으로부터 아님 두개 그이상의 자식 컴포넌트의 데이터를 모우기위해서는 parent 컴포넌드를 다시 children 컴포넌트를 props를 사용하여 전달할 수 있다. 이는 자식 컴포넌트들이 서로 그리고 부모 요소들과 함께 싱크로나이즈 될수 있도록 한다.

예시) Board 에 constructer 을 만들고 보드의 초기 단계를 나열되는 9개의 null 이 들어갈수 있게 해봐라

--->
```Javascript
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            squarers: Array(9).fill(null),
        };
    }

    renderSquare(i) {
        return <Square valve={i} />;
    }
}
```
나중에 보드를 체우면 this.stae.squares array는 이렇게 보일것임

-->
```Javascript
[
    '0', null, 'X',
    'X', 'X, '0',
    '0', null, null,

]
```
-> ? 음 그럼 여기에 null 만 있어야하는거아닌가?

보드의 renderSquare 매소드는 현재 이럴게 되어있다.

-->
```Javascript

renderSquare(i) {
    return <Square value={i} />;
}
```
처음에는 보드의 value props를  각 상자에 0부터 8까지의 숫자를 보여주도록 전달하였다. 다른 단계에서는 우리는 숫자대신 Square의 state를 'X'로 지정하여 숫자대신 상자에 'X' 를 집어 넣었다. 이것이 현재 Square 이 value props를 무시하는 이유이다.

우리는 다시 prop를 사용하여 전달하는 방법을 다시 사용해야한다. 우리는 보드를 수정하여 각 Square안에 현재의 value ('X', '0', or null)를 지시해야한다? 우리는 먼저  square 나열을 Board의 컨스트럭터에 정의를 해보았따 그리고 우리는 Board의 renderSquare 메소드를 통해 수정할 것이다.?

-->
```Javascript
renderSquare(i) {
    return <Square value={this.state.squares[i]}/>;
}
```
