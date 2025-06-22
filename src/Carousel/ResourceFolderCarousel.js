import React, {useState, useEffect} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import save_google_data from "../functions/save_google_data";
import WorkspaceCard from "../stories/WorkspaceCard";
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import ResourceCard from "../stories/ResourceCard";
import { metaData } from "../data/dummy";
import useToken from '../components/useToken';

const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
function ResourceFolderCarousel({folders,name}) {
    const [update, setUpdated] = useState(0)
    const [vf, sVF] = useState('')
    const { token, removeToken, setToken } = useToken();

    const [chartSimple, setChartSimple] = useState({
        offset: {
          x: 0,
          y: 0
        },
        nodes: {
          
          },
       
        links: {
          
        },
        selected: {},
        hovered: {}
      });
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
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
        {folders.map((data,index) => (

          <div   style={{width:'200px','backgroundColor':'white', height:'200px'}}
          >
           

            <div style={{'backgroundColor':'white',borderRadius:'10px'}} className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{data.symbol}</p>
             
              <button   onClick={async()=>{
                let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
                preapi = await preapi.json()
                setToken(preapi.data)
                localStorage.setItem('email', metaData['email'])
                sVF(data.symbol)
                let api = await fetch(`${DOMAIN}/get_stored_links/${name}/${data.symbol}`,{
                  headers:{
                    Authorization:`Bearer ${preapi.data}`
                  }
                })
                api = await api.json()
                let names = api['names']
                let links = api['links']
                let nodes = api.data.nodes
                let thumbnails = api['thumbnails']
                let descriptions = api['description']
                let types = api['types']
                let count = 0; //declaring count as 0
                for(let key in nodes){
                    
                  if(types[count] == 'google'){  
                    console.log(descriptions)
                    nodes[key].type = <div>Saved Source<ResourceCard fname={metaData['firstname']} name={names[count]} thumbnail={'/'} description={descriptions[count]} foldername={data.symbol} sourcename={names[count]} link={links[count]} /></div>
                  }
                  else{
                    nodes[key].type = <div>Saved Source<ResourceCard fname={metaData['firstname']} name={names[count]} thumbnail={thumbnails[count]} description={"api3[data]"} foldername={data.symbol} sourcename={names[count]} link={links[count]} /></div>
                  }
       
                 count++;
                }
                setChartSimple(api.data)
                setUpdated(p=>p+1)
              }} className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>View</button>
              <a href={'/resourcestatistics/'+metaData['email']+'/'+data.symbol} target="_blank">
<button  className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>View Stats</button>
</a>
            </div>
          </div>
        ))}
      </Slider>
      </div>
      <>
      <p style={{'color':'white'}}><b>{vf}</b></p>
      <FlowChartWithState key={update} style={{'display':"none"}} initialValue={chartSimple} 
       
       />
        </>
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

export default ResourceFolderCarousel;
