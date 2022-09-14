import React, {useState} from 'react';
import { Container } from '@mui/material';
import Searchbar from './SearchBar';
import PatientTable from './PatientTable';
import PatientProfile from './PatientProfile/index.jsx';

const PatientList = () => {
    const initialState = {
        show: false,
        loading: false,
        query: '',
        data: []
    }
    const [state, setState] = useState(initialState)
    const [ show_profile, toggleProfile] = useState(false)
    const [ profile, setProfile] = useState(false)

    return (
        <Container  
            maxWidth = "100%"
            sx = {{
                height : "auto",
                paddingLeft : "0px !important",
                margin : "0px"

            }}
        >
            { !profile  ? 
                <>
                <Searchbar setState = {setState}  />
                <PatientTable rows = {state.data} toggleProfile = {toggleProfile} setProfile = {setProfile} />
            </>
            :
            <PatientProfile closeProfile = {setProfile} query_params = {profile} />
            
        }

      </Container>
    );
}

export default PatientList;
