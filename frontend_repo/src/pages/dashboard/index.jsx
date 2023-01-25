import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import "../../components/Login"

import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import Sidebar from '../global/Sidebar';
import Topbar from '../global/Topbar';

const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [data, setData] = useState([]);
  const [incomedata, setIncomeData] = useState([]);
  const [totaldata, setTotalData] = useState([]);
  const [threespenddata,setThreeSpendTotalData] = useState([]);
  const [threeincomedata,setThreeIncomeTotalData] = useState([]);
  const user_id = localStorage.getItem("user_id")
  const email = localStorage.getItem("email")

  useEffect(() => {
    const spend = ()=> {
    axios.get(`http://127.0.0.1:8000/api/v1/spending/total_spending/${user_id}`)
      .then(response => {
        setData(response.data)
      })
    }
    const income = ()=> {
      axios.get(`http://127.0.0.1:8000/api/v1/income/total_income/${user_id}`)
      .then(response => {
        setIncomeData(response.data)
        console.log(response.data)
      })
    }
    const month_spend = () => {
      axios.get(`http://127.0.0.1:8000/api/v1/spending/comparison_last_month/${user_id}`)
      .then(response => {
        setTotalData(response.data)
      })
    }
    const three_month_spend = () => {
      axios.get(`http://127.0.0.1:8000/api/v1/spending/3month_sum/${user_id}`)
      .then(response => {
        setThreeSpendTotalData(response.data)
      })
    }
    const three_month_income = () => {
      axios.get(`http://127.0.0.1:8000/api/v1/income/3month_sum/${user_id}`)
      .then(response => {
        setThreeIncomeTotalData(response.data)
      })
    }
    spend()
    income()
    month_spend()
    three_month_spend()
    three_month_income()
  }, [])


  return (
    <div className="app">
          <Sidebar isSidebar={isSidebar} />
    <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
    </main>
 
    <div className="size">
    <Box m="20px">
      {/* 헤더 */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle={email + "님, 환영합니다."} />
      </Box>

      {/* 그리드 & 차트 */}
      <Box
        mt ="27px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="145px"
        gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title= {incomedata.total_income+"원"}
            subtitle="수입"
            progress="0.75"
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          
          <StatBox
            title = {data.total_spending+"원"}
            subtitle="지출"
            progress="0.50"
            icon={
              <MoneyOffIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }} 
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title = {threeincomedata.total_three_month_ago_income+"원"}
            subtitle="3개월 전 수입"
            progress="0.30"
            icon={
              <AttachMoneyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <StatBox
            title={threespenddata.total_three_month_ago_spending+"원"}
            subtitle="3개월 전 지출"
            progress="0.80"
            icon={
              <MoneyOffIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}>
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center">

          </Box>
          <Box height="300px" m="-46px 0 0 50px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px">
          <Typography variant="h5" fontWeight="600">
            한달 전보다 얼마나 지출이 적을까?
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px">
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "18px" }}>
              전달보다 <b>{totaldata.comparison_total_spending}</b>원 덜 소비 하셨어요!
            </Typography>
            
            <Typography>소비를 덜 하고싶다면 챌린지에 참여해보세요 </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    </div>
    </div>
  );
};

export default Dashboard;
