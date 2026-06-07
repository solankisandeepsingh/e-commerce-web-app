


import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Product, useCart } from "../context/CartContext";
import { ArrowLeft, CheckCircle } from "lucide-react";
import useApiCall from "../customhook/useApiCall";

export default function ProductDetailPage(): JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    data: product,
    loading,
    error,
  } = useApiCall<Product | null>(
    `https://api.escuelajs.co/api/v1/products/${id}`,
    null
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Loading product...
          </h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
          <h2 className="text-2xl font-semibold">
            Error: {error}
          </h2>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <h2 className="text-2xl font-semibold text-gray-900">
          Product not found
        </h2>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8"
      >
        <ArrowLeft size={20} />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="flex items-center justify-center  rounded-lg overflow-hidden">
          {/* <img
            src={product.images?.[0]}
            alt={product.title}
            className="w-full h-full object-cover max-h-96"
          /> */}

           <img
                 src={product.images?.[0] || "/defaultImage.jpg"}
                   onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                     e.currentTarget.onerror = null;
                     e.currentTarget.src = "/defaultImage.jpg";
                   }}
                  alt={product.title}
                  className="w-full h-full object-cover max-h-96"                />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold text-red-600">
                ${product.price}
              </span>

              <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                In Stock
              </span>
            </div>

            <div className="flex gap-4 mb-8">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={20} />
                <span className="text-sm font-semibold">
                  30-day return policy
                </span>
              </div>

              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={20} />
                <span className="text-sm font-semibold">
                  Free shipping
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                Description
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-600 mb-1">
                  Category
                </h4>

                <p className="text-lg font-bold text-gray-900">
                  {product.category?.name}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-gray-600 mb-1">
                  Product ID
                </h4>

                <p className="text-lg font-bold text-gray-900">
                  #{product.id}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
           

            <button
                          onClick={() => addToCart(product)}

              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-6 rounded-lg"
            >
              {/* Buy Now */}
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}