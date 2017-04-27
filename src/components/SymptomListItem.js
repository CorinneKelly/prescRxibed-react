import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const SymptomListItem = (props) => {
	var listClassName = `flex-60 symp-list-link ${props.className}`
  return (
    <li className="list-item">
    	<img src={props.originalImageSource} className="flex-auto" id={`symp-list-item${props.sympID}`} height="60px" width="60px" onMouseOver={props.handleOnMouseOverSymp.bind(null, props.sympID, props.deleteImageSource)} onMouseOut={props.handleOnMouseOutSymp.bind(null, props.sympID, props.originalImageSource)} />
      <Link className={listClassName} to={`/symptoms/${props.sympID}`}>
		    {props.symptomDetails.name}
      </Link>
    </li>
  )
}

export default connect()(SymptomListItem)
      // <img src={props.imageSource} className="image-flex" height="60px" />
