import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState,  useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';

const Invoices = () => {
  let today = new Date();  
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isSidebar, setIsSidebar] = useState(true);
  const [data, setData] = useState(null);

    // const onClick = useEffect(() => {
    //   axios.post('http://127.0.0.1:8000/api/v1/spending/new/')
    //     .then(response => {
    //       setData(response.data)
    //     })
    // }, [])
  

  const columns = [
    {
      field: "date",
      headerName: "날짜",
      flex: 1,
    },
    {
      field: "memo",
      headerName: "메모",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "금액",
      flex: 1,
      
      // renderCell: (params) => (
      //   <Typography color={colors.greenAccent[500]}>
      //     ${params.row.cost}
      //   </Typography>
      // ),
    },
    {
      // renderCell : (parms) =>(
      // <Button variant="outlined" startIcon={<DeleteIcon/>}>
      //   삭제
      // </Button>
      // ) //삭제 버튼
      
    }
  ];
  const mockDataInvoices = [
    {
      id: 1,
      date : "2021-12-12",
      purpose : "용도",
      memo : "메모",
      cost : 1212,
      image : "no"
    }
  ];

  return (
    <div className="app">
          <Sidebar isSidebar={isSidebar} />
    <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
    </main>
    <div className="size">
    <Box m="20px">
      <Header title="수입내역" subtitle={(year + '년 '+ month + '월')}/>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
      
      <style type="text/css">
        {`
          .modal-title, .form-label {
            color: black;
          }
          .btn-primary.main{
            width : 100px;
           margin-top : -60px;
           margin-left: 90%;
           margin-bottom : 5px;
          }
          .btn-primary.center{
           width : 100px;
           margin-top : 10px;
           margin-bottom : 10px;
           margin-left: 70%;
          }
          .btn-secondary.center{
            width : 100px;
          }
          .btn-primary.second{
            margin-right:13%;
            width : 100px;
            border-radius:6px;
          }
          .m {
            margin-left:8px;
            font-size : 12px;
          }
       `}
      </style>
      <Button variant="primary main" onClick={handleShow}>
            내역 추가
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>수입 내역 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>날짜</Form.Label>
              <Form.Control
                type="date"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>메모</Form.Label>
              <Form.Control
                type="text"
                placeholder="메모 (최대 50자)"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>금액</Form.Label>
              <Form.Control
                type="number"
                placeholder="금액을 입력하세요."
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary center" onClick={handleClose}>
            닫기
          </Button>
          <Button type="submit" variant="primary second" onClick={()=> {
            handleClose()
            // onClick()
             }}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
        
        <DataGrid checkboxSelection rows={mockDataInvoices} columns={columns} />
      </Box>
    </Box>
    </div>
    </div>
  );
  
};

export default Invoices;
