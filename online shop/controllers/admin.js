const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description

  })
  .then(result => {
    res.redirect('/products');
  })
  .catch(err =>{
    console.log(err);
  });
  
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
  .then(product => {
     product.id = prodId,
    product.title = updatedTitle,
    product.price = updatedPrice,
    product.imageUrl =updatedImageUrl,
    product.description = updatedDesc
    return product.save();
  })
   

  
  .then(result => {
    res.redirect('/admin/products');  })
  .catch(err =>{
    console.log(err);
  });
  
  
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(product =>{
    res.render('admin/products', {
      prods: product,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err =>{
    console.log(err);
  })
};
 
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/admin/products'); // or handle the error
    }

    return product.destroy(); // Delete the product
  })
  .then(() => {
    res.redirect('/admin/products'); // Redirect after deletion
  })
  .catch(err => {
    console.log(err);
  });
};
