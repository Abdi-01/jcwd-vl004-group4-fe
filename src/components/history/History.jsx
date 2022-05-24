import React, { useState, useEffect } from "react";
import Axios from "axios";
import { API_URL } from "../../constants/API";
import { useParams } from "react-router-dom";
import { Card, Table, Row, Pagination } from "react-bootstrap";

const History = () => {
  const [data, setData] = useState([]);
  const [itemPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

  const params = useParams();

  console.log(data);

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
              {val.status === "paid" ? (
                <span className="badge bg-success">Approved</span>
              ) : null}
              {val.status === "pending" ? (
                <span className="badge bg-warning">Pending</span>
              ) : null}
              {val.status === "unpaid" ? (
                <span className="badge bg-danger">Unpaid</span>
              ) : null}
            </div>
          </Card.Header>
          <Card.Header className="d-flex flex-row justify-content-between">
            <div className="kiri">
              Date: {val.createdAt.slice(0, val.createdAt.length - 14)}
            </div>
            <div className="kanan">Time: {val.createdAt.slice(11, 16)}</div>
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
                      <td>{item.price.toLocaleString("id-ID")}</td>
                      <td>{(item.qty * item.price).toLocaleString("id-ID")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer className="d-flex flex-row justify-content-around">
            <Row>
              Shipping Price: {data[0].shipping_price.toLocaleString("id-ID")}
            </Row>
            <Row>
              Sub Total: {data[index].total_price.toLocaleString("id-ID")}
            </Row>
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
          console.log(res.data.length);
          setMaxPage(Math.ceil(res.data.length / itemPerPage));
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchTransactionHistory();
  }, [itemPerPage, params.userId]);

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
