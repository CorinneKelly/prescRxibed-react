import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { handleDelete } from './Home'

const PrescriptionListItem = (props) => {
  var styleAnimation = `animation: (0.5 * ${props.presID})s`
  return (
    <li className="list-item" style={{styleAnimation}}>
      <img src={props.originalImageSource} className="image-flex" id={`pres-list-item${props.presID}`} height="60px" onClick={props.handleDelete.bind(null, props.presID)} onMouseOver={props.handleOnMouseOverPres.bind(null, props.presID, props.deleteImageSource)} onMouseOut={props.handleOnMouseOutPres.bind(null, props.presID, props.originalImageSource)}/>
      <Link className="list-flex" to={`/prescriptions/${props.presID}`}>
		    {props.prescriptionDetails.name}
      </Link>
    </li>
  )
}

export default connect()(PrescriptionListItem)