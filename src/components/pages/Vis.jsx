import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Analytics from './Analytics';

function Vis () {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    let compToRender;

    useEffect(() => {
        if(!userData.user)
            history.push("/login");

    }, [history,userData]);




    
    if(userData.user){
        compToRender=(
        <Analytics />
        );
    
    }
    else{
        compToRender= (
        <>
            <h2>You are not logged in</h2>
            <Link to="/login">Login</Link>
        </>
    )}

    return (<>
            {compToRender}
  </>
    );
}
 
export default Vis;