import React, { useState, useEffect } from "react";
import { editCustomer } from "../services/api";

const EditCustomerModal = ({ show, onClose, refresh, customer }) => {
  const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    telephone: "",
    bvn: "",
    dob: "",
    residential_address: "",
    city: "",
    state: "",
    country: "",
    bankcode: "",
    accountnumber: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (customer) {
      setFormData({
        ...initialFormData,
        ...customer,
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formattedData = {
      firstname: formData.first_name,
      lastname: formData.last_name,
      email: formData.email,
      telephone: formData.telephone,
      bvn: formData.bvn,
      dob: formData.dob,
      residential_address: formData.residential_address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      bankcode: formData.bankcode,
      accountnumber: formData.accountnumber,
    };

    try {
      await editCustomer(customer.id, formattedData);
      refresh();
      onClose();
    } catch (err) {
      console.error("Edit Error:", err);
      setErrors(
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat()
          : [err.message || "An unexpected error occurred. Please try again."]
      );
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center pb-3 border-b">
          <h5 className="text-lg font-semibold">Edit Customer</h5>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-2 rounded mt-3 text-sm">
            <ul className="list-disc pl-4">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-3">
          {[
            "first_name",
            "last_name",
            "email",
            "telephone",
            "bvn",
            "residential_address",
            "city",
            "state",
            "country",
            "bankcode",
            "accountnumber",
          ].map((field) => (
            <div key={field} className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field.replace(/_/g, " ")}
              </label>
              <input
                type={
                  ["bvn", "accountnumber"].includes(field) ? "number" : "text"
                }
                name={field}
                value={formData[field] || ""}
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
          ))}

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob || ""}
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </div>

          <div className="col-span-2 flex justify-end space-x-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;
