import React from 'react';

const ProductRow = (props) => {
  const { imageUrl, productName, productDescription, productPrice } = props;

  return (
    <div className="row product">
      <div className="col-md-2">
        <img src={imageUrl} alt={productName} height="150" />
      </div>
      <div className="col-md-8 product-detail">
        <h4>{productName}</h4>
        <p>{productDescription}</p>
      </div>
      <div className="col-md-2 product-price">
        {productPrice}
      </div>
    </div>
  );
}

export default ProductRow;
