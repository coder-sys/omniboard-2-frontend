const DOMAIN = 'http://127.0.0.1:5000'
const searchIntegration = async()=>{
    setUpdated(updated+1)
                       setue(update_effect+1)
       
                       let api = await fetch(`${DOMAIN}/get_youtube_data/${youtubesearch}`)
                       api = await api.json()
                       setyoutubeAPITitles(api.titles)
                       setyoutubeAPILinks(api.link)
                       setThumbnail(api.thumbnail)
                       console.log(api.titles)
                       translateLink(api.link).then((data)=>{
                       translateLink(linkarray).then(async(data1)=>{
                               try{
                               console.log(data,data1)
                               let api = await fetch(`${DOMAIN}/find_similarity_links/${data.join()}/${data1.join()}`)
                               api = await api.json()
                               setStoredDataYT(api.data)}catch(err){console.log(err)}
                               })
                              })

                              try{
                                setUpdated(updated+1)
                          setue(update_effect+1)
                          let api = await fetch(`${DOMAIN}/get_google_content/${googlesearch}`)
                          api = await api.json()
                          console.log(api.names)
                          setRetrieveGoogleData1(api.names)
                          setRetrieveGoogleData2(api.urls)
                          setDescription(api.description)
                          let emailandlastname = await fetch(`${DOMAIN}/get_last_name_and_email/${metaData['firstname']}`)
                          emailandlastname = await emailandlastname.json()
                          let lapi = await fetch(`${DOMAIN}/get_stored_links/`+metaData['firstname']+emailandlastname['lastname']+emailandlastname['email']+'/'+foldername)
                          lapi = await lapi.json()
                          translateLink(api.urls).then((data)=>{
                            translateLink(lapi.data).then(async(data1)=>{
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
                              console.log(dt1.join())
                              console.log(`https://espark-apis-tndx3hr7aq-uc.a.run.app/find_similarity_links/${dt1.join()}/${data1.join()}`)
                              let api = await fetch(`${DOMAIN}/find_similarity_links/${dt1.join()}/${data1.join()}`)
                              api = await api.json()
                            setStoredData(api.data)}catch(err){console.log(err)}
                          })
                          })}catch(err){alert('Error: Too many requests. Google has temporarily blocked you. Try again later.')}
                                                        

                          setConsent(false)

                                    try{
                                        setUpdated(updated+1)
			                            setue(update_effect+1)
                                        let emailandlastname = await fetch(`${DOMAIN}/get_last_name_and_email/${metaData['firstname']}`)
                                        emailandlastname = await emailandlastname.json()
                                        let api = await fetch(`${DOMAIN}/get_results_on_conceptual_search/${conceptsearch}/${metaData['firstname']+emailandlastname['lastname']+emailandlastname['email']}/${foldername}`)
                                        api = await api.json()
                                        setCsResultData(api['data'])
										api['data'].map((data)=>{
											setConsent(true)

										})
                                    }catch(err){
                                        console.log(err)
										alert('The educational search you made was too specific,use the google search feature for your search')
										return(
											<a href='/#googlesearch'><FormButton>Go to Google Search</FormButton></a>
										)
                                    }

}