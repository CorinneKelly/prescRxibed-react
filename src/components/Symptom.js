import React, { Component } from 'react'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { Image } from 'cloudinary-react'
import BurgerMenu from './BurgerMenu'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSymptom } from '../actions/symptom'





class Symptom extends Component {
	constructor(){
		super()

	}

	componentWillMount(){
    this.props.getSymptom(this.props.match.params.symptomId)
	}

	render() {

    if (this.props.symptom.symptomLogs){
      var symptomDescList =	this.props.symptom.symptomLogs.map((symptom) => {
        return (
          <li className="list-item">
            <div className="list-flex page-title">
              {moment(symptom.created_at).format("MMM-DD")}
            </div>
            <div className="image-flex">
              {symptom.description}
            </div>
          </li>
        )
      })
      var severityData = this.props.symptom.symptomLogs.map((symptom) => {
        return {date: moment(symptom.created_at).format("MM-DD"), uv: symptom.severity}
      })
    }
    else {
      var symptomDescList =	"no logs"
      var severityData = []
    }




		var symptomImages = ["tqv7o4h8btxxxavzuhhj.png", "wessdduu0fg6h61csnvg.png"].map((image) => {
			return <Image cloudName="prescriptionmanager" publicId={`http://res.cloudinary.com/prescriptionmanager/image/upload/${image}`} height="300" crop="scale" />
		})
	  return(

	  	<div>
	  		<BurgerMenu />
	  		<ul>
		  		<li className="list-item">
		  			<h1 className="page-title image-flex">{this.props.symptom.specificSymptom.name}</h1>
	  			</li>

		  		<li className="list-item">
			  		<a className="page-title image-flex symp-form-link" href="/symptomform">How is your {this.props.symptom.specificSymptom.name} feeling today?</a>
		  		</li>

		  		<li className="list-item">
						<AreaChart className="page-title image-flex" width={400} height={250} data={severityData} >
						  <defs>
						    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						    	// first offset determines % of first color gradient (same with 2nd)
						    	// second opacity is how transparent the color of the graph is
						      <stop offset="5%" stopColor="#27CECF" stopOpacity={0.9}/>
						      <stop offset="95%" stopColor="#27CECF" stopOpacity={0.1}/>
						    </linearGradient>

						  </defs>
						  <XAxis dataKey="date" />
						  <YAxis type="number" domain={[0, 5]} />
						  <Tooltip />
						  <Area type="monotone" dataKey="uv" stroke="#F2F3F5" fillOpacity={1} fill="url(#colorUv)" />
						</AreaChart>
					</li>
					<li className="list-item symp-log-heading">
						<div className="image-flex page-title">
							{this.props.symptom.specificSymptom.name} Tracker
						</div>
					</li>
						{symptomDescList}
						{symptomImages}
				</ul>

			</div>
	  )
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getSymptom
	}, dispatch)
}

const mapStateToProps = (state) => {
	return {
		symptom: state.symptom
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Symptom)
