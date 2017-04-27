import React, { Component } from 'react'
import { AreaChart, XAxis, YAxis, Tooltip, Area } from 'recharts'
import { Image } from 'cloudinary-react'
import BurgerMenu from './BurgerMenu'
import moment from 'moment'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getSymptom } from '../actions/symptom'
import { Link } from 'react-router-dom'
import { forceLogout } from '../actions/account'
import '../stylesheets/symptom.css'

const sympImgPath = '/images/symptom/'
const presImgPath = '/images/prescription/'

class Symptom extends Component {

	constructor(){
		super()
		this.state = {
			newLogLink: ""
		}
		this.onMouseOver = this.onMouseOver.bind(this)
		this.onMouseOut = this.onMouseOut.bind(this)
	}

	componentWillMount(){
    this.props.getSymptom(this.props.match.params.symptomId)
    this.props.forceLogout(this.props.account.expiresAt)
	}

	onMouseOver(){
		document.getElementById("add-new-log-img").setAttribute('src', `${presImgPath}addSymptomPeach.svg`)
		document.querySelector(".symp-new-log-link").style.color = "#EEB5B7"
		this.setState({
			newLogLink: `Click to add a new log about your ${this.props.symptom.specificSymptom.name}`
		})
	}

	onMouseOut(){
		document.getElementById("add-new-log-img").setAttribute('src', `${sympImgPath}addSymptomLtBlue.svg`)
		document.querySelector(".symp-new-log-link").style.color = "#D0E7F0"
		this.setState({
			newLogLink: `How is your ${this.props.symptom.specificSymptom.name} today?`
		})
	}

	render() {

    if (this.props.symptom.symptomLogs.length > 0){
      var symptomDescList =	this.props.symptom.symptomLogs.map((symptom) => {
			 let symptomImages = symptom.uploadedFiles.map((file) =>{
					return (
					<div className="flex-auto">
						<Image height="100px" className="flex-auto symp-log-image" cloudName="prescriptionmanager" publicId={`${file.url}`} />
          </div>)
				})
        return (
        	<div>
	          <li className="list-item symp-log-item">
	            <div className="flex-auto">
	              {moment(symptom.created_at).format("MMM DD")}
	            </div>

	            <div className="flex-60 symp-log-desc">
	              {symptom.description}
	            </div>
	          </li>

	          <li className="list-item symp-log-item">
	          	{symptomImages}
	          </li>
         </div>
        )
      })

      var severityData = this.props.symptom.symptomLogs.map((symptom) => {
        return {date: moment(symptom.created_at).format("MM-DD"), uv: symptom.severity}
      })
      var name = this.props.symptom.specificSymptom.name
      var symptomId = this.props.symptom.specificSymptom.id
    }
    else {
      var symptomDescList =	""
      var severityData = []
      var symptomImages = ""
      var name = ""
      var symptomId = null
    }
	  return(

	  	<div>
	  		<BurgerMenu />
	  		<ul>
		  		<li className="list-item" >
		  			<h1 className="page-title flex-auto">{name}</h1>
		  		</li>
		  		<li className="list-item" onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} >

		  			<img className="flex-auto" id="add-new-log-img" height="80px" src={`${sympImgPath}addSymptomLtBlue.svg`} />
            <Link className="symp-new-log-link flex-60" to={`/symptoms/${symptomId}/addLog`} >
              {this.state.newLogLink? this.state.newLogLink : `How is your ${this.props.symptom.specificSymptom.name} today?`}
            </Link>
		  		</li>

		  		<li className="list-item">
		  			<div className="flex-auto">Symptom Severity Over Time</div>
		  		</li>

		  		<li className="list-item">

						<AreaChart className="page-title flex-auto" width={400} height={250} data={severityData} >
						  <defs>
						    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						    	// first offset determines % of first color gradient (same with 2nd)
						    	// second opacity is how transparent the color of the graph is
						      <stop offset="5%" stopColor="#27CECF" stopOpacity={0.9}/>
						      <stop offset="95%" stopColor="#27CECF" stopOpacity={0.1}/>
						    </linearGradient>

						  </defs>
						  <XAxis dataKey="date" />
						  <YAxis type="number" domain={[0, 10]} />
						  <Tooltip />
						  <Area type="monotone" dataKey="uv" stroke="#F2F3F5" fillOpacity={1} fill="url(#colorUv)" />
						</AreaChart>
					</li>

					<li className="list-item">
						<h3 className="flex-auto">
							{name} Tracker
						</h3>
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
		getSymptom,
    forceLogout
	}, dispatch)
}

const mapStateToProps = (state) => {
	return {
		symptom: state.symptom,
    account: state.account
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Symptom)
