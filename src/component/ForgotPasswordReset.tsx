import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPasswordReset = () => {
    const navigate = useNavigate();
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const handleForgotReset = async (e: any) => {
        e.preventDefault();
        const obj = {
            email: localStorage.email,
            newPassword: password,
            code: otp
        }
        try {
            const response = await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/passConfirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj),
            });
            const data = await response.json();
            if (data.code === 200) {
                // Password Reset successful, handle the response or redirect the user
               // alert(data.message);
               toast.success(data.message);
                navigate("/");
            } else {
                // Password Reset failed, handle the error response
                //alert("Password Not Reset! Try Again");
                toast.error("Password Not Reset! Try Again");
            }
        } catch (error) {
            // Handle any network or other errors
            console.error('Error occurred during Password Reset:', error);
            alert('Error occurred during Password Reset: ' + error);
        }
    };


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="https://www.tecorb.com" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://upwork-usw2-prod-assets-static.s3.us-west-2.amazonaws.com/org-logo/1033068490733023232" alt="logo" />
                    Tecorb
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Your Password
                        </h1>
                        <form onSubmit={handleForgotReset} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your OTP</label>
                                <input
                                    type="OTP"
                                    name="OTP"
                                    id="otp"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Your OTP"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Submit
                            </button>

                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
};

export default ForgotPasswordReset;
