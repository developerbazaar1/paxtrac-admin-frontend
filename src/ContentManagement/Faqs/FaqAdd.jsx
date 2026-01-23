import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";

const FaqAdd = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCreate = () => {
    if (!question || !answer) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    Swal.fire("Success", "FAQ created successfully", "success")
      .then(() => navigate(-1));
  };

  return (
    <main className="app-content body-bg">
      <section className="container">
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="title-heading mb-2">FAQ Add</div>
            <p className="title-sub-heading">
              Monitor and manage registered Property
            </p>
          </div> 
        </div>
      <div className="custom-card bg-white p-4">
        <h5>Add FAQ</h5>

        <input
          className="form-control mb-3"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
          value={answer}
          onEditorChange={setAnswer}
          init={{ height: 250, menubar: false }}
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

export default FaqAdd;
