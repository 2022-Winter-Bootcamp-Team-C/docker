import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const IncomeAddModal = () => {
  let user_id = localStorage.getItem("user_id")
  const [show, setShow] = useState(false);
  const [list,setlist] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const memoRef = useRef()
  const costRef = useRef()
  const whenRef = useRef()

  const [data, setData] = useState({
      when: "",
      memo: "",
      cost: "", 
  })
  
  // 수입 내역 POST
  function submit(e){
    axios.post('http://127.0.0.1:8000/api/v1/income/new/',{
      user : user_id,
      when: data.when,
      memo: data.memo,
      cost: data.cost
    })
      .then(res => {
        memoRef.current.value = "";
        costRef.current.value = "";
        whenRef.current.value = "";
        setlist([...list, ...res.data])
      }) 
      .catch(function (error) {
        console.log(error);
      });
  }

  // 수입 내역 화면 출력
  function handle(e){
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

  // 수입 내역 GET
  useEffect(() => {
    const user_id = localStorage.getItem("user_id")
    axios.get(`http://127.0.0.1:8000/api/v1/income/income-list/${user_id}`)
    .then(res => {
      setlist(res.data.income_list);
    })
},[])
  
  return (
  <>
      <Button variant="primary main" onClick={handleShow}>
            내역 추가
      </Button>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>수입 내역 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" >
              <Form.Label>날짜</Form.Label >
              <Form.Control
                ref={whenRef}
                type="date"
                autoFocus
                onChange={(e) => handle(e)}
                id ="when"
                value ={data.when}
                method="post"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Label>메모</Form.Label>
              <Form.Control
                ref={memoRef}
                type="text"
                placeholder="메모 (최대 50자)"
                autoFocus
                onChange={(e) => handle(e)}
                id ="memo"
                value ={data.memo}
                method="post"
              />
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Label>금액</Form.Label>
              <Form.Control
                ref={costRef}
                type="text"
                placeholder="금액을 입력하세요."
                autoFocus
                onChange={(e) => handle(e)}
                id ="cost"
                value ={data.cost}
                method="post"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary center" onClick={handleClose}>
            닫기
          </Button>
          <Button type="submit" variant="primary second"
           onClick={()=> {
            handleClose();
            submit();
            window.location.reload()
            }}> 확인 </Button>
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default IncomeAddModal