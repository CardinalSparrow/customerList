import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CustomerList from "../components/CustomerList";

const Dashboard = () => {
  return (
    <div>
      <Sidebar />
      <Header />
      <main>
        <div className="pl-56">
          <CustomerList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
