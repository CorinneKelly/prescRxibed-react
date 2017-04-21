import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { postSymptom } from '../actions/symptoms'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import request from 'superagent'

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
			symptomName: ('symp name' || '') //this.props.symptomName change when props exist
		}
		this.outputUpdate = this.outputUpdate.bind(this)
		this.symptomTextDesc = this.symptomTextDesc.bind(this)
		this.onImageDrop = this.onImageDrop.bind(this)
		this.deleteImgPreview = this.deleteImgPreview.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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

	render() {

		return (
			<div>
				<p>How do you feel today</p>
				{this.state.symptomName}<br />
				<form onSubmit={this.handleSubmit} >
					<label htmlFor="currSev">Current Severity: </label>
					<input type="range" id="currSev" min="0" max="5" step="1" onChange={this.outputUpdate} />
					<output htmlFor="currSev" id="symp-severity">{this.state.outputData}</output><br />

					<textarea rows="10" cols="50" placeholder="Tell me how you feel" onChange={this.symptomTextDesc} />
					<Dropzone
						multiple={false}
						accept="image/*"
						onDrop={this.onImageDrop} >

						<p>Drop image here</p>
					</Dropzone>

					<div>
						{this.state.uploadFileCloudinaryUrl === '' ? null :

						<div>
							<p>You just uploaded:</p>
							<p>{this.state.uploadedFile.name}</p>
							<img src={this.state.uploadFileCloudinaryUrl} />
							<p> Changed your mind?</p><button onClick={this.deleteImgPreview}>DELETE PREVIEW</button>

						</div>
						}

					</div>

					<input type="submit" onSubmit={this.handleSubmit} value="Finished" />

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
