import { useState } from "react";
import {useWorkoutContext} from "../hooks/useWorkoutsContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext();
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newWorkout = {title, load,reps};
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(newWorkout),
            headers:{
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if(response.ok){
            setError(null);
            setTitle('');
            setLoad('');
            setReps('');
            setEmptyFields([]);
            console.log('New workout added', json)
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
        
    }

    return ( 
        <form className="workout-form" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title:</label>
            <input type="text" value={title}  className={emptyFields.includes('title') ? 'error' : ''} onChange={(e) => setTitle(e.target.value)} />

            <label>Load (in kg):</label>
            <input type="number" value={load} className={emptyFields.includes('load') ? 'error' : ''} onChange={(e) => setLoad(e.target.value)} />

            <label>Reps:</label>
            <input type="number" value={reps} className={emptyFields.includes('reps') ? 'error' : ''} onChange={(e) => setReps(e.target.value)} />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>

     );
}
 
export default WorkoutForm;