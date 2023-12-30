import Footer from "../../structure/Footer";
import Header from "../../structure/Header";
import aboutImg1 from "../../assets/images/about-img-1.jpg";
import aboutImg2 from "../../assets/images/about-img-2.jpg";
import aboutImg3 from "../../assets/images/about-img-3.jpg";
import ButtonSecondary from "../../components/ButtonSecondary";
import arrow from "../../assets/icons/arrow-right.svg";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="text-dark ">
      <section className="px-16 py-24 ">
        <h1 className=" font-medium text-midXl text-center">ABOUT US</h1>
      </section>
      <section className="px-16 py-24 grid grid-cols-2 gap-8 text-2xl font-light">
        <div className="w-full flex flex-col justify-center">
          <h2 className="text-3xl font-medium mb-16">WHO WE ARE?</h2>
          <p className="my-8">
            At Urban Styles, we're not just a fashion destination; we're a
            cultural movement. We understand that clothing isn't just something
            you wear; it's a statement, a reflection of your identity and the
            vibrant urban world you inhabit.
          </p>
          <p className="my-8">
            With a mission of democratizing fashion, Urban Styles' carefully
            curated catalogue is meant for everyone. No matter your tastes,
            preferences or budget, we're sure to have something to satisfy even
            the pickiest of shoppers.
          </p>
          <Link
            to="/products"
            className="my-16 flex gap-2 items-center text-2xl font-medium"
          >
            <span>BROWSE PRODUCTS</span>
            <img src={arrow} />
          </Link>
        </div>
        <div className="w-full overflow-hidden shadow-md rounded-md">
          <img src={aboutImg1} className="w-full object-cover" />
        </div>
      </section>
      <div className="py-24 px-16">
        <div className="overflow-hidden rounded-md shadow-md w-full">
          <img src={aboutImg2} className="w-full h-full object-cover" />
        </div>
      </div>
      <section className="px-16 my-24">
        <h2 className="text-center text-3xl font-medium mb-16">OUR PEOPLE</h2>
      </section>
    </main>
  );
};

export default About;
