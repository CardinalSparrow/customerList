import React, { useState } from "react";
import { createCustomer } from "../services/api";

const CreateCustomerModal = ({ show, onClose, reload }) => {
  const [customer, setCustomer] = useState({
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
  });

  const [formData, setFormData] = useState(customer);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const formattedData = {
      firstname: customer.first_name,
      lastname: customer.last_name,
      email: customer.email,
      telephone: customer.telephone,
      bvn: customer.bvn,
      dob: customer.dob,
      residential_address: customer.residential_address,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      bankcode: customer.bankcode,
      accountnumber: customer.accountnumber,
    };

    try {
      await createCustomer(formattedData);
      reload();
      onClose();
    } catch (err) {
      setErrors(
        err.response?.data?.errors
          ? Object.values(err.response.data.errors).flat()
          : ["An error occurred."]
      );
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex justify-between items-center pb-3 border-b">
          <h5 className="text-lg font-semibold">Create Customer</h5>
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
                {field.replace("_", " ")}
              </label>
              <input
                type="text"
                name={field}
                className="w-full p-2 border rounded"
                onChange={handleChange}
                required
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
              className="w-full p-2 border rounded"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2 flex justify-end space-x-2 mt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCustomerModal;
