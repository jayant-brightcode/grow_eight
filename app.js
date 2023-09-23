import express from 'express'
import dotenv from 'dotenv'
import Connection from './db/db.js'
import admin_router from './route/admin.js'
import fileupload from 'express-fileupload'
import bodyParser from 'body-parser'
import user_route from './route/user.js'

import cors from  "cors"
import universityModel from './model/University.js'
import categoryModel from './model/Category.js'
import countryModel from './model/Country.js'
import courseModel from './model/Course.js'
import languageModel from './model/RequiredLanguage.js'
import regionModel from './model/Region.js'
import requiredDocumentmodel from './model/RequiredDocument.js'
import userModel from './model/User.js'
const app = express()

dotenv.config()


app.use(express.json({ limit: '200mb' })); 

app.post("/update",async(req,res)=>{

    await userModel.updateMany({}, { $set: { status: true } }, { multi: true });
 
     res.send("done")
 
 })

app.use('/banner-image',express.static('banner'));
app.use('/university-image',express.static('universityPhotos'));
app.use('/category-image',express.static('category_image'));
app.use('/faculty-image',express.static('faculty_image'));
app.use('/facility-image',express.static('facility_image'));

app.use('/document-image',express.static('document_image'));
app.use('/language-image',express.static('language_image'));

app.use('/country-image',express.static('country_image'));
app.use('/post-image',express.static('post_images'));
app.use('/user-image',express.static('user_photo'));
app.use('/news-image',express.static('news_image'));
app.use('/blog-image',express.static('blog_image'));
app.use('/document',express.static('fee_structure_image'));


app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'public/'
}))
Connection()
app.use(cors());
app.use(express.json())


app.listen(2000,()=>{
    console.log("app is running")
})



app.use('/admin',admin_router)
app.use('/user',user_route)



