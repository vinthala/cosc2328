// IC18 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy

console.log('React version:', React.version);
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');

// --- Context -
const HabitatContext = React.createContext();


// --- Components 
const Header = () => {
    //Consume context - no props needed
    const {mode} = React.useContext(HabitatContext);
    return (
        <header>
            <h1>🌍 Pixel's Habitat</h1>
            <p> {mode === 'day' ? '☀️ Day Mode' : '🌙 Night Mode'}</p>
        </header>
    );
};


const HabitatView = () => {
    const { mode } = React.useContext(HabitatContext);
    return (
        <div className="scene">
            {mode === 'day' ?  '☀️ 🌿 🐾' : '🌙 ⭐ 🐾'}
        </div>
    );
};


const ModeToggle = () => {
    //Consumes both mode and toggleMOde - no props received from App
    const { mode, toggleMode } = React.useContext(HabitatContext);
    return (
        <div className="controls">
            <button onClick={toggleMode}>
                {mode === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            </button>
        </div>
    );
};


const App = () => {
    const [mode, setMode] = React.useState('day');
    const toggleMode = () => setMode(prev => prev === 'day' ? 'night' : 'day');

    return (
        //Provider wraps all consumers; value broadcasts mode and toggleMode
        <HabitatContext.Provider value={{ mode, toggleMode }}>
            <div className={"habitat " + mode}>
                <Header />
                <HabitatView />
                <ModeToggle />
            </div>
        </HabitatContext.Provider>
    );
};


// ---Mount ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);