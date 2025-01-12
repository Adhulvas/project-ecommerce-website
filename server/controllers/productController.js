import { cloudinaryInstance } from "../config/cloudinary.js"
import { Product } from "../models/productModel.js"
import { Category } from "../models/categoryModel.js";



export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryName, subcategoryName } = req.params;

    const category = await Category.findOne({
      name: categoryName,
      'subcategories.name': subcategoryName,
    });

    if (!category) {
      return res.status(404).json({ message: 'Category or Subcategory not found' });
    }

    const products = await Product.find({
      category: categoryName,
      subcategory: subcategoryName,
    })
      .populate('seller', 'name')
      .populate('subcategory', 'name');

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this subcategory' });
    }

    res.status(200).json({ message: 'Products fetched successfully', data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products', error: error.message || 'Internal server error' });
  }
}


export const getTrendingProducts = async (req, res) => {
  try {
      const trendingProducts = await Product.find({ isTrending: true });
      res.status(200).json({ message: 'Trending products fetched successfully', data: trendingProducts });
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch trending products', error });
  }
};


export const getFeaturedProducts = async (req, res) => {
  try {
      const featuredProducts = await Product.find({ isFeatured: true });
      res.status(200).json({ message: 'Trending products fetched successfully', data: featuredProducts });
  } catch (error) {
      res.status(500).json({ message: 'Failed to fetch featured products', error });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .populate('seller', 'name')
      .populate('subcategory', 'name')
      .skip(skip)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments();

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json({
      message: 'Products fetched successfully',
      data: products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch products',
      error: error.message || 'Internal server error',
    });
  }
};


export const getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.seller.id;
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit;

    const products = await Product.find({ seller: sellerId })
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .skip(skip)
      .limit(parseInt(limit)) 
      .exec();

    const totalProducts = await Product.countDocuments({ seller: sellerId });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this seller' });
    }

    res.status(200).json({
      message: 'Seller products fetched successfully',
      data: products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
      totalProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to fetch seller products',
      error: error.message || 'Internal server error',
    });
  }
};


export const getProductDetails = async(req,res)=>{
  try {
    const {productId} = req.params
    const productData = await Product.findById(productId).populate('seller','name')

    if(!productData){
      return res.status(404).json({ message:'product not found'})
    }

    res.json({message:'product details fetched', data: productData})
    
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal server error' })
  }
}


export const addNewProduct = async (req, res) => {
  try {
      const { role, id: userId } = req.seller;

      if (role !== 'seller') {
          return res.status(403).json({ message: 'Only sellers can add products' });
      }

      const { 
          name, 
          description, 
          price, 
          category, 
          subcategory, 
          sizeRequired = false,
          availableSizes,
          discount, 
          isTrending = false, 
          isFeatured = false 
      } = req.body;

      if (!name || !description || !price || !category || !subcategory) {
          return res.status(400).json({ message: 'All fields are required' });
      }


      if (sizeRequired === true && (!availableSizes || !availableSizes.length)) {
        return res.status(400).json({ message: 'Available sizes are required when size is required' });
    }

      const categoryData = await Category.findOne({ name: category });
      if (!categoryData) {
          return res.status(404).json({ message: 'Category not found' });
      }

      const subcategoryExists = categoryData.subcategories.some(
          (sub) => sub.name.toLowerCase() === subcategory.toLowerCase()
      );
      if (!subcategoryExists) {
          return res.status(404).json({ message: 'Subcategory not found' });
      }

      const imageUrls = await Promise.all(
          req.files.map(async (file) => {
              const result = await cloudinaryInstance.uploader.upload(file.path);
              return result.url;
          })
      );

      const existingProduct = await Product.findOne({ 
          name, 
          description, 
          category, 
          price, 
          images: imageUrls 
      });
      if (existingProduct) {
          return res.status(409).json({ message: 'Product already exists' });
      }

      const sizes = Array.isArray(availableSizes)
          ? availableSizes
          : availableSizes.split(',').map((size) => size.trim());

      const newProduct = new Product({
          name,
          description,
          price: parseFloat(price).toLocaleString('en-US'),
          category,
          subcategory,
          availableSizes: sizeRequired ? sizes : [],
          images: imageUrls,
          seller: userId,
          sizeRequired,
          discount,
          isTrending,
          isFeatured
      });

      await newProduct.save();

      res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add product', error });
  }
};


export const updateProduct = async (req,res)=> {
  try {
    const { role, id: userId } = req.user;
    const { productId } = req.params;
    const { name, description, price, category, subcategory, sizeRequired,availableSizes, discount } = req.body;
    console.log('Update Product Data:', req.body);

    if (sizeRequired === 'true' && (!availableSizes || availableSizes.trim() === '')) {
      return res.status(400).json({ message: 'Available sizes are required when sizeRequired is true.' });
    }

    if (sizeRequired === 'false' && availableSizes) {
      return res.status(400).json({ message: 'Please check sizeRequired if available sizes are provided.' });
    }


    if (role !== 'admin' && role !== 'seller') {
      return res.status(403).json({ message: 'Only admins or sellers can update products' });
    }

    if (price && parseFloat(price.replace(/,/g, '')) < 0) {
      return res.status(400).json({ message: 'Price cannot be negative' });
    }

    const product = await Product.findById(productId).populate('seller', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (role === 'seller' && product.seller._id.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this product' });
    }

    const updateFields = {};
    if (name) updateFields.name = name;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;
    if (category) updateFields.category = category;
    if (subcategory) updateFields.subcategory = subcategory;
    if (sizeRequired !== undefined) updateFields.sizeRequired = sizeRequired;
    if (availableSizes) {
      updateFields.availableSizes = availableSizes.split(',').map(size => size.trim());
    }
    if (discount) updateFields.discount = discount;


    if (req.files && req.files.length > 0) {
      const uploadedImageUrls = [];
      for (const file of req.files) {
          const uploadResponse = await cloudinaryInstance.uploader.upload(file.path);
          uploadedImageUrls.push(uploadResponse.url);
      }
      updateFields.images = uploadedImageUrls;
  }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updateFields },
      { new: true }).populate('seller','name');

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update product', error:error.message });
  }
}


export const deleteProduct = async (req,res)=> {
  try {
    const { role, id: userId } = req.user;
    const { productId } = req.params;

    if (role !== 'admin' && role !== 'seller') {
      return res.status(403).json({ message: 'Only admins or sellers can delete products' });
    }

    const product = await Product.findById(productId).populate('seller', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (role === 'seller' && product.seller._id.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this product' });
    }

    await product.deleteOne();

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete product', error });
  }
}


export const searchProducts = async(req,res)=>{
  try {
    const search = req.query.search || '';                        
    const query = search ? { name: new RegExp(search, 'i') } : {}; 
    const products = await Product.find(query); 
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
}