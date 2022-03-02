const { v4: uuidv4 } = require('uuid');

const imageParams = fileName => {
   const myFile = fileName.originalname.split('.');
   console.log(myFile)
   const fileType = myFile[myFile.length - 1];

   const imageParams = {
      Bucket: 'user-images-2e372f2e-1764-4799-a190-901356166918',
      Key: `${uuidv4()}.${fileType}`,
      Body: fileName.buffer,
      ACL: 'public-read'
   };

   return imageParams;
}

module.exports =  imageParams;