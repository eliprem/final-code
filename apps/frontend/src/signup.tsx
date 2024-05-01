import axios from "axios";
import { useState } from "react";
import { Link,  useNavigate } from 'react-router-dom';


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/account/signup', { username, password });  //don't need /api?
        
            navigate("/media");
        }  catch (error) {
            // eslint-disable-next-line no-alert
            alert('Sign up failed.');
        }

    };

    return (
        <div>
            <h1>Media Genius</h1>
            <form className="flex-col" onSubmit={handleSignUp}>
                <input
                    className='item'
                    type='text'
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}>
                </input>
                <input
                    className='item'
                    type='text'
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </input>
                <button className='item' type="submit">Sign Up</button>
                <p>Already have an account?</p>
                <Link to="/login">Log in here!</Link>
            </form>
        </div>
    );
};

export default Signup;