const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {

    let currentPage = req.query.page || 1;
    let photosPerPage = 3;
    const totalPhotos = (await Photo.find()).length;
    let totalPage = Math.ceil(totalPhotos / photosPerPage);
    let leftRightNum = 1;

    const photos = await Photo.find()
        .sort('-dateCreated')
        .skip((currentPage - 1) * photosPerPage)
        .limit(photosPerPage);


    res.render('index', {
        photos: photos, 
        pagination: { currentPage, photosPerPage, totalPhotos, totalPage, leftRightNum }
    });
};

exports.getPhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', { photo });
};

exports.createPhoto = async (req, res) => {
    let uploadDir = 'public/uploads';
    if(!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name
        });
        res.redirect('/');
    });
};

exports.updatePhoto = async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photo/detail/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let imagePath = __dirname + '/../public' + photo.image;
    fs.unlinkSync(imagePath);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/about');
};