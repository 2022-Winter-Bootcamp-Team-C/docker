import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const SpendingAddModal = () => {
    let user_id = localStorage.getItem("user_id")
    let formData = new FormData();
    const [show, setShow] = useState(false);
    const [list,setlist] = useState([]);
    const [file, setFile] = useState(false);
    const [Loading, setLoading] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const memoRef = useRef()
    const costRef = useRef()
    const whenRef = useRef()
    const purposeRef = useRef()
  
    const [data, setData] = useState({
        when: "",
        memo: "",
        purpose: "",
        cost: "", 
    })
  
    // 지출 내역 POST
    function submit(e){
      axios.post('http://127.0.0.1:8000/api/v1/spending/new/',{
        user : user_id,
        when: data.when,
        memo: data.memo,
        purpose: data.purpose,
        cost: data.cost
      })
        .then(res => {
          memoRef.current.value = "";
          costRef.current.value = "";
          whenRef.current.value = "";
          purposeRef.current.value = "";
          setlist([...list, ...res.data])
        }) 
        .catch(function (error) {
          console.log(error);
        });
    }
  
    // 지출 내역 화면 출력
    function handle(e){
      const newdata = {...data}
      newdata[e.target.id] = e.target.value
      setData(newdata)
      console.log(newdata)
    }
  
    // ocr 파일 읽어와 값 설정
    const handleInputChange = (event) => {
        setFile(event.target.files[0]);
      };
  
    // ocr 업로드 버튼 클릭시
    const upload = () => {
      setLoading(true)
      formData.append("files", file);
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/api/v1/ocr",
        data: formData
      }).then(({ data }) => {
        console.log("성공! ", JSON.stringify(data));
        setData({
          user : user_id,
          when: data.date,
          memo: data.memo,
          purpose: data.purpose,
          cost: data.cost
        })
        setLoading(false)
      });
    };
  
    // 지출 내역 GET
      useEffect(() => {
        const user_id = localStorage.getItem("user_id")
        axios.get(`http://127.0.0.1:8000/api/v1/spending/spending-list/${user_id}`)
        .then(res => {
          setlist(res.data.spending_list);
      })
    },[])
    
  
  return (
    <>
    <Button variant="primary main" onClick={handleShow}>
            내역 추가
    </Button>

      <Modal show={show} onHide={handleClose}> {/*post*/}
        <Modal.Header closeButton>
          <Modal.Title>지출 내역 추가</Modal.Title>
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
            <Form.Group className="mb-3">
            <Form.Label>용도</Form.Label>
              <select class="form-select" 
              ref={purposeRef}
              onChange={(e) => handle(e)}
              id ="purpose"
              value ={data.purpose}
              method="post">
                <option selected>용도를 선택하세요.</option>
                <option value="식사">식사</option>
                <option value="술/유흥">술/유흥</option>
                <option value="뷰티/미용">뷰티/미용</option>
                <option value="교통/차량">교통/차량</option>
                <option value="주거/통신">주거/통신</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" >
            <Form.Label>금액</Form.Label>
              <Form.Control
                ref={costRef}
                type="number"
                placeholder="금액을 입력하세요."
                autoFocus
                onChange={(e) => handle(e)}
                id ="cost"
                value ={data.cost}
                method="post"
              />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label>영수증 OCR</Form.Label>
              <Form.Control
                type="file"
                autoFocus
                accept="image/*" 
                onChange={handleInputChange} 
                method="post"
              />
               <Button variant="primary center"  class="btn btn-primary" type="button"
                onClick={() => {
                handleShow();
                upload();
               }}> {Loading ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "업로드"}</Button> <br/>
               <Form.Label className="m">❗영수증 이미지를 업로드 하면, 자동으로 가계부를 작성해드립니다❗</Form.Label>
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

export default SpendingAddModal