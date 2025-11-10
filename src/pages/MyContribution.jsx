import React, { useMemo } from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";
import { FaDownload, FaThList } from "react-icons/fa";

const MyContribution = () => {
  useTitle("My Contribution");

  const { user } = useAuth();

  const endpoint = user?.email ? `/my-contributions?email=${user.email}` : null;
  const { data: myContributions, loading } = useFetch(endpoint);

  const totalAmount = useMemo(() => {
    if (!myContributions || myContributions.length === 0) return 0;
    return myContributions.reduce((sum, c) => sum + c.amount, 0);
  }, [myContributions]);

  // --- PDF Generation Function ---
  const handleDownloadReport = (contribution) => {
    const doc = new jsPDF();

    // --- Document Header ---
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("CivicClean", 105, 20, null, null, "center");
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.text("Contribution Receipt", 105, 30, null, null, "center");

    // --- Billed To Info ---
    doc.setFontSize(12);
    doc.text("Billed To:", 14, 50);
    doc.setFont("helvetica", "bold");
    doc.text(contribution.name, 14, 56);
    doc.setFont("helvetica", "normal");
    doc.text(contribution.email, 14, 62);
    doc.text(contribution.address, 14, 68);

    // --- Table using the autoTable plugin ---
    autoTable(doc, {
      startY: 80,
      head: [["Description", "Details"]],
      body: [
        ["Issue Title", contribution.issueTitle],
        ["Category", contribution.category],
        ["Contribution Amount", `$${contribution.amount.toFixed(2)}`],
        ["Transaction Date", new Date(contribution.date).toLocaleString()],
      ],
      theme: "striped",
      headStyles: { fillColor: [38, 101, 242] },
    });

    // --- Footer ---
    const finalY = doc.lastAutoTable.finalY;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      "Thank you for your contribution! Your support helps keep our community clean.",
      105,
      finalY + 20,
      null,
      null,
      "center"
    );

    // --- Save the PDF ---
    doc.save(`CivicClean-Receipt-${contribution._id}.pdf`);
  };

  if (loading) return <Loader message="Loading your contributions..." />;

  return (
    <div className="bg-base-200 p-4 py-16 md:p-10 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gradient">
            My Contribution History
          </h2>
          <p className="text-base text-base-content/70 mt-2">
            A record of all the contributions you've made to help the community.
          </p>
        </div>

        {myContributions && myContributions.length > 0 ? (
          <>
            <div className="max-w-4xl mx-auto bg-base-100 p-4 rounded-lg flex justify-between items-center mb-6 shadow-md">
              <span className="font-bold text-lg">Total Contributed:</span>
              <span className="font-black text-2xl text-gradient">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="max-w-4xl mx-auto sm:overflow-x-auto sm:bg-base-100 sm:rounded-lg sm:shadow-md">
              <table className="table w-full">
                <thead className="hidden sm:table-header-group">
                  <tr>
                    <th>Issue Title</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody className="flex flex-col gap-6 sm:table-row-group">
                  {myContributions.map((c) => (
                    <tr
                      key={c._id}
                      className="block sm:table-row bg-base-100 rounded-lg shadow-md sm:shadow-none"
                    >
                      <td className="block sm:table-cell p-4 align-middle">
                        <div className="flex justify-between items-start mb-2 sm:mb-0">
                          <div>
                            <div className="font-bold text-base-content">
                              {c.issueTitle}
                            </div>
                            <div className="text-sm text-base-content/70 sm:hidden">
                              {new Date(c.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="font-bold text-lg text-gradient sm:hidden">
                            ${c.amount}
                          </div>
                        </div>
                        <div className="text-sm text-base-content/70 hidden sm:block">
                          {new Date(c.date).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="block sm:table-cell p-4 align-middle">
                        <div className="flex justify-between items-center sm:justify-start">
                          <div className="flex items-center gap-2 sm:hidden text-base-content/60">
                            <FaThList />
                            <span className="font-semibold">Category</span>
                          </div>
                          <span>{c.category}</span>
                        </div>
                      </td>

                      <td className="hidden sm:table-cell p-4 align-middle font-bold text-lg text-gradient">
                        ${c.amount}
                      </td>

                      <td className="block sm:table-cell p-4 align-middle">
                        <button
                          onClick={() => handleDownloadReport(c)}
                          className="btn btn-gradient btn-sm w-full sm:w-auto"
                        >
                          <FaDownload />
                          <span className="sm:hidden ml-2">
                            Download Receipt
                          </span>
                          <span className="hidden sm:inline ml-2">
                            Download
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-base-100 rounded-lg shadow-md"></div>
        )}
      </div>
    </div>
  );
};

export default MyContribution;
