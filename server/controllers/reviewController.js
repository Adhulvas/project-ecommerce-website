import { Product } from "../models/productModel.js";
import { User } from "../models/userModel.js";

export const addReview = async(req, res)=> {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; 
    const user = await User.findById(userId);
    console.log(user)
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

    const review = {
      user: userId,
      name: user.name,
      rating: Number(rating),
      comment
    };
    console.log(review)
    product.reviews.push(review)

    product.ratings = (product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length).toFixed(1)

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


export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user.id

    const product = await Product.findOne({ "reviews._id": reviewId })

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === reviewId && review.user.toString() === userId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found or not authorized to delete" })
    }

    product.reviews.splice(reviewIndex, 1);

    product.totalReviews = product.reviews.length
    product.ratings = 
    product.reviews.length > 0 ? product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length : 0

    await product.save();

    res.status(200).json({
      message: "Review deleted successfully",
      reviews: product.reviews,
      averageRating: product.ratings,
      totalReviews: product.totalReviews,
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to delete review" })
  }
}


