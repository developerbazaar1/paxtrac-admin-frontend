import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2"; 
import Breadcrumbs from "../../Components/Breadcrumbs";

const BlogAdd = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = () => {
    if (!title || !content) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    Swal.fire("Success", "Blog created successfully", "success").then(() =>
      navigate(-1),
    );
  };

  return (
    <main className="app-content body-bg">
      <section className="container">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="title-heading mb-2">Blog Management</div>
            <p className="title-sub-heading">
              Monitor and manage registered Property
            </p>
          </div>
        </div>

      <Breadcrumbs />

        <div className="custom-card bg-white p-4">
          <h5>Add Blog</h5>

          <input
            className="form-control mb-3"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="mb-3">
            <label className="mb-1 fw-semibold">Blog Image</label>
            <div
              className="border rounded p-3 text-center"
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("imageUpload").click()}
            >
              {preview ? (
                <img src={preview} alt="preview" style={{ maxHeight: 150 }} />
              ) : (
                <p className="text-muted mb-0">Click to upload blog image</p>
              )}
            </div>
            <input
              type="file"
              id="imageUpload"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={content}
            onEditorChange={setContent}
            init={{ height: 300, menubar: false }}
          />

          <div className="d-flex gap-3 mt-3">
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

export default BlogAdd;
