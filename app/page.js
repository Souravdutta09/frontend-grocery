import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./utils/GlobalApi";
import CatList from "./_components/CatList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";


export default async function Home() {

  const sliderList = await GlobalApi.getSlider();
  const catlist = await GlobalApi.getCategoryList();

  const productList = await GlobalApi.getAllProducts();

  return (
  <div className=" p-5 md:p-10 px-16 ">
    {/* slider  */}
    <Slider sliderList={sliderList}/>

    {/* {categoryList} */}
    <CatList catlist={catlist}/>

    {/* Products */}
    <ProductList productList={productList}/>
    {/* banner */}
    <Image 
    src="/banner2.jpg"
    width={1000}
    height={500}
    alt="banner"
    className="w-full h-[400px] mt-10 object-cover rounded-lg "/>

    {/* footer */}
    <Footer/>


  </div>
  );
}
