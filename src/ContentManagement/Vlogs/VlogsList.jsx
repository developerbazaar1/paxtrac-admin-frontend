import React, { useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CustomPagination from "../../Components/CustomPagination";
import NoData from "../../Components/NoData";

const VlogsList = () => {
  const navigate = useNavigate();

  const demoVlogs = [
    {
      id: 1,
      title: "Intro Vlog",
      videoLink: "https://youtube.com/watch?v=abc",
      updatedAt: new Date(),
    },
  ];

  const [allData, setAllData] = useState(demoVlogs);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState({ page: 1, limit: 10 });

  /* PAGINATION VALUES */
  const totalCount = allData.length;
  const totalPages = Math.ceil(totalCount / query.limit);
  const currentPage = query.page;
  const pageSize = query.limit;

  /* SEARCH + PAGINATION */
  useEffect(() => {
    let filtered = [...demoVlogs];

    if (searchInput) {
      filtered = filtered.filter((v) =>
        v.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setAllData(filtered);

    const start = (query.page - 1) * query.limit;
    const end = start + query.limit;
    setRowData(filtered.slice(start, end));
  }, [searchInput, query]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Vlog?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) {
        setAllData((prev) => prev.filter((v) => v.id !== id));
        Swal.fire("Deleted!", "Vlog deleted successfully.", "success");
      }
    });
  };

  const columnDefs = useMemo(
    () => [
      {
        headerName: "S.No",
        width: 80,
        valueGetter: (p) =>
          p.node.rowIndex + 1 + (currentPage - 1) * pageSize,
      },
      {
        headerName: "Title",
        field: "title",
        flex: 2,
      },
      {
        headerName: "Updated At",
        flex: 1,
        valueGetter: (p) =>
          new Date(p.data.updatedAt).toLocaleString(),
      },
      {
        headerName: "Action",
        width: 140,
        cellRenderer: (params) => (
          <div className="d-flex gap-2">
            <button
              className="border-0 bg-transparent"
              onClick={() =>
                navigate("/content-management/vlogs/view", {
                  state: params.data,
                })
              }
            >
              <Eye size={18} />
            </button>
            |
            <button
              className="border-0 bg-transparent text-danger"
              onClick={() => handleDelete(params.data.id)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    [currentPage, pageSize]
  );

  return (
    <div className="custom-card bg-white p-3">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Vlogs</h5> 
        <button
          className="primary-button"
          onClick={() => navigate("/content-management/vlogs/add")}
        >
          Add Vlog
        </button>
      </div>

      {/* SEARCH */}
      <input
        className="form-control w-50 mb-3"
        placeholder="Search vlog by title..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      {/* TABLE */}
      {rowData.length === 0 ? (
        <NoData text="No vlogs found" />
      ) : (
        <>
          <div className="ag-theme-alpine">
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              headerHeight={40}
              rowHeight={48}
              getRowStyle={(params) => ({
                backgroundColor:
                  params.node.rowIndex % 2 !== 0
                    ? "#e7e0d52b"
                    : "white",
              })}
            />
          </div>

          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={(page) =>
              setQuery((p) => ({ ...p, page }))
            }
            onPageSizeChange={(size) =>
              setQuery({ page: 1, limit: size })
            }
          />
        </>
      )}
    </div>
  );
};

export default VlogsList;
