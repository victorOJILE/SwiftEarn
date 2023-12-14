
export default function Table({ data, theads, width }) {
	
	return (
		
  <table className="text-sm" style={{ width: "100%", minWidth: width || "30rem" }}>
   <thead>
    <tr>
    	{
    		theads.map(thead => typeof thead === 'string' ? <th>{thead}</th> : <th { ...thead.props }>{ thead.text }</th>)
    	}
    </tr>
   </thead>
   <tbody className="text-center color2">
    {
     data.map(each => <CreateRow tr={each} />)
    }
   </tbody>
  </table>
	);
}

function CreateRow({ tr }) {
	return (
		<tr>
			{
				tr.map(tdata => typeof tdata === 'string' || !tdata.obj ? <td>{tdata}</td> : <td { ...tdata.props }>{tdata.text}</td>)
			}
  </tr>
	);
}