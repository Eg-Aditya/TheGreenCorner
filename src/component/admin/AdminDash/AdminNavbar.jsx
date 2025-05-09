import React, { useContext } from 'react'
import Logo from '../../../assets/plant/TheGreenCorner.png';
import { Link, useNavigate } from 'react-router-dom';
import { MdLogout } from 'react-icons/md';
import { plantContext } from '../../Context/AppContext';


const AdminNavbar = () => {
    const { isLoggedIn, setIsLoggedIn, userDetails, setUserDetails } = useContext(plantContext)
    let navigate =  useNavigate();
    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserDetails({ email: "", password: "" });
        navigate('/login');  // Redirect to login page
    };
    return (
        <div>
            <div className='w-full h-16 bg-[#333] flex  items-center justify-between p-3'>
                <img src={Logo} alt="" className='w-32  lg:w-56' />

                <button
                    onClick={handleLogout}
                    className='px-3 py-1 bg-white rounded-lg   flex gap-2 items-center font-semibold'> <MdLogout size={20} className='text-red-600' />
                    Login
                </button>
            </div>
        </div>
    )
}

export default AdminNavbar