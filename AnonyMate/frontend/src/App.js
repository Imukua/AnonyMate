import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import {Login} from "./component/login";
import {Home} from  "./component/home";
import {Logout} from "./component/logout";
import { Signup } from './component/signup';
import Chat from "./component/chat";
import ProductList from './component/ProductList';
import ResponsiveAppBar from './component/nav'
import { Landing } from './component/landing';

function Main() {
 
    return(
        <>
        {useLocation().pathname !== '/landing' && <ResponsiveAppBar />}
        <Routes>
            <Route path="/Home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/chat/:chatname" element={<Chat/>}/>
            <Route path="/chat" element={<Chat/>}/>
            <Route path="/groups" element={<ProductList/>}/>
            <Route path="/landing" element={<Landing/>}/>
           
        </Routes>
        </>
    )
}

function App() {
    return (
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );
  }
  
  export default App;
