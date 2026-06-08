import './Controls.css';

export default function Controls({ onDirectionChange }) {
  // We use touch events to ensure immediate response on mobile
  const handleTouch = (e, dir) => {
    e.preventDefault(); // Prevent default touch behavior (like scrolling)
    onDirectionChange(dir);
  };

  return (
    <div className="dpad-container">
      <div className="dpad-row">
        <button 
          className="dpad-btn up" 
          onTouchStart={(e) => handleTouch(e, 'UP')}
          onClick={() => onDirectionChange('UP')}
        >▲</button>
      </div>
      <div className="dpad-row middle-row">
        <button 
          className="dpad-btn left" 
          onTouchStart={(e) => handleTouch(e, 'LEFT')}
          onClick={() => onDirectionChange('LEFT')}
        >◀</button>
        <div className="dpad-center"></div>
        <button 
          className="dpad-btn right" 
          onTouchStart={(e) => handleTouch(e, 'RIGHT')}
          onClick={() => onDirectionChange('RIGHT')}
        >▶</button>
      </div>
      <div className="dpad-row">
        <button 
          className="dpad-btn down" 
          onTouchStart={(e) => handleTouch(e, 'DOWN')}
          onClick={() => onDirectionChange('DOWN')}
        >▼</button>
      </div>
    </div>
  );
}
