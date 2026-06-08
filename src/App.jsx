import { useState, useEffect } from 'react';
import './App.css';
import Menu from './components/Menu';
import Game from './components/Game';
import Settings from './components/Settings';

function App() {
  const [view, setView] = useState('menu'); // 'menu', 'game', 'settings'
  const [playerName, setPlayerName] = useState('');
  const [highScore, setHighScore] = useState(0);

  // Settings
  const [settings, setSettings] = useState({
    speed: 200, // ms per tick
    initialTailLength: 5,
    boardSize: 20, // 20x20
    fruitSpawnDelay: 0, // ms
  });

  useEffect(() => {
    // Load player name and high score from local storage
    const savedName = localStorage.getItem('snakePlayerName');
    if (savedName) setPlayerName(savedName);
  }, []);

  useEffect(() => {
    if (playerName) {
      const savedScore = localStorage.getItem(`snakeHighScore_${playerName}`);
      if (savedScore) {
        setHighScore(parseInt(savedScore, 10));
      } else {
        setHighScore(0);
      }
    }
  }, [playerName]);

  const handleStartGame = (name) => {
    setPlayerName(name);
    localStorage.setItem('snakePlayerName', name);
    setView('game');
  };

  const handleGameOver = (score) => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(`snakeHighScore_${playerName}`, score);
    }
    setView('menu');
  };

  return (
    <div className="app-container">
      {view === 'menu' && (
        <Menu 
          onStart={handleStartGame} 
          onSettings={() => setView('settings')}
          playerName={playerName}
          highScore={highScore}
        />
      )}
      {view === 'game' && (
        <Game 
          settings={settings} 
          onGameOver={handleGameOver} 
          onBack={() => setView('menu')}
        />
      )}
      {view === 'settings' && (
        <Settings 
          settings={settings} 
          onSave={(newSettings) => {
            setSettings(newSettings);
            setView('menu');
          }} 
          onBack={() => setView('menu')}
        />
      )}
    </div>
  );
}

export default App;
