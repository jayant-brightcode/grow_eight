import mongoose from "mongoose";


const UniversitySchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },

    university_image:
        {
            type:String,
            default:""
            
        }
    ,
    course:[
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'course'
          }
    ],
    faculty:{
        type:String,
         default:""
    },

    facility:{
        type:String,
        default:""
    },

    required_document:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"required_document",
        
    }],

    application_guidance:{
        type:String,
        default:""
    },
    language_require:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"language_required"
    }],
    introduction:{
        type:String,
        required:true
    },

     university_video:{
        type:String,
        default:""
     },

    galary:
        [{
            type:mongoose.Schema.Types.ObjectId,
             ref:"galary"
        }]
     ,
    country:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"country",
        required:true
    },
    accreditation:{
        type:String,
        default:"NA"
        
    },
    university_type:{
        type:String,
        default:"NA"
    },
    year_of_establishment:{
        type:Number,
        default:"NA"
    },
    course_duration:{
        type:String,
        default:"NA"
    },
    mci_passing_rate:{
        type:String,
        default:"NA"
    },
    who_listed:{
        type:String,
        default:"NA"
    },
    fee_per_year:{
        type:Number,
        default:"NA"
    },
    total_fee:{
        type:Number,
        default:0
    },
    world_rank:{
        type:String,
        default:"NA"
    },
    city_population:{
        type:String,
        default:"NA"
    },
    indian_food:{
        type:String,
        default:"NA"
    },
    safty_index:{
        type:String,
        default:"NA"
    },
    hostel:{
        type:String,
        default:""
    },
    medium:{
        type:String,
        default:"NA"
    },
    living_cost:{
        type:String,
        default:"NA"
    },
    flight_time:{
        type:String,
        default:"NA"
    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        

    }],
    region:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"region",
        required:true
    },
    eligibilty:{
        type:String,
        default:"NA"
    },
    fee_structure:{
        type:String,
        required:true
    
    },
    rating:{
        type:Number,
        default:0
    },
    scholarship:{
        type:String,
        default:""
    },
    brouchre:{
        type:String,
        default:""
    },
    alumni:{
        type:String,
        default:""
    },
    placement:{
        type:String,
        default:""
    },
    important_notes:{
        type:String,
        default:""
    },
    awards:{
        type:String,
        default:""
    },
    fee_type:{
        type:String,
        default:"NA"
     },
     status:{
        type:Boolean,
        default:true
     }

    



},{
    timestamps:true
})





const universityModel = mongoose.model("university",UniversitySchema)
export default universityModel