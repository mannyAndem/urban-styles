import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import blueTshirt from "../../assets/images/blue-tshirt.png";
import hero2 from "../../assets/images/hero-2.png";

const About = () => {
  return (
    <>
      <Header />
      <main className="py-24 px-16 text-dark">
        <h1 className="text-midXl text-center">About</h1>
        <section className="mt-24 flex gap-16">
          <div className="w-full rounded-md overflow-hidden shadow-sm">
            <img
              src={hero2}
              alt="Man wearing blue tshirt"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="tracking-wider self-end pr-8 border-r-2 border-dark rounded-md w-full text-2xl font-light">
            <h2 className="text-4xl font-medium mb-4">
              Not a <span className="">fashion brand</span>...
            </h2>
            <p className="my-8">
              Urban Styles isn't just a fashion brand,{" "}
              <span className="font-medium">it's a movement!</span> In the busy
              and ever-changing urban landscape, we take pride in helping the
              average urban dweller find their inner swag.
            </p>
            <p className="my-8">
              We don't sell clothes, we sell{" "}
              <span className="font-medium">personality</span>! With our diverse
              hoodies, to our jeans, tshirts and jackets, you're sure to find
              something that's just about right for you.
            </p>
          </div>
        </section>
        <section className="mt-24 flex gap-16">
          <div className="tracking-wider self-end pl-8 border-l-2 border-dark rounded-md w-full text-2xl font-light">
            <h2 className=" text-4xl font-medium mb-4">Fashion is identity!</h2>

            <p className="my-8">
              What we wear is an integral part of our{" "}
              <span className="font-medium">identity</span>, an integral part of{" "}
              <span className="font-medium">us</span>. At Urban Styles, we take
              that seriously. Our carefully curated collection is sure to help
              you make that inner{" "}
              <span className="font-medium">personality</span> shine through.
            </p>
            <p className="my-8">
              Stop buying clothes for wearing, buy clothes for sharing! Find
              wears that share your personality to the world, find wears that
              share <span className="font-medium">you</span> to the world
            </p>
          </div>
          <div className="w-full rounded-md overflow-hidden shadow-sm">
            <img
              src={blueTshirt}
              alt="Man wearing blue tshirt"
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
