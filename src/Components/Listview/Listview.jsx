import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button, Table, Spinner } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import './Listview.scss'
// import Profile from '../Profile/Profile'
import Searchbar from '../Searchbar/Searchbar'
import Logout from '../Logout/Logout'
import cookie from 'react-cookies'
import {patientListPagination} from '../../Api/patient.api'
import axios from 'axios'
import Heading from '../Heading/Heading'
import Load from './Load'

// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
export default function Listview() {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState([])
    const [pageCount, setPageCount] = useState(0)
    useEffect(() => {
        setLoading(true)
        axios({
            url: patientListPagination,
            method: 'GET',
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then((res) => {
            if (res.data.status === 404) {
                setLoading(false)
                // setState(res.data.data)
                // setvaccine
            } else {
                setLoading(false)
                setPageCount(res.data.total_pages)
                setState(res.data.results)
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    // console.log(state)
    const handlePageClick= (e)=>{
        setLoading(true)
        axios({
            url: patientListPagination+`?page=${e.selected+1}`,
            method: 'GET',
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then((res) => {
            if (res.data.status === 404) {
                setLoading(false)
            } else {
                setLoading(false)
                setPageCount(res.data.total_pages)
                setState(res.data.results)
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }
    return (
        <>
        {loading?<Load />:null}
        <div className="container pt-3">
            <Heading heading="Goverdhan Tiwari Government Base Hospital, Almora"/>
            <div className="row">
                <div className="col-md-12 col-12 col-sm-12 p-0">
                    <Searchbar />
                </div>
            </div>
            <hr className="mt-4"/>
            {/* Cards for Status for patient check */}
            
            <div className="row" style={{marginLeft:"-22px"}}>
            <div className="col-md-12 col-sm-12 col-12 p-2 col-lg-12 p-0">
                    
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
                    
                    {cookie.load("staff")==="NURSE" ?
                    <>
                    <span className="p-1"></span>
                    <Link to="/patient/admit">
                        <Button variant="primary" type="submit" className="searchbarcontainer log mt-2">
                            Add Patient
                        </Button>
                    </Link>
                     </>
                     : 
                    null}
                    <span className="p-1"></span>
                    <Logout />
                    
                    
                </div>
            </div>
            {/* Cards for Status for patient check */}
            <div className="row py-3">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile">
                <Table responsive="lg" className="" id="activetable">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>

                        {cookie.load("staff")==="NURSE" ?<th>Health Update</th>: null}
                        <th>Patients Condition</th>
                        <th>Alloted Bed</th>
                        <th>Admitted On</th> 
                        <th>Covid Status</th> 
                        <th>Vaccinated</th> 
                        <th>Vaccine Details</th> 
                        <th>Remark</th> 
                        
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
                    {typeof(state)==="string"? 
                    "Patients Doesn't Exist!!"
                    :
                    <>
                        {state.map((i,index) => (
                    <tr key={index}>
                        <td>{i.patient_id}</td>
                        <td><Link to={`/patient/profile/${i.patient_id}/${i.contact_number}`} className="text-primary text-center">{i.name}</Link></td>
                        {cookie.load("staff")==="NURSE"?      
                            <td> <Link to={`/patient/healthcheck/${i.patient_id}/${i.name}`} className="text-primary text-center">Health Checkup</Link></td>
                                    :null
                        }
                        <td>{i.health_condition==="1"? "Asymptomatic": i.health_condition==="2"? "Mild": i.health_condition==="3"? "Moderate": i.health_condition==="4"?"Severe":"N/A"}</td>
                        <td>{i.patient_bed?i.patient_bed.bed_id: null}
                        (
                                {i.patient_bed ? 
                                    i.patient_bed.bed_category==="1"? "GEN": i.patient_bed.bed_category==="2"?
                                            "O2": i.patient_bed.bed_category==="3"? "ICU":  i.patient_bed.bed_category==="4"?"VEN":"N/A":null

                                })
                                
                        </td>
                        <td>{i.admitted_on}</td>
                        <td>{i.covid_status==="P" ? "Positive": i.covid_status==="S"? "Suspect": i.covid_status==="N" ? "Negative": "N/A"}</td>
                        <td>{i.patient_vaccine_status?i.patient_vaccine_status.is_vaccinated? "Yes":"No": "N/A" }</td>
                        <td>
                            {i.patient_vaccine_status?
                                i.patient_vaccine_status.is_vaccinated?  
                                    i.patient_vaccine_status.vaccine_status[i.patient_vaccine_status.vaccine_status.length-1].type==="1"? 
                                        `Covishield/${i.patient_vaccine_status.vaccine_status[i.patient_vaccine_status.vaccine_status.length-1].vaccinated_on}`: `Covaxin/${i.patient_vaccine_status.vaccine_status[i.patient_vaccine_status.vaccine_status.length-1].vaccinated_on}`
                                    : 
                                "N/A"
                            : "N/A"
                            }
                        </td>
                        <td>{i.remark}</td>
                        
                    </tr>
                    ))}
                    </>
                    }
                    </tbody>
                </Table>
                
                </div>

                {/* <div className="col-md-2 p-2  col-sm-12 col-lg-2 col-12">
                    <Profile/>
                    
                </div> */}
            </div>
            <div className="row">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 p-4  searchbarcontainer">
                    <ReactPaginate
                        previousLabel={" ← Prev"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex-wrap justify-content-center"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link radius mx-1 mt-1"}
                        previousLinkClassName={"page-link radius mx-1 mt-1 mx-5 border-0"}
                        nextLinkClassName={"page-link radius mx-1 mt-1 mx-5 border-0"}
                        breakClassName={"page-link radius mx-1 mt-1"}
                        activeClassName={"active"}
                        disabledClassName={"disabled"}
                    />
                </div>
            </div>
           
        </div>
        </>
    )
}
