import React,{useState} from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useParams } from 'react-router-dom';
import { Stacked, Pie, LineChart, SparkLine } from '../components';
import ResourceBox from '../components/ResourceBox'
import { metaData,earningData, medicalproBranding, recentTransactions, resourceReports, dropdownData, SparklineAreaData, ecomPieChartData, resources } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { DragDropContext,Droppable } from 'react-beautiful-dnd';
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import Button from '../stories/Button';

const Resource = () => {
  const { currentColor, currentMode } = useStateContext();
  const {email} = useParams()
  console.log(email)
  metaData['email'] = email
  const chartSimple = {
    offset: {
      x: 0,
      y: 0
    },
    nodes: {
      node1: {
        id: "node1",
        type: <p><b><i>main topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data science"}/></p>,
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
              value: "no"
            }
          }
        }
      },
      node2: {
        id: "node2",
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Machine learning"}/></p>,
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Exploratory data analysis"}/></p>,
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
    },
    selected: {},
    hovered: {}
  };
  return (
    <div className="mt-24">
        <FlowChartWithState style={{'display':"none"}} initialValue={chartSimple} 
        
       

        />

    </div>
  );
};

export default Resource;