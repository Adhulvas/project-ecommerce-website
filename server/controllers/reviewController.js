import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";
import { cloudinaryInstance } from "../config/cloudinary.js"

export const addReview = async(req, res)=> {
  try {
    console.log(req.body);
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; 
    console.log(userId);
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!productId || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" })
    }


    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    const existingReview = product.reviews.find(
      (review) => review.user.toString() === userId
    );

    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" })
    }

    let imageUrls = [];
    if (req.files && req.files['images'] && req.files['images'].length > 0) {
      const uploadPromises = req.files['images'].map(async (file) => {
        try {
          const result = await cloudinaryInstance.uploader.upload(file.path);
          return result.url;
        } catch (uploadError) {
          console.error('Cloudinary upload failed:', uploadError);
          throw new Error('Failed to upload images to Cloudinary');
        }
      });
      imageUrls = await Promise.all(uploadPromises);
    }

    const review = {
      userId: userId,
      name: user.name,
      rating: String(rating),
      comment,
      images: imageUrls,
    };

    product.reviews.push(review)

    product.ratings = (product.reviews.reduce((total, review) => total + Number(review.rating), 0) / product.reviews.length).toFixed(1)

    await product.save();

    res.status(201).json({ message: "Review added successfully", reviews: product.reviews})
  } catch (error) {
    res.status(500).json({ message: "Failed to add review", error })
  }
}


export const getProductReviews = async(req, res)=> {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId).select("reviews ratings")

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    if(!product.reviews || product.reviews.length === 0){
      return res.status(200).json({
        message:"No reviews found for this product",
        reviews:[],
        averageRating: product.ratings || 0
      })
    }

    res.status(200).json({
      message: "Product reviews fetched successfully",
      reviews: product.reviews,
      averageRating: product.ratings,
    })
  } catch(error) {
    res.status(500).json({ message: "Failed to fetch product reviews" })
  }
}
