import { useState } from 'react';

export default function Settings({ settings, onSave, onBack }) {
  const [localSettings, setLocalSettings] = useState(settings);

  const handleChange = (key, value) => {
    setLocalSettings(prev => ({ ...prev, [key]: Number(value) }));
  };

  const handleSave = () => {
    onSave(localSettings);
  };

  return (
    <div className="screen-container">
      <h1>Ustawienia</h1>
      <div className="settings-card pop-anim">
        
        <div className="form-group">
          <label>Prędkość gry (ms na krok: mniejsza = szybciej)</label>
          <input 
            type="range" 
            min="50" 
            max="500" 
            step="10"
            value={localSettings.speed} 
            onChange={(e) => handleChange('speed', e.target.value)} 
          />
          <div className="slider-value">{localSettings.speed} ms</div>
        </div>

        <div className="form-group">
          <label>Początkowa długość węża</label>
          <input 
            type="range" 
            min="2" 
            max="15" 
            step="1"
            value={localSettings.initialTailLength} 
            onChange={(e) => handleChange('initialTailLength', e.target.value)} 
          />
          <div className="slider-value">{localSettings.initialTailLength}</div>
        </div>

        <div className="form-group">
          <label>Wielkość planszy (komórki)</label>
          <input 
            type="range" 
            min="10" 
            max="30" 
            step="2"
            value={localSettings.boardSize} 
            onChange={(e) => handleChange('boardSize', e.target.value)} 
          />
          <div className="slider-value">{localSettings.boardSize} x {localSettings.boardSize}</div>
        </div>

        <div className="form-group">
          <label>Opóźnienie nowego owocu (ms)</label>
          <input 
            type="range" 
            min="0" 
            max="10000" 
            step="500"
            value={localSettings.fruitSpawnDelay} 
            onChange={(e) => handleChange('fruitSpawnDelay', e.target.value)} 
          />
          <div className="slider-value">{localSettings.fruitSpawnDelay} ms</div>
        </div>

        <button className="btn-primary" onClick={handleSave}>Zapisz i Wróć</button>
        <button className="btn-secondary" onClick={onBack}>Anuluj</button>
      </div>
    </div>
  );
}
