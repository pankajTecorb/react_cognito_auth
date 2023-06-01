import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  id: string;
  Username: string,
  name: string;
  email: string;
  phoneNumber: string;
  UserStatus: string;
  Enabled: string;

}


const UserList = () => {
  const navigate = useNavigate();
  const [usersArray, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken'); // Replace with your token retrieval logic

    if (!accessToken) {
    //  navigate('/');
    }
    // Simulated API call to fetch users
    const fetchUsers = async () => {
      try {
        // Prepare request data
        const requestData = {
          email: localStorage.email,
          accessToken: localStorage.AccessToken,
        };
          await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/list', {
          method: 'POST',
          body: JSON.stringify({
            requestData
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle data
            const usersArray = data.data.result;
            setUsers(usersArray);
          })
          .catch((err) => {
            console.log(err.message);
          });

      } catch (error) {
        console.error('Error occurred while fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  // const deleteUser = async (email: string) => {
  //   try {
  //     const response = await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/delete', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email }),
  //     });
  //     const data = await response.json();
  //     if (data.code === 200) {
  //       //alert(data.message);
  //       toast.success(data.message)
  //       window.location.reload();
  //     } else {
  //       //alert(data.message);
  //       toast.error(data.message)
  //     }
  //   } catch (error:any) {
  //     console.error('Error occurred during Delete user:', error);
  //     //alert('Error occurred during OTP Delete user: ' + error);
  //     toast.error(error)
  //   }
  // };

  const handleLogout = async () => {
    try {
      const email = localStorage.email
      const response = await fetch('https://aws-cognito-auth-tecorb.onrender.com/api/v1/user/cognito/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email}),
      });
      
      const data = await response.json();
      if (data.code === 200) {
        //alert(data.message);
        toast.success(data.message)
        // Clear any user session or tokens
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('email');
        localStorage.removeItem('RefreshToken');
        navigate('/');
      } else {
        //alert(data.message);
        toast.error(data.message)
      }
    } catch (error:any) {
      toast.error(error)
      console.error('Error occurred during Logout user:', error);
      //alert('Error occurred during  Logout user: ' + error);
    }

  };

  const handleChangePassword = () => {
    navigate('/change-password')
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 min-h-screen py-8">
       <ToastContainer />
      <nav className="flex justify-between items-center max-w-4xl mx-auto px-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Users List</h2>
        </div>
        <div>
          <button
            onClick={handleChangePassword}
            className="text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg mr-2"
          >
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto px-4">
        {/* <h2 className="text-3xl font-bold text-white mb-6">User List</h2> */}
        {usersArray.length === 0 ? (
          <p className="text-gray-200">No users found.</p>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  {/* <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">ID</th> */}
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Name</th>
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Email</th>
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Phone Number</th>
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Email Status</th>
                  <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">User Status</th>
                  {/* <th className="py-3 px-4 text-gray-700 font-medium tracking-wider">Actions</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usersArray?.map((user: any, index) => {
                  return (
                    <tr key={index}>
                      {/* <td className="py-4 px-6 whitespace-nowrap">{user.Username}</td> */}
                      <td className="py-4 px-6 whitespace-nowrap">{user?.Attributes[2].Value}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{user?.Attributes[5].Value}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{user?.Attributes[4].Value}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{user.UserStatus}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{user.Enabled ? "Active" : "Deactive"}</td>
                      {/* <td className="py-4 px-6 whitespace-nowrap">
                        <button
                          onClick={() => deleteUser(user?.Attributes[5].Value)}
                          className="text-sm text-white bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded-lg"
                        >
                          Delete
                        </button>
                      </td> */}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;







