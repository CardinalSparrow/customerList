import axios from "axios";

const BASE_URL = "http://160.119.254.236:5085/api/v1";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vdGVzdC5wcmluY2Vwcy5jbG91ZC9hcGkvdjEvbG9naW4iLCJpYXQiOjE3Mjc5NjE0NDYsImV4cCI6MTcyNzk4MzA0NiwibmJmIjoxNzI3OTYxNDQ2LCJqdGkiOiJRUjE3bFZiV3RCTVAzT0FMIiwic3ViIjoiOWNmYmYyMzEtMzQyZi00ZTZjLWFjOTUtZWQ2NDRiZWVkZTIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsImVtYWlsIjoiYWJpb2R1bi5hZm9sYWJpQHByaW5jZXBzZmluYW5jZS5jb20iLCJpZCI6IjljZmJmMjMxLTM0MmYtNGU2Yy1hYzk1LWVkNjQ0YmVlZGUyMSJ9.eAHaVNAlN94H4kbyI0czTArPXX2gEEW-u9FFT_e5YOk";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Fetch customers
export const fetchCustomers = async (
  search_text = "",
  page = 1,
  page_size = 10
) => {
  try {
    const response = await axiosInstance.get("/customers", {
      params: { search_text, page, page_size },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error.response?.data || error);
    throw error;
  }
};

// fetch all customers
export const fetchAllCustomers = async () => {
  try {
    let allCustomers = [];
    let page = 1;
    let totalCustomers = 0;
    let pageSize = 50;

    do {
      const response = await axiosInstance.get("/customers", {
        params: { page, page_size: pageSize },
      });
      console.log(response.data);

      const { data, total } = response.data.data;

      allCustomers = [...allCustomers, ...data];
      totalCustomers = total || allCustomers.length;
      console.log(total);
      console.log(allCustomers.length);
      console.log(data);

      page++;
    } while (allCustomers.length < totalCustomers);

    console.log(allCustomers);
    return allCustomers;
  } catch (error) {
    console.error(
      "Error fetching all customers:",
      error.response?.data || error
    );
    throw error;
  }
};

// Create a customer
export const createCustomer = async (customerData) => {
  try {
    const response = await axiosInstance.post("/customers", customerData);
    return response.data;
  } catch (error) {
    console.error("Error creating customer:", error.response?.data || error);
    throw error;
  }
};

// Edit a customer
export const editCustomer = async (id, customerData) => {
  try {
    const response = await axiosInstance.patch(
      `/customers/${id}`,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error("Error editing customer:", error.response?.data || error);
    throw error;
  }
};

// Delete a customer
export const deleteCustomer = async (id) => {
  try {
    await axiosInstance.delete(`/customers/${id}`);
    console.log(`Customer with ID ${id} deleted.`);
  } catch (error) {
    console.error("Error deleting customer:", error.response?.data || error);
    throw error;
  }
};
