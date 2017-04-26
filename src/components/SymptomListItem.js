import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const SymptomListItem = (props) => {
	var listClassName = `flex-60 prescription-list-link ${props.className}`
  return (
    <li className="list-item">
    	<img src={props.originalImageSource} className="flex-auto" id={`symp-list-item${props.sympID}`} height="60px" onClick={props.handleDelete.bind(null, props.sympID)} onMouseOver={props.handleOnMouseOverSymp.bind(null, props.sympID, props.deleteImageSource)} onMouseOut={props.handleOnMouseOutSymp.bind(null, props.sympID, props.originalImageSource)} />
      <Link className="list-flex" to={`/symptoms/${props.idx}`}>
		    {props.symptomDetails.name}
      </Link>
    </li>
  )
}

export default connect()(SymptomListItem)
      // <img src={props.imageSource} className="image-flex" height="60px" />