const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { body, validationResult, check } = require('express-validator');
const fs = require('fs');

// -- config -- 
app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');


// -- Routes --

app.post('/render-ejs-to-html', 
(req, res) => {
   try {
      const {context , template, fileName} = req.body;
      const contextParse = '';

      //if (context == undefined || context == '')
      //   throw
   
      fs.writeFileSync(`${__dirname}/views/${fileName}.ejs`, template , function (err) {
         if (err) throw err;
         console.log('Saved!');
      });
   
      setTimeout(() => {
         res.render(`${__dirname}/views/${fileName}`, JSON.parse(context));
      }, 100);   
   } catch (error) {
      res.status(500).json('Algo salio mal, verifique sus datos');
   }
});


app.listen(8080);
console.log('8080 is the magic port');