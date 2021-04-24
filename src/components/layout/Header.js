import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

class Header extends Component {
   
    render() { 
        return ( 
            <header className="header">
                <Link to="/">
                    <img alt="background" src="https://raw.githubusercontent.com/aashishwastaken/RankOfHackers-client/4340e639ae34a517effdb143ec74d48f37f2c954/public/favicon.svg" style={{width:'2em',height:'2em'}} />
                    <h1 className="title">Rank Of Hackers</h1></Link>
                <AuthOptions />
            </header>
         );
    }
}
 
export default Header;