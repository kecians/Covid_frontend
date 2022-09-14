import React, {useState} from 'react';
import StaffLoginForm from './LoginForm';

const StaffLogin = () => {
    const [state, setState] = useState("login");
    
    return (
        state == "login" 
        ? <StaffLoginForm />
        : <></>
     );
}

export default StaffLogin;
