import React, { useContext, useEffect, useState } from "react";
import { Badge, Button, ButtonGroup, Form } from "react-bootstrap";
import "../assets/css/history.css";
import { DataGrid } from "@mui/x-data-grid";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const trans_columns = [
  {
    field: "id",
    headerName: "No",
    width: 150,
  },
  {
    field: "closing_balance",
    headerName: "Closing Balance",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 150,
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },
  { 
    field: "datetime", 
    headerName: "Date", 
    width: 200 
  },
];

const trans_columns_ch = [
  {
    field: "id",
    headerName: "编号",
    width: 150,
  },
  {
    field: "closing_balance",
    headerName: "期末余额",
    width: 150,
  },
  {
    field: "type",
    headerName: "类型",
    width: 150,
  },
  {
    field: "amount",
    headerName: "数量",
    width: 150,
  },
  { 
    field: "datetime", 
    headerName: "日期时间", 
    width: 200 
  },
]

const WinLossReportPage = () => {
  const { content, auth, lan } = useContext(AuthContext)
  console.log(lan);
  
  const navigate = useNavigate();
  useEffect(() => {
    if(!auth){
      navigate('/login');
    }
  }, [auth, navigate]);
  const [show, setShow] = useState(false);

  const [gParam, setGParam] = useState("today");
  const [tParam, setTParam] = useState("today");

  const { data: g_logs, loading: g_loading } = useFetch(
    BASE_URL + "/wager-logs?type=" + gParam
  );
  const { data: t_logs, loading: t_loading } = useFetch(
    BASE_URL + "/transactions?type=" + tParam
  );

  return (
    <div
      className="history pt-4 pb-5 px-3 px-sm-4"
      style={{ overflowX: "hidden" }}
    >
      <h5 className="fw-semibold text-white">
        {content?.win_loss_report}
        {/* {language === "english" ? "Win/Loss Report" : "နိုင်/ရှုံး မှတ်တမ်း"} */}
      </h5>
      <div className=" historyContainer mb-5  mt-4 p-3 rounded-3 ">
        <div className="mb-4 d-flex flex-wrap flex-sm-nowrap align-items-center gap-4">
          <button
            className={`btn btn-${!show ? "light" : "outline-light"}`}
            onClick={(e) => setShow(false)}
          >
            {content?.game_logs}
          </button>
          <button
            className={`btn btn-${show ? "light" : "outline-light"}`}
            onClick={(e) => setShow(true)}
          >
            {content?.transaction_logs}
          </button>
        </div>
        {!show && (
          <div className="mb-4 d-flex gap-2">
            <button className={`btn btn-sm btn-${gParam === 'today' ? "light" : "outline-light"}`} onClick={() => setGParam("today")}>
              {content?.today}
            </button>
            <button className={`btn btn-sm btn-${gParam === 'yesterday' ? "light" : "outline-light"}`} onClick={() => setGParam("yesterday")}>
              {content?.yesterday}
            </button>
            <button className={`btn btn-sm btn-${gParam === 'this_week' ? "light" : "outline-light"}`} onClick={() => setGParam("this_week")}>
              {content?.this_week}
            </button>
            <button className={`btn btn-sm btn-${gParam === 'last_week' ? "light" : "outline-light"}`} onClick={() => setGParam("last_week")}>
              {content?.last_week}
            </button>
          </div>
        )}
        {show && (
          <div className="mb-4 d-flex gap-2">
            <button className={`btn btn-sm btn-${tParam === 'today' ? "light" : "outline-light"}`} onClick={() => setTParam("today")}>
            {content?.today}
            </button>
            <button className={`btn btn-sm btn-${tParam === 'yesterday' ? "light" : "outline-light"}`} onClick={() => setTParam("yesterday")}>
            {content?.yesterday}
            </button>
            <button className={`btn btn-sm btn-${tParam === 'this_week' ? "light" : "outline-light"}`} onClick={() => setTParam("this_week")}>
            {content?.this_week}
            </button>
            <button className={`btn btn-sm btn-${tParam === 'last_week' ? "light" : "outline-light"}`} onClick={() => setTParam("last_week")}>
            {content?.last_week}
            </button>
          </div>
        )}

        {show && (
          <DataGrid
            rows={t_logs && t_logs}
            columns={lan === "en" ? trans_columns : trans_columns_ch}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        )}
        {!show && (
          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th>{content?.number}</th>
                  <th>{content?.from_date}</th>
                  <th>{content?.to_date}</th>
                  <th>{content?.game_providers}</th>
                  <th>{content?.count}</th>
                  <th>{content?.bet_amount}</th>
                  <th>{content?.trans_amount}</th>
                </tr>
              </thead>
              <tbody>
                {g_logs && g_logs.map((item, index) => (
                  <tr key={index}>
                    <td>{++index}</td>
                    <td>{item.from_date}</td>
                    <td>{item.to_date}</td>
                    <td>{item.product}</td>
                    <td>{item.total_count}</td>
                    <td>{item.total_bet_amount}</td>
                    <td>{item.total_transaction_amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default WinLossReportPage;
