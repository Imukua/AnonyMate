import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./component/login";
import {Home} from  "./component/home";
import {Logout} from "./component/logout";
import { Signup } from './component/signup';
import { Navigation } from './component/navigation';
import Chat from "./component/chat";

function App() {
    return(
        <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/chat/:chatname" element={<Chat/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default App;
