import React, {useState } from "react";
import './Login.css'




// Mock login credentials
const mockUser = {
    username: "testuser",
    password: "password123"
};

const Login = () => {

    const [action,setAction] = useState("Login");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownContent, setDropdownContent] = useState('');

    const handleDropdownToggle = (content) => {
        setDropdownContent(content);
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        
    <div className='container'>
            <div className="page-header">
                <div className="logo">
                    <img src={solidi_icon} alt="Company Logo" />
                </div>
                <div className="filter-text">
                    <p onClick={() => handleDropdownToggle('About')}>About</p>
                    <p onClick={() => handleDropdownToggle('See Our Work')}>See Our Work</p>
                    <p onClick={() => handleDropdownToggle('Our Services')}>Our Services</p>
                    <p onClick={() => handleDropdownToggle('Languages')}>Languages</p>
                    <p onClick={() => handleDropdownToggle('Contact')}>Contact</p>
                </div>
            </div>
            {isDropdownVisible && (
                <div className="dropdown-menu">
                    <p>{dropdownContent}</p>
                </div>
            )}
        <div className="text-welcome">
            <p>
            We are... <br />
            Your Digital Partner <br />
            </p>
            <p className="small-text">Mitigating digital risks for our Digitization Era 
            SolidiThai</p>
            <div className="company-icons">
                {/* <img src={solidi_icon} alt="" />   */}
                <img src={eyt3_icon} alt="" />
                <img src={b_icon} alt="" />
            </div>
        </div>

        {/* Log-in form */}
        <div className="login-form">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            {/* username */}
            <div className="inputs">
                {action==="Login"?<div></div>: <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="text" placeholder="Username"/>
                </div>}
                <div className="input">
                    <img src={email_icon} alt="" />
                    <input type="email" placeholder="Email"/>
                </div>
                {/* password */}
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            {action==="Sign Up"?<div></div>: <div className="forgot-password">Forgot Password</div>}
            {/* Login-buttom */}
            <div className="submit-container">
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}>Login</div>
                <div className={action==="Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
            </div>

            {/* company icon */}

        </div>
    </div>
  )
}
export default Login
