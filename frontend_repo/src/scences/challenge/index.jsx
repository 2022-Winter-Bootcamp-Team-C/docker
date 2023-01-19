import { Box } from "@mui/material";
import Header from "../../components/Header";
import './index.css'
import Button from 'react-bootstrap/Button';
import Ch from "../../assets/images/challenge.svg"
import { useState } from "react";
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';

const Challenge = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
    </main>
    <div className="size">
    <Box m="20px">
      <Header title="챌린지" subtitle="test" />
        <img className = "sub-one" src={Ch}></img>
      <Box height="50vh">
      <h1 className="sub-two"> MY OWN CHALLENGE </h1>
        <h1 className="sub-three">금액을 설정하여, 같이 모아봐요!</h1>
        <p className="sub-four">STEP 1.  금액을 설정해주세요.<br/>
          STEP 2.  현재 지출한 금액을 계산하여, 얼마나 남았는지 알려드릴게요.</p>
        <h1 className="sub-five">도전할 금액을 설정하세요.</h1>
        <input type="number" className="input-value"></input>
        <Button type="submit" className="input-button" >
            확인
          </Button>
      </Box>
    </Box>
    </div>
    </div>
  );
};

export default Challenge;
