import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";

import UserContext from '../../context/userContext';

export default function AllHackers() {
    let [hackers, setHackers] = useState(<div>Loading...</div>);
    let [top3Hackers, setTop3Hackers] = useState(<div>Loading..</div>);
    const { userData } = useContext(UserContext);
    let token;
    if (userData) {
        token = userData.token;
    }
    useEffect(() => {

        let fetchHackers = async () => {
            if (token) {
                let hackers = await axios.get('http://localhost:5000/hackers/all', { headers: { "x-auth-token": token } });
                console.log(hackers.data);
                await setHackers(hackers.data.map(x => (
                    <div key={x._id} className=" card" onClick={() => show(x._id)}>

                        <div className="title">{x.name}</div>
                        <img alt={`profile-pic`} className="image" src={x.profile} />

                    </div>
                )))
            }
        }
        let fetchTop3 = async () => {
            if (token) {
                let hackers = await axios.get('http://localhost:5000/hackers/top/3', { headers: { "x-auth-token": token } });
                console.log(hackers.data);
                await setTop3Hackers(hackers.data.map(x => (
                    <div key={x._id} className=" card" onClick={() => show(x._id)}>

                        <div className="title">{x.name}</div>
                        <img alt={`profile-pic`} className="image" src={x.profile} />

                    </div>
                )))
            }
        }

        fetchHackers();
        fetchTop3();
    }, [token]);

    let [children, setChildren] = useState(null);
    let [childrenKeys, setChildrenKeys] = useState(null);

    let show = async (id) => {

        let details = await axios.get(`http://localhost:5000/hackers/${id}`, { headers: { "x-auth-token": userData.token } });
        setChildren(details.data);
        setChildrenKeys(Object.keys(details.data));
    }



    return (<div className=" home row">
        <div className="wrapper">
            <h2>List of all Hackers alphabetically</h2>
            {hackers}
        </div>
        <div className="wrapper">
            <h2>Top 3 Hackers</h2>
            {top3Hackers}
        </div>
        <div className=" details" >
            {childrenKeys && <img alt={`profile-pic`} className="profile" src={children.profile} />}

            <div className="hacker-detail">
                {childrenKeys && childrenKeys.map((key, i) => (
                    (key !== 'profile') ?
                        <div key={Math.random()} className="">
                            <span><b>{key.slice(0, 1).toUpperCase() + key.slice(1) + ' : '}</b></span><span>{children[key]}</span>
                        </div> : (<div></div>)
                ))}
            </div>
        </div>
    </div>
    )
}
