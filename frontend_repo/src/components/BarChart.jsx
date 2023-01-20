import {useEffect, useState} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Bar } from 'react-chartjs-2';
import axios from 'axios';
ChartJS.register(
    CategoryScale,
    LinearScale,
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
        text: '용도별 지출',
      }
    }
  };

const BarChart =() => {
    const [data, setData] = useState({
        labels:['식사','술/유흥', '뷰티/미용', '교통/차량', '주거/통신'],
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
         axios.get(`http://127.0.0.1:8000/api/v1/spending/purpose_ration/${user_id}`)
         .then((res) => {
                // console.log(res)
                    dataSet1.push(res.data.food_rate)
                    dataSet1.push(res.data.alcohol_rate)
                    dataSet1.push(res.data.beauty_rate )
                    dataSet1.push(res.data.transportation_rate )
                    dataSet1.push(res.data.mobile_rate )
            setData({
                labels:['식사','술/유흥', '뷰티/미용', '교통/차량', '주거/통신'],
                datasets: [
                  {
                    label : "비율",
                    data:dataSet1,
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
                ],
              })
         }).catch(e => {
                // console.log("error", e)
            })
        }
        axiosData();
    },[])
   
    return(
        <div style={{width:'83%', height:'70%', margin: '20px'}}>
            <Bar data={data} options={options}/>
         </div>)
}
export default BarChart;