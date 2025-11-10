import React, { useMemo } from "react";

const ContributorsSection = ({ contributors, isLoading }) => {
  const totalAmount = useMemo(() => {
    if (!contributors || contributors.length === 0) {
      return 0;
    }
    return contributors.reduce(
      (sum, contributor) => sum + contributor.amount,
      0
    );
  }, [contributors]);

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

      <div className="bg-base-200 p-4 rounded-lg flex justify-between items-center mb-6 shadow-md">
        <span className="font-bold text-lg">Total Contributions:</span>
        <span className="font-black text-2xl text-gradient">
          ${totalAmount.toFixed(2)}
        </span>
      </div>

      <div className="sm:bg-base-100 sm:rounded-lg sm:shadow-md">
        <table className="table w-full">
          <thead className="hidden sm:table-header-group">
            <tr>
              <th>Contributor</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>

          <tbody className="flex flex-col gap-4 sm:table-row-group">
            {contributors.map((c) => (
              <tr
                key={c._id || c.date}
                className="block sm:table-row bg-base-100 rounded-lg shadow-md sm:shadow-none"
              >
                <td className="block sm:table-cell p-4 align-middle">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
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
                        <div className="font-bold text-base-content">
                          {c.name}
                        </div>
                      </div>
                    </div>

                    <p className="font-bold text-lg text-gradient sm:hidden">
                      ${c.amount}
                    </p>
                  </div>
                </td>

                <td className="hidden sm:table-cell font-bold text-lg text-gradient p-4 align-middle text-right">
                  ${c.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContributorsSection;
