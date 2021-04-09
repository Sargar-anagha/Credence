const express = require('express'); //It gives more functionality
const multer = require('multer'); // To upload images
const router = express.Router(); // Creates an Objects to make apis

const User = require('../models/user'); // database 

//Uploading images
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/uploads');
    },
    filename: (req,file,cb) => {
        cb(null,file.originalname + '_' + Date.now()+'.'+file.mimetype.substring(6,9));
    }
});

const upload = multer({
    storage: storage,
});

// POST -> To post data in the database
router.post('/user',upload.single('image'), (req, res) => {
    const { name, summary } = req.body;

    const user = new User({
        name: name, summary: summary,image:req.file.filename
    });

    user.save()
        .then(() => {
            res.status(201).json({
                message: "Data saved Successfully",
            });
        }).catch((err) => {
            console.log(err);
        });
});

// GET -> To get all the data
router.get('/user', (req, res) => {
    User.find((err, docs) => {
        console.log(docs)
        if (err) {
            res.status(404).json({
                errors: err,
            })
        } else {
            res.status(201).json({
                data: docs,
            })
        }
    })
});

// PUT -> to update data
router.put('/user/:id',(req,res) => {
    User.findById({_id: req.params.id},(err) => {
        if(err){
            res.status(404).json({
                errors: "Not ID found"
            })
        }else{
            User.findByIdAndUpdate({_id:req.params.id},req.body,(err,updatedUser) => {
                if(!err){
                    res.status(201).json({
                        message: "Data updated successfully",
                        data: updatedUser
                    })
                }
            })

        }
    });
});

// DELETE -> To delete particular data
router.delete('/user/:id',(req,res) => {
    User.findById({_id:req.params.id})
        .then(items => items.remove().then(() => res.json({message: 'data removed successfully'}))).catch(() => res.json({error: "Error ocurring"}));
})

module.exports = router;