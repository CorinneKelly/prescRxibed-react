import React, {Component} from 'react'

class Symptom extends Component {

render() {
		var symptomDescList =	[{description: "desc1"}, {description: "desc2"}, {description: "desc3"}, {description: "desc4"}].map((symptom) => {
			return <li>{symptom.description}</li>
		})

		var symptomImages = ["tqv7o4h8btxxxavzuhhj.png", "wessdduu0fg6h61csnvg.png"].map((image) => {
			return <Image cloudName="prescriptionmanager" publicId={`http://res.cloudinary.com/prescriptionmanager/image/upload/${image}`} height="300" crop="scale" />
		})

	  return(
	  	<div>

	  		<h1>Symptom Name</h1>
	  		<a href="/symptomform/{symptomId}">How are you feeling today?</a>

				<AreaChart width={730} height={250} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
				  <defs>
				    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
				    	// first offset determines % of first color gradient (same with 2nd)
				    	// second opacity is how transparent the color of the graph is
				      <stop offset="5%" stopColor="#8884d8" stopOpacity={0}/>
				      <stop offset="100%" stopColor="#8884d8" stopOpacity={0.8}/>
				    </linearGradient>

				  </defs>
				  <XAxis dataKey="name" />
				  <YAxis />
				  <Tooltip />
				  <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
				</AreaChart>
				<ul>
					{symptomDescList}
					{symptomImages}
				</ul>

			</div>
	  )
	}
}

export default Symptom
