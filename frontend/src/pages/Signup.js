import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import Header from "../components/Header";

const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, isLoading, error} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
    }

    return ( 
        <form className="signup" onSubmit={handleSubmit}>
            <Header title="Sign up" />
            <label>Email address:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default Signup;