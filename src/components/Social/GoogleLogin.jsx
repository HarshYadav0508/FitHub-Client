import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const GoogleLogin = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate();
    const handleLogin = () => {
        googleLogin().then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
    
            if (user) {
                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    role: 'user',
                    gender: 'Is not Specified',
                    address: 'Is not Specified',
                    phone: 'Is not Specified'
                };
    
                if (user.email && user.displayName) {
                    // Check if the user already exists in the database
                    axios.get(`https://fithub-r8lw.onrender.com/users?email=${user.email}`)
                        .then((res) => {
                            if (res.data.length === 0) {
                                // User does not exist, so save new user data
                                return axios.post('https://fithub-r8lw.onrender.com/new-user', userInfo)
                                    .then(() => {
                                        navigate('/');
                                        return "Registration Successful!";
                                    })
                                    .catch((err) => {
                                        throw new Error(err);
                                    });
                            } else {
                                // User already exists, navigate without saving
                                console.log("User already exists");
                                navigate('/');
                            }
                        })
                        .catch((err) => {
                            console.log("Error checking user existence:", err);
                        });
                }
            }
        }).catch((error) => {
            // Handle Errors here.
            const errorMessage = error.message;
            console.log(errorMessage);
        });
    }
  return (
    <div className="flex items-center justify-center my-3">
        <button onClick={() => handleLogin()} className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
            <FcGoogle className="h-6 w-6 mr-2"/>    
            <span>Continue with Google</span>
            
        </button>
    </div>
  )
}

export default GoogleLogin