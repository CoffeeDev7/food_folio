import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);



  const fetchProductDetails = async () => {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();
    setProduct(data.product);
  };

  useEffect(() => {
    fetchProductDetails();
  }, [fetchProductDetails]);

  return (
    <div className="detail-page">
      {product ? (
        <>
          <img src={product.image_url || "placeholder.jpg"} alt={product.product_name} />
          <h1>{product.product_name}</h1>
          <p>Ingredients: {product.ingredients_text || "N/A"}</p>
          <p>Nutrition Grades: {product.nutrition_grades || "N/A"}</p>
          <p>Energy: {product.nutriments?.energy || "N/A"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailPage;
