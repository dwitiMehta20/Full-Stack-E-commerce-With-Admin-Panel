/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContext.jsx"
import { assets } from "../assets/assets.js"
import Title from "../components/Title.jsx"
import ProductItem from "../components/ProductItem.jsx"


function Collection() {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [filterProducts, setFilterProducts] = useState([])
  const [sortType, setSortType] = useState('relavant')

  // for Main Category
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // If the category is already selected, remove it from the array
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // If the category is not selected, add it to the array
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  // for subCategory
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }


  // final logic for filters
  const applyFilter = () => {
    let productsCopy = products.slice();

    // query for search bar to search products:
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let filterProductsCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(filterProductsCopy.sort((a, b) => (a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(filterProductsCopy.sort((a, b) => (b.price - a.price)));
        break;

      default:
        applyFilter();
        break
    }

  }


  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch , products])

  useEffect(() => {
    sortProduct();
  }, [sortType])




  // useEffect(() => {
  //   console.log(subCategory);
  // }, [subCategory])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

      {/* filter options  */}
      <div className="min-w-60">
        {/* if true then make it false , if false then make it true */}
        <p onClick={() => (setShowFilter(!showFilter))} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          {/* for small screens */}
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} />Women
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
            </p>
          </div>
        </div>
        {/* SubCategory filter  */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
            </p>
            <p className="flex gap-2">
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side  */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* product sort */}
          <select onChange={(e) => setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavant">Sort by : Relavant </option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : Hight to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection