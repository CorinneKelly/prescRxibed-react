import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postSymptomEvent } from '../actions/symptom'
import { forceLogout } from '../actions/account'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import BurgerMenu from './BurgerMenu'
import '../stylesheets/symptomform.css'
import Notification from './Notification'


const CLOUDINARY_UPLOAD_PRESET = 'AddSymptomImg'
const CLOUDINARY_UPLOAD_URL = 'https:api.cloudinary.com/v1_1/prescriptionmanager/upload'

class SymptomForm extends Component {

	constructor() {
		super()
		this.state = {
			severity: 10,
			description: '',
			uploadedFiles: [],
			message: false
		}
		this.outputUpdate = this.outputUpdate.bind(this)
		this.symptomTextDesc = this.symptomTextDesc.bind(this)
		this.deleteImgPreview = this.deleteImgPreview.bind(this)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleImageUpload = this.handleImageUpload.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
		this.postSymptom = this.postSymptom.bind(this)
	}

	componentWillMount(){
		this.setState({
			prescriptionId: this.props.match.params.prescriptionId,
			name: this.props.symptom.specificSymptom.name,
			symptomId: this.props.match.params.symptomId

		})
		this.props.forceLogout(this.props.account.expiresAt)
	}

	outputUpdate(event) {
		event.preventDefault()
		this.setState({
			severity: event.target.value
		})
	}

	symptomTextDesc(event){
		event.preventDefault()
		this.setState({
			description: event.target.value
		})
	}

	onImageDrop(file) {
		this.setState({
			uploadedFiles: [...this.state.uploadedFiles, {fileName: file}]
		})

		this.handleImageUpload(file)
	}

	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
												.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
												.field('file', file)
		upload.end((err, response) => {

			if (response.body.secure_url !== '') {
			this.setState({
				uploadedFiles: [...this.state.uploadedFiles, {fileName: file[0].name, publicID: response.body.public_id, url: response.body.secure_url}]

			})
		}
		})
	}

	deleteImgPreview(event) {
		event.preventDefault()
		this.state.uploadedFiles.find((fileObj, index) => {
			if (fileObj.fileName === event.target.value) {
				this.setState({
					uploadedFiles: [...this.state.uploadedFiles.slice(0, index), ...this.state.uploadedFiles.slice(index + 1)]
				})
			}
		})
	}

	handleInputChange(event){
		event.preventDefault()
		this.setState({
			name: event.target.value
		})
	}

	handleSubmit(event){
		event.preventDefault()
		this.setState({
			message: true
		})
		setTimeout(()=>{this.postSymptom()}, 2000)
	}

	postSymptom(){
		this.props.postSymptomEvent(this.state)
	}

	render() {
			if (this.state.uploadedFiles.length > 0) {
				var currUploads = this.state.uploadedFiles.map((file) => {
					return (
						<div className="flex-auto uploaded-file" >
							<h5 className="uploaded-file-title">
								{`${file.fileName}`}
							</h5>
							<img className="flex-auto" src={`${file.url}`} /><br/>
							<button className="flex-auto img-delete-button" onClick={this.deleteImgPreview} value={`${file.fileName}`}>DELETE</button>
						</div>
					)
				})
			} else {
				var currUploads = ""
			}

			if (this.props.symptom.specificSymptom.name){
				var title = <h1 className="page-title">
				How is your {this.state.name} today?</h1>
			} else {
				var title = <h1 className="page-title">
				How is your
					<input type="text" className="symptom-name-input" placeholder="Symptom Name" onChange={this.handleInputChange}/>
				 today?</h1>
			}

		return (
			<div className="symptom-form-wrapper">
				{this.state.message ? <Notification /> : null}
				<BurgerMenu />
				<div className="list-item">
		        <h1 className="flex-auto">PrescR<sub>x</sub>ibed</h1>
				</div>
				{title}
				<form onSubmit={this.handleSubmit} >
					<ul>
						<li className="list-item" >
							<label className="curr-severity-text flex-auto" htmlFor="currSev">Current Severity:</label>
							<input className="curr-severity-input flex-auto" type="range" id="currSev" min="1" max="10" step="1" onChange={this.outputUpdate} />
							<output className="curr-severity-text flex-auto" htmlFor="currSev" id="symp-severity">{this.state.severity}</output><br />
						</li>

						<li className="list-item" >
							<textarea className="symp-log-input flex-auto" placeholder="Tell me how you feel" onChange={this.symptomTextDesc} />
						</li>

						<li className="list-item upload-list-item" >
							<Dropzone
								multiple={true}
								accept="image/*"
								onDrop={this.handleImageUpload}
								className="flex-60" id="dropzone" >

								<div>Drag & drop</div>
								<div>or click</div>
								<div>to upload multiple images!</div>
							</Dropzone>

						</li>

						<li className="list-item" >
							{this.state.uploadedFiles.length === 0 ? null :
								<div>
									<h3 className="flex-auto upload-list-title">You just uploaded:</h3>
									<li className="list-item">
										{currUploads}
									</li>
								</div>
							}
						</li>
						<li className="list-item" >
							<input className="button-format flex-auto" type="submit" value="Finished" />
						</li>
					</ul>
				</form>
				
			</div>
		)
	}
}

	const mapDispatchToProps = (dispatch) => {
	  return bindActionCreators({
	    postSymptomEvent,
			forceLogout
	  }, dispatch)
	}


	const mapStateToProps = (state) => {
		return {
			symptom: state.symptom,
			account: state.account
		}
	}

export default connect(mapStateToProps, mapDispatchToProps)(SymptomForm)
