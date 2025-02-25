import React, { useState, useEffect } from "react";
import { fetchCustomers, fetchAllCustomers } from "../services/api";
import CustomerTable from "../components/CustomerTable";
import CreateCustomerModal from "./CreateCustomerModal";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]); // Store all customers for tiles
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      loadCustomers();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchText, page, pageSize]);

  useEffect(() => {
    loadAllCustomers(); // Fetch all customers for tiles
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers(searchText, page, pageSize);
      setCustomers(data.data);
    } catch (error) {
      setError(error.message);
      setCustomers([]);
    }
  };

  const loadAllCustomers = async () => {
    try {
      const data = await fetchAllCustomers();
      setAllCustomers(data);
    } catch (error) {
      setError(error.message);
      setAllCustomers([]);
    }
  };

  // Count customers by status
  const totalCustomers = allCustomers.length;
  const activeCustomers = allCustomers.filter(
    (c) => c.status.toLowerCase() === "active"
  ).length;
  const overdueCustomers = allCustomers.filter(
    (c) => c.status.toLowerCase() === "overdue"
  ).length;
  const dormantCustomers = allCustomers.filter(
    (c) => c.status.toLowerCase() === "dormant"
  ).length;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="py-3">
          <h2 className="text-blue-700 text-xl font-semibold">Customers</h2>
          <p>Create, edit, and manage your customers.</p>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Add Customer
        </button>
      </div>

      {/* Tiles for customer statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-700">All Customers</h3>
          <p className="text-2xl font-bold text-blue-600">{totalCustomers}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Active Customers
          </h3>
          <p className="text-2xl font-bold text-green-600">{activeCustomers}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Overdue Customers
          </h3>
          <p className="text-2xl font-bold text-red-600">{overdueCustomers}</p>
        </div>
        <div className="bg-white shadow-md p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Dormant Customers
          </h3>
          <p className="text-2xl font-bold text-yellow-600">
            {dormantCustomers}
          </p>
        </div>
      </div>

      {/* Search and filter */}
      <div className="flex items-center gap-x-2 mb-4 justify-between">
        <input
          type="text"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search customers"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="flex gap-3">
          <button className="bg-white border px-4 py-2 rounded-md hover:bg-gray-100 transition">
            Filter
          </button>
          <button className="bg-white border px-4 py-2 rounded-md hover:bg-gray-100 transition">
            Edit columns
          </button>
          <button className="bg-white border px-4 py-2 rounded-md hover:bg-gray-100 transition">
            Export .csv
          </button>
        </div>
      </div>

      {/* Customer Table */}
      <CustomerTable customers={customers} reload={loadCustomers} />

      {/* Create Customer Modal */}
      {showModal && (
        <CreateCustomerModal
          show={showModal}
          onClose={() => setShowModal(false)}
          reload={() => {
            loadCustomers();
            loadAllCustomers(); // Refresh stats after adding a new customer
          }}
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
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

export default CustomerList;
