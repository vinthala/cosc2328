// IC17 – COSC 2328 – Professor McCurry
// Implemented by: val Inthalangsy
//1. UseState returns the internal state of the object and the variable that is used to measure the state.
//2. We write onClick={feedPet} instead of onClick={feedPet()} because adding the parameters would make it run immediately at render instead of onClick.
//3. After clicking feed the hunger number of the screen updates to 35.
//4. When hunger = 40 and energy = 80 the pet's mood that matches that condition is not hunger < 30 && energy >70, energy <25, or hunger > 75, which returns okay with the stoic emoji.
//5.I am confused on this question because the condition we used in that had the and operator in getPetMood() is hunger < 30 && energy > 70 when we compare that to {hunger > 80 && <p>...</p> we are now asking if the pet is starving and <p>...</p> is not null. It is appropriate to use the first one when we need the pet well fed and energetic and the second one when we need the pet starving and <p>...</p> is not falsy.


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