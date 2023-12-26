import subscribeImg from "../assets/images/subscribe-bg-img.png";

const Subscribe = () => {
  return (
    <div
      style={{ "--image-url": `url(${subscribeImg})` }}
      className="p-16 bg-[image:var(--image-url)] flex justify-center rounded-sm shadow-sm"
    >
      <div className="w-2/3 text-white text-center">
        <h2 className="text-midXl font-500 mb-2">
          Be the First to Know About Our New Releases
        </h2>
        <p className="text-xl font-light">
          Amazing Products are on Their Way. Be the First To Know When We
          Release New Products.
        </p>
        <div className="mt-16 flex gap-6">
          <input
            placeholder="Enter your email"
            className="placeholder-white w-full p-3 bg-transparent border border-white rounded-sm"
          />
          <button className="text-dark text-xl font-medium p-4 bg-white rounded-sm">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
