import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import Header from "../components/Header";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, isLoading, error} = useLogin();


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    const handleCallbackResponse = (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
    }
    
    // useEffect(() => {
    //     /* global google */
    //     google.accounts.id.initialize({
    //       client_id: process.env.CLIENT_ID,
    //       callback: handleCallbackResponse
    //     })
    
    //     google.accounts.id.renderButton(
    //       document.getElementById("signInDiv"),
    //       { theme: "outline", size: "large"}
    //     );
    //   }, [])

    return ( 
        <form className="login" onSubmit={handleSubmit}>
            <Header title="Log in" />
            <label>Email address:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

            <button disabled={isLoading}>Log in</button>
            <div className="google-click" id="signInDiv"></div>
            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default Login;