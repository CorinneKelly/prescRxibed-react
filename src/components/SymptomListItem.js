import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const SymptomListItem = (props) => {
	debugger
  return (
    <li className="list-item">
      <Link className="list-flex" to={`/symptoms/${props.idx}`}>
		    {props.symptomDetails.name}
      </Link>
    </li>
  )
}

export default connect()(SymptomListItem)
      // <img src={props.imageSource} className="image-flex" height="60px" />