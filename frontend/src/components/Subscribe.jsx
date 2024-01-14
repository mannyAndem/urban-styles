import subscribeImg from "../assets/images/subscribe-bg-img.png";

const Subscribe = () => {
  return (
    <div
      style={{ "--image-url": `url(${subscribeImg})` }}
      className="p-5 bg-[image:var(--image-url)] flex justify-center rounded-sm shadow-sm lg:p-16"
    >
      <div className="w-full text-white text-center lg:w-2/3">
        <h2 className="text-4xl font-500 mb-2 lg:text-midXl">
          Be the First to Know About Our New Releases
        </h2>
        <p className="lg:text-xl font-light">
          Amazing Products are on Their Way. Be the First To Know When We
          Release New Products.
        </p>
        <div className="flex gap-6 mt-16">
          <input
            placeholder="Enter your email"
            className="placeholder-white w-full p-3 bg-transparent border border-white rounded-sm"
          />
          <button className="text-dark font-medium p-4 bg-white rounded-sm lg:text-xl">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
