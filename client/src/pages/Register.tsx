import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import backgroundImage from "../assets/register.jpeg"
import sendRequest from "../utilities/sendRequest";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface RegisterParams {
    email: string;
    password: string;
    repeatPassword: string;
}

export default function Register() {
    const [form, setForm] = useState<RegisterParams>({ email: '', password: '', repeatPassword: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/products")
        }
    }, [])

    useEffect(() => {
        if (form.password !== form.repeatPassword) {
            setPasswordMatchError('Passwords do not match');
        } else {
            setPasswordMatchError(null);
        }
    }, [form.password, form.repeatPassword]);

    function handleChange(e: any) {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        // Form validations
        if (!form.email || !form.password || !form.repeatPassword) {
            setError('All fields are required');
            return;
        }

        if (form.password !== form.repeatPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await sendRequest("/user/register", 'post', form);
            setSuccess('Account successfully created');
            setForm({ email: '', password: '', repeatPassword: '' });
        } catch (err: any) {
            console.log(err)
            setError(err.response.data.message || err.response || 'Error registering account');
        }
    }

    const bg = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="min-h-screen min-w-screen flex bg-slate-100 justify-center lg:justify-start items-center lg:h-full px-10"
        style={bg}>
            <div className="p-5 px-10 lg:w-[40em] bg-slate-50 rounded-lg shadow-lg flex flex-col justify-center items-start">
                <Link to="/login" className="flex items-center gap-x-4 mb-5">
                    <FontAwesomeIcon icon={faArrowLeft} className="h-5"/>
                    Back
                </Link>
                
                <img src={logo} alt="Logo" className="h-10 mb-5" />
                <h2 className="font-extrabold text-lg lg:text-2xl mb-5">Register a new account</h2>

                {error && <div className="bg-red-200 text-red-800 px-4 py-1 mb-5 rounded">{error}</div>}
                {success && <div className="bg-green-200 text-green-800 px-4 py-1 mb-5 rounded">{success}</div>}
                {passwordMatchError && <div className="bg-yellow-200 text-yellow-800 px-4 py-1 mb-5 rounded">{passwordMatchError}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-sm">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="inputStylized" 
                            onChange={handleChange} 
                            value={form.email}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-sm">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="inputStylized" 
                            onChange={handleChange} 
                            value={form.password}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="repeatPassword" className="mb-2 text-sm">Repeat Password</label>
                        <input 
                            type="password" 
                            name="repeatPassword" 
                            id="repeatPassword" 
                            className="inputStylized" 
                            onChange={handleChange} 
                            value={form.repeatPassword}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="px-4 py-2 text-sm bg-orange-500 hover:bg-orange-600 ring-offset-2 hover:ring-2 ring-orange-600 transition-[400ms] text-white mb-5"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
