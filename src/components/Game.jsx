import { useState, useEffect, useCallback, useRef } from 'react';
import Controls from './Controls';
import './Game.css';

// Directions
const UP = { x: 0, y: -1 };
const DOWN = { x: 0, y: 1 };
const LEFT = { x: -1, y: 0 };
const RIGHT = { x: 1, y: 0 };

export default function Game({ settings, onGameOver, onBack }) {
  const { speed, initialTailLength, boardSize } = settings;
  const fruitSpawnDelay = settings.fruitSpawnDelay || 0; // ms

  const [snake, setSnake] = useState([]);
  const [direction, setDirection] = useState(RIGHT);
  const [fruit, setFruit] = useState(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef(null);
  const fruitTimerRef = useRef(null);

  // Initialize Game
  useEffect(() => {
    initGame();
    return () => {
      clearInterval(gameLoopRef.current);
      clearTimeout(fruitTimerRef.current);
    };
  }, []);

  const initGame = useCallback(() => {
    const initialSnake = [];
    const startY = Math.floor(boardSize / 2);
    for (let i = 0; i < initialTailLength; i++) {
      initialSnake.push({ x: Math.floor(boardSize / 2) - i, y: startY });
    }
    setSnake(initialSnake);
    setDirection(RIGHT);
    directionRef.current = RIGHT;
    setScore(0);
    setIsGameOver(false);
    spawnFruit(initialSnake);
  }, [initialTailLength, boardSize]);

  const spawnFruit = useCallback((currentSnake) => {
    let newFruit;
    while (true) {
      newFruit = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize),
      };
      // Check if fruit spawns on snake
      const onSnake = currentSnake.some(
        (segment) => segment.x === newFruit.x && segment.y === newFruit.y
      );
      if (!onSnake) break;
    }
    setFruit(newFruit);
  }, [boardSize]);

  const scheduleNextFruit = useCallback((currentSnake) => {
    setFruit(null); // Remove current fruit visually
    if (fruitSpawnDelay > 0) {
      fruitTimerRef.current = setTimeout(() => {
        spawnFruit(currentSnake);
      }, fruitSpawnDelay);
    } else {
      spawnFruit(currentSnake);
    }
  }, [fruitSpawnDelay, spawnFruit]);

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isGameOver || isPaused) return;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (directionRef.current !== DOWN) { setDirection(UP); directionRef.current = UP; }
          break;
        case 'ArrowDown':
        case 's':
          if (directionRef.current !== UP) { setDirection(DOWN); directionRef.current = DOWN; }
          break;
        case 'ArrowLeft':
        case 'a':
          if (directionRef.current !== RIGHT) { setDirection(LEFT); directionRef.current = LEFT; }
          break;
        case 'ArrowRight':
        case 'd':
          if (directionRef.current !== LEFT) { setDirection(RIGHT); directionRef.current = RIGHT; }
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGameOver, isPaused]);

  const handleDirectionChange = (dirStr) => {
    if (isGameOver || isPaused) return;
    if (dirStr === 'UP' && directionRef.current !== DOWN) { setDirection(UP); directionRef.current = UP; }
    if (dirStr === 'DOWN' && directionRef.current !== UP) { setDirection(DOWN); directionRef.current = DOWN; }
    if (dirStr === 'LEFT' && directionRef.current !== RIGHT) { setDirection(LEFT); directionRef.current = LEFT; }
    if (dirStr === 'RIGHT' && directionRef.current !== LEFT) { setDirection(RIGHT); directionRef.current = RIGHT; }
  };

  // Game Loop
  useEffect(() => {
    if (isGameOver || isPaused) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        // Wrap around borders (Nokia style usually wraps or hits wall. Let's make it hit wall for easier game over, or wrap? Requirements just say "hit own tail" for game over. Let's wrap around walls to make it strictly tail-hit to lose).
        // Actually, usually hitting a wall is also game over. "przegranie gry - wąż najeżdża na swój ogon". It specifically highlights hitting own tail. Let's wrap walls so the only way to lose is hitting tail, or we can make walls solid. Let's wrap.
        if (newHead.x < 0) newHead.x = boardSize - 1;
        if (newHead.x >= boardSize) newHead.x = 0;
        if (newHead.y < 0) newHead.y = boardSize - 1;
        if (newHead.y >= boardSize) newHead.y = 0;

        // Check tail collision
        const hitTail = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (hitTail) {
          setIsGameOver(true);
          return prevSnake; // Don't update state to show collision
        }

        const newSnake = [newHead, ...prevSnake];

        // Check if eaten fruit
        if (fruit && newHead.x === fruit.x && newHead.y === fruit.y) {
          setScore((s) => s + 10);
          scheduleNextFruit(newSnake);
          // Keep tail (grow)
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    gameLoopRef.current = setInterval(moveSnake, speed);

    return () => clearInterval(gameLoopRef.current);
  }, [speed, isGameOver, isPaused, boardSize, fruit, scheduleNextFruit]);

  // If game over, notify parent after a delay
  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        onGameOver(score);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isGameOver, score, onGameOver]);

  // Render Grid
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        let isSnake = false;
        let isHead = false;
        let isFruit = false;

        snake.forEach((segment, idx) => {
          if (segment.x === col && segment.y === row) {
            isSnake = true;
            if (idx === 0) isHead = true;
          }
        });

        if (fruit && fruit.x === col && fruit.y === row) {
          isFruit = true;
        }

        let className = 'grid-cell';
        if (isHead) className += ' snake-head';
        else if (isSnake) className += ' snake-body';
        else if (isFruit) className += ' fruit pop-anim';

        grid.push(
          <div key={`${row}-${col}`} className={className}></div>
        );
      }
    }
    return grid;
  };

  return (
    <div className="game-screen">
      <div className="game-header">
        <button className="btn-secondary small-btn" onClick={onBack}>Wyjdź</button>
        <div className="score-display">Wynik: {score}</div>
      </div>
      
      <div className="board-container">
        <div 
          className="game-board" 
          style={{ 
            gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
            gridTemplateRows: `repeat(${boardSize}, 1fr)`
          }}
        >
          {renderGrid()}
        </div>
        
        {isGameOver && (
          <div className="game-over-overlay">
            <h2>GAME OVER</h2>
            <p>Ugryzłeś własny ogon!</p>
          </div>
        )}
      </div>

      <Controls onDirectionChange={handleDirectionChange} />
    </div>
  );
}
