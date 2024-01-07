const DOMAIN = 'http://127.0.0.1:5000'
const D2 = 'https://espark-afd-enterprises.uc.r.appspot.com'
const get_student_ref_link = async(data)=>{
    //homepage redirect
    
        let api = await fetch(`${DOMAIN}/email_to_firstname/${data}`)
        api = await api.json()
      //  return api['data']
      return `${D2}/homepage/${api['data']}/student`
}
export default get_student_ref_link