import React, { useState } from "react";
import EditCustomerModal from "./EditCustomerModal";
import { deleteCustomer } from "../services/api";

const CustomerTable = ({ customers, reload }) => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleEdit = (customer) => {
    console.log("Editing customer:", customer);
    setSelectedCustomer(customer);
    setShowEditModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this customer?")) {
      return;
    }

    try {
      setDeletingId(id);
      await deleteCustomer(id);
      reload();
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert("Failed to delete customer. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone number</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Joined at</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className="border-b text-gray-800">
                  <td className="px-4 py-5 ">
                    {customer.first_name} {customer.last_name}
                  </td>
                  <td className="px-4 py-5">{customer.email}</td>
                  <td className="px-4 py-5">{customer.telephone}</td>
                  <td className="px-4 py-5">{customer.status}</td>
                  <td className="px-4 py-5">{customer.created_at}</td>
                  <td className="px-4 py-5 flex items-center space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                      onClick={() => handleEdit(customer)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition disabled:bg-red-300"
                      onClick={() => handleDelete(customer.id)}
                      disabled={deletingId === customer.id}
                    >
                      {deletingId === customer.id ? (
                        <>
                          <span className="animate-spin inline-block h-4 w-4 border-t-2 border-white border-solid rounded-full mr-2"></span>
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Show Edit Modal */}
      <EditCustomerModal
        show={showEditModal}
        customer={selectedCustomer}
        onClose={() => setShowEditModal(false)}
        refresh={reload}
      />
    </>
  );
};

export default CustomerTable;
