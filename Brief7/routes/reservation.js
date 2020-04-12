const express = require('express');
const fs = require('fs');
const router = express.Router();

const data = fs.readFileSync('voitures.json');
let json = JSON.parse(data);

const data2 = fs.readFileSync('reservation.json');
let json2 = JSON.parse(data2);


router.get('/reservation', (req, res) => {
  res.render('reservation', { json2, json });
});


router.post('/reservation', (req, res) => {

  var info = req.body;
  json2.push(info);

  // saving the array in a file
  const data2 = JSON.stringify(json2);
  fs.writeFileSync('reservation.json', data2, 'utf-8');

  res.redirect('/reservation');
});

// router.put('/reservation', (req, res) => {

//     var info = req.body;
//     json2.push(info);
  
//     // saving the array in a file
//     const data2 = JSON.stringify(json2);
//     fs.writeFileSync('reservation.json', data2, 'utf-8');
  
//     res.redirect('/reservation');
//   });

//   

//delete
router.get('/delete-reservation/:id', (req, res) => {
    json2 = json2.filter(d => d.id != req.params.id);
  
    // saving data
    const data2 = JSON.stringify(json2);
    fs.writeFileSync('reservation.json', data2, 'utf-8');
  
    res.redirect('/reservation')
  });
  
  
  // update
  router.post('/up-reservation/:id', (req, res) => {
    // console.log(req.body, req.params)
    const { id } = req.body;
    const { nameClient, nameCar, numberDay, numberPersone } = req.body;
  
    json2.forEach((product, i) => {
      if (product.id == id) {
        product.nameClient = nameClient;
        product.nameCar = nameCar;
        product.numberDay = numberDay;
        product.numberPersone = numberPersone;
      }
    });
    res.redirect('/reservation');
  
  });


// router.put('/reservation', (req, res) => {

//   var info = req.body;
//   json2.push(info);

//   // saving the array in a file
//   const data2 = JSON.stringify(json2);
//   fs.writeFileSync('reservation.json', data2, 'utf-8');

//   res.redirect('/reservation');
// });

module.exports = router;