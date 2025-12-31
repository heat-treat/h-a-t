import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
  // Determine if we use the uploaded file or the URL string
  let image_filename;
  if (req.file) {
    image_filename = `${req.file.filename}`;
  } else {
    image_filename = req.body.imageUrl; // This will be the full URL
  }

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    // Only try to delete from local storage if it's not a URL
    if (food.image && !food.image.startsWith('http')) {
      fs.unlink(`uploads/${food.image}`, () => { })
    }

    await foodModel.findByIdAndDelete(req.body.id)
    res.json({ success: true, message: "Food Removed" })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })
  }
}

export { addFood, listFood, removeFood };






















// import foodModel from "../models/foodModel.js";
// import fs from 'fs'

// const addFood = async (req, res) => {

//  let image_filename = `${req.file.filename}`;

//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
//     image: image_filename,
//   });
//   try {
//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };


// const listFood = async (req,res) => {
//     try {
//         const foods = await foodModel.find({});
//         res.json({success:true,data:foods})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})   
//     }
// }


// const removeFood = async (req,res) => {
//     try {
//         const food = await foodModel.findById(req.body.id);
//         fs.unlink(`uploads/${food.image}`, ()=>{})

//         await foodModel.findByIdAndDelete(req.body.id)
//         res.json({success:true,message:"Food Removed"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
        
//     }
// }


// export { addFood, listFood, removeFood };

















// just for testing without image, data is send on mongo or not
// import foodModel from "../models/foodModel.js";

// const addFood = async (req, res) => {
  // If file is uploaded → use it, otherwise set a default or leave empty
//   const image_filename = req.file ? req.file.filename : "default-food.jpg";  
  // ↑ You can also use null or "" if you prefer

//   const food = new foodModel({
//     name: req.body.name,
//     description: req.body.description,
//     price: req.body.price,
//     category: req.body.category,
    // image: image_filename,        // this will be "default-food.jpg" when no image
//   });

//   try {
//     await food.save();
//     res.json({ success: true, message: "Food Added" });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export { addFood };