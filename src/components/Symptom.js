import React, { Component } from 'react'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { Image } from 'cloudinary-react'
import BurgerMenu from './BurgerMenu'


const data = [
      // {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {name: "4-20", uv: 1},
      // name: this.props.dateOfEntry, uv: this.props.symptom.severity?
      {name: "4-21", uv: 5},
      {name: "4-22", uv: 3}
			// uv= upper value
]

class Symptom extends Component {
  
// h1: this.props.symptom.name
// for new symptoms onClick will assign Id and then go to that specific symptomform/id page
	// symptom list will be mapped from: this.props.symptoms.description
// this.props.symptom.images. will be used in symptomImages Map

	render() {
		var symptomDescList =	[{description: "desc1"}, {description: "desc2"}, {description: "desc3"}, {description: "desc4"}].map((symptom) => {
			return <li>{symptom.description}</li>
		})

		var symptomImages = ["tqv7o4h8btxxxavzuhhj.png", "wessdduu0fg6h61csnvg.png"].map((image) => {
			return <Image cloudName="prescriptionmanager" publicId={`http://res.cloudinary.com/prescriptionmanager/image/upload/${image}`} height="300" crop="scale" />
		})

	  return(
	  	<div>
	  		
	  		<BurgerMenu />
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