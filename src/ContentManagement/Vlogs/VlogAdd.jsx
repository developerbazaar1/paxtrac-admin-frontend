import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VlogAdd = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const handleCreate = () => {
    if (!title || !videoLink) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    Swal.fire("Success", "Vlog created successfully", "success")
      .then(() => navigate(-1));
  };

  return (
    <main className="app-content body-bg">
      <section className="container">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="title-heading mb-2">Add vlog</div>
            <p className="title-sub-heading"> Add and publish video content for the platform</p>
          </div> 
        </div>
      <div className="custom-card bg-white p-4">
        <h5>Add Vlog</h5>

        <input
          className="form-control mb-3"
          placeholder="Vlog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Video Link"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
        />

        <div className="d-flex gap-3">
          <button className="button-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="primary-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </section>
    </main>
  );
};

export default VlogAdd;
