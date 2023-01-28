import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    Title,
    PointElement,
    LineController,
    Tooltip,
    Legend,
    registerables
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(...registerables);
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineController,
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
      y: { // [y 축 관련 설정] 
        // min: 0, 
        // max: 30,
        grid: { // [y 축 데이터 시트 배경 선색 표시]
          drawBorder: false,
          color: function() {
              return '#D3D3D3'; 
          }
        },
        
        ticks: {
          color: '#D3D3D3',
          font: {
            color : '#D3D3D3'
          } 
        }
      },
      x: { 
        display: true,
        offset: true,// [x 축 관련 설정] 
        ticks: {
          color: '#808080', 
          font: { 
            color : '#D3D3D3'
          } 
        },
        grid: { // [y 축 데이터 시트 배경 선색 표시]
          drawBorder: false,
          color: function() {
              return '#D3D3D3'; 
          }
        },
      }
    }    				
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

         axios.get(`https://www.smtm.kr/api/v1/spending/3month_spending_income_ratio/${user_id}`,
         {
           withCredentials: true,
         })
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
        <div style={{width:'89%', height:'70%',margin: '20px'}}>
            <Bar data={data} options={options}/>
         </div>)
}
export default LineChart;