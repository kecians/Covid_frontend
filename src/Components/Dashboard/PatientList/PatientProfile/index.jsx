import React, {useEffect, useState} from 'react'
import Pprofile from '../../../Pprofile/Pprofile';
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import cookie from 'react-cookies'
import {useToasts} from 'react-toast-notifications'
import { patientProfile } from '../../../../Api/patient.api';
import { Button, Table, Spinner } from 'react-bootstrap'
import { patientHealthPaginateProfile } from '../../../../Api/health.api';
import ProfileHeader from './ProfileHeader.jsx';
import Grid from '@mui/material/Grid';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import { useTheme } from "@mui/material";
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { patientHealthStatusReadings } from '../../../../Api/health.api';
const PatientProfile = (props) => {

    const{
        query_params = {},
        closeProfile = () => {},
    } = props;
    const initialReading = {
        oxy : [],
        temperature : [],
        bp : [],
        pulse : [],
        respiratory : []
    }
    const {addToast} = useToasts()
    const [state, setState] = useState({})
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [test, setTest] = useState({})
    const [vaccine, setVaccine] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [ update_trigger, setUpdateTrigger] = useState(false)
    const [ reading, setReading] = useState( initialReading)
    const theme = useTheme()

    const isProfileUpdated = useSelector((state) => state.patient.profileUpdated )
    const dispatch = useDispatch()

    const getDetails = () => {

        setLoading(true)
        axios({
            url: patientProfile+`${query_params.id}/${query_params.contact}/`,
            method: 'GET',
            
          })
          .then((res) => {
            if (res.data.status === 404) {
                addToast("Details Not Found!!", {appearance: "error"})
                setRedirect(true)
            } 
            else 
            {

                setRedirect(false)
                setState(res.data.data)
                setTest(res.data.data.patient_covid_test)
                setVaccine(res.data.data.patient_vaccine_status)
                
                axios({
                    url: patientHealthPaginateProfile+`${query_params.id}/`,
                    method: 'GET',
                    })
                    .then((res) => {
                            if (res.data.status === 404) {
                                setLoading(false)
                                setData(res.data.data)
                            } else {
                                setLoading(false)
                                setData(res.data.results)
                                setPageCount(res.data.total_pages)
                            }
                            })
                            .catch((err) => {
                            console.log(err);
                            });
                            }
            
                     })
                .catch((err) => {
                    addToast("Details Not Found!!", {appearance: "error"})
                    setRedirect(true)
                    // console.log(err.response);
                });

    }

    const getReading = () => {

        axios({
            url: patientHealthStatusReadings+`${query_params.id}/`,
            method: 'GET',
           
          })
          .then((res) => {
            if (res.data.status === 404) {
                addToast("Readings Not Found!!", {appearance: "error"})
            } 
            else 
            {
                console.log("reading", res.data) 

                setReading( { ...res.data.data})
            }
            
                     })
                .catch((err) => {
                    addToast("Details Not Found!!", {appearance: "error"})
                    setRedirect(true)
                    // console.log(err.response);
                });

    }


    useEffect(() => {

        console.log("units")

        getDetails()
        getReading()
        }, [])

     useEffect(( ) => {
        
        if(isProfileUpdated === true)
            getDetails()

     }, [ isProfileUpdated ] )   

    const handlePageClick= (e)=>{
        setLoading(true)
        axios({
            url: patientHealthPaginateProfile+`${query_params.id}/?page=${e.selected+1}`,
            method: 'GET',
            })
            .then((res) => {
                if (res.data.status === 404) {
                    setLoading(false)
                    setData(res.data.data)
                } else {
                    setLoading(false)
                    setData(res.data.results)
                    setPageCount(res.data.total_pages)
                }
                })
            .catch((err) => {
            // console.log(err.response);
            });
    }

    if (redirect){
        return <Redirect to = '/'/>
    }
    return (
        <>
        <ProfileHeader  closeProfile = {closeProfile} info = {state}  />
        {/* {loading? <Load />: null} */}

        <Grid container spacing={2} my = {0}>
        <Grid item xs={9}>
            <RightSection data = {state}  health_status = {data} reading = {reading} />
        </Grid>
        <Grid item xs={3}  
            sx = {{
                border : "1px solid " + theme.palette.border.primary,
                background  : theme.palette.v2.primary
            }}
        >
            <LeftSection data = {state} />
        </Grid>
      </Grid>


        {/* <div className="container p-2">
            {cookie.load("token")? 
                    <div className="card-body row p-0" style={{marginLeft:"-30px"}}>
                        <div className=" col-md-12 col-sm-12 col-12 col-lg-12">
                            
                            <Link to='/home'> 
                                <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" >
                                    Home
                                </Button>
                            </Link>
                            <span className="p-1"></span>
                            <Link to='/list'> 
                                <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" >
                                Hospitalized Patients 
                                </Button>
                            </Link>
                            <span className="p-1"></span>
                        </div>
                        
                       
                    </div>
                    : 
                    <Link to='/'>
                            <Button variant="primary" type="submit" className="searchbarcontainer log">
                                Back
                            </Button>
                        </Link>
                    }

                    
            <div className="row my-4 px-1">
                <div className="col-md-6  col-sm-12 col-lg-6 col-12 mb-2 p-0">
                    <div className="card-body card profile h-100">
                        <p className="card-title pl-3">Patient id: <span className="font-weight-bold">  &ensp; &ensp;{state.patient_id}</span></p>
                        <p className="card-title pl-3">Name: <span className="font-weight-bold">  &ensp; &ensp;{state.name} </span></p>
                        <p className="card-title pl-3">Status: <span className="font-weight-bold">  &ensp; &ensp;{state.patient_status==="A"? "Hospitalized": state.patient_status==="R" ? "Recoverd" : state.patient_status==="M" ? "Referred": state.patient_status==="H" ?"Home Isolated" : "N/A"} </span></p>
                        <p className="card-title pl-3">Gender: <span className="font-weight-bold">  &ensp; &ensp;{state.gender}</span></p>
                        <p className="card-title pl-3">Age: <span className="font-weight-bold">  &ensp; &ensp;{state.age}</span></p>
                        <p className="card-title pl-3">Patient Condition: <span className="font-weight-bold">  &ensp; &ensp;{state.health_condition==="1"? "Asymptomataic": state.health_condition==="2"? "Mild": state.health_condition==="3"? "Moderate": state.health_condition==="4"? "Severe": "N/A"}</span></p>
                        {state.patient_status==="A"?
                            <p className="card-title pl-3">
                            Bed Number: <span className="font-weight-bold">  &ensp; &ensp;
                                    {state.patient_bed?state.patient_bed.bed_id: null}
                                    (
                                    {state.patient_bed ? 
                                        state.patient_bed.bed_category==="1"? "GEN": state.patient_bed.bed_category==="2"?
                                                "O2": state.patient_bed.bed_category==="3"? "ICU": state.patient_bed.bed_category==="4"?"VEN":"N/A":null

                                    })</span>
                            </p>  
                            : 
                            null  
                        }
                        
                        <p className="card-title pl-3">Contact Number: <span className="font-weight-bold">  &ensp; &ensp;{state.contact_number}</span></p>
                        <p className="card-title pl-3">Address: <span className="font-weight-bold">  &ensp; &ensp;{state.address}</span></p>
                        <br />
                        {cookie.load("staff")==="DOCTOR"? 
                            <div className="row">
                            <div className=" col-md-12 col-sm-12 col-12 col-lg-12">
                                {state.patient_status==="A"?
                                    <Link  className="p-2" to={`/patient/bedchange/${state.patient_id}`}>
                                        <Button variant="primary" type="submit" className="searchbarcontainer log">
                                            Change Bed
                                        </Button>
                                    </Link>
                                    :
                                    null
                                }
                                
                                <Link  className="p-2" to={`/patient/statuschange/${query_params.id}`}>
                                    <Button variant="primary" type="submit" className="searchbarcontainer log">
                                        Change Status
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        : null
                        }
                    </div>
                </div>
                <div className="col-md-1 col-lg-1"></div>
                <div className="col-md-5  col-sm-12 col-lg-5 col-12 mb-2 p-0">
                    <div className="card-body card profile h-100">
                        {test!==null? 
                            <>
                            <p className="card-title pl-3">Covid Tested: <span className="font-weight-bold">  &ensp; &ensp;{test.is_tested===true? "Yes": "No"} </span></p>
                            <p className="card-title pl-3">Covid Test Type: <span className="font-weight-bold">  &ensp; &ensp;{test.type==="1"? "Rapid-Antigen": test.type==="2" ? "RT-PCR" : test.type==="3" ? "TrueNat":"N/A"} </span></p>
                            <p className="card-title pl-3">Covid Test Result: <span className="font-weight-bold">  &ensp; &ensp;{test.result==="1"? "Positive": test.result==="2" ? "Negative" : test.result==="3" ? "Awaited": test.result==="4"? "Rejected":"N/A"} </span></p>
                        
                            </>
                            : "Details not available!"
                        }
                        <br />
                        <br />
                        <br />

                       { vaccine!==null?
                        <>
                             <p className="card-title pl-3">Vaccinated: <span className="font-weight-bold">  &ensp; &ensp;{vaccine.is_vaccinated===true ? "Yes": "No"} </span></p>
                        {vaccine.vaccine_status? vaccine.vaccine_status.map((i,index)=>{
                            return(
                                <p className="card-title pl-3">Dose {index+1}: <span className="font-weight-bold">  &ensp; &ensp;{i.type==="1" ? `Covishield/${i.vaccinated_on}`: i.type==="2"? `Covaxin/${i.vaccinated_on}`:"N/A"} </span></p>
                            )
                        })
                        : null
                        }
                        </>: "Details not available!"
                       }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 p-2 profile">
                
                    <div className="pt-2">
                    <Table responsive="md" className="">
                        <thead>
                        <tr>
                            <th>Updated At (Date(Time))</th>
                            <th>Patient Condition</th>
                            <th>SPO2 (%)</th>
                            <th>Blood Pressure</th>
                            <th>Temperature (F)</th>
                            <th>Pulse Rate (BPM)</th>
                            <th>Respiratory Rate (BPM)</th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        {loading ? 
                            <tr>
                                <td>
                                    <span>Loading.....</span>
                                    <Spinner animation="border" size="lg" className=""/>
                                
                                </td>
                            </tr>
                            :
                        null
                        }
                        {data.length===0? "Patient Health history doesn't exits": 
                            <>
                            {data.map((i,index) => (
                        <tr>
                             <td>
                                {i.created_on? i.created_on.split("T")[0]: "N/A"}
                                ({i.created_on? i.created_on.split("T")[1].split(":")[0]: "N/A"}: {i.created_on? i.created_on.split("T")[1].split(":")[1]: "N/A"})
                             </td>
                            <td>{i.patient_condition==="1"? "Asymptomataic" : i.patient_condition==="2" ? "Mild" : i.patient_condition==="3" ? "Moderate" : i.patient_condition==="4"?"Severe":"N/A" }</td>
                            <td>{i.oxy_level}%</td>
                            <td>{i.blood_pres_systolic}/{i.blood_pres_diastolic}(mm hg)</td>
                            <td>{i.temperature}(F)</td>
                            <td>{i.pulse_rate}(BPM)</td>
                            <td>{i.respiration_rate}(BPM)</td>
                            
                            
                        </tr>
                        ))}
                            </>
                        }
                        </tbody>
                     </Table>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 p-4  searchbarcontainer">
                    <ReactPaginate
                        previousLabel={" ← Prev"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex-wrap justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link radius mx-1 mt-1"}
                        previousLinkClassName={"page-link radius mx-1 mt-1 mx-2 border-0"}
                        nextLinkClassName={"page-link radius mx-1 mt-1 mx-2 border-0"}
                        breakClassName={"page-link radius mx-1 mt-1"}
                        activeClassName={"active"}
                        disabledClassName={"disabled"}
                    />
                </div>
            </div>
        </div> */}
        </>
    )
}

export default PatientProfile;
