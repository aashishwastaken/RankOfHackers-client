import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

class Header extends Component {
   
    render() { 
        return ( 
            <header className="header">
                <Link to="/">
                    {/* <img src="" style={{width:'2em',height:'2em'}}> */}
                    <h1 className="title">Rank Of Hackers</h1></Link>
                <AuthOptions />
            </header>
         );
    }
}
 
export default Header;