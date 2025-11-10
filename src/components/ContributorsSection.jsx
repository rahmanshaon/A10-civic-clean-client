import React from "react";

const ContributorsSection = ({ contributors, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[15vh]">
        <span className="loading loading-bars loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (!contributors || contributors.length === 0) {
    return (
      <div className="text-center mt-12">
        <div className="divider"></div>
        <h3 className="text-2xl font-bold my-6">Community Contributors</h3>
        <p className="text-base-content/70">
          No contributions have been made for this issue yet. Be the first to
          help!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <div className="divider"></div>
      <h3 className="text-2xl font-bold text-center my-6">
        Community Contributors
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributors.map((c) => (
          <div
            key={c._id || c.date}
            className="bg-base-100 p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            <div className="avatar">
              <div className="w-14 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                <img
                  src={c.photoURL || "https://i.ibb.co.com/wZQG7SwS/user.png"}
                  alt="Avatar"
                />
              </div>
            </div>
            <div>
              <div className="font-bold text-base-content">{c.name}</div>
              <p className="text-lg font-semibold text-accent">${c.amount}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContributorsSection;
