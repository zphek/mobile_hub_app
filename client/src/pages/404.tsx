import logo from "../assets/logo.svg"

export default function Page404(){

    return(<div className="min-w-screen min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
            <img src={logo} alt="" className="h-20"/>

            <h2 className="text-xl lg:text-3xl font-thin mt-5"><strong className="font-extrabold">ERROR 404</strong> - PAGE NOT FOUND.</h2>
        </div>
    </div>)
}