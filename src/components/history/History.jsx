import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { useParams } from "react-router-dom";
import { Card, Table, Row, Pagination } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const History = () => {
  const [data, setData] = useState([]);
  const [itemPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const params = useParams();

  const confirmBtn = (id) => {
    Axios.post(`${API_URL}/transaction/approve-transaction/${params.userId}`, {
      id: id,
    })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const renderTransactionHistory = () => {
    const beginningIdx = (page - 1) * itemPerPage;
    // console.log(beginningIdx);
    const currentData = data.slice(beginningIdx, beginningIdx + itemPerPage);
    // console.log(currentData);

    return currentData.map((val, index) => {
      return (
        <Card className="ms-2 mb-2" style={{ width: "600px" }}>
          <Card.Header className="d-flex flex-row justify-content-between">
            <div className="kiri">Invoice Code: {val.invoice_code}</div>
            <div className="kanan">
              {val.status === "on process" ? (
                <span className="badge bg-warning">On Process Delivery</span>
              ) : null}
              {val.status === "pending" ? (
                <span className="badge bg-warning">Pending</span>
              ) : null}
              {val.status === "unpaid" ? (
                <span className="badge bg-warning">Unpaid</span>
              ) : null}
              {val.status === "rejected" ? (
                <span className="badge bg-danger">Rejected</span>
              ) : null}
              {val.status === "completed" ? (
                <span className="badge bg-success">Completed</span>
              ) : null}
            </div>
          </Card.Header>
          <Card.Header className="d-flex flex-row justify-content-between">
            <div className="kiri">
              Date: {new Date(val.createdAt).toLocaleDateString("id-ID")}
            </div>
            <div className="kanan">
              Time:{" "}
              {new Date(val.createdAt).toLocaleTimeString("id-ID").slice(0, 5)}
            </div>
          </Card.Header>
          <Card.Body>
            <Table striped bordered>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>

              <tbody>
                {val.invoice_details?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={`${API_URL}/${item.product.image}`}
                          style={{
                            objectFit: "contain",
                            height: "50px",
                            width: "50px",
                          }}
                          alt=""
                        />
                      </td>
                      <td>{item.product.name}</td>
                      <td>{item.qty}</td>
                      <td>Rp. {item.price.toLocaleString("id-ID")}</td>
                      <td>
                        Rp. {(item.qty * item.price).toLocaleString("id-ID")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <div className="footerAtas d-flex flex-row justify-content-around">
              <Row>
                Shipping Price: Rp.{" "}
                {data[0].shipping_price.toLocaleString("id-ID")}
              </Row>
              <Row>
                Sub Total: Rp. {data[index].total_price.toLocaleString("id-ID")}
              </Row>
            </div>
            <div className="footerBawah mt-3 d-flex flex-row justify-content-center">
              {val.status === "on process" ? (
                <Button variant="success" onClick={() => confirmBtn(val.id)}>
                  Confirm Arrived
                </Button>
              ) : null}
            </div>
          </Card.Footer>
        </Card>
      );
    });
  };

  const prevPageBtn = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPageBtn = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    const fetchTransactionHistory = () => {
      Axios.get(`${API_URL}/users/get-transaction-history/${params.userId}`)
        .then((res) => {
          setData(res.data);
          // console.log(res.data.length);
          setMaxPage(Math.ceil(res.data.length / itemPerPage));
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchTransactionHistory();
  }, [itemPerPage, params.userId, data]);

  return (
    <div>
      {renderTransactionHistory()}
      <Card
        style={{ width: "600px", height: "65px" }}
        className="ms-2 mb-2 align-items-center"
      >
        <Card.Body>
          <Pagination>
            <Pagination.Prev onClick={() => prevPageBtn()} />
            <div className="mx-3">
              Page {page} of {maxPage}
            </div>
            <Pagination.Next onClick={() => nextPageBtn()} />
          </Pagination>
        </Card.Body>
      </Card>
    </div>
  );
};

export default History;
