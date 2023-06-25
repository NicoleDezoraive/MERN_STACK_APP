import React ,{ useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutContext} from "../hooks/useWorkoutsContext"


const target = process.env.REACT_APP_TARGET;
const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()
    // const [workouts, setWorkouts] = useState(null);
    
    useEffect(() => {
      const fetchWorkouts = async () => {
        console.log(target);
        // const response = await fetch(`${target}/api/workouts`);
        const response = await fetch('/api/workouts');
        try {
          const json = await response.json();
          if (response.ok) {
            dispatch({type: 'SET_WORKOUTS', payload: json})
            // setWorkouts(json);
          }
        } catch (error) {
          console.error('Error parsing JSON:',  error.message);
        }
      };
  
      fetchWorkouts();
    }, [dispatch]);

    return(
        <div className="home">
            <div className="workouts">
                {workouts &&
                 workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home;
