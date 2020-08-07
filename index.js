const express = require('express');
const app = express();
const port = process.env.PORT || 8088;
const config = require('./Configuration/config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require("bcrypt");
const users = require('./Model/externalUser');
const admin = require('./Model/adminUser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const ProtectedRoutes = express.Router();

app.use('/api', ProtectedRoutes);
app.set("Secret", config.secret);
app.use(cors({
  'origin' : '*'
}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');

    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With,content-type, Content-Type, Accept, Authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

mongoose.connect('mongodb://Kavya:Vihaanvihaan123!@ds261479.mlab.com:61479/heroku_qgzw9vl6', {useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection; mongodb://<dbuser>:<dbpassword>@ds261479.mlab.com:61479/heroku_qgzw9vl6
mongoose.connection.on('error', err => {
  console.error(err);
});
//
// app.post("/signup", (req, res, next) => {
//   admin.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Mail exists"
//         });
//       } else {
//         console.log(JSON.stringify(req.body));
//         bcrypt.hash("tomato", 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err
//             });
//           } else {
//             const user = new admin({
//               _id: new mongoose.Types.ObjectId(),
//               email: req.body.email,
//               password: hash
//             });
//             user.save()
//               .then(result => {
//                 console.log(result);
//                 res.status(201).json({
//                   message: "User created"
//                 });
//               })
//               .catch(err => {
//                 console.log(err);
//                 res.status(500).json({
//                   error: err
//                 });
//               });
//           }
//         });
//       }
//     });
// });

app.post('/login', (req, res) => {
  admin.findOne({email : req.body.email}, (err, result) => {
    if(!result) {
      return res.status(401).json({
        message : "Authentication Failed"
      });
    }else {
    bcrypt.compare(req.body.password, result.password, (err, resp) =>{
      if(err) {
        return res.status(401).json({
          message : "Authen Failed"
        });
      }
      if(resp) {
        const token = jwt.sign({
          email : result.password,
          userId : result.password._id
        },
        app.get("Secret"),
        {
          expiresIn : "1h"
        });
        return res.status(200).json({
          message : "Successfully Authenticated!",
          token : token
        })
      }
      return res.status(401).json({
        message : "Authentication Failed"
      });
    })
  }
})
})

ProtectedRoutes.use((req, res, next) => {
  const token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, app.get('Secret'), (err, decoded) => {
      if(err) {
        res.status(401).json({message : "Invalid token"});
      }
      else {
        req.decoded = decoded;
        next();
      }
    })
  }
  else {
    res.status(401).json({message: "Unauthorized! Enter a valid token"});
  }
})

app.get('/api/externalusers', (req, res) => {
  users.find({}, (err, resp) => {
    if(err){
      console.error(err);
    }else {
      res.status(200).send(resp);
    }
  })
})

app.post('/externaluser',(req, res) => {
  console.log("dog "+JSON.stringify(req.body));
  const hash = bcrypt.hashSync(req.body.ssn, 10);
  const newExternalUser = new users({
    first_name: req.body.first_name,
    last_name : req.body.last_name,
    telephone_number : req.body.telephone_number,
    address : req.body.address,
    ssn : hash
  })

  newExternalUser.save((err, ans) => {
    if(err){
      console.error("ERER "+err);
      res.status(409).send("User already exists");
    }else{
      res.status(200).send("Added Successfully!");
    }
  })
})

app.listen(port, () => {
  console.log(`app running on the port ${port}`);
})
