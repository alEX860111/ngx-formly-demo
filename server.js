const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const cors = require('cors');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  Object.values(req.files).forEach(sampleFile => {
    const uploadPath = __dirname + '/uploads/' + sampleFile.name;
  
    sampleFile.mv(uploadPath, function(err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).end();
    });
  });

});

app.listen(8000, function() {
  console.log('Express server listening on port ', 8000);
});
