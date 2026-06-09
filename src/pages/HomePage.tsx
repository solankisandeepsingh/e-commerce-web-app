import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ShoppingCart } from "lucide-react";
import { Product, useCart } from "../context/CartContext";
import useApiCall from "../customhook/useApiCall";
import useDebounce from "../utlis/useDebounce";

export default function HomePage() {
  const { addToCart } = useCart();

  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState<string>(
    searchParams.get("search") || ""
  );

  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sort") || ""
  );

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const debouncedSearch = useDebounce<string>(search, 500);

  const apiUrl = debouncedSearch
    ? `https://api.escuelajs.co/api/v1/products/?title=${debouncedSearch}`
    : "https://api.escuelajs.co/api/v1/products";

  const {
    data: products = [],
    loading,
    error,
  } = useApiCall<Product[]>(apiUrl, []);



const categories = Array.from(
  new Set(
    products
      .map((product) => product.category?.name)
      .filter((name): name is string => Boolean(name))
  )
);


const filteredProducts = products.filter((product) => {
  const matchesCategory =
    selectedCategory === "" ||
    product.category?.name === selectedCategory;

  return matchesCategory;
});
  const updateQueryParams = (searchValue: string, sortValue: string, categoryValue: string) => {
    const params: Record<string, string> = {};

    if (searchValue) {
      params.search = searchValue;
    }

    if (sortValue) {
      params.sort = sortValue;
    }
    if (categoryValue) {
      params.category = categoryValue;
    }

    setSearchParams(params);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    updateQueryParams(value, sortBy,selectedCategory);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    updateQueryParams(search, value,selectedCategory);
  };

 const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortBy === "price_asc") {
    return a.price - b.price;
  }

  if (sortBy === "price_desc") {
    return b.price - a.price;
  }

  return 0;
});

 const handleCategoryClick = (
  category: string
) => {
  const updatedCategory =
    selectedCategory === category
      ? ""
      : category;

  setSelectedCategory(updatedCategory);

  updateQueryParams(
    search,
    sortBy,
    updatedCategory
  );
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Loading products...
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

  return (
    <div>
      <div className="mb-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Our Products
          </h1>

          <p className="text-gray-600 text-sm sm:text-base">
            Discover our amazing collection of products
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative w-full lg:w-[400px]">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) =>
              handleSort(e.target.value)
            }
            className="h-12 px-4 border border-gray-200 rounded-xl"
          >
            <option value="">Sort By</option>
            <option value="price_asc">
              Price Low To High
            </option>
            <option value="price_desc">
              Price High To Low
            </option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
  <button
    onClick={() => handleCategoryClick("")}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      selectedCategory === ""
        ? "bg-blue-600 text-white shadow-md"
        : "bg-gray-100 text-gray-700 hover:bg-blue-50"
    }`}
  >
    All
  </button>

  {categories.map((category) => (
    <button
      key={category}
      onClick={() => handleCategoryClick(category as string)}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        selectedCategory === category
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-100 text-gray-700 hover:bg-blue-50"
      }`}
    >
      {category}
    </button>
  ))}
</div>

      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {!loading && sortedProducts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-20">
            <Search
              size={60}
              className="text-gray-300 mb-4"
            />

            <h2 className="text-3xl font-bold text-gray-700">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2 text-center">
              No results found for "{search}"
            </p>

            <button
              onClick={() => handleSearch("")}
              className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear Search
            </button>
          </div>
        ) : (
          sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                to={`/product/${product.id}/details`}
                className="block relative overflow-hidden bg-gray-100 h-48"
              >
                <img
                 src={product.images?.[0] || "/defaultImage.jpg"}
                   onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                     e.currentTarget.onerror = null;
                     e.currentTarget.src = "/defaultImage.jpg";
                  }}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </Link>

              <div className="p-4">
                <Link
                  to={`/product/${product.id}/details`}
                  className="block mb-2"
                >
                  <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <p className="text-lg font-bold text-red-600">
                    ${product.price}
                  </p>

                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    In Stock
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}