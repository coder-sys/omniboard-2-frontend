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
      },
      node4: {
        id: "node4",
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 50,
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 40,
          y: 900
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 300,
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
      node8: {
        id:'node8',
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 490,
          y: 1000
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 490,
          y: 1500
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 650,
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 750,
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
        type: <p><b><i>sub topic</i></b><br></br><Button primary={true} backgroundColor={"#D0BCFF"} size="small" label={"Data standardization"}/></p>,
        position: {
          x: 800,
          y: 1470
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
  return (
    <div className="mt-24">
        <FlowChartWithState style={{'display':"none"}} initialValue={chartSimple} 
        
       

        />

    </div>
  );
};

export default Resource;