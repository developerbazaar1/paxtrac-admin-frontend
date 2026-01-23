import React, { useState } from "react";  
import VlogsList from "./Vlogs/VlogsList";
import BlogList from "./Blogs/BlogsList"
import FaqsList from "./Faqs/FaqsList";
import Breadcrumbs from "../Components/Breadcrumbs";

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("blogs");

  return (
    <main className="app-content body-bg">
      <section className="container">
        <div className="mb-3">
          <div className="title-heading">Content Management</div>
          <p className="title-sub-heading">
            Manage Blogs, Vlogs and FAQs
          </p>
        </div>

        <Breadcrumbs />

        {/* Tabs */}
        <ul className="nav nav-tabs mb-3">
          {["blogs", "vlogs", "faqs"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>

        {/* Tab Content */}
        {activeTab === "blogs" && <BlogList />}
        {activeTab === "vlogs" && <VlogsList />}
        {activeTab === "faqs" && <FaqsList />}
      </section>
    </main>
  );
};

export default ContentManagement;
