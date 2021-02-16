import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
{/* "value" presente nel componente figlio Square DEVE essere uguale a quanto scritto nel componente padre Board */ }
{/* La funzione seguente mostra un alert al click sul bottone. Si può inserire direttamente
    nel button così: onClick={function() {alert('click');}}. 
    La arrow function equivalente è:  () => {alert('click');}
    nota: rimuovendo: () => {} e lasciando solo: onClick={alert('click')} il codice verrebbe 
    riprodotto all'infinito entrando in loop.

    function(){
    alert('click');
} */}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }
    handleClick(i) {
        const sq = this.state.squares.slice();
        sq[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({ 
            squares: sq,
            xIsNext: !this.state.xIsNext,
        });
    }
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }
    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ======================================== //

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
