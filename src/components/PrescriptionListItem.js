import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const PrescriptionListItem = (props) => {
  return (
    <li className="list-item">
      <img src={props.imageSource} className="image-flex" height="60px" />
      <Link className="list-flex" to={`/prescriptions/${props.idx}`}>
		    {props.prescriptionDetails.name}
      </Link>
    </li>
  )
}

export default connect()(PrescriptionListItem)