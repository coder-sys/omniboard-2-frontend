import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

function Carousel({name,workspace}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  //useEffect(()=>{

 // },[])
 const [content, setContent] = useState('');

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  return (
    <div className='w-3/4 m-auto'>
      <div  className="mt-20">
      <Slider {...settings}>
        {data.map((d) => (

          <div  key={d.name} className="bg-white h-[450px] text-black rounded-xl">
           

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">[d.name]</p>
              <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>delete</button>
              <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>save notes</button>

              <div style={{'width':'200px'}}>

              <div style={{'backgroundColor':'white','width':'100%','height':'100%'}} className="toolbar">
       
      <ReactQuill style={{'width':'100%','height':'100%'}}
        theme="snow" // You can choose different themes
        value={"d.value"}
      />
      </div></div>
              

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

export default Carousel;
