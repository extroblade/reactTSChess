import React, {useEffect, useState} from 'react';
import './App.css'
import BoardComponent from "./components/boardComponent";
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from './models/Player';

const App = () => {
    const [board, setBoard] = useState(new Board())
    const [whitePlayer] = useState(new Player(Colors.WHITE))
    const [blackPlayer] = useState(new Player(Colors.BLACK))
    const [currentPlayer, setCurrentPlayer] = useState<Player | null> (null)

    useEffect(() => {
        restart();
        setCurrentPlayer(whitePlayer)
    }, [])

    function swapPlayer(){
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    function restart(){
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
        setCurrentPlayer(whitePlayer)
    }
    return (
        <div className="App">
            <Timer
            restart={restart}
            currentPlayer={currentPlayer}/>
          <BoardComponent
              board={board}
              setBoard={setBoard}
              currentPlayer={currentPlayer}
              swapPlayer={swapPlayer}
          />
            <div>
                <LostFigures
                    title="Черные фигуры"
                    figures={board.lostBlackFigures}
                />
                <LostFigures
                    title="Белые фигуры"
                    figures={board.lostWhiteFigures}
                />
            </div>
        </div>
    );
};

export default App;