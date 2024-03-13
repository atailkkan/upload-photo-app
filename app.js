// GEREKLİ DOSYALAR DAHİL EDİLDİ.
const ejs = require('ejs');
const express = require('express');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

// Connect Database
const dbUrl = "mongodb://127.0.0.1:27017/pcat";
try {
    mongoose.connect(dbUrl);
    console.log('Veritabanına bağlantı sağlandı.');
} catch (error) {
    console.error(error.message);
}

//MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: [ 'POST', 'GET' ] }));

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photo/detail/:id', photoController.getPhoto);
app.post('/photo', photoController.createPhoto);
app.put('/photo/:id', photoController.updatePhoto);
app.delete('/photo/detail/:id', photoController.deletePhoto);

app.get('/about', pageController.getAboutPage);
app.get('/photo/add', pageController.getAddPhotoPage);
app.get('/photo/edit/:id', pageController.getEditPhotoPage);

// SUNUCU BAĞLANTISI SAĞLANDI.
const port = 5000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı.`);
});
