import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomPagination from "../../Components/CustomPagination";

const FaqsList = () => {
  const navigate = useNavigate();

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How does this work?",
      answer: "<p>This works using static data.</p>",
      updatedAt: new Date(),
    },
  ]);

  const columnDefs = useMemo(
    () => [
      {
        headerName: "S.NO.",
        width: 90,
        valueGetter: (p) => p.node.rowIndex + 1,
      },
      {
        headerName: "Question",
        field: "question",
        flex: 2,
      },
      {
        headerName: "Created / Updated At",
        flex: 1,
        valueGetter: (p) => new Date(p.data.updatedAt).toLocaleString(),
      },
      {
        headerName: "Action",
        width: 120,
        cellRenderer: (params) => (
          <div className="d-flex gap-2">
            <Eye
              size={18}
              onClick={() =>
                navigate("/content-management/faqs/view", {
                  state: params.data,
                })
              }
            />
            <Trash2 size={18} onClick={() => handleDelete(params.data.id)} />
          </div>
        ),
      },
    ],
    [],
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete FAQ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        setFaqs((prev) => prev.filter((f) => f.id !== id));
      }
    });
  };

  return (
    <div className="custom-card bg-white p-3">
      <div className="d-flex justify-content-between mb-3">
        <h5>FAQs</h5>
        <button
          className="primary-button"
          onClick={() => navigate("/content-management/faqs/add")}
        >
          Add FAQ
        </button>
      </div>

      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={faqs}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          headerHeight={40}
          rowHeight={48}
          getRowStyle={(params) => ({
            backgroundColor:
              params.node.rowIndex % 2 !== 0 ? "#e7e0d52b" : "white",
          })}
        />
      </div>

      <CustomPagination />
    </div>
  );
};

export default FaqsList;
