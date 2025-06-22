import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import save_youtube_data from "../functions/save_youtube_data";
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
function YouTubeCarousel({name,setue,update_effect,youtubeAPILinks,youtubeAPITitles,stored_data_yt,thumbnail,foldername}) {
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
      <Slider {...settings}>
        {youtubeAPILinks.map((data,index) => {

        let ytlinkjoin_ = []
        let ytdjoin_ = []
        console.log(thumbnail[index])
return(
          <div  key={youtubeAPITitles[index]} className="bg-white h-[450px] text-black rounded-xl">
           

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold"><a href={data} target={'_blank'}>{youtubeAPITitles[index]}</a></p>
              <div >
                <img style={{width:'100%',height:'100%'}} src={thumbnail[index]} />
           </div>
             
              <button onClick={
				    ()=>{save_youtube_data(setue,update_effect,youtubeAPILinks,youtubeAPITitles,index,ytlinkjoin_,ytdjoin_,data,stored_data_yt,name,foldername,thumbnail,[])
              update_effect(p=>p+1)
              setue(p=>p+1)
            }
           } disabled={stored_data_yt[index]} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>{
            
              [1].map((data)=>{
                if(stored_data_yt[index]==true){
                  return(
                    <p>Saved</p>
                  )
                  }
                  else{
                    return(<p>Save</p>)
                  }
                })
           }</button>

            </div>
          </div>
)
})}
      </Slider>
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

export default YouTubeCarousel;
