import React from 'react'
import { FaStar } from 'react-icons/fa'
import { FaRegStarHalfStroke } from 'react-icons/fa6'
import { useNavigate } from "react-router-dom";

const ProductCard = ({product}) => {
  const navigate = useNavigate();
  return (
    <div className='font-mon transition-transform duration-300 hover:scale-105 border border-[#E5E7EB] rounded-2xl bg-[#ffffff]'
    onClick={() => navigate("/checkout", { state: { product } })}
    >
     <img src={product.product_picture} alt={product.title}
     className=' mx-auto object-cover rounded-lg'
     />
     <div className='flex p-2'>
        <div>
            <h3 className='text-[#21214c] font-mon'>
                {product.title}
            </h3>
            <div className='flex text-[#f6a355]'><FaStar/> <FaStar/> <FaStar/> <FaStar/> <FaRegStarHalfStroke/></div>
            <p className='flex gap-2 mb-3'><div className='line-through'>{product.oldprice}</div> <strong>{product.newprice}</strong>  BDT</p>
        </div>
     </div>
    </div>
  )
}

export default ProductCard
