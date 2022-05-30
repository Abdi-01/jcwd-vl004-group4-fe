import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../../../constants/API";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const Datatable = () => {
  const [data, setData] = useState([]);

  const fetchAllUser = () => {
    Axios.get(`${API_URL}/admin/get-all-user`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  // console.table(data);

  useEffect(() => {
    fetchAllUser();
  }, []);

  const deactivateBtn = (id) => {
    Axios.patch(`${API_URL}/admin/deactivate-user`, { id: id })
      .then((res) => {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, deactivate user",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Deactivated", "User has been deactivated", "success");
            setData(res.data.data);
          }
        });
      })
      .catch((err) => console.log(err.message));
  };

  const activateBtn = (id) => {
    Axios.patch(`${API_URL}/admin/activate-user`, { id: id })
      .then((res) => {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, activate user",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Activated", "User has been Activated", "success");
            setData(res.data.data);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 230,
    },
    {
      field: "username",
      headerName: "username",
      width: 150,
    },
    {
      field: "email",
      headerName: "email",
      width: 300,
    },
    {
      field: "phone",
      headerName: "Phone Number",
      width: 280,
    },
    {
      field: "status",
      headerName: "Email Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
    {
      field: "is_active",
      headerName: "User Status",
      width: 100,
      renderCell: (params) => {
        return <div>{params.row.is_active ? "Active" : "Inactive"}</div>;
      },
    },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {params.row.is_active ? (
              <Button
                className="butt"
                onClick={() => deactivateBtn(params.row.id)}
                variant="danger"
              >
                Deactivate
              </Button>
            ) : (
              <Button
                className="butt"
                onClick={() => activateBtn(params.row.id)}
                variant="success"
              >
                Activate
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
  );
};

export default Datatable;
