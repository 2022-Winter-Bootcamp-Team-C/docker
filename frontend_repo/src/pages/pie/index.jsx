import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';
import { useState } from "react";

const Pie = () => {
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
      <Header title="수입/지출 그래프"  subtitle={(year + '년 '+ month + '월')}/>
      <Box height="60vh" width="75vw">
        <PieChart />
      </Box>
    </Box>
    </div>
    </div>
  );
};

export default Pie;
