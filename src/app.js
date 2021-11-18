const fs = require('fs');
const express = require('express');
const path = require('path');
const hbs = require('hbs');
//const data_file = require('./data');

const app = express();

//define paths for express config.
const public_directory_path = path.join(__dirname, '../public');
const partialsPath = path.join('__dirname', '../templates/partials')
const viewsPath =  path.join(__dirname, '../templates/views')

//setup handlbars engine and views location and register partials.
app.set('views', viewsPath);;
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(public_directory_path));

// console.log(__dirname);
// console.log(__filename);

// const buffer_data_df = fs.readFileSync('data.json');
// const data_df_string = buffer_data_df.toString();
// const data_df = JSON.parse(data_df_string);

// console.log(index_data);
// console.log(data_df_string);

app.get('/data', function(req, res){
  // send back a json response
  res.json(data_df);
});

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'Title for About'
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }
  res.send({
    forecast: 'It is snowing',
    location: 'Philadelphia',
    address_provided: req.query.address
  })
})

app.get('', (req, res) => {
  res.render('index',{
    title: 'Title for Index'
  });
});

app.get('/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page Not found'
  })
});

// app.get('/', function(req, res) {
//   // send back a json response
//   res.json(index_data);
// });

app.listen(3000);
