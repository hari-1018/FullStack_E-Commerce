import Hero from '../components/HeroSection/Hero'
import ShopByCategory from '../components/Products/ShopByCategory'
import TopProducts from '../components/Products/TopProducts'
import OfferProducts from '../components/Products/OfferProducts'

const Home = () => {
  return (
    <>
     <Hero />
     <ShopByCategory/>
     <TopProducts />
     <OfferProducts />
    </>
    
  )
}

export default Home