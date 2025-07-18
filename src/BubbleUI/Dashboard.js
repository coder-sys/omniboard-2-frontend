import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { metaData } from "../data/dummy";
import useToken from "../components/useToken";

const DOMAIN = "https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod";

export default function Dashboard() {
  const { email } = useParams();
  const { setToken } = useToken();

  useEffect(() => {
    const fetchMetadataAndToken = async () => {
      try {
        const preapi = await fetch(`${DOMAIN}/name_to_token/Srinidhi Murthy`);
        const preapiJson = await preapi.json();
        setToken(preapiJson.data);
        localStorage.setItem("email", email);
        metaData.email = email;

        const userInfo = await fetch(`${DOMAIN}/email_to_name_map/${email}`, {
          headers: { Authorization: `Bearer ${preapiJson.data}` },
        });
        const userInfoJson = await userInfo.json();
        metaData.firstname = userInfoJson.firstname;
        metaData.lastname = userInfoJson.lastname;
      } catch (error) {
        console.error("Error fetching token or user data:", error);
      }
    };

    fetchMetadataAndToken();
  }, [email, setToken]);

  const handleViewNucleus = async () => {
    try {
      const domain = email.split("@")[1];
      const response = await fetch(`${DOMAIN}/get_associated_db/${domain}`);
      const data = await response.json();
      if (data?.data) {
        window.location.replace(data.data);
      } else {
        alert("No Nucleus available for your domain.");
      }
    } catch (error) {
      console.error("Failed to load Nucleus:", error);
      alert("Error accessing Nucleus.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-purple-100 flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-10 animate-fade-in">
        {/* Left: Text & Button */}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-4">
            Welcome to <span className="text-purple-600">Nucleus</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Nucleus is your AI-powered product management platform — helping you shape roadmaps, brainstorm with visual tools, and organize your thoughts using collaborative folders and custom visuals. While these visuals aren’t permanently stored yet, they enhance your real-time workspace experience.
          </p>
          <button
            onClick={handleViewNucleus}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition duration-300"
          >
            🚀 View Your Nucleus
          </button>
        </div>

        {/* Right: Illustration */}
        <div className="flex-1">
          <img
            src="https://illustrations.popsy.co/gray/product-development.svg"
            alt="Product Management Illustration"
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>
    </div>
  );
}