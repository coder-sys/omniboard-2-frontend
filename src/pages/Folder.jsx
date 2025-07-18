import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { metaData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Dashboard from '../BubbleUI/Dashboard';
import ListDividers from '../stories/accept';
import useToken from '../components/useToken';

const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod';

const Folder = () => {
  const { currentColor } = useStateContext();
  const { email } = useParams();
  const { token, setToken } = useToken();

  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        metaData.email = email;

        const nameRes = await fetch(`${DOMAIN}/email_to_name_map/${email}`);
        const nameJson = await nameRes.json();
        metaData.firstname = nameJson.firstname;
        metaData.lastname = nameJson.lastname;

        const tokenRes = await fetch(`${DOMAIN}/name_to_token/Srinidhi Murthy`);
        const tokenJson = await tokenRes.json();
        setToken(tokenJson.data);
        localStorage.setItem('email', email);

        console.log("User Info:", metaData);
      } catch (err) {
        console.error("Error loading folder info:", err);
      }
    };

    loadData();
  }, [email, setToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 bg-white shadow-xl rounded-3xl p-10 border border-purple-200 backdrop-blur-sm animate-fade-in">
        
        {/* Left: Text + Dashboard */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            Welcome back to <span className="text-purple-600">Nucleus</span>
          </h1>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            Dive into your AI-driven product management workspace. Collaborate on ideas, manage roadmaps, and explore your custom folders and visual projects—all in real-time.
          </p>

          <div className="mb-8">
            <Dashboard />
          </div>

          
        </div>

        {/* Right: Custom Image */}
        <div className="flex-1">
          <img
            src="https://undraw.co/api/illustrations/d9482d18-7d46-420f-9db2-3eaee9de1d01"
            alt="Workspace Illustration"
            className="w-full max-w-md mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Folder;