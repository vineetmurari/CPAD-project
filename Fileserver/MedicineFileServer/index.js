var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
  
var fs = require('fs');
var path = require('path');
require('dotenv/config');

const http = require('http');


const Data = JSON.stringify({
    upload_status: true
  });

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(Data),
    },
  };

  const update_status = (desc) => {
    let data = '';
  
    const request = http.request('http://192.168.1.8:8000/api/updatestatus/'+desc,options, (response) => {
      response.setEncoding('utf8');
  
      response.on('data', (chunk) => {
        data += chunk;
      });
  
      response.on('end', () => {
        console.log(data);
      });
    });
  
    request.on('error', (error) => {
      console.error(error);
    });
  
    // Write data to the request body
    request.write(Data);
  
    request.end();
  };


mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });
   

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
      
    // Set EJS as templating engine 
    app.set("view engine", "ejs");
    
    
    var multer = require('multer');
  
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });
      
    var upload = multer({ storage: storage });
    
    var prescriptionModel = require('./model');

    app.get('/', (req, res) => {
        prescriptionModel.find({}, (err, items) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                res.render('imagesPage', { items: items });
            }
        });
    });


    app.post('/', upload.single('image'), (req, res, next) => {
  
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        prescriptionModel.create(obj, (err, item) => {
            if (err) {
                console.log(err);
            }
            else {
                // item.save();
                res.render('success')
                console.log(obj.desc)
                update_status(obj.desc);
            }
        });
    });


    var port = process.env.PORT || '3000'
    app.listen(port, err => {
    if (err)
        throw err
    console.log('Server listening on port', port)
})

