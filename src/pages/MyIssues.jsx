import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
import useFetch from "../hooks/useFetch";

const MyIssues = () => {
  const { user } = useAuth();

  const endpoint = user?.email ? `/my-issues?email=${user.email}` : null;
  const { data: myIssues, loading } = useFetch(endpoint);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-base-200 p-4 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Reported Issues
        </h2>

        {myIssues.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {myIssues.map((issue) => (
                  <tr key={issue._id}>
                    <td>
                      <div className="font-bold">{issue.title}</div>
                    </td>
                    <td>{issue.category}</td>
                    <td>{issue.location}</td>
                    <th className="flex gap-2">
                      <button className="btn btn-ghost btn-xs">
                        <FaEdit size={16} />
                      </button>
                      <button className="btn btn-ghost btn-xs text-red-500">
                        <FaTrash size={16} />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              You have not reported any issues yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyIssues;
