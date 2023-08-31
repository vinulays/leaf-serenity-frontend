import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllPlants } from "../../features/plants/plantsActions";

const PlantList = () => {
  const dispatch = useDispatch();
  const { plants, status } = useSelector((state) => state.plants);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getAllPlants());
    }
  }, [status, dispatch]);

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {plants.map((plant) => (
            <NavLink
              key={plant._id}
              className="group relative"
              to={`/plants/${plant._id}`}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={plant.image}
                  alt="plant"
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-[#F2E3DB]">
                    <span>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {plant.name}
                    </span>
                  </h3>
                  {/* <p className="mt-1 text-sm text-gray-400">{product.color}</p> */}
                </div>
                <p className="text-sm font-medium text-[#F2E3DB]">
                  $ {plant.price.toFixed(2)}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlantList;
