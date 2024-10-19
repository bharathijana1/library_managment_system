import { NavLink, useNavigate } from 'react-router-dom'; // Importing useNavigate
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';

export const SideBar = () => {
    const [closedIcon, setClosedIcon] = useState(false);
    const navigate = useNavigate(); // using useNavigate hook inside component
    
    const navLinkActive = ({ isActive }) => {
        return {
            color: isActive ? "maroon" : "black",
        };
    };

    const closeSideBar = () => {
        setClosedIcon(prev => !prev);
    };
    
    useEffect(() => {
        const handleResize = () => {
            // Check the screen width and update the state accordingly
            if (window.innerWidth <= 1000) {
                setClosedIcon(false);
            } else {
                setClosedIcon(true);
            }
        };
    
        // Initial check on component mount
        handleResize();
    
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
    
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
      
    const onClickLogout = () => {
        if (window.confirm("are you want to log-out")) {
            Cookies.remove('jwt_token');
            navigate('/login'); // using navigate to redirect to login page
        }
    };
      
    return (
        <>
            {closedIcon ? (
                <div className='text-bg-dark vh-100 closed-btn-min'>
                    <div className='px-2 h2 pt-2 dash d-flex justify-content-start  closed-btn-min w-50' style={{color:"#B197FC"}}>
                        {/* <div >
                            <h1>Dashboard</h1>
                            <svg className='book mx-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#B197FC" d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
                        </div> */}
                        <div className='d-flex justify-content-end w-25'>
                            <button className="btn btn-dark bg-warning text-lg font-weight-bold" onClick={closeSideBar} style={{width:"300px"}}>
                                X
                            </button>
                        </div>
                    </div>
                    <ul className='list-unstyled p-4 '>
                        <li style={{fontSize:"20px"}}>
                            <NavLink to='/' style={navLinkActive}>
                                Home
                            </NavLink>
                        </li>
                        <li className='my-3'  style={{fontSize:"20px"}}>
                            <NavLink to='/book' style={navLinkActive}>
                                Book Details
                            </NavLink>
                        </li>
                        <li  style={{fontSize:"20px"}}>
                            <NavLink to='/author' style={navLinkActive}>
                                Author Details
                            </NavLink>
                        </li>
                        <li className='my-3' style={{fontSize:"20px"}}>
                            <NavLink to='/create' style={navLinkActive}>
                                Add new book
                            </NavLink>
                        </li>


                    </ul>
                    <Button
                        type="button"
                        className="logout-desktop-btn btn-secontary"
                        onClick={onClickLogout}
                        variant='secondary'
                        style={{backgroundColor:"maroon"}}
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div className='close-btn p-3 '>
                    <button  className="bg-transparent border-0"  onClick={closeSideBar}>
                        <svg className='book mx-2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#000000" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
                    </button>
                </div>
            )}
        </>
    );
};
