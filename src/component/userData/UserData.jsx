import React, { useEffect } from 'react';
import { useContext } from 'react';
import { plantContext } from '../Context/AppContext';
import { FaUser, FaUserAltSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserData = () => {
    const { userDetails,isLoggedIn, setIsLoggedIn } = useContext(plantContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn])

    return (
        isLoggedIn ?   <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                {/* <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">User Details</h2> */}
                <div className="space-y-2 text-gray-700">
                     <div className='w-[100%] flex items-center justify-center h-[30%] mb-6 px-3 py-4 '>
                     <p className=' text-7xl w-[30%] flex items-center justify-center border px-8 py-4 rounded-full bg-black'><span> <FaUser className='text-blue-300 ' /> </span></p>
                     </div>
                    <p><span className="font-semibold">Username:</span> {userDetails?.user?.username}</p>
                    <p><span className="font-semibold">Email:</span> {userDetails?.user?.email}</p>
                    <p><span className="font-semibold">Contact:</span> {userDetails?.user?.contact}</p>
                    {/* <p><span className="font-semibold">Password:</span> {userDetails?.user?.password}</p> */}
                </div>
            </div>
        </div> : null
    );
};

export default UserData;
