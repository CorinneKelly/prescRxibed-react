import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postSymptomEvent } from '../actions/symptom'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import request from 'superagent'
import BurgerMenu from './BurgerMenu'

const CLOUDINARY_UPLOAD_PRESET = 'AddSymptomImg'
const CLOUDINARY_UPLOAD_URL = 'https:api.cloudinary.com/v1_1/prescriptionmanager/upload'

class SymptomForm extends Component {

	constructor() {
		super()
		this.state = {
			severity: 5,
			description: '',
			uploadedFiles: [],
			name: ("this.props.symptom.name" || "") 
		}
		this.outputUpdate = this.outputUpdate.bind(this)
		this.symptomTextDesc = this.symptomTextDesc.bind(this)
		this.deleteImgPreview = this.deleteImgPreview.bind(this)

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleImageUpload = this.handleImageUpload.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
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
		debugger
		this.props.postSymptomEvent(this.state, this.props.match.params.prescriptionId)
	}

	render() {
			if (this.state.uploadedFiles.length > 0) {
				var currUploads = this.state.uploadedFiles.map((file) => {
					return (
						<div className="image-flex" >
							{`${file.fileName}`} <br/>
							<img src={`${file.url}`} /><br/>
							<button className="list-flex" onClick={this.deleteImgPreview} value={`${file.fileName}`}>DELETE</button>
						</div>
					)
				})
			} else {
				var currUploads = ""
			}

		return (
			<div className="symptom-form-wrapper">
				<BurgerMenu />
				<h1 className="page-title">
				How does your  
				<input type="text" value={this.state.symptomName} onChange={this.handleInputChange}/>
				 feel today</h1>
				<form onSubmit={this.handleSubmit} >
					<ul>
						<li className="list-item" >
							<label className="curr-severity-text" htmlFor="currSev">Current Severity:</label>
							<input className="curr-severity-text" type="range" id="currSev" min="0" max="5" step="1" onChange={this.outputUpdate} />
							<output className="curr-severity-text" htmlFor="currSev" id="symp-severity">{this.state.severity}</output><br />
						</li>

						<li className="list-item" >
							<textarea className="add-pres-input" rows="10" placeholder="Tell me how you feel" onChange={this.symptomTextDesc} />
						</li>

						<li className="list-item upload-list-item" >
							<Dropzone
								multiple={true}
								accept="image/*"
								onDrop={this.handleImageUpload}
								className="image-flex" id="dropzone" >

								<p>Drag & drop image</p>
								<p>or click to select file</p>
							</Dropzone>

						</li>

						<li className="list-item" >
							{this.state.uploadedFiles.length === 0 ? null :
								<div>
									<p>You just uploaded:</p>
										<div className="list-item"> 
											{currUploads}
										</div>
								</div>
							}
						</li>
						<li className="list-item" >
							<input className="symptom-submit" type="submit" onSubmit={this.handleSubmit} value="Finished" />
						</li>
					</ul>
				</form>
			</div>
		)
	}
}


	const mapDispatchToProps = (dispatch) => {
	  return bindActionCreators({
	    postSymptomEvent
	  }, dispatch)
	}



export default connect(null, mapDispatchToProps)(SymptomForm)
