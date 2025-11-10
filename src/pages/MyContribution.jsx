import React from "react";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import useFetch from "../hooks/useFetch";
import ContributionCard from "../components/ContributionCard";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myContributions.map((c) => (
              <ContributionCard
                key={c._id}
                contribution={c}
                onDownload={handleDownloadReport}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-base-100 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-base-content">
              No Contributions Yet
            </h3>
            <p className="text-base-content/70 mt-2 max-w-md mx-auto">
              When you contribute to an issue, your history will appear here,
              and you'll be able to download a receipt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContribution;
