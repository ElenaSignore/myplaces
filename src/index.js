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
        if(calculateWinner(sq) || sq[i]){
            return;
        }
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
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        console.log('i', i);
        console.log('lines', lines, 'lines.length', lines.length)
        const [a, b, c] = lines[i];
        console.log('cons abc', [a, b, c])
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            console.log('squares', squares[a])
            return squares[a];
        }
        return null;
    }
}

// ======================================== //

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
