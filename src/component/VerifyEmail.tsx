import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleEmailVerify = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.email, code }),
      });
      const data = await response.json();

      if (data.code === 200) {
        localStorage.setItem("email", localStorage.email);
       // alert(data.message);
       toast.success(data.message);
        navigate("/");
      } else {
       // alert("Something Wrong! Try again");
       toast.error("Something Wrong! Try again");
      }
    } catch (error) {
      console.error('Error occurred during OTP verification:', error);
      alert('Error occurred during OTP verification: ' + error);
    }
  };

  const handleResendOTP = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: localStorage.email }),
      });
      const data = await response.json();

      if (data.code === 200) {
       // alert(data.message);
       toast.success(data.message);
      } else {
       // alert(data.message);
       toast.error(data.message);
      }
    } catch (error) {
      console.error('Error occurred during OTP resend:', error);
      alert('Error occurred during OTP resend: ' + error);
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
              Enter Your OTP
            </h1>
            <form onSubmit={handleEmailVerify} className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="code" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                <input
                  type="text"
                  name="code"
                  id="code"
                  placeholder="Enter OTP"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>
              <a href="#" onClick={handleResendOTP} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                Resend OTP
              </a>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default VerifyEmail;











