import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import CustomizedInputsStyleOverrides from "../stories/TextField"
import WorkspaceCard from '../stories/WorkspaceCard';
import BasicTabs from '../stories/Tabs';
import ChatBody from "../ChatUI/chatBody/ChatBody"
import Button from "../stories/Button"
const FolderContent = () => {
  const { currentColor, currentMode } = useStateContext();
  const {foldername,email} = useParams()
  metaData['email'] = email
  const [update, setUpdate] = useState('')
  const [query, setQuery] = useState("")
  useEffect(async()=>{
    let api = await fetch(`http://127.0.0.1:5000/email_to_name_map/${email}`)
    api = await api.json()
    metaData['firstname'] =  (api['firstname'])
    metaData['lastname'] = (api['lastname'])
    console.log(metaData)
  },[update])
  
  const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];
  const chartSimple = {
    offset: {
      x: 0,
      y: 0
    },
 
    nodes: {
      node1: {
        id: "node1",
        type: <div> <b><i>Workspace</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /> </div>,
        position: {
          x: 0,
          y:0
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
              value: "no"
            }
          }
        }
      },
      node2: {
        id: "node2",
        type:<div><b><i>Workspace1</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 100)-400,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 100)
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
        type: <div><b><i>Workspace2</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 200)-400,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 200)
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
        type: <div><b><i>Workspace3</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 300)-400,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 300)
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
        type: <div><b><i>Workspace4</i></b><WorkspaceCard name={"Data Science"} thumbnail={"/"} description={"Data science is the study of data to extract meaningful insights for business. It is a multidisciplinary approach that combines principles and practices from the fields of mathematics, statistics, artificial intelligence, and computer engineering to analyze large amounts of data."} /></div>,
        position: {
          x: (Math.floor(Math.random() * (1500 - 30 + 1)) + 400)-300,
          y: (Math.floor(Math.random() * (1500 - 30 + 1)) + 400)
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
      }
    },
    links: {
      link1: {
        id: "link1",
        from: {
          nodeId: "node1",
          portId: "port1"
        },
        to: {
          nodeId: "node1",
          portId: "port2"
        },
      },
      link2: {
        id: "link2",
        from: {
          nodeId: "node2",
          portId: "port1"
        },
        to: {
          nodeId: "node2",
          portId: "port2"
        },
      },
      link3: {
        id: "link3",
        from: {
          nodeId: "node3",
          portId: "port1"
        },
        to: {
          nodeId: "node3",
          portId: "port2"
        },
        link4: {
          id: "link4",
          from: {
            nodeId: "node4",
            portId: "port1"
          },
          to: {
            nodeId: "node4",
            portId: "port2"
          },
        }
      },
    },
    selected: {},
    hovered: {}
  };
  return (
    <div className="mt-24">
           <ChatBody  />

     <div className="flex m-3 flex-wrap justify-center gap-1 items-center">

<br></br>
<div>
<CustomizedInputsStyleOverrides ph={"Start search"} name={query} setName={setQuery}  /><br></br>
{console.log(query)}
<div style={{marginLeft:'25px'}}>
<Button  backgroundColor={"#D0BCFF"} size="small" label={"Start search"} />
</div>
</div>

     <BasicTabs displayChart={chartSimple} quizMCQ={questions} search={query} name={metaData['firstname']} foldername={foldername} />
          </div>

    </div>
  );


}
export default FolderContent;
