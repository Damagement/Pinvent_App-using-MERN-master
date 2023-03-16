import React, { useEffect, useState } from "react";
import "./Preview.scss";
import { AiFillMinusSquare } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import "react-confirm-alert/src/react-confirm-alert.css";
import { getallProducts } from "../../../redux/features/product/productSlice";
import ProductDetail from "../productDetail/ProductDetail";
import Image from "./Image";

const Preview = ({ products }) => {
  const [search, setSearch] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  const [quantity, setQuantity] = useState(1);

  const setDecrease = () => {
    quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
  };

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async () => {
    await dispatch(getallProducts());
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, search, dispatch]);

  return (
    <div className="product-list">
      <div className="--flex-between --flex-dir-column">
        <span>
          <h3 className="text-5xl text-gray-500">Our Products</h3>
        </span>
        <span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </span>
      </div>

      {currentItems.map((product, index) => {
        const { _id, name, category, price } = product;
        return (
          <div className="flex-col">
            <p className="text-3xl text-green-500 font-mono">
              {index + 1}
              {"."}Name:{shortenText(name)}
            </p>
            <p className="ml-9 text-xl text-yellow-600 font-mono">
              Category:{category}
            </p>
            <p className="ml-9 gap-0.5 text-xl text-red-700 font-mono">
              Price:
              {"$"}{price}
            </p>
            <Image/>

            <div className="flex-col">
              <p className="text-sm font-bold text-gray-700 ml-10">
                Created on: {product.createdAt.toLocaleString("en-US")}
              </p>
              <p className="flex text-sm font-bold text-gray-700 ml-10 ">
                Last Updated: {product.updatedAt.toLocaleString("en-US")}
              </p>
            </div>
            <div className="flex font-medium  border-b border-gray-200">
              <p className="flex items-center ml-9 gap-0.5">
                Buy Now
                <button onClick={() => setDecrease}>
                  <AiFillMinusSquare size={20} className="text-red-600" />
                </button>
              </p>
            </div>
            
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Preview;
