import server from './server';

//  patientAdmit APIs

export const patientAdmit = `${server}/api/patient/admit/`  
export const patientBedalloatment = `${server}/api/patient/bed_allotment/` 
export const patientProfile = `${server}/api/patient/get_patient_profile/` 

// /For Getting all the lists of patient and if need to register new patient then admit using same link