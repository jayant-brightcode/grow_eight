import userModel from "../model/User.js";

import jwt from 'jsonwebtoken'

import universityModel from "../model/University.js";
import applicationModel from "../model/Application.js";
import ratingModel from "../model/Rating.js";
import communtityModel from "../model/Community.js";
import path from 'path'
import commentModel from "../model/Comments.js";
import BannerImageModel from "../model/BannerImage.js";
import topUniversityModel from "../model/TopUniversity.js";
import topMbbsModel from "../model/TopMbbs.js";
import topEngineerignModel from "../model/TopEngineering.js";
import categoryModel from "../model/Category.js";

import fs from 'fs'
import countryModel from "../model/Country.js";
import courseModel from "../model/Course.js";
import regionModel from "../model/Region.js";
import testimonialModel from "../model/Testimonial.js";

import chatroomModel from "../model/ChatRoom.js";
import discussionModel from "../model/Discussion.js";

import axios from "axios";
import notificationModel from "../model/Notification.js";
import cousellingModel from "../model/Counselling.js";
import cityModel from "../model/OperatingCity.js";
import favUniversityModel from "../model/FavUniversity.js";
import newsandmediamodel from "../model/NewsAndMedia.js";
import blogmodel from "../model/Blog.js";
import contactModel from "../model/ContactUs.js";
import processingfeemodel from "../model/ProcessingFee.js";
import fmgePassModel from "../model/Fmgepass.js";
import callrequestModel from "../model/CallRequest.js";




export const RegisterUser = async(req,res)=>{

  try {

    const phone = req.body.phone
    const name = req.body.name
    const address = req.body.address
    const state = req.body.state
    const email = req.body.email
    const alternatePhone = req.body.alternatePhone
    const aadhar = req.body.aadhar
    const citizenShip = req.body.citizenShip
    const student_type = req.body.student_type
    const passport_number = req.body.passport_number
    const gender = req.body.gender
    const dob = req.body.dob
   
    const university_name = req.body.university_name
    const tweleve_per = req.body.twelve_per
    const course_name = req.body.course_name
    const device_token = req.body.device_token


    console.log(tweleve_per)


    if(!phone){
      return res.status(400).json({
        message:"phone is required"
      })
    }

    if(!address){
      return res.status(400).json({
        message:"address is required"
      })
    }

    if(!name){
      return res.status(400).json({
        message:"name is required"
      })
    }

    if(!state){
      return res.status(400).json({
        message:"state is required"
      })
    }

    if(!email){
      return res.status(400).json({
        message:"email is required"
      })
    }

   

    if(!citizenShip){
      return res.status(400).json({
        message:"citizenShip is required"
      })
    }

    
    if(!student_type){
      return res.status(400).json({
        message:"student_type is required"
      })
    }

    if(!gender){
      return res.status(400).json({
        message:"gender is required"
      })
    }

    if(!dob){
      return res.status(400).json({
        message:"dob is required"
      })
    }

    if(!device_token){
      return res.status(400).json({
        message:"device token is required"
      })
    }




    //check if already exist

    const isRegistered = await userModel.findOne({phone:phone})

    if(isRegistered){
      return res.status(400).json({
        message:"Already registered"
      })
    }else{

      const newUser = new userModel({
        phone:phone,
        address:address,
        name:name,
        email:email,
        state:state,
        alternatePhone:alternatePhone,
        aadharNumber:aadhar,
        citizenShip:citizenShip,
        passport_number:passport_number,
        student_type:student_type,
        gender:gender,
        dob:dob,

        university_name:university_name,
        tweleve_percentage:tweleve_per,
        course_name:course_name,
        user_type:2,
        notification_token:device_token

      })

      const data =  await newUser.save()

      //otp generation


      const min = 100000; // Minimum value (inclusive)
       const max = 999999; // Maximum value (inclusive)
  
  // Generate a random number within the specified range
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

      const reg = await userModel.findByIdAndUpdate({_id:data._id},{"otp":randomNum},{ new: true })


      return res.status(201).json({
        message:"user registered",
        otp:reg.otp
      })







    }
    

    
    
  } catch (error) {
    return res.status(500).json({
        message:"Internal server error"
    })
  }


}




export const UserLogin = async(req,res)=>{

  try {

   const phone = req.body.phone

  


   if(!phone){
       return res.status(400).json({
           message:"Invalid phone number"
       })
   }
   

   //check user

   const find_user = await userModel.findOne({phone:phone})

   if(find_user){

 
         
        

        

         
      //otp generation


      const min = 100000; // Minimum value (inclusive)
      const max = 999999; // Maximum value (inclusive)
 
 // Generate a random number within the specified range
     const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

     const reg = await userModel.findByIdAndUpdate({_id:find_user._id},{"otp":randomNum},{ new: true })





         return res.status(200).json({
              message:"otp sent to phone number",
              otp:reg.otp
             }) 
      

   }else{
      return res.status(400).json({
          message:"No user found with this phone number"
      })
   }

 



     
   
  } catch (error) {
      return res.status(500).json({
         message:"Internal server error "+error
      })
  }


}


export const OtpVerify = async(req,res)=>{

  try {

   const phone = req.body.phone
   const otp = req.body.otp

  


   if(!phone){
       return res.status(400).json({
           message:"Invalid phone number"
       })
   }
   

   //check user

   const find_user = await userModel.findOne({phone:phone})

   if(find_user){


      if(otp == find_user.otp){
        const token = await jwt.sign({credential:find_user},"hdkhkjfhdkjfhkjh")

          return res.status(200).json({
                message:"signed in",
                token:token,
                user:find_user
               
               }) 
      }else{
        return res.status(400).json({
          message:"Invalid otp"
      })


      }

 
         
    
      

   }else{
      return res.status(400).json({
          message:"Invalid user"
      })
   }

 



     
   
  } catch (error) {
      return res.status(500).json({
         message:"Internal server error "+error
      })
  }


}


export const GetUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const category = req.query.category
        const region = req.query.region
        const course = req.query.course
        const country = req.query.country
        const fee = req.query.fees
        const searchquery = req.query.searchquery


        if(searchquery){

           let userpattern = RegExp("^"+req.query.searchquery);

           if(searchquery==""){
            const university = await universityModel.find()
            return res.status(200).json({
              university:university
            })
           }

          const university = await universityModel.find({name:{$regex:userpattern,$options:'i'}})
          return res.status(200).json({
            university:university
          })

        }else{
          if(!category || !region || !course || !country ||!fee){
            const university = await universityModel.find()
  
            return res.status(200).json({
              university:university
            })
          }else{
  
            console.log(fee)
            
  
             if(fee=="lessthan10lakh"){
              const minFee = 0;
              const maxFee = 1000000;
  
              
  
  
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
  
             if(fee=="10to15lakh"){
              const minFee = 1000000;
              const maxFee = 1500000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
             if(fee=="15to20lakh"){
              const minFee = 1500000;
              const maxFee = 2000000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
             if(fee=="20to25lakh"){
              const minFee = 2000000;
              const maxFee = 2500000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
             if(fee=="morethan25lakh"){
              const minFee = 2500000;
              const maxFee = 90000000;
  
              
  
              const university = await universityModel.find({$and:[{category:category},{region:region},{country:country},{ total_fee: { $gte: minFee, $lte: maxFee } },{
                course: { $in: course }
              }]})
    
              return res.status(200).json({
                university:university
              })
             }
  
  
  
           
  
  
          }
          
        }




        




        









         
       


      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"
      })
  }

}

export const GetUniversityById = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const id = req.query.id
      
       if(!id){
           return res.status(400).json({
            message:"Invalid id"
           })
        }

          const university = await universityModel.findById({_id:id}).populate('course').populate('faculty').populate('facility').populate('required_document').populate('language_require').populate("galary").populate("category").populate("country")

          return res.status(200).json({
            single_university:university
          })


       }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"
      })
  }

}


export const ApplyToUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const university_id = req.body.university_id
        const course_id = req.body.course_id
        
        




        if(!university_id || !course_id ){
                   return res.status(400).json({
                    message:"Invalid request"
                  })

        }else{


          const apply = new applicationModel({
              user:req.userinfo,
              university:university_id,
              course:course_id
          })


          await apply.save()

         //  sendFCMNotification(req.userinfo.notification_token)




           const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
  const serverKey = process.env.SERVER_KEY;
  const deviceToken = req.userinfo.notification_token;



  const authorizationHeader = `key=${serverKey}`;

  const postData = {
    to: deviceToken,
    data: {
      title: 'Thank you for applying',
      body: 'we will back to you',
    },
  };

  const headers = {
    'Authorization': `${authorizationHeader}`,
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.post(fcmUrl, postData, { headers });

    const university = await universityModel.findById({_id:university_id})
    const course = await courseModel.findById({_id:course_id})

    //type 5 means apply notification
    const notify = new notificationModel({
         title:"Thank you for applying",
         body:"you have applied to "+university.name +" for "+course.name+ " .we will update you for further process.",
         notification_type:5,
         toUser:req.userinfo._id

    })

    await notify.save()
    


    return res.status(200).json({
      message:"form applied"
    })
   // console.log('FCM response:', response.data);
  } catch (error) {
    return res.status(200).json({
      message:"error happened while sending notification"+error
    });
  }


        


        }




        









         
       


      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetMyAppliedApplication = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const apply = await applicationModel.find({user:req.userinfo._id}).populate('course','name').populate('university').populate({
            path: 'university',
            populate: {
              path: 'country',
              model: 'country'
            }
          }).sort('-createdAt')




          return res.status(200).json({
            
              apply
            
            
          })


        


        




        









         
       


      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const CompareUniversity = async(req,res)=>{
  try {


      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){

          const empty_object = {}
         

         const university_one = req.body.university_id_one
         const university_two = req.body.university_id_two
         const university_three = req.body.university_id_three
         const university_four = req.body.university_id_four








         if(university_one && university_two && university_three=="" &&university_four==""){

          const find_one = await universityModel.findById({_id:university_one}).populate('country')
          const find_two = await universityModel.findById({_id:university_two}).populate('country')


          return res.status(200).json({
              university_one:find_one,
              university_two:find_two,
              university_three:empty_object,
              university_four:empty_object
          })
             
         }


         if(university_one && university_two && university_three &&university_four==""){

          const find_one = await universityModel.findById({_id:university_one}).populate('country')
          const find_two = await universityModel.findById({_id:university_two}).populate('country')
          const find_three = await universityModel.findById({_id:university_three}).populate('country')


          return res.status(200).json({
              university_one:find_one,
              university_two:find_two,
              university_three:find_three,
              university_four:empty_object
          })

         }


         if(university_one && university_two && university_three &&university_four){

          const find_one = await universityModel.findById({_id:university_one}).populate('country')
          const find_two = await universityModel.findById({_id:university_two}).populate('country')
          const find_three = await universityModel.findById({_id:university_three}).populate('country')
          const find_four = await universityModel.findById({_id:university_four}).populate('country')


          return res.status(200).json({
              university_one:find_one,
              university_two:find_two,
              university_three:find_three,
              university_four:find_four
          })

         }

         return res.status(400).json({
          message:"choose correctly"
         })





        


     


     

      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

 

      
  } catch (error) {



      
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }
}


export const AddReviewAndRating = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const university_id = req.body.university_id
        const rating = req.body.rating
        const review = req.body.review

     if(!university_id ){
                   return res.status(400).json({
                    message:"Invalid request"
                  })

        }else{


          const apply = new ratingModel({
              user:req.userinfo,
              university:university_id,
              rating:rating,
              review:review
          })


          await apply.save()

          return res.status(201).json({
            message:"review added"
          })


        


        }




        









         
       


      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}




export const GetReviewAndRatingByUniversityId = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const university_id = req.query.university_id
      
       if(!university_id ){
                   return res.status(400).json({
                    message:"Invalid request"
                  })

        }else{


          const rating = await ratingModel.find({university:university_id}).populate('university').populate('user')

          return res.status(201).json({
            reviews:rating
          })


        


        }




        









         
       


      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"
      })
  }

}



export const AddPost = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){




        const image = req.files.image
        const caption = req.body.caption
      

        const randomname = Date.now() + '-'+image.name
        const newpath =  path.join(process.cwd(),'post_images',randomname)
        await image.mv(newpath)



          const apply = new communtityModel({
             posted_by:req.userinfo,
              post_image:randomname,
              post_caption:caption,
              post_likes:0,
              comments:[]
          })


          await apply.save()

          return res.status(201).json({
            message:"post added"
          })


       }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const AddComment = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


        const post_id = req.body.post_id
        const comment = req.body.comment

       
      

     


          const apply = new commentModel({
              post_id:post_id,
              comment:comment,
              comment_by:req.userinfo,
          
          })


         const newcomment =  await apply.save()

         await communtityModel.findByIdAndUpdate( post_id, { $push: { comments: newcomment._id } })

          return res.status(201).json({
            message:"comment added"
          })


       }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const GetComment = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


        const post_id = req.query.post_id

        if(!post_id){
          return res.status(400).json({
            message:"Invalid request"
          })
        }

        const findcomment = await commentModel.find({post_id:post_id}).populate("comment_by").sort('-createdAt')

        return res.status(200).json({
          comment:findcomment
        })

        

 



       }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}




export const GetBanner = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const banner = await BannerImageModel.find()






          return res.status(201).json({
            banners:banner
          })


         }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetTopUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const top = await topUniversityModel.find().populate('university')






          return res.status(201).json({
            top_University:top
          })


         }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const GetTopMbbs = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const top = await topMbbsModel.find().populate('university')






          return res.status(201).json({
            top_University:top
          })


         }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetTopEngineering = async(req,res)=>{
 
  try {

      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){


    


          const top = await topEngineerignModel.find().populate('university')






          return res.status(201).json({
            top_University:top
          })


         }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const getCategories = async(req,res)=>{
  try {


      let token = req.userinfo
      console.log(token)
      if(token.user_type == 2){
          

        const f_category = await categoryModel.find()
     
     
        
          return res.status(201).json({
             categories:f_category
          })
     

      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

 

      
  } catch (error) {



      
      return res.status(500).json({
          message:"Internal server error"
      })
  }
}


export const getCategoryById = async(req,res)=>{
  try {


      let token = req.userinfo
      console.log(token)
      if(token.admin_type == 1){
          

        const cat_id = req.query.cat_id


        if(!cat_id){
          return res.status(400).json({
            message:"cat id is required"
          })
        }

        const find_cat = await categoryModel.findById({_id:cat_id})

        return res.status(200).json({
          "_id": find_cat._id,
          "name": find_cat.name,
          "category_image": find_cat.category_image,
          "createdAt": find_cat.createdAt,
          "updatedAt": find_cat.updatedAt,
          "__v": 0
        })

     
     
        
        
     

      }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

 

      
  } catch (error) {



      
      return res.status(500).json({
          message:"Internal server error"
      })
  }
}

export const temp = async(req,res)=>{


   const data = req.body.data

  
   const imageBuffer = Buffer.from(data, 'base64');

   const imageName = `course_${Date.now()}.jpg`; // Generate a unique name for each image
   const imagePath = path.join(process.cwd(), 'nn', imageName);

   // Save the image to the directory
  fs.writeFileSync(imagePath, imageBuffer);

   return res.status(200).json({
    message:"hello"
   })



}


export const GetUniversityByCategory = async(req,res)=>{
 
  try {

     let token = req.userinfo
  
     if(token.user_type == 2){

          const c_id = req.query.category_id

          if(!c_id){
            return res.status(400).json({
              message:"invalid category id"
            })
          }
         
       const s =  await universityModel.find({ category: { $in: [c_id] } });
        return res.status(200).json({
          university:s
        })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetUniversityByCountry = async(req,res)=>{
 
  try {

     let token = req.userinfo
  
     if(token.user_type == 2){

          const c_id = req.query.country_id

          if(!c_id){
            return res.status(400).json({
              message:"invalid country id"
            })
          }
         
       const s =  await universityModel.find({ country: c_id});
        return res.status(200).json({
          university:s
        })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const PopularCountry = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

        
         
       const s =  await countryModel.find();
        return res.status(200).json({
          country:s
        })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetPosts = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

        
      let page = req.query.page
      let size =req.query.size
      

      

      if(!page){
          page=1;
      }
      if(!size){
          size=10;
      }
  
      const limit = parseInt(size);
      const skip = (page-1)*size;
  

      const post  = await communtityModel.find().sort('-updatedAt').limit(limit).skip(skip).populate('posted_by').sort('-createdAt')
      
      res.status(200).json({
          posts:post
      })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const GetMedia = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

        
    
  

      const post  = await newsandmediamodel.find().sort('-createdAt')


      
      res.status(200).json({
          media:post
      })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const GetBlog = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

        
    
  

      const post  = await blogmodel.find().populate("posted_by").sort('-createdAt')


      
      res.status(200).json({
          media:post
      })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetCourseByCatId = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const cat_id = req.query.cat_id

      if(!cat_id){
        return res.status(400).json({
          message:"cat id is required"
        })
      }

     
  

      const course  = await courseModel.find({cat_id:cat_id})
      
      res.status(200).json({
          course:course
      })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetRegion = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

     
  

      const region  = await regionModel.find()
      
      res.status(200).json({
          region:region
      })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetCountryByRegionId = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const region = req.query.region_id

      if(!region){
        return res.status(200).json({
          message:"region is required"
        })
      }

        
         
       const s =  await countryModel.find({region:region});
        return res.status(200).json({
          country:s
        })


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}




export const LikePost = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const post_id = req.body.post_id

      if(!post_id){
        return res.status(200).json({
          message:"post id is required"
        })
      }

      const checkifalreadylike = await communtityModel.findOne({ _id: post_id, liked_by: { $in: [req.userinfo._id] } })

      if(checkifalreadylike){
        return res.status(400).json({
          message:"already liked"
        })
      }else{
        const data = await communtityModel.findByIdAndUpdate(post_id, { $push: { liked_by: req.userinfo._id }})
        console.log(data)
        let like = data.post_likes
        like++
        await communtityModel.findByIdAndUpdate({_id:post_id},{post_likes:like})

        return res.status(200).json({
          message:"like added"
        })
      }


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const AddTestimonial = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const university_id = req.body.university_id
      const desc = req.body.desc

      if(!university_id || !desc){
        return res.status(200).json({
          message:"invalid request"
        })
      }



        const addtestimonial = new testimonialModel({

          user:req.userinfo._id,
          university:university_id,
          desc:desc
            
        })

        await addtestimonial.save()

        return res.status(201).json({
          message:"testimonial added"
        })

    


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const GetTestimonialByUniversityId = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      const university_id = req.query.university_id
      

      if(!university_id){
        return res.status(200).json({
          message:"invalid request"
        })
      }



        const testimonial =  await testimonialModel.find({university:university_id}).populate('user')
      

        return res.status(201).json({
          testimonial:testimonial
        })

    


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetProfile = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      



        const user = await userModel.findById({_id:req.userinfo._id})
      

        return res.status(201).json({
          user:user
        })

    


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}

export const UpdateProfilePhoto = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){

      const photo = req.files.photo

      if(photo==null || photo==undefined){

        return res.status(400).json({
          message:"photo is required"
        })
      }


      const randome_name = Date.now() + '-'+photo.name
      const newpath =  path.join(process.cwd(),'user_photo',randome_name)
      await photo.mv(newpath)



      await userModel.findByIdAndUpdate({_id:req.userinfo._id},{profile_photo:randome_name})
  

       return res.status(200).json({
          message:"profile photo updated"
        })

    


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const UpdateUserProfile = async(req,res)=>{

  try {

    const phone = req.body.phone
    const name = req.body.name
    const address = req.body.address
    const state = req.body.state
    const email = req.body.email
    const alternatePhone = req.body.alternatePhone
  
    const citizenShip = req.body.citizenShip
    const passport_number = req.body.passport_number
    const gender = req.body.gender
    const dob = req.body.dob
    const tweleve_per = req.body.twelve_per
    const neet_score = req.body.neet_score
 

    console.log(tweleve_per)


    if(!phone){
      return res.status(400).json({
        message:"phone is required"
      })
    }

    if(!address){
      return res.status(400).json({
        message:"address is required"
      })
    }

    if(!name){
      return res.status(400).json({
        message:"name is required"
      })
    }

    if(!state){
      return res.status(400).json({
        message:"state is required"
      })
    }

    if(!email){
      return res.status(400).json({
        message:"email is required"
      })
    }

   

    if(!citizenShip){
      return res.status(400).json({
        message:"citizenShip is required"
      })
    }

    
 

    if(!gender){
      return res.status(400).json({
        message:"gender is required"
      })
    }

    if(!dob){
      return res.status(400).json({
        message:"dob is required"
      })
    }


    await userModel.findByIdAndUpdate({_id:req.userinfo._id},{name:name,phone:phone,email:email,address:address,citizenShip:citizenShip,passport_number:passport_number,state:state,alternatePhone:alternatePhone,tweleve_percentage:tweleve_per,neet_score:neet_score,dob:dob,gender:gender})

    return res.status(200).json({
      message:"profile updated"
    })
    

  

     







    
    

    
    
  } catch (error) {
    return res.status(500).json({
        message:"Internal server error"
    })
  }


}


export const GetMyCounselor = async(req,res)=>{
 
  try {

     let token = req.userinfo
     if(token.user_type == 2){


      



        const counselor = await userModel.findOne({$and:[{isActive:true},{user_type:3}]})

      

        return res.status(201).json({
          counselor:counselor
        })

    


     }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
     }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}




export const SendMessage = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){



          const sender_id = req.userinfo._id
          const reciever_id = req.body.reciever_id
          const message = req.body.message

          
          if(!sender_id || !reciever_id || !message){
              return res.status(400).json({
                  message:"invalid request"
              })
          }

          let room_id = ""

          //check room if not then create

          const check_room = await chatroomModel.findOne({$and:[{created_by:sender_id},{created_with:reciever_id}]})

          if(check_room!=null){
              room_id = check_room._id
          }

          
          const check_room2 = await chatroomModel.findOne({$and:[{created_by:reciever_id},{created_with:sender_id}]})

          if(check_room2 !=null){
              room_id = check_room2._id
          }


          if(check_room==null && check_room2==null){
              //proceed


              const createroom = new chatroomModel({
                  created_by:sender_id,
                  created_with:reciever_id
              })
             const room =  await createroom.save()


              const newmessage = new discussionModel({
                  from:sender_id,
                  to:reciever_id,
                  message:message,
                  chat_room_id:room._id
              })

              await newmessage.save()

              return res.status(201).json({
                  message:"message sent"
              })

            



          }

         
          const newmessage = new discussionModel({
              from:sender_id,
              to:reciever_id,
              message:message,
              chat_room_id:room_id
          })

          await newmessage.save()

          return res.status(201).json({
              message:"message sent"
          })
          





          
          

          




        


          

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetMessages = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){



          const counselor_id = req.query.counselor_id
     
          let room_id = ""

          
          if(!counselor_id){
              return res.status(400).json({
                  message:"invalid request"
              })
          }


          const check1 = await chatroomModel.findOne({$and:[{created_by:counselor_id},{created_with:req.userinfo._id}]})

          


          if(check1!=null){
               room_id  = check1._id
          }

          const check2 = await chatroomModel.findOne({$and:[{created_by:req.userinfo._id},{created_with:counselor_id}]})
         
          if(check2!=null){
             room_id  = check2._id
          }


          if(room_id==""){
            return res.status(200).json({
              messages:[]
            })
          }

          const messages = await discussionModel.find({chat_room_id:room_id}).populate('from').populate('to')
          
          return res.status(200).json({
            messages:messages
          })
          

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const UpdateNotificationToken = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){

        const token = req.body.token

        await userModel.findByIdAndUpdate({_id:req.userinfo._id},{notification_token:token})

        return res.status(200).json({
          message:"token updated"
      })


          

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}



export const GetNotification = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){



       const notification = await notificationModel.find({toUser:req.userinfo._id}).sort('-updatedAt')
          
          return res.status(200).json({
            notification:notification
          })
           

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const BookCounselling = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){


        const datetime = req.body.datetime
        const address = req.body.address
        const office_address = req.body.city_id
        const remarks = req.body.remarks
        const type = req.body.type

        let conse = ""

        if(type==1){
          conse = "Home Counselling"
        }else if(type==2){
          conse = "Video Counselling"
        }else if(type==3){
          conse = "Office visit Counselling"
        }


        if(!datetime){
          return res.status(400).json({
            message:"please select data time"
          })
        }



        if(office_address){
          const counselling = new cousellingModel({
            datetime:datetime,
            address:address,
            office_location:office_address,
            remarks:remarks,
            counselling_type:type,
            user:req.userinfo._id
          })
  
          const booked = await counselling.save()



          const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
          const serverKey = process.env.SERVER_KEY;
          const deviceToken = req.userinfo.notification_token;
        
        
        
          const authorizationHeader = `key=${serverKey}`;
        
          const postData = {
            to: deviceToken,
            data: {
              title: 'Thank you for booking '+conse,
              body: 'your counselling is schedule for '+datetime,
            },
          };
        
          const headers = {
            'Authorization': `${authorizationHeader}`,
            'Content-Type': 'application/json',
          };
        
          try {
            const response = await axios.post(fcmUrl, postData, { headers });
        
           
        
            //type 6 means booked counselling notification
            const notify = new notificationModel({
                 title:"Thank you for booking "+conse,
                 body:"your "+conse+" is is schedule for " +datetime,
                 notification_type:6,
                 toUser:req.userinfo._id
        
            })
        
            await notify.save()
            
        
        
            return res.status(200).json({
              message:"counselling booked",
              datetime:booked.datetime
            })
           // console.log('FCM response:', response.data);
          } catch (error) {
            return res.status(200).json({
              message:"error happened while sending notification"+error
            });
          }
  
          

        }else{

          const counselling = new cousellingModel({
            datetime:datetime,
            address:address,
            remarks:remarks,
            counselling_type:type,
            user:req.userinfo._id
          })
  
          const booked = await counselling.save()
  
          const fcmUrl = 'https://fcm.googleapis.com/fcm/send';
          const serverKey = process.env.SERVER_KEY;
          const deviceToken = req.userinfo.notification_token;
        
        
        
          const authorizationHeader = `key=${serverKey}`;
        
          const postData = {
            to: deviceToken,
            data: {
              title: 'Thank you for booking '+conse,
              body: 'your counselling is schedule for '+datetime,
            },
          };
        
          const headers = {
            'Authorization': `${authorizationHeader}`,
            'Content-Type': 'application/json',
          };
        
          try {
            const response = await axios.post(fcmUrl, postData, { headers });
        
           
        
            //type 6 means booked counselling notification
            const notify = new notificationModel({
                 title:"Thank you for booking "+conse,
                 body:"your "+conse+" is is schedule for " +datetime,
                 notification_type:6,
                 toUser:req.userinfo._id
        
            })
        
            await notify.save()
            
        
        
            return res.status(200).json({
              message:"counselling booked",
              datetime:booked.datetime
            })
           // console.log('FCM response:', response.data);
          } catch (error) {
            return res.status(200).json({
              message:"error happened while sending notification"+error
            });
          }

        }


       






    
           

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const GetBookedCounselling = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){


       


       


        const booked = await cousellingModel.find({user:req.userinfo._id}).populate("office_location").sort('-updatedAt')

        return res.status(200).json({
          bookedCOunselling:booked
        })






    
           

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}



export const GetOperatingCity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){


       


    const city = await cityModel.find()

        return res.status(200).json({
          city:city
        })






    
           

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}


export const AddFavUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){


        const u_id = req.query.university_id
      



        if(!u_id){
          return res.status(400).json({
            message:"university id is required"
          })
        }


        const isfav  = await favUniversityModel.findOne({user:req.userinfo._id})

        if(isfav){
          return res.status(200).json({
             message:"already added to fav"
          })
        }


        const fav = new favUniversityModel({
          university:u_id,
          user:req.userinfo._id
        })

        await fav.save()


        return res.status(200).json({
          message:"added to fav"
        })



              

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}
   
export const GetFavUniversity = async(req,res)=>{
 
  try {

      let token = req.userinfo
      if(token.user_type == 2){


      
      
        const isfav  = await favUniversityModel.find({user:req.userinfo._id}).populate("university")

        

        return res.status(200).json({
          favuniversity:isfav
        })



              

   }else{
          return res.status(401).json({
              message:"Anauthorize request"
          })
      }

    

      
  } catch (error) {
      return res.status(500).json({
          message:"Internal server error"+error
      })
  }

}



export const getFeeStructure = async(req,res)=>{
  try {

    let token = req.userinfo
    if(token.user_type == 2){


    
     const country_id = req.query.country_id
     const university_id = req.query.university_id


     if(!country_id || !university_id){
      return res.status(400).json({
        message:"invalid request"
      })
     }


     const docs = await universityModel.findOne({$and:[{_id:university_id},{country:country_id}]})

     if(!docs.fee_structure){
      return res.status(400).json({
        message:"Not found"
      })
     }

     return res.status(200).json({
      message:docs.fee_structure
    })

        

 }else{
        return res.status(401).json({
            message:"Anauthorize request"
        })
    }

  

    
} catch (error) {
    return res.status(500).json({
        message:"Internal server error"+error
    })
}

}
          
export const GetContactUs = async(req,res)=>{
  try {

    let token = req.userinfo
    if(token.user_type == 2){


    
    


     const docs = await contactModel.find()


     return res.status(200).json({
       contact:docs
    })

        

 }else{
        return res.status(401).json({
            message:"Anauthorize request"
        })
    }

  

    
} catch (error) {
    return res.status(500).json({
        message:"Internal server error"+error
    })
}

}


export const GetProcessingFee = async(req,res)=>{
  try {

    let token = req.userinfo
    if(token.user_type == 2){


    
    
     const fee = await processingfeemodel.findOne()

   


     return res.status(200).json({
       fee:fee
    })

        

 }else{
        return res.status(401).json({
            message:"Anauthorize request"
        })
    }

  

    
} catch (error) {
    return res.status(500).json({
        message:"Internal server error"+error
    })
}

}


export const GetFmgePassRateCountrywise = async(req,res)=>{
  try {

    let token = req.userinfo
    if(token.user_type == 2){


    
    
     const fee = await fmgePassModel.find().populate('country')


   


     return res.status(200).json({
       fmgepassrate:fee
    })

        

 }else{
        return res.status(401).json({
            message:"Anauthorize request"
        })
    }

  

    
} catch (error) {
    return res.status(500).json({
        message:"Internal server error"+error
    })
}

}


export const RequestACall = async(req,res)=>{
  try {

    let token = req.userinfo
    if(token.user_type == 2){


    
    
     const requestmodel = new callrequestModel({
        user:req.userinfo._id
     })

     await requestmodel.save()
     return res.status(200).json({
      message:"request taken , we will call you shortly"
     })




        

 }else{
        return res.status(401).json({
            message:"Anauthorize request"
        })
    }

  

    
} catch (error) {
    return res.status(500).json({
        message:"Internal server error"+error
    })
}

}