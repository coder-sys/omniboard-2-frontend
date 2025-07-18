import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { metaData } from "../data/dummy";
import useToken from "../components/useToken";
import Button from "../stories/Button";

const DOMAIN = "https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod";

export default function Dashboard() {
  const { email } = useParams();
  const { token, setToken } = useToken();

  useEffect(() => {
    const fetchMetadataAndToken = async () => {
      try {
        const preapi = await fetch(`${DOMAIN}/name_to_token/Srinidhi Murthy`);
        const preapiJson = await preapi.json();
        setToken(preapiJson.data);
        localStorage.setItem("email", email);

        metaData.email = email;

        const userInfo = await fetch(`${DOMAIN}/email_to_name_map/${email}`, {
          headers: {
            Authorization: `Bearer ${preapiJson.data}`,
          },
        });
        const userInfoJson = await userInfo.json();
        metaData.firstname = userInfoJson.firstname;
        metaData.lastname = userInfoJson.lastname;

        console.log("User Info:", metaData);
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
    <div className="dashboard-container" style={{ padding: "2rem" }}>
      <h1>Welcome to Nucleus</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
        Nucleus is your AI-powered product management platform — helping you shape roadmaps, brainstorm with visual tools, and organize your thoughts using collaborative folders and custom images. While these visuals aren’t permanently stored yet, they enhance your real-time workspace experience.
      </p>

      <Button
        label="View Your Nucleus"
        size="medium"
        backgroundColor="#7E5BEF"
        onClick={handleViewNucleus}
      />
    </div>
  );
}