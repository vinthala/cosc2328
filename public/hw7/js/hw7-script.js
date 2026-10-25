// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
async function loadRoster() {
    try { 
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
        if (!response.ok) {
            throw new Error("cannot find the Pokemon Roster you are looking for");
        }
        const data = await response.json();
        data.results = data.results.filter(pokemon =>  pokemon.name.length <= 6);
        const sortedArray = [...data.results].sort((a,b) => a.name.length-b.name.length);
        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster={sortedArray} />);

    } catch (error) {
        console.log(error);
        const root = document.querySelector("#root").innerHTML= <p>Oh no! the pokemon roster did not load!</p>;

    }
}
function PokemonRoster(props) {
    return (
        <div className="pokemon-roster"> 
        {props.pokemons.map((pokemon) =>
                    (<PokemonCard
                        key={pokemon.name}
                        name={pokemon.name}
                    />
            ))} </div>
    );
}

function PokemonCard(props) {
    return (
        <div className="card">
            <div className="image-frame">
                <img src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name} alt={props.name} />
            </div>
            <p className="name">Name: {props.name}</p>
            <p className="little-letters-line">Name Length: {props.name.length} </p>
        </div>
    );
}

function App(props) {
    return(
        <div>
    <header id="header-message">Showing ${props.roster.length} short-named Pokemon, shortest name first</header>
    <PokemonRoster pokemons={props.roster} />
    </div>
    );
}

loadRoster();
