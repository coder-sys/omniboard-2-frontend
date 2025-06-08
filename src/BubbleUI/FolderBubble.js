import React, { useState } from "react";
import Button from "../stories/Button";
import Share from "../stories/share";
import { metaData } from "../data/dummy";
import useToken from "../components/useToken";

const DOMAIN = "http://127.0.0.1:5000";
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
      className="companyBubble"
    >
      {props.bubbleSize > 50 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            transition: "opacity 0.1s ease",
            opacity: 1,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              color: props.textColor,
              fontSize: 15,
              fontFamily: "Source Code Pro",
              marginLeft: 10,
              textAlign: "right",
            }}
          >
            <b>
              <i>{props.symbol}</i>
            </b>
          </p>
        </div>
      )}

      {props.allowshare === "yes" && (
        <div style={{ marginBottom: "10px" }}>
          <Share
            name={metaData.firstname}
            foldername={props.symbol}
            setUpdate={props.setUpdate}
            open={open}
            setOpen={setOpen}
          />
        </div>
      )}

      <div>
        <Button
          style={{ marginRight: "20px", color: props.textColor }}
          onClick={handleDelete}
          backgroundColor={"#D0BCFF"}
          size="small"
          label={"Delete Folder"}
        />

        <Button
          style={{ marginRight: "20px", color: props.textColor }}
          onClick={() => handleViewNucleus()}
          backgroundColor={"#D0BCFF"}
          size="small"
          label={"View Nucleus"}
        />
      </div>
    </div>
  );
}
