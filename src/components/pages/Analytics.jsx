import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { Chart } from "react-google-charts";

import './vis.css';
import UserContext from '../../context/userContext';

export default function Analytics() {
    let [cpp, setCpp] = useState(<div>Loading...</div>);
    let [recent, setRecent] = useState(<div>Loading...</div>);
    let [top10, setTop10] = useState(<div>Loading...</div>);
    let [devices, setDevices] = useState(<div>Loading...</div>);
    
    const { userData } = useContext(UserContext);
    let token;
    if (userData) {
        token = userData.token;
    }
    useEffect(() => {

        let fetchCpp = async () => {
            if (token) {
                let cpp = await axios.get('http://localhost:5000/hackers/cpp', { headers: { "x-auth-token": token } });
               console.log(cpp);
                let data1=cpp.data.map(x =>[x.name,x.cpp] );

                await setCpp(
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Name', 'C++ Percentile'],...data1
                    ]}
                    options={{
                      title: 'C++ Percentile',
                      chartArea: { width: '50%' },
                      hAxis: {
                        title: 'C++ Percentile',
                        minValue: 0,
                      },
                      vAxis: {
                        title: 'Name',
                      },
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '1' }}
                  />)
            }
        }
        let fetchRecent= async () => {
            if (token) {
                let rec = await axios.get('http://localhost:5000/hackers/recent/10', { headers: { "x-auth-token": token } });
               
                await setRecent(rec.data.map(x => (
                    <div key={x._id} className=" card" >
                        <img alt={`profile-pic`} className="image" src={x.profile} />
                        <div className="title">{x.name}</div>
                        <div className="time">{new Date(x.timestamp).toString()}</div>
                      

                    </div>
                )))

             
            }
        }
        let fetchTop10 = async () => {
            if (token) {
                let top = await axios.get('http://localhost:5000/hackers/top/10', { headers: { "x-auth-token": token } });
               
                await setTop10(top.data.map(x => (
                    <div key={x._id} className=" card" >
                        <img alt={`profile-pic`} className="image" src={x.profile} />
                        <div className="title">{x.name}</div>
                      

                    </div>
                )))
            }
        }
        let fetchDevices = async () => {
            if (token) {
                let device = await axios.get('http://localhost:5000/users/device', { headers: { "x-auth-token": token } });
               
                await setDevices(<Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                      ['Device', 'Users Count'],
                      ['Desktop', device.data.desktops],
                      ['Mobile', device.data.mobiles],
                      ['Tablet', device.data.tabs],
                    ]}
                    options={{
                      title: 'Devices count',
                      // Just add this option
                      is3D: true,
                    }}
                    rootProps={{ 'data-testid': '2' }}
                  />)
            }
        }


        fetchCpp();
        fetchRecent();
        fetchTop10();
        fetchDevices();

    }, [token]);

  



    return (<>
    <div className=" home row">
         <div className=" cpp">
            <h2>Hackers C++ percentile% (Decreasing)</h2>
            {cpp}
        </div>
        <div className=" recent">
            <h2>Devices used</h2>
            {devices}
        </div>
        </div>
        <div className=" home row">
        <div className="wrapper recent">
            <h2>TOP 10 Hackers Rank</h2>
            {top10}
        </div>
        <div className="wrapper recent">
            <h2>Recently Updated Hackers</h2>
            {recent}
        </div>
       
        
    </div>
    </>
    )
}
