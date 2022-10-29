import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from '../models/Player';
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300)
    const [whiteTime, setWhiteTime] = useState(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer();
        //endTime();off till buttton
    }, [currentPlayer, timer.current])


    function endTime(){
        if ( blackTime===0 || whiteTime===0 ){
            handleRestart()
        }
    }
    function startTimer(){
        if(timer.current){
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE
            ? decrementWhiteTime
            : decrementBlackTime

        timer.current = setInterval(callback, 1000)
    }


    function decrementBlackTime(){
        setBlackTime(p => p-1)
    }

    function decrementWhiteTime(){
        setWhiteTime(p => p-1)
    }

    const handleRestart = () => {
        setWhiteTime(300)
        setBlackTime(300)
        restart()

    }
    return (
        <div>
            <div>
                <button className={'restart'} onClick={handleRestart}>Restart game</button>
            </div>
            <h2>Черные - {blackTime}</h2>
            <h2>Белые - {whiteTime}</h2>
        </div>
    );
};

export default Timer;