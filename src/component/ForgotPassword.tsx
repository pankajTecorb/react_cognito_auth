
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css';


const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleEmailVerify = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/forget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.code === 200) {
        localStorage.setItem("email", email)
        //  Successful, handle the response or redirect the user
        //alert(data.message);
        toast.success(data.message);
        navigate("/forgot-password-reset");
      } else {
        //  Failed, handle the error response
        //alert(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error occurred during Forgot:', error);
      alert('Error occurred during Forgot: ' + error);
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
              Enter Your Email
            </h1>
            <form onSubmit={handleEmailVerify} className="space-y-4 md:space-y-6" action="#">

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input
                  type="email"
                  name="Email"
                  id="email"
                  placeholder="Enter Email "
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
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

export default Forgot;
