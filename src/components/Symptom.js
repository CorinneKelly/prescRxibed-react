import React, { Component } from 'react'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { Image } from 'cloudinary-react'
import BurgerMenu from './BurgerMenu'



const data = 

[
 // {date: '', uv: 1}
      // {date: 'Page B', uv: 3000, pv: 1398, amt: 2210},
      {date: "4-20", uv: 1},
      // date: this.props.dateOfEntry, uv: this.props.symptom.severity?
      {date: "4-21", uv: 5},
      {date: "4-22", uv: 3}
			// uv= upper value
]

class Symptom extends Component {

  
// h1: this.props.symptom.name
// for new symptoms onClick will assign Id and then go to that specific symptomform/id page
	// symptom list will be mapped from: this.props.symptoms.description
// this.props.symptom.images. will be used in symptomImages Map

	render() {

		var symptomDescList =	[{description: "desc1", date: "4-20"}, {description: "desc2",  date: "4-21"}, {description: "desc3",  date: "4-22"}, {description: "desc4",  date: "4-23"}].map((symptom) => {
			return (
				<li className="list-item">
					<div className="list-flex page-title">
						{symptom.date}
					</div>
					<div className="image-flex">
						{symptom.description}
					</div>
				</li>
			)
		})

		var symptomImages = ["tqv7o4h8btxxxavzuhhj.png", "wessdduu0fg6h61csnvg.png"].map((image) => {
			return <Image cloudName="prescriptionmanager" publicId={`http://res.cloudinary.com/prescriptionmanager/image/upload/${image}`} height="300" crop="scale" />
		})

	  return(
	  	<div>
	  		<BurgerMenu />
	  		<ul>
		  		<li className="list-item">
		  			<h1 className="page-title image-flex">'this.state(or props).symptom.name'</h1>
	  			</li>
	  			
		  		<li className="list-item">
			  		<a className="page-title image-flex symp-form-link" href="/symptomform">How is your 'this.state(or props).symptom.name' feeling today?</a>
		  		</li>
		  		
		  		<li className="list-item">
						<AreaChart className="page-title image-flex" width={400} height={250} data={data} >
						  <defs>
						    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						    	// first offset determines % of first color gradient (same with 2nd)
						    	// second opacity is how transparent the color of the graph is
						      <stop offset="5%" stopColor="#27CECF" stopOpacity={0.9}/>
						      <stop offset="95%" stopColor="#27CECF" stopOpacity={0.1}/>
						    </linearGradient>

						  </defs>
						  <XAxis dataKey="date" />
						  <YAxis />
						  <Tooltip />
						  <Area type="monotone" dataKey="uv" stroke="#F2F3F5" fillOpacity={1} fill="url(#colorUv)" />
						</AreaChart>
					</li>
					<li className="list-item symp-log-heading">
						<div className="image-flex page-title">
							'this.state(or props).symptom.name' Tracker
						</div>
					</li>
						{symptomDescList}
						{symptomImages}
				</ul>

			</div>
	  )
	}
}

export default Symptom
