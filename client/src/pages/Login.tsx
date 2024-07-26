import { Link } from "react-router-dom";
import google from "../assets/google.svg"
import logo from "../assets/logo.svg"

function Login() {
    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-slate-100 relative overflow-hidden">
            <div className="flex flex-col items-center gap-y-8 w-[30em] p-5 lg:p-0">
                <img src={logo} alt="" className="h-16 lg:h-20"/>
                
                <form className="flex flex-col bg-white p-4 lg:px-7 lg:py-5 rounded-2xl w-full">
                    <h2 className="text-center font-bold clamp-[lg-3cqw-2xl] mb-5">Sign in</h2>
                    <h4 className="text-center clamp-[xs-3cqw-lg] text-slate-400 mb-10">Welcome back! Please enter your details.</h4>

                    <div className="flex flex-col gap-y-2 mb-5">
                        <h2 className="text-slate-500 clamp-[xs-3cqw-sm]">Email</h2>   
                        <input type="text" name="" id="" className="border-b-4 py-2 px-3 outline-none focus:border-b-orange-400 focus:shadow-xl transition-[400ms]"/>
                    </div>

                    <div className="flex flex-col gap-y-2 mb-5">
                        <h2 className="text-slate-500 clamp-[xs-3cqw-sm]">Password</h2>
                        <input type="password" name="" id="" className="border-b-4 py-2 px-3 outline-none focus:border-b-orange-400 focus:shadow-xl transition-[400ms]"/>
                    </div>

                    <button className="px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 ring-offset-2 hover:ring-2 ring-orange-600 transition-[400ms] text-white mb-5">
                        Sign in
                    </button>

                    <h4 className="text-slate-500 mb-5 text-center clamp-[xs-3cqw-sm]">OR</h4>

                    <button className="py-2 rounded-xl flex items-center justify-center gap-x-2 ring-offset-2 hover:ring-2 ring-yellow-500 transition-[400ms]">
                        <img src={google} alt="" className="h-4 lg:h-5"/>
                        <h2 className="clamp-[xs-3cqw-sm]">
                            Sign in with Google
                        </h2>
                    </button>

                    <div className="flex gap-x-2 justify-center items-center mt-5">
                        <h2 className="text-slate-500 clamp-[xs-3cqw-sm]">Don't have an account?</h2>
                        <Link to="/register" className="font-bold hover:underline clamp-[xs-3cqw-sm]">Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
