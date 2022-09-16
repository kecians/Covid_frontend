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
import { useTheme } from '@mui/styles';
import ReactPaginate from 'react-paginate';

const PatientProfile = (props) => {

    const{
        query_params = {},
        closeProfile = () => {},
    } = props;
 
    const {addToast} = useToasts()
    const [state, setState] = useState({})
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [test, setTest] = useState({})
    const [vaccine, setVaccine] = useState({})
    const [redirect, setRedirect] = useState(false)
    const [pageCount, setPageCount] = useState(0)

    const theme = useTheme()

    useEffect(() => {
        setLoading(true)
        axios({
            url: patientProfile+`${query_params.id}/${query_params.contact}/`,
            method: 'GET',
            
          })
          .then((res) => {
            if (res.data.status === 404) {
                addToast("Details Not Found!!", {appearance: "error"})
                setRedirect(true)
            } else {
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
                    // console.log(err.response);
                    });
             }
          })
          .catch((err) => {
            addToast("Details Not Found!!", {appearance: "error"})
            setRedirect(true)
            // console.log(err.response);
          });

    }, [query_params.id, addToast, query_params.contact])

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
            <RightSection data = {state}  health_status = {data} />
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
        </>
    )
}

export default PatientProfile;
