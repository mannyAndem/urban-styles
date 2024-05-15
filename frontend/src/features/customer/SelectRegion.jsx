import nigerianFlag from "../../assets/images/nigerian-flag.jpg";
import usFlag from "../../assets/images/us-flag.jpg";
import euFlag from "../../assets/images/eu-flag.jpg";
import { useGetRegionsQuery } from "../api/apiSlice";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useDispatch } from "react-redux";
import { setRegion } from "./customerSlice";

// REGION IDS with the flags they represent.

const FLAGS = [
  { id: "reg_01HKPZPB695H3NX0J6GKTGAAZW", image: nigerianFlag },
  {
    id: "reg_01HHV7SX15GK2HD72PTYNDJ957",
    image: usFlag,
  },
];

const SelectRegion = ({ isOpen }) => {
  const { isSuccess, isError, error, data, isLoading } = useGetRegionsQuery();
  const dispatch = useDispatch();

  const handleClick = (region) => {
    console.log(region);
    dispatch(setRegion(region));
  };

  return (
    <div className="fixed w-screen h-screen bg-dark bg-opacity-50 flex justify-center items-center z-40">
      <div className="bg-lightPink p-16 text-dark rounded-lg max-w-[800px] shadow-sm">
        <h2 className="text-4xl font-medium mb-8">Select your region</h2>
        <p className="text-xl">
          Please specify the region you're shopping from to see prices, products
          and shipping options relevant to you.
        </p>
        <div className="mt-16 flex gap-8">
          {isSuccess &&
            data.map((region, index) => (
              <button
                className="relative group rounded-lg overflow-hidden"
                onClick={() => handleClick(region)}
                key={index}
              >
                <img
                  src={FLAGS.find((flag) => flag.id == region.id)?.image}
                  className="h-full object-cover w-full "
                />
                <div className="group-hover:opacity-100 opacity-0 top-0 left-0 flex justify-center items-center absolute h-full w-full bg-dark bg-opacity-40 transition-all duration-300 ease-out">
                  <span className="text-lightPink font-medium">
                    {region.name}
                  </span>
                </div>
              </button>
            ))}
          {isLoading && <Loader type="md" />}
        </div>
      </div>
    </div>
  );
};

export default SelectRegion;
