import React from "react";
import Sidebar from "../components/Sidebar";
import Details from "./Details";
import Header from "../components/Header";
import CustomerList from "../components/CustomerList";

const Dashboard = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Header />
      <main>
        <div className="pl-56">
          <Details />
          <CustomerList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
