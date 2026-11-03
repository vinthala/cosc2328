// HW8 – COSC 2328 – Professor McCurry
// Implemented by: Val Inthalangsy
console.log('React version:', React.version);
console.log('ReactDOM available:', typeof ReactDOM !== 'undefined');


const App = () => {
    const [taskName, setTaskName] = React.useState('');
    const [priority, setPriority] = React.useState('Medium');
    const [error, setError] = React.useState('');
    const [tasks, setTasks] = React.useState([]);

    return (<div className="app-container">
        <div className="form task-card">
            <div className="form input">
                <input type="text" value={taskName} onChange={e =>{ setTaskName(e.target.value)}} />
            </div>
            <div className="form select">
                <select value={priority} onChange={e => {setPriority(e.target.value)}}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
                <button className="form button" onClick={() => {
                    if (taskName.trim() === '') {
                        setError('Task name cannot be empty.');
                        return;
                    }
                    setError('');
                    addTask(Date.now(), taskName, priority); 
                    setPriority('Medium');
                    setTaskName('');  
                  
                }}>Add Task</button>
                  {error && <p className="error">{error}</p>}
                  <TaskList tasks={tasks} onDelete={deleteTask}/>
                  <header>{tasks.length} task{tasks.length === 1 ? '':'s'}</header>
                </div>
                <div>
                {tasks.length > 0 &&(
                    <button className='form clear-button' onClick={e => { clearAll();}}>Clear All</button>
                )} </div>
            </div>
                   );


    function addTask(id, name, priority){
        const newTask = {id: id, name: name.trim(), priority};
        setTasks([...tasks, newTask]);
    };
    
    function deleteTask(taskID){
        setTasks(tasks.filter(t => t.id !== taskID));
    };

    function clearAll(){
        setTasks([]);
    };
};

function TaskCard(props){
    return (
    <div className="task-card">
        <h1 className='task-name'>{props.task.name}</h1>
        <span className={"badge " + props.task.priority.toLowerCase()}>{props.task.priority}</span>
        <button className="form button" onClick={() => props.onDelete(props.task.id)}>Delete</button>
    </div>);
}

function TaskList(props) {
    if (props.tasks.length === 0) {
        return <p>No tasks yet - add one above!</p>
    } else {
        return(
        <div className="task-list">
            {props.tasks.map(task => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={props.onDelete}
                />
    ))}
        </div>
        );
};}

// ---Mount ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);