import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { useParams } from 'react-router-dom';
import {stackedCustomSeries} from '../data/dummy'
import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { metaData, links, earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, folderDistribData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';
const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Folder = () => {
  const { currentColor, currentMode } = useStateContext();
  const {name} = useParams()
  console.log(name)
  metaData['firstname'] = name
  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center" >
          <div className="flex justify-between items-center">
            <div>
              <p><u><input type='text' placeholder='create research folder' onChange={(e)=>{console.log(e.target.value)}} onKeyPress={(e) => {if (e.key === 'Enter') {console.log('clicked')}
  }}  style={{'color':'black',border:'none',borderColor:'transparent'}} width={'80%'} /></u></p>
            </div>
            
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Create"
              borderRadius="10px"
              customFunction={()=>console.log('clicked')}
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.name}</span>
              </p>
              <p className="mt-2">
                <span  style={{'size':'10px'}}>view distribution</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        {[1].map((data,i)=>{
           return(
            <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
              <div className="flex justify-between">
                <p className="font-semibold text-xl">Data science</p>
                <div className="flex items-center gap-4">
                  
               
                </div>
              </div>
              <div className="mt-10 flex gap-10 flex-wrap justify-center">
                <div className=" border-r-1 border-color m-4 pr-10">
                  <div>
                    <p>
                      <span className="text-3xl font-semibold">[number]</span>
                      
                    </p>
                    <p className="text-gray-500 mt-1">google data</p>
                  </div>
                  <div className="mt-8">
                    <p className="text-3xl font-semibold">[number]</p>
    
                    <p className="text-gray-500 mt-1">YouTube data</p>
                  </div>
    
                  <div className="mt-5">
                  </div>
                  
                </div>
                <div>
                  <Stacked stackedCustomSeries={stackedCustomSeries} currentMode={currentMode} width="320px" height="360px" />
                </div>
              </div>
            </div>)
        })
      }

      </div>

     

      <div className="flex flex-wrap justify-center">
        <div className="md:w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6 m-3">
          
      
        <div className="flex justify-between">
            <p className="text-xl font-semibold">Folder data distribution</p>
            
          </div>
          <Pie id="pie-chart" data={folderDistribData} legendVisiblity={false} height="160px" />

        </div>
        
        
      </div>
    </div>
  );
};

export default Folder;
