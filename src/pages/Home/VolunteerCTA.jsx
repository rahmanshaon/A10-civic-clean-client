import React from "react";

const VolunteerCTA = () => {
  return (
    <div className="mx-4">
      <div
        className="container mx-auto relative mt-12 bg-cover bg-center rounded-xl overflow-hidden px-6 py-12 sm:py-16 md:py-20"
        style={{
          backgroundImage: "url('https://i.ibb.co/VYdCHSCW/clean.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative text-center text-neutral-content">
          <div className="max-w-lg mx-auto">
            <h1 className="mb-5 text-3xl sm:text-4xl font-bold">
              Become a Community Hero
            </h1>
            <p className="mb-6 text-base sm:text-lg">
              Ready to make a tangible difference? Join a local cleanup drive,
              organize your own, and be the change you want to see in your
              neighborhood.
            </p>
            <button className="btn btn-gradient border-none px-8">
              Join a Clean Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerCTA;
