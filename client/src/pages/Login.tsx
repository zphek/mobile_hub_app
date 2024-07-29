import { Link, Router, useNavigate } from "react-router-dom";
import google from "../assets/google.svg"
import logo from "../assets/logo.svg"
import { useEffect, useState } from "react";
import sendRequest from "../utilities/sendRequest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

interface loginForm{
    email: string;
    password: string;
}

interface Error{
    message: string;
    error: boolean;
}

interface Successful{
    message: string;
    success: boolean;
}

function Login() {
    const [form, setForm] = useState<loginForm>()
    const [err, setError] = useState<Error>()
    const [successful, setSuccessful] = useState<Successful>();
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("token")){
            navigate("/products")
        }
    }, [])

    function handleChange(e: any) {
        const { name, value } = e.target;
        setForm((prevForm:any) => ({ ...prevForm, [name]: value }));
    }

    function handleSubmit(e:any){
        e.preventDefault();

        sendRequest('/user/login', 'post', form)
        .then((response)=>{
            setSuccessful({
                message: "You have logged in!",
                success: true
            })

            setTimeout(()=>{
                setSuccessful({
                    message: "You have logged in!",
                    success: false
                })

                localStorage.setItem("token", response.data.token)

                navigate("/products")
            }, 2000)
            // console.log(response.data.token)
        })
        .catch((err)=>{
            setError({
                message: err.response.data.message,
                error: true
            })

            setTimeout(()=>{
                setError({
                    message: "",
                    error: false
                })
            }, 1000)
            console.log(err);
        })
    }

    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-slate-100 relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-8 w-[400px] p-5 lg:p-0">
                <img src={logo} alt="" className="h-16 lg:h-20"/>
                
                <form className="flex flex-col bg-white p-4 lg:px-7 lg:py-5 rounded-2xl w-full"
                onSubmit={handleSubmit}>
                    <h2 className="text-center font-bold clamp-[lg-3cqw-xl] mb-5">Sign in</h2>
                    <h4 className="text-center clamp-[xs-3cqw-sm] text-slate-400 mb-5">Welcome back! Please enter your details.</h4>

                    <div className="flex flex-col gap-y-2 mb-2">
                        <h2 className="text-slate-500 clamp-[xs-3cqw-sm]">Email</h2>   
                        <input type="text" name="email" id="" className="inputStylized"
                        onChange={handleChange}/>
                    </div>

                    <div className="flex flex-col gap-y-2 mb-4">
                        <h2 className="text-slate-500 clamp-[xs-3cqw-sm]">Password</h2>
                        <input type="password" name="password" id="" className="inputStylized"
                        onChange={handleChange}/>
                    </div>

                    <button className="px-4 py-2 text-sm rounded-xl bg-orange-500 hover:bg-orange-600 ring-offset-2 hover:ring-2 ring-orange-600 transition-[400ms] text-white mb-5">
                        Sign in
                    </button>

                    {/* <h4 className="text-slate-500 mb-2 text-center clamp-[xs-3cqw-sm]">OR</h4>

                    <button className="py-2 rounded-xl flex items-center justify-center gap-x-2 ring-offset-2 hover:ring-2 ring-yellow-500 transition-[400ms]">
                        <img src={google} alt="" className="h-4 lg:h-5"/>
                        <h2 className="clamp-[xs-3cqw-sm]">
                            Sign in with Google
                        </h2>
                    </button> */}

                    <div className="flex gap-x-2 justify-center items-center mt-3">
                        <h2 className="text-slate-500 clamp-[xs-3cqw-sm]">Don't have an account?</h2>
                        <Link to="/register" className="font-bold hover:underline clamp-[xs-3cqw-sm]">Sign up</Link>
                    </div>
                </form>
            </div>
            
                { err?.error && <h2 className="absolute bottom-10 px-6 py-2 bg-red-400 text-red-200 rounded-xl flex items-center gap-x-3">
                    { err.message }
                    <FontAwesomeIcon icon={faX} className="h-3"/>
                </h2> }


                { successful?.success && <h2 className="absolute bottom-10 px-6 py-2 bg-green-400 text-green-200 rounded-xl flex items-center gap-x-3">
                    { successful.message }
                    <FontAwesomeIcon icon={faCheck} className="h-3"/>
                </h2> }
        </div>
    );
}

export default Login;
