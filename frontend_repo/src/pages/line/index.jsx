import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';
import { useState } from "react";

const Line = () => {
  let today = new Date();  
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="app" >
        <Sidebar isSidebar={isSidebar} />
    <main className="content">
        <Topbar setIsSidebar={setIsSidebar} />
    </main>
    <div className="size">
    <Box m="20px">
     <Header title="3개월 수입/지출 그래프" subtitle={('3개월 지출을 한눈에 보세요!')}  />
      <Box height="70vh" width="76vw" margin="20px">
        <LineChart />
      </Box>
    </Box>
    </div>
    </div>
  );
};

export default Line;
