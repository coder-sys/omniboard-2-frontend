const DOMAIN = 'https://25xdhfsbmi.execute-api.us-east-2.amazonaws.com/prod'
const save_google_data = async(setue,data,update_effect,linkjoin_,retrievegoogledata1,index,djoin_,stored_data,name,lastname,email,foldername,description)=>{
    setue(update_effect+1)
    data.split('').map((data_)=>{
        if(data_ == '/'){
            console.log('alert')
            data_ = '`'
        }
        linkjoin_.push(data_)

    })
    retrievegoogledata1[index].split('').map((_)=>{
        if(_ == '/'){
            _ = "`"
            console.log('alert')
        }
        if(_ == '?'){
            _ = ''
        }
        djoin_.push(_)

    })


    stored_data[index] = true

try{    
let eal = await fetch(`${DOMAIN}/get_last_name_and_email/${name}`)
eal = await eal.json()
    let api = await fetch(`${DOMAIN}/add_google_content/${name}/${foldername}/${djoin_.join("")}/${linkjoin_.join("")}/${description[index]}`)
    api = await api.json()
    console.log(api)
}
catch(err){
 alert('This site has been blocked from being saved')

}
   
   
}
export default save_google_data;