import { FcGoogle } from "react-icons/fc";
import useAuth from '../../hooks/useAuth';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        googleLogin().then((userCredential) => {
            const user = userCredential.user;

            if(user){
                const userInfo = {
                name: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                role: 'user',
                gender: 'Not specified',
                address: 'Not Specified',
                phone: 'Not specified',
            };

            if(user.email && user.displayName) {
                return  axios.post('https://fithub-r8lw.onrender.com/new-user', userInfo).then(() => {
                    toast.success("Login successful");
                    navigate('/');
                }).catch((error) => {
                    toast.error(`Login failed: ${error.message}`);
                });
            }
        }
            
        })
    }
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
