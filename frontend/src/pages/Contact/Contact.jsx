import Footer from "../../structure/Footer";
import Header from "../../structure/Header";
import Accordion from "./components/Accordion";
import Form from "./components/Form";

const Contact = () => {
  return (
    <div className="text-dark">
      <section className="grid grid-cols-2 py-32 px-24">
        <div className="w-full">
          <h1 className="text-midXl">Get in Touch</h1>
          <span className="block text-xl">
            Have questions? Let's answer them!
          </span>
          <div className="mt-8">
            <Form />
          </div>
        </div>
        <div className="w-full"></div>
      </section>
      <section className="py-24 px-16">
        <h2 className="text-midXl text-center">FAQs</h2>
        <span className="block text-xl text-center">
          Questions You Might Want To Ask
        </span>
        <div className="mt-16">
          <Accordion />
        </div>
      </section>
    </div>
  );
};

export default Contact;
