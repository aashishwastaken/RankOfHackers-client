import React, { useEffect, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/userContext';
import AllHackers from './AllHackers';

function Home () {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(!userData.user)
            history.push("/login");

    }, [history,userData]);

    let compToRender;
    
    if(userData.user){
        compToRender=<AllHackers />}
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
 
export default Home;