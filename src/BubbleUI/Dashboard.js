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
    <div className="relative isolate bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background blur circle */}
      <div
        className="absolute -z-10 w-[60rem] h-[60rem] bg-purple-300 opacity-20 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      ></div>

      <div className="max-w-3xl w-full p-10 bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-purple-200 animate-fade-in text-center lg:text-left">
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
          Welcome to <span className="text-purple-700">Nucleus</span>
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-6">
          Nucleus is your AI-powered product management workspace — shape product visions, organize roadmaps, and explore with visual tools. Images and sketches aren't stored yet, but they enhance your real-time workflow like magic.
        </p>

        <button
          onClick={handleViewNucleus}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg transition duration-300 hover:scale-105 active:scale-95"
        >
          🚀 Launch Your Nucleus
        </button>
      </div>
    </div>
  );
}