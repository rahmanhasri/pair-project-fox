
function uploadFile(req, res, next) {
  // console.log(req.body)
  if(req.body.photo) {
    upload.single('photo')
  }
  next()
}

module.exports = { uploadFile, upload }