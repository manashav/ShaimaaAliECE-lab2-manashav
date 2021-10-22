import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props){
  return(
    <button className="square" onClick={props.onClick} 
    style={{
          backgroundColor: props.value !== null ? props.value : "white",         
        }} /> //this is where I change the colour of the box. If the value of the square is null, then make it white
        //if it is not white then have it be the same colour as the value of the box. the values have been set to be the colours
  );
}
class Grid extends React.Component
{
  
  //renders the squares and sets its value to be what is written in the square
  renderSquare(i)
  {   
    return (<Square 
      value={this.props.squares[i]}
      onClick = {() => this.props.onClick(i)} 
      />
      );

      
  }

  //creates 42 squares and makes it 6x7 - similar to a real connect 4 game
  render()
  {
    return (
      <div>
        <div className="board-now">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
        </div>
        <div className="board-now">
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
        </div>
        <div className="board-now">
          {this.renderSquare(14)}
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
        </div>
        <div className="board-now">
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
        </div>
        <div className="board-now">
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}
          {this.renderSquare(32)}
          {this.renderSquare(33)}
          {this.renderSquare(34)}
        </div>
        <div className="board-now">
          {this.renderSquare(35)}
          {this.renderSquare(36)}
          {this.renderSquare(37)}
          {this.renderSquare(38)}
          {this.renderSquare(39)}
          {this.renderSquare(40)}
          {this.renderSquare(41)}
        </div>
      </div>
    )
  }
}

//calculates all the winners - have included all possible combinations for winners
function calculateWinner(squares){
  const lines = [
    [0,1,2,3],[1,2,3,4],[2,3,4,5],[3,4,5,6],
    [7,8,9,10],[8,9,10,11],[9,10,11,12],[10,11,12,13],
    [14,15,16,17],[15,16,17,18],[16,17,18,19],[17,18,19,20],
    [21,22,23,24],[22,23,24,25],[23,24,25,26],[24,25,26,27],
    [28,29,30,31],[29,30,31,32],[30,31,32,33],[31,32,33,34],
    [35,36,37,38],[36,37,38,39],[37,38,39,40],[38,39,40,41],
    [0,7,14,21],[7,14,21,28],[14,21,28,35],
    [1,8,15,22],[8,15,22,29],[15,22,29,36],
    [2,9,16,23],[9,16,23,30],[16,23,30,37],
    [3,10,17,24],[10,17,24,31],[17,24,31,38],
    [4,11,18,25],[11,18,25,32],[18,25,32,39],
    [5,12,19,26],[12,19,26,33],[19,26,33,40],
    [6,13,20,27],[13,20,27,34],[20,27,34,41],
  ];
  for(let i=0;i<lines.length;i++)
  {
    const [a,b,c,d] = lines[i];
    //if the value in all 4 boxes in the winning combination is the same color then this a winner and return the value
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      && squares[a] === squares[d])
      {
        return squares[a];
      }
  }
  return null;
}

class Game extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      history: [{
        squares: Array(42).fill(null), //an array of 42
      }],    
      oneIsNext: true, //this is saying that player 1 is next
    };
  }

  

  handleClick(i){
    const history = this.state.history;
    const current = history[history.length -1];
    const squares = current.squares.slice();
    if(calculateWinner(squares) || squares[i])
    {
      return; //if there is already a winner or the square is filled, then return and don't let it be clicked again
    }
    squares[i] = this.state.oneIsNext ? 'red' :  'yellow'; //if player one is next then the value is red, if not then yellow
    
    this.setState({
                    history: history.concat([{
                      squares: squares,
                    }]),               
                    oneIsNext: !this.state.oneIsNext, //after a move, change the value of the player -> one is no longer next
                  });
  }

  render(){
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const draw = current.squares.every(element => element !== null); //draw if all the squares are already full
    let status;

    //if the winner has already been found then display the name of the winner
    if (winner)
    {
      status = 'Winner: ' + winner;
    }
    else if (draw)  //if no more moves are possible, then a draw has occured
    {
      status = 'Draw';
    }
    else
    {
      status = 'Next Player: ' + (this.state.oneIsNext ? '1-Red' : '2-Yellow'); //the game is still in progress
    }
    //creating the game board
    return (
        <div className = "game"> 
          <div className="game-grid">
            <Grid
              squares = {current.squares}
              onClick={(i) => this.handleClick(i)}/>           
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
    );
  }
}



let connect = <Game />;

ReactDOM.render(
  connect,
  document.getElementById('root')
);

