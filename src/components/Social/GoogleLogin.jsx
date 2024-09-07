import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const GoogleLogin = () => {
    const { googleLogin, loader } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await googleLogin();
            const user = userCredential.user;

            if (user) {
                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: 'user',
                    gender: 'Is not Specified',
                    address: 'Is not Specified',
                    phone: 'Is not Specified'
                };

                if (user.email && user.displayName) {
                    console.log(user.email);
                    const res = await axios.get(`https://fithub-r8lw.onrender.com/users?email=${user.email}`).then((res) => {
                        const existingUser = res.data.find(u => u.email === user.email);
                
                        if (!existingUser) {
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
        } catch (error) {
            toast.error('Login failed. Please try again.');
        }
    };
    return (
        <div className="flex items-center justify-center my-3">
            <ToastContainer position={toast.POSITION.TOP_CENTER}/>
            <button onClick={handleLogin} className="flex items-center outline-none bg-white border border-gray-300 rounded-lg shadow-md px-6 py-4 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none">
                <FcGoogle className="h-6 w-6 mr-2"/>
                <span>Continue with Google</span>
            </button>
        </div>
    );
};

export default GoogleLogin;
