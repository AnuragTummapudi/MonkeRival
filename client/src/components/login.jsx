import React from 'react';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';

function Login() {
  const handleGoogleLogin = () => {
    // Redirect to the backend Google OAuth endpoint
    window.location.href = 'http://localhost:3000/auth/google';
  };

  return (
    <div className="min-h-screen bg-[#232323] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-lg p-8 shadow-xl text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-6">Welcome to MonkeRival</h1>
        <p className="text-gray-400 mb-8">Sign in to start racing and competing with others!</p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FcGoogle className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </motion.div>
    </div>
  );
}

export default Login;