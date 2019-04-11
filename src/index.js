import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(<App />, document.getElementById('root'));


class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i} />
    }
}
class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }
    render() {
        return (
            <button className='square' onClick= {()=>{this.setState({value: 'X'})}}>
                {this.state.value}
            </button>
        );
    }
}

class Board extends React.Component {
    rederSquare(i) {
        return <Square value={i} />;
    }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


/*******
 * 해당 컴포넌트를 통해 
 * parent Board 컴포넌트를 
 * child square 컴포넌트에 전달한것을 알 수 있음
 샘플 실습

 
 function formatName(user) {
     return user.firstName+ '' + user.lastName;
 }

 const user = {
     firstName: 'Saerom',
     lastName: 'Bang'
 };

 const element = (
     <h1>
         Hello, {formatName(user)}!
     </h1>
 );
function getGreeting(user){
    if (user) {
        return<h1>Hello, {formatName(user)}!</h1>;
    }
    return <h1>Hello, Stranger.</h1>;
}
 ReactDOM.render(<App />, document.getElementById('root'));
*/
