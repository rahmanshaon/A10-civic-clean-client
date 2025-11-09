import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useFetch from "../hooks/useFetch";

const MyContribution = () => {
  const { user } = useAuth();

  const endpoint = user?.email ? `/my-contributions?email=${user.email}` : null;
  const { data: myContributions, loading } = useFetch(endpoint);

  // --- PDF Generation Function ---
  const handleDownloadReport = (contribution) => {
    console.log("Generating PDF for:", contribution);

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
    doc.save(`CleanCommunity-Receipt-${contribution._id}.pdf`);
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-base-200 p-4 md:p-10 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">
          My Contribution History
        </h2>

        {myContributions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Issue Title</th>
                  <th>Category</th>
                  <th>Paid Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myContributions.map((c) => (
                  <tr key={c._id}>
                    <td>
                      <div className="font-bold">{c.issueTitle}</div>
                    </td>
                    <td>{c.category}</td>
                    <td>${c.amount}</td>
                    <td>{new Date(c.date).toLocaleDateString()}</td>
                    <th>
                      <button
                        onClick={() => handleDownloadReport(c)}
                        className="btn btn-gradient btn-xs"
                      >
                        Download Report
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
              You have not made any contributions yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContribution;
