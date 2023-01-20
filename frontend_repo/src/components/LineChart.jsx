import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    Title,
    PointElement,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar, Line } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
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
        text: '3개월 내 수입/지출',
      }
    },
    scales: {
      x: {
        display: true,
        offset: true,
      },
    },
  };

const LineChart =() => {
    const [data, setData] = useState({
        labels:['수입', '지출', '지출평균'],
        datasets: [
          { 
            label: 'Dataset 1',
            data:[],
          },
          { 
            label: 'Dataset 2',
            data:[],
          },
          { 
            type : 'line', 
            label: 'Dataset 3',
            data:[],
          },
          { 
            type : 'line', 
            label: 'Dataset 4',
            data:[],
          },
        ],
      });
    useEffect(()=> {
       const axiosData = ()=> {
           let user_id = localStorage.getItem("user_id")
           const dataSet1 = [];
           const dataSet2 = [];
           const dataSet3 = [];
           const dataSet4 = [];

         axios.get(`http://127.0.0.1:8000/api/v1/spending/3month_spending_income_ratio/${user_id}`)
         .then((res) => {
                // console.log(res)
                    dataSet1.push(res.data.last_month_ago_total_income)
                    dataSet1.push(res.data.two_month_ago_total_income)
                    dataSet1.push(res.data.three_month_ago_total_income)

                    dataSet2.push(res.data.last_month_ago_total_spending)
                    dataSet2.push(res.data.two_month_ago_total_spending)
                    dataSet2.push(res.data.three_month_ago_total_spending)

                    dataSet3.push(res.data.three_month_spending_avg)
                    dataSet3.push(res.data.three_month_spending_avg)
                    dataSet3.push(res.data.three_month_spending_avg)

                    dataSet4.push(res.data.three_month_income_avg)
                    dataSet4.push(res.data.three_month_income_avg)
                    dataSet4.push(res.data.three_month_income_avg)
                    
            setData({
                labels:['1개월', '2개월', '3개월'],
                datasets: [
                  {
                    label : "수입",
                    data:dataSet1,
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'],
                    borderColor: [
                        // 'rgb(255, 99, 132,1.5)',
                        'rgba(54, 162, 235, 1.5)',
                        'rgba(255, 206, 86, 1.5)',
                        'rgba(75, 192, 192, 1.5)',
                        'rgba(153, 102, 255, 1.5)',
                        'rgba(255, 159, 64, 1.5)'],
                  },
                  {
                    label : "지출",
                    data:dataSet2,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'],
                    borderColor: [
                        'rgb(255, 99, 132,1.5)',
                        'rgba(54, 162, 235, 1.5)',
                        'rgba(255, 206, 86, 1.5)',
                        'rgba(75, 192, 192, 1.5)',
                        'rgba(153, 102, 255, 1.5)',
                        'rgba(255, 159, 64, 1.5)'],
                  },
                  {
                    type : 'line',
                    label : "수입 평균",
                    data:dataSet3,
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.5)',
                        // 'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'],
                    borderColor: [
                        // 'rgb(255, 99, 132,1.5)',
                        // 'rgba(54, 162, 235, 1.5)',
                        'rgba(255, 206, 86, 1.5)',
                        'rgba(75, 192, 192, 1.5)',
                        'rgba(153, 102, 255, 1.5)',
                        'rgba(255, 159, 64, 1.5)'],
                  },
                  {
                    type : 'line',
                    label : "지출 평균",
                    data:dataSet4,
                    backgroundColor: [
                        // 'rgba(255, 99, 132, 0.5)',
                        // 'rgba(54, 162, 235, 0.5)',
                        // 'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'],
                    borderColor: [
                        // 'rgb(255, 99, 132,1.5)',
                        // 'rgba(54, 162, 235, 1.5)',
                        // 'rgba(255, 206, 86, 1.5)',
                        'rgba(75, 192, 192, 1.5)',
                        'rgba(153, 102, 255, 1.5)',
                        'rgba(255, 159, 64, 1.5)'],
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
        <div style={{width:'83%', height:'70%',margin: '20px'}}>
            <Bar data={data} options={options}/>
         </div>)
}
export default LineChart;