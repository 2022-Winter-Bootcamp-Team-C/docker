import { Box } from "@mui/material";
import Header from "../../components/Header";
import './index.css'
import Button from 'react-bootstrap/Button';
import Ch from "../../assets/images/sm.svg"
import { useState, useRef, useEffect} from "react";
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import axios from "axios";

const Challenge = () => {

  let user_id = localStorage.getItem("user_id")
  const [isSidebar, setIsSidebar] = useState(true);
  const [list,setlist] = useState([]);
  const [budget,setBudget] = useState([]);
  const budgetRef = useRef()
  const [data, setData] = useState({
    budget : "",
  })

  function totalsubmit(){
    axios.post('http://127.0.0.1:8000/api/v1/spending_challenge/new/',{
      user: user_id,
	    budget : data.budget,
    })
    .then(res => {
      budgetRef.current.value = "";
      setlist([...list, ...res.data])
    })
    .catch(function(error){
      console.log("실패! ", JSON.stringify(data));
      console.log(error)
    })
  }

   // 지출 챌린지 화면 출력
   function handle(e){
    const newdata = {...data}
    newdata[e.target.id] = e.target.value
    setData(newdata)
    console.log(newdata)
  }

   
  // 지출 내역 GET
  useEffect(() => {
    const user_id = localStorage.getItem("user_id")
    axios.get(`http://127.0.0.1:8000/api/v1/spending_challenge/${user_id}`)
    .then(res => {
      setlist(res.data.remaining_budget);
      setBudget(res.data.budget)
      console.log({list})
    })
  },[])

  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
    </main>
    <div className="size">
    <Box m="20px">
      <Header title="챌린지" subtitle="test" />
        <img className = "sub-one" src={Ch} alt="challenge"></img>
      <Box height="50vh">
      <h1 className="sub-two"> MY OWN CHALLENGE </h1>
        <h2 className="sub-three">금액을 설정하여, 같이 모아봐요!</h2>
        <p className="sub-four">STEP 1.  금액을 설정해주세요.<br/>
          STEP 2.  현재 지출한 금액을 계산하여, 얼마나 남았는지 알려드릴게요.</p>
        {/* <input type="number" className="input-value"></input> */}

      <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch'},
        "& .MuiOutlinedInput":{"& > fieldset": {border: '1px solid green'}}
      }}
      noValidate
      autoComplete="off"
     
      >
      <FormControl 
        fullWidth sx={{ mt: 12}}
        >
          <InputLabel htmlFor="outlined-adornment-amount">금액</InputLabel>
          <OutlinedInput
            id="budget"
            type="number"
            autoFocus
            onChange={(e) => handle(e)}
            value ={data.budget}
            ref={budgetRef}
            method="post"
            startAdornment={<InputAdornment position="start">₩</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </Box>
        <Button type="submit" className="input-button" 
        onClick={() => {
          totalsubmit();
        }}> 확인 </Button>
        <div className="budget">
            <span>목표금액 : {budget}</span>
            <p >지출금액 : {list}</p>
        </div>
      </Box>
    </Box>
    </div>
    </div>
  );
};

export default Challenge;
