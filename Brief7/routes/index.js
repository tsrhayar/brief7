const express = require('express');
const fs = require('fs');
const router = express.Router();

const data = fs.readFileSync('voitures.json');
let json = JSON.parse(data);

// affichage
router.get('/', (req, res) => {
  res.render('index', { json });
});

// add 
router.post('/', (req, res) => {

  var info = req.body;
  json.push(info);

  // saving the array in a file
  const data = JSON.stringify(json);
  fs.writeFileSync('voitures.json', data, 'utf-8');

  res.redirect('/');
});


// router.put('/', (req, res) => {

//   var info = req.body;
//   json.push(info);

//   // saving the array in a file
//   const data = JSON.stringify(json);
//   fs.writeFileSync('voitures.json', data, 'utf-8');

//   res.redirect('/');
// });

//////

//delete
router.get('/delete/:id', (req, res) => {
  json = json.filter(d => d.id != req.params.id);

  // saving data
  const data = JSON.stringify(json);
  fs.writeFileSync('voitures.json', data, 'utf-8');

  res.redirect('/')
});


// update
router.post('/up', (req, res) => {
  // console.log(req.body, req.params)
  const { id } = req.body;
  const { name, carburant, climatisation, price } = req.body;

  json.forEach((product, i) => {
    if (product.id == id) {
      product.name = name;
      product.carburant = carburant;
      product.climatisation = climatisation;
      product.price = price;
    }
  });
  res.redirect('/');

});



module.exports = router;