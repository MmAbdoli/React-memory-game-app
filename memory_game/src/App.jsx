import './App.css'
import React, { useState } from 'react';
import StartTimer from './components/StartTimer';
import GameBord from './components/GameBord';


function App() {
  const [gameShow,setGameShow] = useState(false)

  
  return (
    <div className='App'>
      <StartTimer  setGameShow={setGameShow}/>
      <GameBord gameShow={gameShow}/>
    </div>
    
  )
}

export default App;