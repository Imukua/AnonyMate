import axios from "axios"
import {useEffect, useState} from "react"
import { Link } from 'react-router-dom';
import ParticlesBg from "particles-bg"


export const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRpt, setPasswordRpt] = useState('');
    const [buttonClass, setButtonClass] = useState('btn btn-secondary');
    useEffect( ()=> {
        if(username.trim() !== '' && password.trim() !== ''){
            setButtonClass('btn btn-primary')
        } else {
            setButtonClass('btn btn-secondary')
        }
    }, [username, password]);   

    //the submit method
    const submit = async e => {
        e.preventDefault();
        const user = {
            username: username,
            password: password
        };
        try {
            const response = await axios.post('http://localhost:8000/register/', user);
            if (response.status === 201) {
                const { data } = await axios.post('http://localhost:8000/token/', user, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
                localStorage.clear();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
                window.location.href = '/';
            }
            else {
                console.log('Resource Not found')
            }
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <>
        <div className="Auth-form-container" >
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <object data={`${process.env.PUBLIC_URL}/ghost.svg`} className="ghost"> </object>
                    <div className="login-header">
                        <h3 className="Authformtitle">Sign up for an account</h3>
                        <h6 className="Authformtext">Already have an account ? <Link className='header-link' to="/login">Login</Link> </h6>
                        
                    </div>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input className="form-control mt-1"
                        placeholder="Enter username"
                        name="username"
                        type="text"
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input className="form-control mt-1"
                        placeholder="Enter password"
                        name="password"
                        type="password"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input className="form-control mt-1"
                        placeholder="repeat password"
                        name="password"
                        type="password"
                        value={passwordRpt}
                        required
                        onChange={e => setPasswordRpt(e.target.value)}/>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit"
                            className={buttonClass} disabled={username.trim() === '' || password !== passwordRpt} >Submit</button>
                    </div>
                </div>
            </form>
        </div>
        <ParticlesBg type="random" bg={true}/>
        </>
    )
}