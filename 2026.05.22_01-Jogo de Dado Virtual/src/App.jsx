import React, { useState } from 'react';
import './App.css'; // Certifique-se de que o CSS está na mesma pasta

// Importação das imagens (verifique se estão na pasta src/assets/images/)
import dado0 from './assets/images/dado_0.png';
import dado1 from './assets/images/dado_1.png';
import dado2 from './assets/images/dado_2.png';
import dado3 from './assets/images/dado_3.png';
import dado4 from './assets/images/dado_4.png';
import dado5 from './assets/images/dado_5.png';
import dado6 from './assets/images/dado_6.png';

const DICE_IMAGES = [dado0, dado1, dado2, dado3, dado4, dado5, dado6];

export default function App() { // <--- AQUI DEVE SER "App"
  const [diceIndex, setDiceIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);

  const onDicePress = () => {
    if (isRolling) return;
    setIsRolling(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * 6) + 1;
      setDiceIndex(randomIndex);
      setIsRolling(false);
    }, 500);
  };

  const onResetPress = () => {
    setDiceIndex(0);
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Lançador de Dados</h1>
        <p className="subtitle">Tente a sua sorte!</p>
      </header>

      <main className="center-container">
        <button 
          onClick={onDicePress} 
          disabled={isRolling} 
          className="dice-button"
        >
          <img
            src={DICE_IMAGES[diceIndex]}
            alt={`Dado com número ${diceIndex}`}
            className={`dice-image ${isRolling ? 'rolling' : ''}`}
          />
        </button>
        
        <p className="result-text">
          {diceIndex === 0 
            ? 'Clique no dado para começar' 
            : `Você tirou o número ${diceIndex}!`}
        </p>
      </main>

      <footer className="footer">
        <button className="reset-button" onClick={onResetPress}>
          Reiniciar Jogo
        </button>
      </footer>
    </div>
  );
}
