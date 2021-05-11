import server from './server'

// User Login/Logout/Register API's

export const userRegister = `${server}/api/staff/register/`;
export const userLogin = `${server}/api/staff/login/`;
export const userLogout = `${server}/api/staff/logout/`;

//  Profile Page API's 

export const userProfile = `${server}/api/staff/profile/`;  // GET or POST both
export const userProfilePasswordchange = `${server}/api/staff/profile/passwordchange/`