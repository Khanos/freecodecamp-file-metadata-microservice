'use strict';

var express = require('express');
var cors = require('cors');

// require and use "multer"...
var multer  = require('multer');
var upload = multer({ dest: '/public/uploads/' })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  if(req.file){
    if(req.file.size < 10000000){
      return res.json({
        "name": req.file.originalname,
        "type": req.file.mimetype,
        "size": req.file.size
      });
    } else {
      return res.send('Wow, that\'s a big file, please use less than 10mb');  
    }
    
  } else {
    return res.send('No file uploaded');
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
