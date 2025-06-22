import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import parse from 'html-react-parser';
const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
function Carousel({name,workspace,data}) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
 const [content, setContent] = useState('');

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  return (
    <div className='w-3/4 m-auto'>
      <div style={{'backgroundColor':'darkBlue','borderRadius':'10px'}} className="mt-20">
      <Slider  {...settings}>
        {data.map((d,index) => (

          <div  key={index} className="bg-white h-[450px] text-black rounded-xl">
           

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl' onClick={async()=>{
               let api = await fetch(`${DOMAIN}/delete_saved_notes/${name}/${workspace}/${d.on}`)
               api = await api.json()
               window.location.reload()
              }}>delete</button>

              <div style={{'width':'200px'}}>

              <div style={{'backgroundColor':'white','width':'100%','height':'100%'}} className="toolbar">
       
      <ReactQuill style={{'width':'300px','height':'100%'}}
        theme="snow" // You can choose different themes
        value={d.notes.replace(new RegExp('`','gi'),'/')}
        onChange={async(e)=>{
          try{
          try{
            let api = await fetch(`${DOMAIN}/update_notes/${name}/${workspace}/${d.notes}/${d.on.replace(new RegExp('/','gi'),'`')}`)
            api = await api.json()
           
          }
          catch(err){
           

            let api = await fetch(`${DOMAIN}/update_notes/${name}/${workspace}/${e.replace(new RegExp('/','gi'),'`')}/${d.on}`)
            api = await api.json()
          }

      try{
        let api = await fetch(`${DOMAIN}/update_notes/${name}/${workspace}/${e.replace(new RegExp('/','gi'),'`')}/${d.on}`)
        api = await api.json()
       
      }
      catch(err){
        let api = await fetch(`${DOMAIN}/update_notes/${name}/${workspace}/${d.on}/${e.replace(new RegExp('/','gi'),'`')}`)
        api = await api.json()
      }
    }
    catch(err){
      console.log(err)
      
    }
        }}
        modules={{
          toolbar: [
            // Customize the toolbar if needed
            ['bold', 'italic', 'underline', 'strike'], 
            ['link', 'image'],
          ],
        }}
      /><br></br>
      <div style={{'textAlign':'align', border: '1px solid black'}} >{parse(d.notes.replace(new RegExp('`','gi'),'/'))}</div>
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
