import React from "react";

const ContributorsSection = ({ contributors }) => {
  if (!contributors || contributors.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <div className="divider"></div>
      <h3 className="text-2xl font-bold text-center my-6">
        Community Contributors
      </h3>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Contributor</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {contributors.map((c) => (
              <tr key={c._id || c.date}>
                {" "}
                {/* Use date as a fallback key for optimistic updates */}
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={
                            c.photoURL ||
                            "https://i.ibb.co.com/wZQG7SwS/user.png"
                          }
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{c.name}</div>
                    </div>
                  </div>
                </td>
                <td className="font-bold text-lg">${c.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributorsSection;
