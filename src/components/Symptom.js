import React, { Component } from 'react'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { Image } from 'cloudinary-react'
import BurgerMenu from './BurgerMenu'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSymptom } from '../actions/symptom'
import { Link } from 'react-router-dom'

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
 			var symptomImages = this.props.symptom.symptomLogs.map((log) => {
				 let imageDate = moment(log.created_at).format("MMM-DD")
				 return	log.uploadedFiles.map((file) =>{
						return (<li>
							<div className="list-flex">{imageDate}</div>
							<Image className="image-flex" cloudName="prescriptionmanager" publicId={`${file.url}`} height="300" crop="scale" />
						</li>)
					})
				})
      var severityData = this.props.symptom.symptomLogs.map((symptom) => {
        return {date: moment(symptom.created_at).format("MM-DD"), uv: symptom.severity}
      })
      var name = this.props.symptom.specificSymptom.name
      var symptomId = this.props.symptom.specificSymptom.id
    }
    else {
      var symptomDescList =	"no logs"
      var severityData = []
      var symptomImages = ""
      var name = "no name"
      var symptomId = null
    }
    debugger
	  return(

	  	<div>
	  		<BurgerMenu />
	  		<ul>
		  		<li className="list-item">
		  			<h1 className="page-title image-flex">{name}</h1>
	  			</li>

		  		<li className="list-item">
            <Link className="page-title image-flex" to={`/symptoms/${symptomId}/addLog`}>
              How is your {name} feeling today?
            </Link>
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
							{name} Tracker
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
