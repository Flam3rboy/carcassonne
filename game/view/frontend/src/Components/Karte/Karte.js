import { Constants } from "carcassonne-logic/dist";
import React, { Component } from "react";

export class Karte extends Component {
	constructor(props) {
		super(props);
		this.state = { rotation: this.props.rotation || 0 };
	}

	componentWillReceiveProps() {
		this.setState({ rotation: this.props.rotation || 0 });
	}

	rotate = () => {
		console.log("click", this.state);
		if (!this.props.canRotate) return;

		this.setState({ rotation: (this.state.rotation + 1) % 4 });
	};

	render() {
		const { id, className, canRotate, wappen } = this.props;
		const kartenName = Constants.KARTEN[id];
		const pfad = `/res/OriginalKarten/${kartenName}${wappen ? "Wappen" : ""}.png`;

		return (
			<div
				onClick={this.rotate}
				key={id}
				style={{ transform: `rotate(${this.state.rotation * 90}deg)` }}
				className={"karte " + (canRotate ? "canRotate " : "") + (className || "")}
			>
				{kartenName && <img src={pfad} alt={kartenName}></img>}
			</div>
		);
	}
}
