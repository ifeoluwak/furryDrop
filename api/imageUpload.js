export default async result => {
  let apiUrl = "https://api.cloudinary.com/v1_1/ifeoluwak/image/upload"

  let img = `data:image/jpg;base64,${result.base64}`

  let data = {
    file: img,
    upload_preset: "tdyz2bt0"
  }

  let newUrl = await fetch(apiUrl, {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json"
    },
    method: "POST"
  })
    .then(async r => {
      let data = await r.json()
      return data.secure_url
    })
    .catch(err => console.log(err))

  if (newUrl) {
    return newUrl
  } else {
    return false
  }
}
