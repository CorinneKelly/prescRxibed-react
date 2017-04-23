import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postSymptom } from '../actions/symptoms'
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
			outputData: 5,
			symptomTextDesc: '',
			uploadFileCloudinaryUrl: '',
			imageCloudinaryIds: [],
			symptomName: ('fever' || '') //this.props.symptomName change when props exist
		}
		this.outputUpdate = this.outputUpdate.bind(this)
		this.symptomTextDesc = this.symptomTextDesc.bind(this)
		this.onImageDrop = this.onImageDrop.bind(this)
		this.deleteImgPreview = this.deleteImgPreview.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.onOpenClick = this.onOpenClick.bind(this)
	}

	outputUpdate(event) {
		event.preventDefault()
		this.setState({
			outputData: event.target.value
		})
	}

	symptomTextDesc(event){
		event.preventDefault()
		this.setState({
			symptomTextDesc: event.target.value
		})
	}

	onImageDrop(files) {
		this.setState({
			uploadedFile: files[0]
		})

		this.handleImageUpload(files[0])
	}

	handleImageUpload(file) {
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
												.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
												.field('file', file)
		upload.end((err, response) => {
			if (err) {
				console.error(err)
				// display alert "file was not able to upload"
			}

			if (response.body.secure_url !== '') {
				debugger
			this.setState({
				imageCloudinaryIds: [...this.state.imageCloudinaryIds, response.body.public_id],
				uploadFileCloudinaryUrl: response.body.secure_url

			})
		}
		})
	}

	deleteImgPreview(event) {
		event.preventDefault()
		this.setState({
			uploadFileCloudinaryUrl: ''
		})
	}

	handleSubmit(event){
		event.preventDefault()
		this.props.postSymptom(this.state)
	}

	onOpenClick() {
    this.dropzone.open()
  }

	render() {

		return (
			<div className="symptom-form-wrapper">
				<BurgerMenu />
				<h1 className="page-title">How does your {this.state.symptomName} feel today</h1>
				<form onSubmit={this.handleSubmit} >
					<ul>
						<li className="list-item" >
							<label className="curr-severity-text" htmlFor="currSev">Current Severity:</label>
							<input className="curr-severity-text" type="range" id="currSev" min="0" max="5" step="1" onChange={this.outputUpdate} />
							<output className="curr-severity-text" htmlFor="currSev" id="symp-severity">{this.state.outputData}</output><br />
						</li>

						<li className="list-item" >
							<textarea className="add-pres-input" rows="10" placeholder="Tell me how you feel" onChange={this.symptomTextDesc} />
						</li>

						<li className="list-item upload-list-item" >
							<Dropzone
								multiple={false}
								accept="image/*"
								onDrop={this.onImageDrop}
								className="image-flex" id="dropzone" >

								<p>Drag & drop image</p>
								<p>or click to select file</p>
							</Dropzone>

						</li>

						<li className="list-item" >
							{this.state.uploadFileCloudinaryUrl === '' ? null :
								<div>
									<p>You just uploaded:</p>
									<p>{this.state.uploadedFile.name}</p>
									<img src={this.state.uploadFileCloudinaryUrl} />
									<p> Changed your mind?</p><button onClick={this.deleteImgPreview}>DELETE PREVIEW</button>

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
	    postSymptom},
	    dispatch
	  )
	}



export default connect(null, mapDispatchToProps)(SymptomForm)
