import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Login} from "./component/login";
import {Home} from  "./component/home";
import {Logout} from "./component/logout";
import { Signup } from './component/signup';
import { Navigation } from './component/navigation';
import Chat from "./component/chat";
import ProductList from './component/ProductList';

function App() {
    return(
        <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/chat/:chatname" element={<Chat/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/groups" element={<ProductList/>}/>
           
        </Routes>
        </BrowserRouter>
    )
}
export default App;
