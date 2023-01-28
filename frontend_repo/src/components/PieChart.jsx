import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';

import { Pie } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(
    CategoryScale,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '1개월 내 수입/지출',
      }
    }
  };

const PieChart =() => {
    const [data, setData] = useState({
        labels:['수입','지출'],
        datasets: [
          {
            label: 'Dataset 1',
            data:[],
          },
        ],
      });
    useEffect(()=> {
       const axiosData = ()=> {
           let user_id = localStorage.getItem("user_id")
           const dataSet1 = [];
           const dataSet2 = [];
           
         axios.get(`https://www.smtm.kr/api/v1/spending/spending_income_ratio/${user_id}`,
         {
           withCredentials: true,
         })
         .then((res) => {
                // console.log(res)
                    dataSet1.push(res.data.income_ratio)
                    dataSet1.push(res.data.spending_ratio)
                    // dataSet1.push(res.data.alcohol_rate)
            setData({
                labels:['수입','지출'],
                datasets: [
                  {
                    label : "용도",
                    data:dataSet1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',],
                    borderColor: [
                        'rgba(255, 99, 132,1.5)',
                        'rgba(54, 162, 235, 1.5)',],
                  },
                  
                ],
              })
         }).catch(e => {
                // console.log("error", e)
            })
        }
        axiosData();
    },[])
   
    return(
        <div style={{width:'55%', height:'60%', margin: '0 0 0 17%'}}>
            <Pie data={data} options={options}/>
         </div>)
}
export default PieChart;