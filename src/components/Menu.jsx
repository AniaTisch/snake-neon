import { useState, useEffect } from 'react';

export default function Menu({ onStart, onSettings, playerName: initialName, highScore }) {
  const [name, setName] = useState(initialName || '');

  useEffect(() => {
    setName(initialName || '');
  }, [initialName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="screen-container">
      <h1>Neon Snake</h1>
      <div className="menu-card pop-anim">
        <h2>Menu</h2>
        <form onSubmit={handleSubmit} className="form-group">
          <label htmlFor="playerName">Podaj swoje imię:</label>
          <input 
            type="text" 
            id="playerName" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="np. John Doe"
            required
            autoComplete="off"
          />
          <button type="submit" className="btn-primary" disabled={!name.trim()}>
            Graj
          </button>
        </form>
        <button type="button" className="btn-secondary" onClick={onSettings}>
          Ustawienia
        </button>

        {highScore > 0 && (
          <div className="high-score-display">
            Najlepszy wynik: <br />
            <span>{highScore}</span>
          </div>
        )}
      </div>
    </div>
  );
}
