import axios from "axios";
import {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import ParticlesBg from "particles-bg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        const {data} = await
                        axios.post('http://localhost:8000/token/',
                        user, {headers:
                        {'Content-Type': 'application/json'}},
                        {withCredentials: true});
        
        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;
        toast.success(`Welcome back !`, {
            position: "top-center",
            autoClose: 2998,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
        setTimeout(() => {
            window.location.href = '/home';
        }, 3000);
    } catch (error) {
        toast.error(`Incorrect Username or Password!`, {
          position: "top-center",
          autoClose: 4998,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        console.error(error);
        setPassword("")
        setUsername("")
        // handle error here  
      }


    }

    return(
        <>
        <ToastContainer/>
        <div className="Auth-form-container" >
            <form className="Auth-form" onSubmit={submit}>
                <div className="Auth-form-content">
                    <object data={`${process.env.PUBLIC_URL}/ghost.svg`} className="ghost"> </object>
                    <div className="login-header">
                        <h3 className="Authformtitle">Sign In to your account</h3>
                        <h6 className="Authformtext">dont have an account yet ? <Link className='header-link' to="/signup">Signup</Link> </h6>
                        
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
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit"
                            className={buttonClass} >Submit</button>
                    </div>
                </div>
            </form>
        </div>
        <ParticlesBg  num={200} type="cobweb" bg={true} />
        </>
        
    )
}