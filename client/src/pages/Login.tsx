import React from 'react';

function Login() {
    return (
        <div className="min-h-screen min-w-screen flex justify-center items-center bg-orange-200 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="w-64 h-64 bg-purple-300 rounded-full absolute top-20 left-20 mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="w-64 h-64 bg-pink-300 rounded-full absolute bottom-20 right-20 mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
                <div className="w-64 h-64 bg-yellow-300 rounded-full absolute bottom-1/3 left-1/3 mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
            </div>
            <div className="w-full h-screen z-10 flex justify-center items-center">
                {/* Aquí puedes agregar el contenido de tu formulario de login */}
            </div>
        </div>
    );
}

export default Login;
