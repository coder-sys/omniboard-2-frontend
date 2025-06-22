import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import CustomizedInputsStyleOverrides from "../stories/TextField"
import WorkspaceCard from '../stories/WorkspaceCard';
import BasicTabs from '../stories/Tabs';
import ChatBody from "../ChatUI/chatBody/ChatBody"
import Button from "../stories/Button"
import translateLink from '../functions/translatelink';
import save_google_data from '../functions/save_google_data';
import save_youtube_data from '../functions/save_youtube_data';
import InfoCard from '../stories/InfoCard';
import Cookies from 'js-cookie'
import useToken from '../components/useToken';

const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
const FolderContent = () => {
  const { currentColor, currentMode } = useStateContext();
  const {foldername,email} = useParams()
  metaData['email'] = email
  const [update, setUpdate] = useState('')
  const [query, setQuery] = useState("")
  const [googlesearch,setGoogleSearch] = useState('')
    const [retrievegoogledata1,setRetrieveGoogleData1] = useState([])
    const [retrievegoogledata2,setRetrieveGoogleData2] = useState([])
    const [description,setDescription] = useState([])
    const [youtubesearch,setYoutubeSearch] = useState('')
    const [linkjoin,setLinkJoin] = useState([])
    const [djoin,setDJoin] = useState([])
    const [youtubeAPITitles,setyoutubeAPITitles] = useState([])
    const [youtubeAPILinks,setyoutubeAPILinks] = useState([])
    const [updated,setUpdated] = useState(0)
    const [stored_data_array,setStored_dataArray] = useState([])
    const [linkarray,setLinkarray] = useState([])
    const [update_effect,setue]= useState(0)
    const [thumbnail,setThumbnail] = useState([])
    const [stored_data,setStoredData] = useState([])
    const [csstored_data, setCsStoredData] = useState([])
    const [stored_data_yt,setStoredDataYT] = useState([])
    const [consent,setConsent] = useState(true)
    const [consent1,setConsent1] = useState(true)
    const [SDoM,setSDom] = useState('Scroll down to start your internet research')
    const [conceptsearch,setConceptSearch] = useState('')
    const [csResultData,setCsResultData] = useState([])
    const [mainTopic,setMainTopic] = useState('')
    const [subtopics, setSubtopics] = useState('')
    const [s1, setS1] = useState([
      [
          "Regression Analysis | Full Course",
          "https://i.ytimg.com/vi/0m-rs2M7K-Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQnjqcICRrD-LfAsiNbTufx9nppQ",
          "https://www.youtube.com/watch?v=0m-rs2M7K-Y"
      ],
      [
          "What is Data Science? | IBM",
          "Data science is a multidisciplinary approach to gaining insights from an increasing amount of data. IBM data science products help find the value of your ...",
          "https://www.ibm.com/topics/data-science"
      ],
      [
          "Regression Analysis | Full Course",
          "https://i.ytimg.com/vi/0m-rs2M7K-Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQnjqcICRrD-LfAsiNbTufx9nppQ",
          "https://www.youtube.com/watch?v=0m-rs2M7K-Y"
      ]
  ])
    const [s2, setS2] = useState([
      [
          "Regression Analysis | Full Course",
          "https://i.ytimg.com/vi/0m-rs2M7K-Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQnjqcICRrD-LfAsiNbTufx9nppQ",
          "https://www.youtube.com/watch?v=0m-rs2M7K-Y"
      ],
      [
          "What is Data Science? | IBM",
          "Data science is a multidisciplinary approach to gaining insights from an increasing amount of data. IBM data science products help find the value of your ...",
          "https://www.ibm.com/topics/data-science"
      ],
      [
          "Regression Analysis | Full Course",
          "https://i.ytimg.com/vi/0m-rs2M7K-Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQnjqcICRrD-LfAsiNbTufx9nppQ",
          "https://www.youtube.com/watch?v=0m-rs2M7K-Y"
      ]
  ])
    const [s3, setS3] = useState([
      [
          "Regression Analysis | Full Course",
          "https://i.ytimg.com/vi/0m-rs2M7K-Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQnjqcICRrD-LfAsiNbTufx9nppQ",
          "https://www.youtube.com/watch?v=0m-rs2M7K-Y"
      ],
      [
          "What is Data Science? | IBM",
          "Data science is a multidisciplinary approach to gaining insights from an increasing amount of data. IBM data science products help find the value of your ...",
          "https://www.ibm.com/topics/data-science"
      ],
      [
          "Regression Analysis | Full Course",
          "https://i.ytimg.com/vi/0m-rs2M7K-Y/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCQnjqcICRrD-LfAsiNbTufx9nppQ",
          "https://www.youtube.com/watch?v=0m-rs2M7K-Y"
      ]
  ])
    const [sdomo,Ssdomo] = useState(0)
  const [date_error, setDr]=useState(100)
  const { token, removeToken, setToken } = useToken();

  useEffect(async()=>{
    const cookieValue = Cookies.get('session_id')
  console.log('im looking for',cookieValue)


    let api = await fetch(`${DOMAIN}/email_to_name_map/${metaData['email']}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
    console.log(metaData)
    let api2 = await fetch(`${DOMAIN}/date_subtraction_for_paid_version`,{
      headers:{
        Authorization:`Bearer ${preapi.data}`
      }
    })
    api2 = await api2.json()
    setDr(api2['data'])
  },[update])
  
  const [questions, setQuestions] = useState([
		{
			questionText: 'LOADING...',
			answerOptions: [
				{ answerText: '', isCorrect: false },
				{ answerText: '', isCorrect: false },
				{ answerText: '', isCorrect: true },
				{ answerText: '', isCorrect: false },
			],
		},
		
		
	
	]);

  const searchIntegration = async()=>{
    setConsent(true)
    setYoutubeSearch(query)
    setGoogleSearch(query)
    setConceptSearch(query)
    setUpdated(updated+1)
                       setue(update_effect+1)
                        try{
                          let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
                          let api = await fetch(`${DOMAIN}/load_concept_map/${query.replace('/',' ')}`,{
                            headers:{
                              Authorization:`Bearer ${preapi.data}`
                            }
                          })
                          api = await api.json()
                          console.log("expectation",api)
                          setMainTopic(api['data']['main_topic'])
                          setSubtopics(api['data']['subtopics'])
                          setS1(api['data']['s1'])
                          setS2(api['data']['s2'])
                          setS3(api['data']['s3'])
                        }
                        catch(err){
                          console.log(err)
                        }
	  		
                       let api;
	  		try{
				   let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
          preapi = await preapi.json()
          setToken(preapi.data)
          localStorage.setItem('email', email)
				api = await fetch(`${DOMAIN}/regular_get_youtube_data/${query.replace('/', ' ')} lectures`
,{
          headers:{
            Authorization:`Bearer ${preapi.data}`
          }
        })
			}
	  		catch(err){
				console.log("error 1",err)
				const universities = [
  "Harvard",
  "UPenn",
  "Yale",
  "Dartmouth",
  "Princeton",
  "Brown University",
  "Columbia",
  "Cornell",
  "CalTech",
  "Stanford",
  "UC Berkeley",
  "NYU",
  "UCLA",
  "UC Davis",
  "UT Austin",
  "Rice University",
  "UChicago",
  "Northwestern University",
  "Texas A&M",
  "Oxford University",
  "Cambridge University",
  "MIT",
  "Boston College",
"Boston University"
];

  const randomIndex = Math.floor(Math.random() * universities.length);
  const randomUniversity = universities[randomIndex];

  try {
    let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
    preapi = await preapi.json()
    setToken(preapi.data)
    localStorage.setItem('email', email)
    api = await fetch(`${DOMAIN}/regular_get_youtube_data/${query.replace('/', ' ')} lectures`,{
      headers:{
        Authorization:`Bearer ${preapi.data}`
      }
    })
}catch(err){
	  console.log("error 2",err)
  let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
  preapi = await preapi.json()
  setToken(preapi.data)
  localStorage.setItem('email', email)
				api = await fetch(`${DOMAIN}/get_youtube_data/${randomUniversity} ${query.replace('/',' ')} lectures`,{
          headers:{
            Authorization:`Bearer ${preapi.data}`
          }
        })
}
}
    
      
                       setConsent(true)
                       api = await api.json()
                       setConsent(false)
                       setyoutubeAPITitles(api.titles)
                       setyoutubeAPILinks(api.link)
                       setThumbnail(api.thumbnail)
                       console.log(api.titles)
                       translateLink(api.link).then((data)=>{
                       translateLink(linkarray).then(async(data1)=>{
                               try{
                               console.log(data,data1)
                               console.log(`https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod/find_similarity_links/${data.join()}/${data1.join()}`)
                               let api = await fetch(`${DOMAIN}/find_similarity_links/${data.join()}/${data1.join()}`)
                               api = await api.json()
                               setStoredDataYT(api.data)}catch(err){console.log(err)}
                               })
                              })
  
                              try{
                                let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
  preapi = await preapi.json()
  setToken(preapi.data)
  localStorage.setItem('email', email)
                                setUpdated(updated+1)
                          setue(update_effect+1)
                          let api = await fetch(`${DOMAIN}/get_google_content/ ${query.replace('/',' ')}`,{
                            headers:{
                              Authorization:`Bearer ${preapi.data}`
                            }
                          })
                          api = await api.json()
                          console.log(api.names)
                          setRetrieveGoogleData1(api.names)
                          setRetrieveGoogleData2(api.urls)
                          setDescription(api.description)
                          let emailandlastname = await fetch(`${DOMAIN}/get_last_name_and_email/${metaData['firstname']}`)
                          emailandlastname = await emailandlastname.json()
                          let lapi = await fetch(DOMAIN+'/get_stored_links/'+metaData['firstname']+'/'+foldername,{
                            headers:{
                              Authorization:`Bearer ${preapi.data}`
                            }
                          })
                          lapi = await lapi.json()
                          translateLink(api.urls).then((data)=>{
                            translateLink(lapi.links).then(async(data1)=>{
                              try{
                                let dt = []
                                let dt1 = []
                                data.join('').split('').map((data,index)=>{
                                  if(data == '/'){
                                    data = '`'
                                  }
                                  dt.push(data)
                                })
                              dt.join('').split('http').map((data,index)=>{
                                if(index>0){
                                dt1.push('http'+data)
                                }
                              })
                              let api = await fetch(`${DOMAIN}/find_similarity_links/${dt1.join()}/${data1.replace(/\//g, "`")}`)
                              api = await api.json()
                            setStoredData(api.data)
                         //   setCsStoredData([api.data,api.data,api.data,api.data,api.data])
                          }catch(err){console.log(err)}
                          })
                          })}catch(err){alert('Error: Too many requests. Google has temporarily blocked you. Try again later.')}
                                                        
  
                          setConsent(false)
  
                                    try{
                                      let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
                                      preapi = await preapi.json()
                                      setToken(preapi.data)
                                      localStorage.setItem('email', email)
                                        setUpdated(updated+1)
                                  setue(update_effect+1)
                                        let emailandlastname = await fetch(`${DOMAIN}/get_last_name_and_email/${metaData['firstname']}`)
                                        emailandlastname = await emailandlastname.json()
                                        let api = await fetch(`${DOMAIN}/get_results_on_conceptual_search/${query.replace('/',' ')}/${metaData['firstname']}/${foldername}`,{
                                          headers:{
                                            Authorization:`Bearer ${preapi.data}`
                                          }
                                        })
                                        api = await api.json()
                                        setCsResultData(api['data'])
                                        
                                        console.log('data',api['data'])
                   
                                    }catch(err){
                                        console.log(err)
                    alert('The educational search you made was too specific,use the google search feature for your search')
                                    }
                                    try{
                                      let preapi = await fetch(`${DOMAIN}/name_to_token/${metaData['firstname']}`)
                                      preapi = await preapi.json()
                                      setToken(preapi.data)
                                      localStorage.setItem('email', email)
                                      let api = await fetch(`${DOMAIN}/generate_questions/${query.replace('/',' ')}`,{
                                        headers:{
                                          Authorization:`Bearer ${preapi.data}`
                                        }
                                      })
                                      api = await api.json()
                                      setQuestions(api['data'])
                                    }
                                    catch(err){
                                      console.log('---',err)
                                    }
  
  }
  const chartSimple = {
    offset: {
      x: 0,
      y: 0
    },
    nodes: {
      node1: {
        id: "node1",
        type: <p><b><i>main topic</i></b><br></br><Button primary={true} onClick={()=>{window.open(`https://www.google.com/search?q=${mainTopic}`,'_blank')}} backgroundColor={"#D0BCFF"} size="small" label={mainTopic}/></p>,
        position: {
          x: 300,
          y: 30
        },
       
        ports: {
          port1: {
            id: "port1",
            type: "output",
            properties: {
              value: "yes"
            }
          },
          port2: {
            id: "port2",
            type: "output",
            properties: {
              value: "yes"
            }
          },
          port3: {
            id: "port3",
            type: "output",
            properties: {
              value: "yes"
            }
          }
        }
      },
      node2: {
        id: "node2",
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} onClick={()=>{window.open(`https://www.google.com/search?q=${mainTopic} ${subtopics[0]}`)}} backgroundColor={"#D0BCFF"} size="small" label={subtopics[0]}/></p>,
        position: {
          x: 150,
          y: 300
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node3: {
        id: "node3",
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} onClick={()=>{window.open(`https://www.google.com/search?q=${mainTopic} ${subtopics[1]}`)}} backgroundColor={"#D0BCFF"} size="small" label={subtopics[1]}/></p>,
        position: {
          x: 400,
          y: 300
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node4: {
        id: "node4",
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} onClick={()=>{window.open(`https://www.google.com/search?q=${mainTopic} ${subtopics[2]}`)}} backgroundColor={"#D0BCFF"} size="small" label={subtopics[2]}/></p>,
        position: {
          x: 650,
          y: 300
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node5: {
        id: "node5",
        type: <p><b><i>Source 1</i></b><br></br><InfoCard name={s1[0][0]} thumbnail={s1[0][1]} destination={s1[0][2]}  /></p>,
        position: {
          x: -50,
          y: 600
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node6: {
        id: "node6",
        type: <p><b><i>Source 2</i></b><br></br><InfoCard name={s1[1][0]} description={s1[1][1]} destination={s1[1][2]}  /></p>,
        position: {
          x: -80,
          y: 1200
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node7: {
        id: "node7",
        type: <p><b><i>Source 3</i></b><br></br><InfoCard name={s1[2][0]} thumbnail={s1[2][1]} destination={s1[2][2]}  /></p>,
        position: {
          x: -90,
          y: 2000
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node8: {
        id:'node8',
        type: <p><b><i>Source 1</i></b><br></br><InfoCard name={s2[0][0]} thumbnail={s2[0][1]} destination={s2[0][2]}  /></p>,
        position: {
          x: 400,
          y: 600
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node9: {
        id:'node9',
        type: <p><b><i>Source 2</i></b><br></br><InfoCard name={s2[1][0]} description={s2[1][1]} destination={s2[1][2]}  /></p>,
        position: {
          x: 490,
          y: 1800
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node10: {
        id:'node10',
        type: <p><b><i>Source 3</i></b><br></br><InfoCard name={s2[2][0]} thumbnail={s2[2][1]} destination={s2[2][2]}  /></p>,
        position: {
          x: 490,
          y: 2000
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node11: {
        id:'node11',
        type: <p><b><i>Source 1</i></b><br></br><InfoCard name={s3[0][0]} thumbnail={s3[0][1]} destination={s3[0][2]}  /></p>,
        position: {
          x: 850,
          y: 600
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node12: {
        id:'node12',
        type: <p><b><i>Source 2</i></b><br></br><InfoCard name={s3[1][0]} description={s3[1][1]} destination={s3[1][2]}  /></p>,
        position: {
          x: 1050,
          y: 1230
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
      node13: {
        id:'node13',
        type: <p><b><i>Source 3</i></b><br></br><InfoCard name={s3[2][0]} thumbnail={s3[2][1]} destination={s3[2][2]}  /></p>,
        position: {
          x: 1000,
          y: 1600
        },
        ports: {
          port1: {
            id: "port1",
            type: "input"
          },
          port2: {
            id: "port2",
            type: "output"
          }
        }
      },
    },
    links: {
      link1: {
        id: "link1",
        from: {
          nodeId: "node1",
          portId: "port1"
        },
        to: {
          nodeId: "node2",
          portId: "port1"
        },
      },
      link2: {
        id: "link2",
        from: {
          nodeId: "node1",
          portId: "port2"
        },
        to: {
          nodeId: "node3",
          portId: "port1"
        },
      },
      link3: {
        id: "link2",
        from: {
          nodeId: "node1",
          portId: "port3"
        },
        to: {
          nodeId: "node4",
          portId: "port1"
        },
      },
      link4: {
        id: "link4",
        from: {
          nodeId: "node2",
          portId: "port2"
        },
        to: {
          nodeId: "node5",
          portId: "port1"
        },
      },
      link5: {
        id: "link5",
        from: {
          nodeId: "node5",
          portId: "port2"
        },
        to: {
          nodeId: "node6",
          portId: "port1"
        },
      },
      link6: {
        id: "link6",
        from: {
          nodeId: "node6",
          portId: "port2"
        },
        to: {
          nodeId: "node7",
          portId: "port1"
        },
      },
      link7:{
        id: "link7",
        from: {
          nodeId: "node3",
          portId: "port2"
        },
        to: {
          nodeId: "node8",
          portId: "port1"
        },
      },
      link8:{
        id: "link8",
        from: {
          nodeId: "node8",
          portId: "port2"
        },
        to: {
          nodeId: "node9",
          portId: "port1"
        },
      },
      link9:{
        id: "link9",
        from: {
          nodeId: "node9",
          portId: "port2"
        },
        to: {
          nodeId: "node10",
          portId: "port1"
        },
      },
      link10:{
        id: "link10",
        from: {
          nodeId: "node4",
          portId: "port2"
        },
        to: {
          nodeId: "node11",
          portId: "port1"
        },
      },
      link11:{
        id: "link11",
        from: {
          nodeId: "node11",
          portId: "port2"
        },
        to: {
          nodeId: "node12",
          portId: "port1"
        },
      },
      link12:{
        id: "link12",
        from: {
          nodeId: "node12",
          portId: "port2"
        },
        to: {
          nodeId: "node13",
          portId: "port1"
        },
      },
    },
    selected: {},
    hovered: {}
  };
  if(date_error<30){
  return (
    <div className="mt-24">
           <ChatBody  />

     <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

<br></br>
<div>
<CustomizedInputsStyleOverrides ph={"Start search"} name={query} setName={setQuery} keyDown={()=>{
  try{
  searchIntegration();
  }
  catch(err){
    alert(err)
  }
  setQuery('')
  
  }}  /><br></br>
<div style={{marginLeft:'25px'}}>
<Button  backgroundColor={"#D0BCFF"} size="small" label={"Start search"} onClick={
              ()=>     {searchIntegration()  ;setQuery('')
              }

                
}  />
</div>
</div>

     <BasicTabs stored_data_yt={stored_data_yt} csstored_data={csstored_data} displayChart={chartSimple} quizMCQ={questions} csResultData={csResultData} search={query} name={metaData['firstname']} consent={consent} foldername={foldername} googlesearch={googlesearch} setConsent={setConsent} save_data_google={save_google_data} retrievegoogledata1={retrievegoogledata1} retrievegoogledata2={retrievegoogledata2} description={description} update_effect={setUpdate} setue={setue} stored_data={stored_data} djoin={djoin} linkjoin={linkjoin} youtubesearch={youtubesearch} youtubeAPILinks={youtubeAPILinks} youtubeAPITitles={youtubeAPITitles} thumbnail={thumbnail} />
          </div>

    </div>
  );
}
else{
  return <h1 style={{"color":'white'}}>Error 404: Please contact your administration</h1>
}
}
export default FolderContent;
 
