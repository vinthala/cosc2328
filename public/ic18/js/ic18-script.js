// IC18 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy

//Reflection: 
//1. Prop-drilling is sending the prop through the app to the other functions that are considered child functions of App, in this case; without ContextApI the context of the props would be saved and thus a problem because the props's state would not be uploaded.
//2. The three things that are needed to use the Context API are the the create, .create creates the context of the prompt, then the provide, .provide provides the context of the prop to the child elements, and the consume, useContext which attactches the context to the prop given to the descendents.
//3.ModeToggle can change the mode that lives inside App without passing toggleMode as a prop because of the HabitatContext.Provider {mode, toggleMode}, and useContext(HabitatContext) that lets the habitat context be used in app that provides it to the functions inside the div.
//4.React.createContext() needs to be called before it is used in the program because it needs to be declared as somethign that has context to save the context made in the functions below.
//5. I would need to make taht fifth component as a function that has const {mode} = React.useContext(HabitatContext) and I would have to add it to the div inside of App().

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