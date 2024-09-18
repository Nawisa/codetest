import React, { useState, useEffect } from "react";
import './Login.css';

import solidi_icon from '../Assets/solidi.png';
import eyt3_icon from '../Assets/eyt3.png';
import b_icon from '../Assets/221B.png';
import user_icon from '../Assets/user.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const Login = () => {
    const [action, setAction] = useState("Login");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [dropdownContent, setDropdownContent] = useState('');

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // States to store data fetched from "API"
    const [userData, setUserData] = useState(null); // For storing mockUser
    const [entries, setEntries] = useState([]); // For storing mockEntries
    
    // Simulate an API request to get user data and entries
    const fetchData = async () => {
        try {
            console.log("Fetching user data...");
        
            const responseUser = await fetch('/mockUser.json');
            const responseEntries = await fetch('/mockEntries.json');
        
            if (!responseUser.ok || !responseEntries.ok) {
                throw new Error("Failed to fetch data");
            }
        
            const user = await responseUser.json();
            const entriesData = await responseEntries.json();
        
            setUserData(user);
            setEntries(entriesData);
        } catch (error) {
            console.error("Error fetching data:", error);
            setErrorMessage("Failed to fetch data, please try again later.");
        }
    };

    // Run on component mount to fetch data
    useEffect(() => {
        fetchData();
    }, []);
    

    // Handle user login
    const handleLogin = () => {
        if (action === "Login") {
            // Retrieve user data from localStorage if available
            const storedUser = JSON.parse(localStorage.getItem('mockUser')) || userData;

            if (storedUser && username === storedUser.username && password === storedUser.password) {
                setErrorMessage(""); // Successful login
                setIsLoggedIn(true);
            } else {
                setErrorMessage("Invalid username or password");
            }
        }
    };

    // Handle user sign-up
    const handleSignUp = () => {
        if (!username || !email || !password) {
            setErrorMessage("Please fill out all fields.");
        } else {
            // Store new user credentials in localStorage (mocking user creation)
            const newUser = { username, email, password };
            localStorage.setItem('mockUser', JSON.stringify(newUser));
            setErrorMessage(""); // Successful sign-up
            alert("Sign Up successful! You can now log in with your credentials.");
            setAction("Login"); // Switch back to login after successful sign-up
        }
    };

    const handleDropdownToggle = (content) => {
        setDropdownContent(content);
        setDropdownVisible(!isDropdownVisible);
    };

    const filteredEntries = entries.filter((entry) =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (isLoggedIn) {
        // Dashboard Page
        return (
            <div className="dashboard">
                <h1>Welcome, {userData?.username}!</h1>
                <input
                    type="texts"
                    placeholder="Search entries..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="entries-list">
                    {filteredEntries.length > 0 ? (
                        filteredEntries.map((entry) => (
                            <div key={entry.id} className="entry">
                                <h2>{entry.title}</h2>
                                <p>{entry.description}</p>
                            </div>
                        ))
                    ) : (
                        <p>No entries found</p>
                    )}
                </div>
            </div>
        );
    }
    
    

    return (
        <div className="container">
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
                <p className="small-text">
                    Mitigating digital risks for our Digitization Era
                    SolidiThai
                </p>
                <div className="company-icons">
                    <img src={eyt3_icon} alt="EY3 Icon" />
                    <img src={b_icon} alt="221B Icon" />
                </div>
            </div>

            {/* Login form */}
            <div className="login-form">
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>

                {/* Form Inputs */}
                <div className="inputs">
                    {/* Username field - always visible */}
                    <div className="input">
                        <img src={user_icon} alt="Username Icon" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    {/* Email field - only visible for Sign Up */}
                    {action === "Sign Up" && (
                        <div className="input">
                            <img src={email_icon} alt="Email Icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    )}

                    {/* Password field - always visible */}
                    <div className="input">
                        <img src={password_icon} alt="Password Icon" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                {/* Error Message */}
                {errorMessage && (
                    <div className="error-message">{errorMessage}</div>
                )}

                {/* Submit buttons */}
                <div className="submit-container">
                    <div className="submit" onClick={action === "Login" ? handleLogin : handleSignUp}>
                        {action === "Login" ? "Login" : "Sign Up"}
                    </div>
                    <div className="submit gray" onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}>
                        {action === "Login" ? "Sign Up" : "Login"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
