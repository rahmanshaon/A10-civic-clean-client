import React from "react";

const CategorySection = () => {
  const categories = [
    {
      name: "Garbage",
      image: "https://i.ibb.co.com/gLsTn6Fs/c1.png",
      aosDelay: "0",
    },
    {
      name: "Illegal Construction",
      image: "https://i.ibb.co.com/wZmstGNr/c2.png",
      aosDelay: "150",
    },
    {
      name: "Broken Public Property",
      image: "https://i.ibb.co.com/nqFGkqPZ/c3.png",
      aosDelay: "300",
    },
    {
      name: "Road Damage",
      image: "https://i.ibb.co.com/TxvDVCRs/c4.png",
      aosDelay: "450",
    },
  ];

  return (
      <div className="bg-base-200 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gradient">
            Issue Categories
          </h2>
          <p className="text-base text-base-content text-opacity-70 mt-2 max-w-2xl mx-auto">
            Report issues across a variety of categories to help us keep our
            community clean and safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              data-aos="fade-up"
              data-aos-delay={category.aosDelay}
              className="card bg-base-100 shadow-xl image-full group overflow-hidden"
            >
              <figure>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </figure>
              <div className="card-body justify-center items-center text-center transition-colors duration-300 group-hover:bg-black/25">
                <h2 className="card-title text-2xl font-bold">
                  {category.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
