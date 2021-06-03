import server from './server'

// health update
// need patient id as a username field to post for specific user
export const patientHealth = `${server}/api/health/update/` 

// icmr is the patient id to get his full health detail in last 5 days or last 5 entries

export const patientHealthProfile = `${server}/api/health/details/` // /<icmr>/
export const patientHealthPaginateProfile = `${server}/api/health/patient_health_list/` //<str:icmr>/`