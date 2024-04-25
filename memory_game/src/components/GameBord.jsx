import React, { useEffect, useState } from 'react'
import gameItems from '../../data/data.js'

function GameBord({ gameShow }) {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [turns, setTurns] = useState(0)

  const shuffledCards = () => {
    const shuffledCard = [...gameItems, ...gameItems]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(shuffledCard)
    setTurns(0)
  }
  // Jsut for run the app in mount
  useEffect(() => {
    shuffledCards()
  }, [])

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.image === choiceTwo.image) {
        setCards(prevCard => {
          return prevCard.map(card =>{
            if(choiceOne.id === choiceTwo.id){
              return {...card, match:false}
            }else if(card.image ===choiceOne.image){
              return {...card, match:true}
            }if(choiceOne.id === choiceTwo.id){
              return {...card, match:false}
            }
            else{
              return card 
            }
          })
        })
        resetChioses()
      }else {
        console.log("not match");
        setTimeout(() => {
          resetChioses()
        }, 700);
      }
    }
  }, [choiceOne, choiceTwo])

  // handle the Choisces Value
  const handleChoices = (cards) => {
    choiceOne ? setChoiceTwo(cards) : setChoiceOne(cards)
    // console.log(item);
  }

  // reset the choices in each turn
  const resetChioses = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(t => t + 1)
  }



  return (
    <div>
      <button onClick={shuffledCards}>reset</button>
      <p> number of tries:{turns}</p>
      <div className='game__items'>
        
        {
          cards.map(item => <GameImages 
            handleChoices={handleChoices} 
            gameShow={gameShow} key={item.id} 
            item={item} 
            flipped={item === choiceOne || item === choiceTwo || item.match}
            />)
        }
      </div>
    </div>
  )
}

export default GameBord;

function GameImages({ item, gameShow,handleChoices,flipped}) {
  const handleClick = () => {
    handleChoices(item)
    console.log(item);
  }
  
  
  return (
    <div>
    <div className={`item__box ${item.match ? 'matched' : flipped ? 'check' : ''}`} onClick={handleClick}>
      <img className='game__image' src={gameShow || flipped ? item.image : '../src/assets/mistry.png' } alt="" />
      
    </div>
    </div>
  )
}