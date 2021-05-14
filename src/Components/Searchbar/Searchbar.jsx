import React from 'react'

import { Button, Form } from 'react-bootstrap'
import Logout from '../../Components/Logout/Logout'
// import {patientSearch} from '../../Api/patient.api'
// import axios from 'axios'
// import cookie from 'react-cookies'
export default function Searchbar() {

    // const initialState = {
    //     show: false,
    //     loading: false,
    //     query: '',
    // }
    // const [state, setState] = useState(initialState)

    // const handleChange = event =>{
    //     setState({ ...state, [event.target.name]: event.target.value,         
    //     });
    //   }
    // const handleSubmit = event => {
    //     console.log(event)
    //     event.preventDefault();
    //     setState({...state, loading: true})
    //     axios({
    //         url: patientSearch+`${state.query}/`,
    //         method: 'GET',
    //         headers: {
    //             Authorization: `Token ${cookie.load('token')}`,
    //     },
    //     })
    //     .then((res) => {
    //     if (res.data.status === 404) {
    //         console.log(res)
    //         setState({...state, show: true})
    //     } else {
    //         setState({...state, show: true})
    //         // setState(false)
    //         // setState(res.data.data.reverse())
    //         console.log(res.data)
    //     }
    //     })
    //     .catch((err) => {
    //     console.log(err.response);
    //     });

    // }
    return (
        <>
        <div className="row">
            <div className="col-md-9 col-9 col-sm-12">
                <Form > {/*onSubmit={handleSubmit}*/}
                        <Form.Group controlId="Patientid" className='searchbarcontainer'>
                        <i className='fa fa-search serachicon'></i>
                        <input  
                            className='searchbar' 
                            type="text"
                            placeholder='Search...' 
                            name="query" 
                            
                        />
                        {/* onChange={handleChange}  */}
                        </Form.Group>
                    <Button 
                        variant="light" type="submit" 
                        className="searchbarcontainer col-5 col-md-3 col-sm-3 mx-2 mt-2">
                        Search
                    </Button>
                </Form>
                {/* {state.show? 
                    <div className="filter mt-4 row">
                    <Form onSubmit={handleSubmit} className="searchbarcontainer">
                    <Button 
                        variant="outline-primary" 
                        type="submit" 
                        className="searchbarcontainer col-12 mt-2 col-md-3 col-sm-3 mx-2 d-none d-md-block d-lg-block d-sm-block" 
                        onClick={(e)=>{
                            setState({...state, query: "migrated"});
                            
                        }}
                        >
                        Migrated
                    </Button>
                    </Form>
                    
                    <Button variant="outline-primary" type="submit" className="searchbarcontainer col-12 mt-2 col-md-3 col-sm-3 mx-2 d-none d-md-block d-lg-block d-sm-block">
                        Recovered
                    </Button>
                    <Button variant="outline-primary" type="submit" className="searchbarcontainer col-12 mt-2 col-md-3 col-sm-3 mx-2 d-none d-md-block d-lg-block d-sm-block">
                        Death
                    </Button>
                </div>   
                : null
                } */}
            </div>
            <div className="col-md-1 col-3 col-sm-12"> 
                <Logout />
            </div>
        </div>
         
        
        </>
    )
}

