import React from 'react'



// ask about diff between this method
// and making a constant that exports on the bottom

export default class Prescriptions extends React.Component {


	render() {
		// let prescriptions = map through props? to get array of <li> prescription components
		// li should have an image input of "pill" and class of pill-flex
		// li text should have class of "list-flex"
		// ul should have "display:flex;"

		// let pillImg = ["pillBlue.svg", "pillWhiteish.svg"]
		// this.props.prescriptions.map((pres, index) => {
		// return <li><img className="image-flex" src={`this.state.pillImg[${index}%2]`} /><Prescription /></li>			
		// })

		let prescriptions = [
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillWhiteish.svg" /><div className="list-flex" >Test 1</div></li>,
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillBlue.svg" /><div className="list-flex" >Test 2</div></li>,
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillWhiteish.svg" /><div className="list-flex" >Test 3</div></li>,
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillBlue.svg" /><div className="list-flex" >Test 4</div></li>,
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillWhiteish.svg" /><div className="list-flex" >Test 5</div></li>,
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillBlue.svg" /><div className="list-flex" >Test 6</div></li>,
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillWhiteish.svg" /><div className="list-flex" >Test 7</div></li>,
		<li className="list-item pres-individual-test" ><img className="image-flex" height="60" width="auto" src="pillBlue.svg" /><div className="list-flex" >Test 8</div></li>,
		]

		return (
			<div className="pres-test">
				{prescriptions}
				document.querySelector(".pres-individual-test").each(function(i){
				
			})
			</div>
		)
	}
}
