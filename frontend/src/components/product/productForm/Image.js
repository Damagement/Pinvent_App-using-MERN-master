import React from 'react'
import "./ProductForm.scss"

const Image = ({
    imagePreview,
    handleImageChange
}) => {
  return (
    <div><input
    type="file"
    name="image"
    onChange={(e) => handleImageChange(e)}
  />

  {imagePreview != null ? (
    <div className="image-preview">
      <img src={imagePreview} alt="product" />
    </div>
  ) : (
    <p>No image set for this product.</p>
  )}</div>
  )
}

export default Image