import React, { useState, useEffect } from "react";
import { fetchCustomers } from "../services/api";
import CustomerTable from "../components/CustomerTable";
import CreateCustomerModal from "./CreateCustomerModal";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadCustomers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText, page, pageSize]);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers(searchText, page, pageSize);
      setCustomers(data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Customer List</h2>

      {/* Search and Add Customer Section */}
      <div className="flex items-center gap-x-2 mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2  focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search customers..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Add Customer
        </button>
      </div>

      <CustomerTable customers={customers} reload={loadCustomers} />

      {/* Create Customer Modal */}
      {showModal && (
        <CreateCustomerModal
          show={showModal}
          onClose={() => setShowModal(false)}
          reload={loadCustomers}
        />
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-x-2">
          <label className="text-sm font-medium">Items per page:</label>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>

        <div className="flex items-center gap-x-2">
          <button
            className={`px-3 py-2 rounded-md ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>

          <span className="text-lg font-semibold">Page {page}</span>

          <button
            className="bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
