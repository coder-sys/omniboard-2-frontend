import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import save_google_data from "../functions/save_google_data";
function GoogleCarousel({setConsent,save_data,foldername,email,lastname,name,djoin_,retrievegoogledata1,retrievegoogledata2,description,update_effect,setue,linkjoin_,stored_data,djoin,linkjoin}) {
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
  console.log(setConsent)
  //useEffect(()=>{

 // },[])
  return (
    <div className='w-3/4 m-auto'>
      <div  className="mt-20">
      <Slider {...settings}>
        {retrievegoogledata2.map((data,index) => (

          <div   className="bg-white h-[450px] text-black rounded-xl">
           

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold"><a target={'_blank'} href={data}>{retrievegoogledata1[index]}</a></p>
              <div style={{'width':'200px'}}>
                {description[index]}
           </div>
              <button  disabled={stored_data[index]}  onClick={async()=>{
                save_google_data(setue,data,update_effect,linkjoin_,retrievegoogledata1,index,djoin_,stored_data,name,lastname,email,foldername,description);
                update_effect(p=>p+1)
                setue(p=>p+1)
              }} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>{
              [1].map((data)=>{
                if(stored_data[index]==true){
                  return(
                    <p>Saved</p>
                  )
                }
                else{
                  return(
                    <p>Save</p>
                  )
                }
              })
              }</button>

            </div>
          </div>
        ))}
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

export default GoogleCarousel;
