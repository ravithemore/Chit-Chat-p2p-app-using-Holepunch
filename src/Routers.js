import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';  
import Home from "./component/Home/Home";
import Chat from "./component/Chat/Chat";
function Routers() {
    return(
        <Router>
            <Routes>
                <Route exact path="/chat" element = {<Chat/>}></Route>
                <Route path="*" element = {<Home/>}></Route>
            </Routes>
        </Router>
    )
}
export default Routers