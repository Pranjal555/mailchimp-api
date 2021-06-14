const express=require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/imgs'));
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html')}
  );

  app.post('/', function(req, res){
     var first_name = req.body.first_name;
     var last_name = req.body.last_name;
     var mail = req.body.mail;
     var data = {
         members:[
             {
                 email_address: mail,
                 status: "subscribed",
                 merge_fields: {
                     FNAME:first_name,
                     LNAME:last_name
                 }
             }
         ]
     };
     const jsonData = JSON.stringify(data);

     const url="https://us1.api.mailchimp.com/3.0/lists/ecb0b0b88d";
     const options = {
         method: "POST",
         auth: "Pandey:a09ba97682642aff018474d6b6ac257d-us1"
     }
      const request = https.request(url,options,function(response){
          if(response.statusCode === 200){
              res.sendFile(__dirname+"/success.html");
          }else{
              res.sendFile(__dirname+"/failure.html");
          }
          response.on("data",function(data){
          console.log(JSON.parse(data));
         })
      })
         request.write(jsonData);
         request.end();
  });
    app.post("/failure",function(req,res){
        res.redirect("/");
    })
  app.listen(process.env.PORT || 3001, function(){
      console.log("Running on port 3001...");
  });
  //api key= a09ba97682642aff018474d6b6ac257d-us1
  //unique id=ecb0b0b88d
