import { useState, useEffect, memo } from 'react';
import Loader from './loader.js';

export default function activities() {
 const [data, setData] = useState([]);
 /*
 [
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Alexander McQueen',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '35%',
			earning: '$10'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Alexander McQueen',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '35%',
			earning: '$10'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Alexander McQueen',
			commission: '45%',
			earning: '$15'
		},
		{
			date: '10 Jul 2023, 12:30',
			vendor: 'Katherine Melissa',
			commission: '45%',
			earning: '$15'
		}
];*/
 
 useEffect(() => {
  setData([]);
 }, []);
 
 return (
  <div className="overflow-auto">
   <h2 className="text-xl">Latest Activities</h2>
   <div className="bg-custom-main-bg overflow-auto my-2">
    {
     data.length ? (
      <table className="text-sm" width="100%" style={{ minWidth: "30rem" }}>
       <thead>
        <tr>
         <th className="p-2">No.</th>
         <th>Vendor</th>
         <th>Date</th>
         <th>Commission</th>
         <th>Earnings</th>
        </tr>
       </thead>
       <tbody className="text-center color2">{
        data.slice(0, 5).map((d, ind) => <GenerateRow data={d} ind={ind} />)
       }</tbody>
      </table>
     ) : <Loader />
    }
   </div>
  </div>
 );
}

function generateRow({ data, ind }) {
 return (
  <tr key={ind}>
   <td>{ind +1}</td>
   <td>{data.vendor}</td>
   <td>{data.date}</td>
   <td>{data.commission}</td>
   <td className="text-green-400">{data.earning}</td>
   </tr>
 );
}