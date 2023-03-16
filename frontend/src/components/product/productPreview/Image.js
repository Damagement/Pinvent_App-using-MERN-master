import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getallProducts, getProduct, getProducts } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import "./Preview.scss";

const Image = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, id, dispatch]);

  return (
    <div  className="flex w-full h-full">
      {product && (
       
          <Card cardClass="group">
            <img src={product?.image.filePath} alt={product.image.fileName} />
          </Card>

      )}
    </div>
  );
};
export default Image;
