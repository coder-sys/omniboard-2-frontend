import React from 'react';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
import {useState, useEffect } from 'react';
import { Header } from '../components';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import useToken from '../components/useToken';
const change = (args) => {
  document.getElementById('preview').style.backgroundColor = args.currentValue.hex;
};


const CustomColorPicker = ({ id, mode }) => <ColorPickerComponent id={id} mode={mode} modeSwitcher={false} inline showButtons={false} change={change} />;
import { VictoryPie } from "victory-pie";
import { VictoryChart } from "victory-chart";
import { VictoryTooltip } from "victory-tooltip";
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'

const ColorPicker = ({foldername,email,firstname}) => {
  const [youtubedata, setYoutubeData] = useState(10)
  const [googledata, setGoogleData] = useState(2)
  const [update, setUpdated] = useState(0)
  const [vf, sVF] = useState('')
  const { token, removeToken, setToken } = useToken();
  useEffect(async()=>{
    let preapi = await fetch(`${DOMAIN}/name_to_token/${firstname}`)
                preapi = await preapi.json()
                setToken(preapi.data)
                localStorage.setItem('email', 'email')
                sVF(foldername)
                let api = await fetch(`${DOMAIN}/get_stored_links/${firstname}/${foldername}`,{
                  headers:{
                    Authorization:`Bearer ${preapi.data}`
                  }
                })
                api = await api.json()
                let names = api['names']
                let links = api['links']
                let yi = 0
                let gi = 0
                links.map((data)=>{
                  if (data.includes('youtube')){
                    yi ++
                  }
                  else{
                    gi ++
                  }
                })
                setYoutubeData(yi)
                setGoogleData(gi)
                console.log(names,links)
  })
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  if(youtubedata>0 || googledata>0){
  return(
  <div style={{color:'gray'}} className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

    <b><u>{foldername}</u></b>
    <div className="text-center">
     Google - {googledata}<br></br>
     YouTube - {youtubedata}
    <VictoryPie
        animate={{
          duration: 2000
        }}
        width="800"
        tooltip={"dshv"}
        
        colorScale={[ "cyan", "navy"]}
        data={ [{ x: "YouTube data", y: youtubedata },{ x: "Google Data", y: googledata }
      ]}
      />
    </div>

  
  </div>
);}else{
  return "Save data to get statistics!!"
}}


export default ColorPicker;
