import React from 'react';
import './Covid.scss'
import cosvg from './CovidAnimate.svg'
// import { Table } from 'react-bootstrap'
// import Animate5  from '../../Components/PetrolAnimations/animation5';
import Heading from '../Heading/Heading' 
import Login from '../Login/Login'
// import {allotedBeds} from '../../Api/patient.api'
// import axios from 'axios'
// import Heading from '../Heading/Heading'
export default function Covid(){
    // const [state, setState] = useState({})
    // const [data, setData] = useState({})

    // useEffect(() => {
    //     axios({
    //         url: allotedBeds,
    //         method: 'GET',
    //       })
    //       .then((res) => {
    //         if (res.data.status === 404) {
              
    //         } else {
    //           setState(res.data.total_beds)
    //           setData(res.data.alloted_beds)
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err.response);
    //       });
    // }, [])
    return (
        <>     
          <div className="container-fluid bg-silver pt-5">
              <div className="pt-4">
               <Heading heading='Goverdhan Tiwari Government Base Hospital, Almora'/>   
              </div>
              <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 d-none d-sm-block d-md-block">
                        <img src={cosvg} alt="" />
                    </div>
                    <div className="col-lg-1 col-md-1"></div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <Heading heading='Login'/>     
                        <Login />
                    </div>
                    <div className="col-lg-1 col-md-1"></div>
                </div>
                {/* <div className="row py-3">
                    <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile">
                    <Table responsive="md" className="">
                        <thead>
                        <tr>
                            <th>Total Beds(Available/Total)</th>
                            <th>General Beds (Available/Total)</th>
                            <th>Oxygen Beds (Available/Total)</th>
                            <th>ICU Beds (Available/Total)</th>
                            <th>Ventilator Beds (Available/Total)</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><span className="text-primary">{state.total-data.total}</span>/{state.total}</td>
                            <td><span className="text-primary">{state.general-data.general }</span>/{state.general}</td>
                            <td><span className="text-primary">{state.oxygen-data.oxygen }</span>/{state.oxygen}</td>                            
                            <td><span className="text-primary">{state.icu-data.icu }</span>/{state.icu}</td>
                            <td><span className="text-primary">{state.ventillator-data.ventillator }</span>/{state.ventillator}</td>
                            
                        </tr>
                       
                        </tbody>
                    </Table>
                        
                    </div>
                </div> */}
          </div>
        </>
    )
}