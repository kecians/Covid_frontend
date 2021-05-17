import server from './server';

//  patientAdmit APIs

export const patientAdmit = `${server}/api/patient/admit/`  
export const patientBedalloatment = `${server}/api/patient/bed_allotment/` 

export const patientProfile = `${server}/api/patient/get_patient_profile/` //+"<str:id>"
export const allotedBeds = `${server}/api/patient/get_alloted_beds/`

export const patientStatus = `${server}/api/patient/change_patient_status/` //+"<str:id>/"
export const patientMigration = `${server}/api/patient/patient_migration/` //+<str:id>/

export const patientSearch = `${server}/api/patient/get_searched_patients/` // <str:query>/`
// /For Getting all the lists of patient and if need to register new patient then admit using same link