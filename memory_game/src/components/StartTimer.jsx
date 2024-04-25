import React, { useEffect, useState } from 'react'

function StartTimer({setGameShow}) {
    const [count, setCount] = useState(0);
    const [start, setStart] = useState(false);
    const [firtMount,setFirtMount] = useState(true)
    const [canStart, setCanStart] = useState(true); 
  
    useEffect(() => {
      setFirtMount(true)
    },[])
    useEffect(() => {
      if (count > 0) {
        const timerId = setTimeout(() => {
          setCount(count - 1);
        }, 1000);
  
        return () => clearTimeout(timerId); 
      } else {
        setStart(true);
        setCanStart(true); 
        setGameShow(false)
      }
    }, [count]); 
  
    const handleStart = () => {
      if (canStart) {
        setCount(10);
        setGameShow(true)
        setFirtMount(false)
        setStart(false);
        setCanStart(false); 
      }
      
    };
  
    return (
      <div className="timer">
        <h1>{canStart ? 'Start' : 'Count Down:'}{!canStart ? count : ''}</h1>
        <button className={!canStart ? 'disable' : ''} onClick={handleStart} disabled={!canStart}>
          {firtMount ? 'start 🎮' : start ? 'Restart🔁' : 'Counting...'}
        </button>
        
        
      </div>
    );
}

export default StartTimer