import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, ButtonGroup, Form } from "react-bootstrap";
import "../assets/css/history.css";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const deposits = [
  { field: "id", headerName: "No", width: 150},
  { field: "payment_type", headerName: "Payment Method", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "refrence_no", headerName: "Transaction No", width: 150 },
  // { field: "account_no", headerName: "Account No", width: 150 },
  {
    field: "amount",
    headerName: "Amount (MMK)",
    type: "number",
    width: 150,
  },
  {
    field: "datetime",
    headerName: "Date",
    width: 180,
  },
];
const deposits_mm = [
  { field: "id", headerName: "编号", width: 150},
  { field: "payment_type", headerName: "银行", width: 150 },
  { field: "status", headerName: "地位", width: 150 },
  { field: "refrence_no", headerName: "参考号", width: 150 },
  // { field: "account_no", headerName: "Account No", width: 150 },
  {
    field: "amount",
    headerName: "数量",
    type: "number",
    width: 150,
  },
  {
    field: "datetime",
    headerName: "日期时间",
    width: 180,
  },
];

const withdraws = [
  { field: "id", headerName: "No", width: 150},
  { field: "account_name", headerName: "Account Name", width: 150 },
  { field: "account_no", headerName: "Account No", width: 150 },
  { field: "status", headerName: "Status", width: 150 },
  {
    field: "amount",
    headerName: "Amount (MMK)",
    type: "number",
    width: 150,
  },
  {
    field: "datetime",
    headerName: "Date",
    width: 180,
  },
];
const withdraws_mm = [
  { field: "id", headerName: "编号", width: 150},
  { field: "account_name", headerName: "银行账户名称", width: 150 },
  { field: "account_no", headerName: "银行帐号", width: 150 },
  { field: "status", headerName: "地位", width: 150 },
  {
    field: "amount",
    headerName: "数量",
    type: "number",
    width: 150,
  },
  {
    field: "datetime",
    headerName: "日期时间",
    width: 180,
  },
];

const HistoryPage = () => {
  const {auth, content, lan} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if(!auth){
      navigate('/login');
    }
  }, [auth, navigate]);
  const {data: deposit} = useFetch(BASE_URL + "/transaction/deposit-log");
  const {data: withdraw} = useFetch(BASE_URL + "/transaction/withdraw-log");
  const [show, setShow] = useState(false);
  // console.log(deposit);
  const language = localStorage.getItem("lan");

  return (
    <div
      className="history pt-4 pb-5 px-3 px-sm-4"
      style={{ overflowX: "hidden" }}
    >
      <div className="row">
      </div>
      <div className=" historyContainer mb-5  mt-4 p-3 rounded-3 ">
        <div className="mb-4 d-flex flex-wrap flex-sm-nowrap align-items-center gap-4">
            <Button
              style={{ border: "none" }}
              className="bg-white text-black d-flex flex-nowrap"
              onClick={() => setShow(false)}
            >
              <small className="fw-semibold historyTitle">{content?.deposit}</small>
              <Badge className="ms-1 ms-sm-2" bg="secondary">
                <small>{deposit && deposit.length}</small>
              </Badge>
            </Button>
            <Button
              style={{ border: "none" }}
              className="bg-white text-black  d-flex flex-nowrap"
              onClick={() => setShow(true)}
            >
              <small className="fw-semibold historyTitle">{content?.withdraw}</small>
              <Badge className="ms-1 ms-sm-2" bg="secondary">
                <small>{withdraw && withdraw.length}</small>
              </Badge>
            </Button>
        </div>
        {!show && (
          <DataGrid
            rows={deposit}
            columns={lan === "en" ? deposits : deposits_mm}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
        {show && (
          <DataGrid
            rows={withdraw}
            columns={lan === "en" ? withdraws : withdraws_mm}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
