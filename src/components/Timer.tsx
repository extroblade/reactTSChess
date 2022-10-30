import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from '../models/Player';
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}
const defaultTime = 3000;

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(defaultTime)
    const [whiteTime, setWhiteTime] = useState(defaultTime)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer();
        endTime();
    }, [currentPlayer, timer.current])


    function endTime(){
        if ( blackTime===0 ){
            handleRestart()
        }
        if ( whiteTime===0 ){
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
        setWhiteTime(defaultTime)
        setBlackTime(defaultTime)
        restart()

    }
    return (
        <div>
            <div className={'left__btns'}>
                <button className={'restart'} onClick={handleRestart}>Restart game</button>
                <h2>Черные - {blackTime}</h2>
                <h2>Белые - {whiteTime}</h2>
            </div>

        </div>
    );
};

export default Timer;