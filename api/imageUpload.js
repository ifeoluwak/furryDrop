export default uploadToCloudinary = async(result) => {
    let apiUrl = 'https://api.cloudinary.com/v1_1/ifeoluwak/image/upload';

    let img = `data:image/jpg;base64,${result.base64}`
  
    let uriParts = result.uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let data = {
      "file": img,
      "upload_preset": "tdyz2bt0",
    }

    let newUrl = await fetch(apiUrl, {
      body: JSON.stringify(data),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
    }).then(r=>{
      let data = r._bodyText
      return JSON.parse(data).secure_url
    }).catch(err=>console.log(err))

    if(newUrl){
      return newUrl
    }else{
      return false
    }
  }