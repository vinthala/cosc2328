// IC17 – COSC 2328 – Professor McCurry
// Implemented by: val Inthalangsy


//Debug: confirm CDN scripts loaded before any JSX runs
console.log('React version:', React.version);
console.log('ReactDom available:', typeof ReactDOM !== 'undefined');


// --- Component
const TamagotchiPet =() => {


// State - hunger: 0 (full) -> 100 (starving); energy: 0 (exhausted) -> 1000 (rested)
const [hunger, setHunger] = React.useState(50);
const [energy, setEnergy] = React.useState(50);

// ---- Event handlers

const feedPet = () => {
    setHunger(Math.max(0, hunger - 15));
};

const playWithPet = () => {
    setEnergy(Math.max(0, energy - 10));
    setHunger(Math.min(100, hunger + 15));
};

const restPet = () => {
    setEnergy(Math.min(100, energy + 20));
    setHunger(Math.min(100, hunger + 8));
};

// ---- Conditional rendering helper 
const getPetMood = () => {
    if (hunger > 75) return '😢 Starving!';
    if (energy < 25) return '😴 Exhausted!';
    if (hunger < 30 && energy > 70) return '😊 Thriving!';
    return '😐 Okay';
};

// --- JSX
 return (
<div className="pet-card">
    <h1>  Pixel</h1>

    <div className="stats">
        <p className="stat">🍗 Hunger: {hunger}</p>
        <p className="stat">⚡️ Energy: {energy}</p>
    </div>

    <div className="mood"> {getPetMood()}</div>

    <div className="controls">
        <button onClick={feedPet}>🍗 Feed</button>
        <button onClick={playWithPet}>⚽ Play</button>
        <button onClick={restPet}>😴 Rest</button>
    </div>



</div>
    );
};


// --- Mount 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TamagotchiPet />);