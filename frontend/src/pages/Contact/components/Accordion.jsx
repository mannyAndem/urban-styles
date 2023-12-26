import { useState } from "react";
import arrowDown from "../../../assets/icons/arrow-down-icon.png";

const Accordion = () => {
  // The questions in the accordion
  const faqs = [
    {
      id: 1,
      question: "How do I place an order?",
      answer:
        "Placing an order is as easy as adding your desired items to cart and completing our seamless checkout process.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept a variety of payment options. Credit card, debit card, Paypal and even crypto!",
    },
    {
      id: 3,
      question: "Can I track my order?",
      answer: "Yes, you can track the state of your orders on Urban Styles. ",
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer:
        "We understand that sometimes, things may not always work according to plan. While we strive to provide quality wears at affordable prices, if something doesn't feel right, fill our online return form and we'll come pick it right up provided there is no damage to the merchandise.",
    },
    {
      id: 5,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we do offer international shipping, details on pricing can be found during checkout.",
    },
    {
      id: 6,
      question: "How do I contact customer support?",
      answer:
        "If you need to get in touch with customer support, please fill the contact form above and a rep will get back to you ASAP.",
    },
    {
      id: 7,
      question: "Do you offer discounts or promotions?",
      answer:
        "Urban Styles regularly offers discounts and promotions to our customers. Subscribe to our email list so you don't miss out on future promotions.",
    },
    {
      id: 8,
      question: "What should I do if I receive a defective item?",
      answer:
        "In the super rare case that you do receive a defective item from us, please fill the contact form above and a rep will get back to you on next steps.",
    },
    {
      id: 9,
      question: "How do I stay informed on new arrivals and updates?",
      answer:
        "Join our mailing list to stay informed about the latest arrivals, discounts and promotions on Urban Styles.",
    },
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleActiveFaq = (id) => {
    if (id === activeFaq) {
      setActiveFaq(null);
      return;
    }

    setActiveFaq(id);
  };

  return (
    <ul className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <AccordionItem
          faq={faq}
          isActive={activeFaq === faq.id}
          toggleActiveFaq={toggleActiveFaq}
        />
      ))}
    </ul>
  );
};

export default Accordion;

// The accordion item, responsible for displaying each individual accordion item
const AccordionItem = ({ faq, isActive, toggleActiveFaq }) => {
  return (
    <li className="px-3 py-4 border-b border-lightGray">
      <div className="flex gap-8 items-center">
        <span className="text-2xl font-bold">{faq.id}.</span>
        <div className="w-full flex items-center justify-between">
          <span className="text-xl">{faq.question}</span>
          <button onClick={() => toggleActiveFaq(faq.id)}>
            <img
              src={arrowDown}
              alt=""
              className={`${
                isActive ? "transform rotate-180" : ""
              } transition duration-300 ese-out`}
            />
          </button>
        </div>
      </div>
      <div className={`${isActive ? "block" : "hidden"} p-2 pl-14`}>
        <p className="text-xl">{faq.answer}</p>
      </div>
    </li>
  );
};
