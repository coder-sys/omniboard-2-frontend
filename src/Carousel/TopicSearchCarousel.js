import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import save_google_data from "../functions/save_google_data";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { metaData } from "../data/dummy";
import GoogleCarousel from "./GoogleCarousel";
function TopicSearchCarousel({name,query,foldername,save_data,update_effect,setue,csResultData,setConsent,djoin,linkjoin,stored_data}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  //useEffect(()=>{

 // },[])
  return (
    <div className='w-3/4 m-auto'>
      <div  className="mt-20">
        {csResultData.map((data) => (

        <div>
            {data.subtopic}
        <div>
        {
          [1].map((r)=>{
         //   if(data.ti != ""){
            var linkjoin_ = []
            var djoin_ = [] 
            return(
              <GoogleCarousel name={metaData['firstname']}  setConsent={setConsent} foldername={foldername} save_data={save_google_data} email={metaData['email']} lastname={metaData['lastname']} djoin_={djoin_} retrievegoogledata1={data.titles} retrievegoogledata2={data.link} description={data.descriptions} update_effect={update_effect} setue={setue} linkjoin_={linkjoin_} stored_data={stored_data} djoin={djoin} linkjoin={linkjoin}  />

            )
            
          })
        }

          </div><br></br>
          </div>

        ))}
        
      </div>
      
    </div>
  );
}

const data = [
  {
    name: `John Morgan`,
    img: `/students/John_Morgan.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Ellie Anderson`,
    img: `/students/Ellie_Anderson.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Nia Adebayo`,
    img: `/students/Nia_Adebayo.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Rigo Louie`,
    img: `/students/Rigo_Louie.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  {
    name: `Mia Williams`,
    img: `/students/Mia_Williams.jpg`,
    review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`
  },
  
];
const data1 = [data,data,data]
export default TopicSearchCarousel;
