import React from "react";

const CategorySection = () => {
  return (
    <div className="container mx-auto my-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Issue Categories</h2>
        <p className="text-base text-gray-500 mt-2">
          Report issues across a variety of categories to help us keep our
          community clean and safe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Card 1: Garbage */}
        <div className="card bg-base-100 shadow-xl image-full">
          <figure>
            <img src="https://i.ibb.co.com/VYdCHSCW/clean.png" alt="Garbage" />
          </figure>
          <div className="card-body justify-center items-center text-center">
            <h2 className="card-title text-2xl font-bold">Garbage</h2>
          </div>
        </div>

        {/* Card 2: Illegal Construction */}
        <div className="card bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://i.ibb.co.com/VYdCHSCW/clean.png"
              alt="Illegal Construction"
            />
          </figure>
          <div className="card-body justify-center items-center text-center">
            <h2 className="card-title text-2xl font-bold">
              Illegal Construction
            </h2>
          </div>
        </div>

        {/* Card 3: Broken Public Property */}
        <div className="card bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://i.ibb.co.com/VYdCHSCW/clean.png"
              alt="Broken Public Property"
            />
          </figure>
          <div className="card-body justify-center items-center text-center">
            <h2 className="card-title text-2xl font-bold">
              Broken Public Property
            </h2>
          </div>
        </div>

        {/* Card 4: Road Damage */}
        <div className="card bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="https://i.ibb.co.com/VYdCHSCW/clean.png"
              alt="Road Damage"
            />
          </figure>
          <div className="card-body justify-center items-center text-center">
            <h2 className="card-title text-2xl font-bold">Road Damage</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
