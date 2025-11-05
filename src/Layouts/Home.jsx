import React from 'react'
import Navbar from '../components/Navbar'
import ImageCarousel from '../components/ImageCarousel'
import Allproducts from '../components/Allproducts'
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import LatestProducts from '../components/LatestProducts'



export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <ImageCarousel/>

      <main>
        <Allproducts></Allproducts>
        <Toaster position='top-right'></Toaster>
        <LatestProducts></LatestProducts>
        <Footer></Footer>
      </main>
    </div>
  )
}
