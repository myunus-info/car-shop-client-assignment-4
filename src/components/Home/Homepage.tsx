import Banner from './Banner/Banner';
import AppFooter from './Footer/Footer';
import Navbar from './Navbar/Navbar';
import FeaturedProducts from './Products/FeaturedProducts';
import Testimonials from './Testimonials/Testimonials';

const Homepage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <FeaturedProducts />
      <Testimonials />
      <AppFooter />
    </div>
  );
};

export default Homepage;
