import React, { useState } from "react";
import Button from "../stories/Button";
import Share from "../stories/share";
import { metaData } from "../data/dummy";
import useToken from "../components/useToken";
import "./FolderBubble.css"; // Import a CSS file for styling

const DOMAIN = "https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod";
const SD = "https://Omniboard.afd.enterprises";

export default function FolderBubble(props) {
  const [open, setOpen] = useState(false);
  const { setToken } = useToken();

  const handleDelete = async () => {
    try {
      const preapi = await fetch(`${DOMAIN}/name_to_token/${metaData.firstname}`);
      const preapiJson = await preapi.json();
      setToken(preapiJson.data);
      localStorage.setItem("email", metaData.email);

      const delApi = await fetch(`${DOMAIN}/delete_folder/${metaData.firstname}/${props.symbol}`, {
        headers: {
          Authorization: `Bearer ${preapiJson.data}`,
        },
      });
      const delApiJson = await delApi.json();
      if (delApiJson.success) {
        props.setUpdate(prev => prev + 1);
        window.location.reload();
      }
    } catch (error) {
      console.error("Folder deletion failed:", error);
    }
  };

  const handleViewNucleus = async () => {
    try {
      const domain = metaData.email.split("@")[1];
      const response = await fetch(`${DOMAIN}/get_associated_db/${domain}`);
      const data = await response.json();
      if (data?.data) {
        window.location.replace(data.data);
      }
    } catch (error) {
      console.error("Error navigating to Nucleus:", error);
    }
  };

  return (
    <div
      onClick={() => setOpen(true)}
      id="main"
      style={{ backgroundColor: `${props.backgroundColor}d0` }}
      className="folder-bubble-container"
    >
      {props.bubbleSize > 50 && (
        <div className="folder-bubble-content">
          <p className="folder-bubble-symbol">
            <b>
              <i>{props.symbol}</i>
            </b>
          </p>
        </div>
      )}

      {props.allowshare === "yes" && (
        <div className="folder-bubble-share">
          <Share
            name={metaData.firstname}
            foldername={props.symbol}
            setUpdate={props.setUpdate}
            open={open}
            setOpen={setOpen}
          />
        </div>
      )}

      <div className="folder-bubble-buttons" style={{ gap: '15px', display: 'flex', flexDirection: 'column' }}>
        <Button
          className="folder-bubble-button"
          onClick={() => handleDelete()}
          backgroundColor={"rgba(209, 207, 215, 0.7)"} /* Translucent color */
          size="small"
          label={"Delete Folder"}
        />

        <Button
          className="folder-bubble-button"
          onClick={() => handleViewNucleus()}
          backgroundColor={"rgba(237, 235, 243, 0.7)"} /* Translucent color */
          size="small"
          label={"View Nucleus"}
        />
      </div>
    </div>
  );
}
