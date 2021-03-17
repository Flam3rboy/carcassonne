import { Component, createRef, Fragment } from "react";
import { request } from "../../Util/request";
import "./Game.scss";
import { Karte } from "../Karte/Karte";
import { Constants } from "carcassonne-logic";
const { RICHTUNGEN } = Constants;

export class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			karten: [[]],
			spieler: [],
			ziehstapelLänge: 0,
			loaded: false,
			letzteKarte: null,
			error: null,
			selectedFigur: null,
		};
		this.vorschau = createRef();
	}

	refresh = async () => {
		const game = await request(`/games/${this.props.id}/`);
		this.setState({ ...game, loaded: true });
	};

	componentWillReceiveProps() {
		this.refresh();
	}

	componentDidMount() {
		this.refresh();
	}

	hierPlatzieren = async (event) => {
		console.log(event);
		const { target } = event;
		const x = parseInt(target.getAttribute("data-x"));
		const y = parseInt(target.getAttribute("data-y"));
		const { rotation } = this.vorschau.current.state;
		await request(`/games/${this.props.id}/legen`, {
			body: { x, y, rotation, figur: this.state.selectedFigur },
		}).catch((e) => this.setState({ error: e.error }));
		this.setState({ selectedFigur: null });
		await this.refresh();
	};

	selectFigur = (event) => {
		const figur = event.target.control.value;
		if (this.state.selectedFigur === figur) return this.setState({ selectedFigur: null });

		this.setState({ selectedFigur: parseInt(figur) });
	};

	render() {
		return (
			<div className="spiel">
				<h1>Spiel {this.props.id}</h1>
				<div className="split">
					<div className="control">
						<button className="primary button refresh" onClick={this.refresh}>
							Refresh
						</button>
						<br></br>
						Ziehstapel:
						<br></br>
						<Karte
							ref={this.vorschau}
							canRotate={true}
							className="vorschau"
							id={this.state.letzteKarte}
						></Karte>
						<div className="error">{this.state.error}</div>
					</div>
					<div className="figuren">
						<h3>Figur</h3>
						<div className="table">
							{Object.keys(RICHTUNGEN).map((figur) => (
								<div>
									<input
										id={`radio${figur}`}
										type="radio"
										name="figur"
										value={figur}
										checked={this.state.selectedFigur == figur}
										readOnly
									></input>
									<label onClick={this.selectFigur} htmlFor={`radio${figur}`}></label>
								</div>
							))}
						</div>
					</div>
					<div className="spielerliste">
						{this.state.spieler.map((spieler) => {
							return (
								<div key={spieler._id}>
									{spieler._id}. Spieler Punkte: {spieler._punkte}
								</div>
							);
						})}
					</div>
				</div>
				<br></br>
				<hr></hr>
				<br></br>
				<div className="gitter">
					{this.state.loaded &&
						mapMinuxIndexArray(this.state.karten, (spalte, y) => {
							return (
								<div key={y} className="reihe">
									{mapMinuxIndexArray(spalte, (eintrag, x) => {
										if (!eintrag || !eintrag.fläche)
											return (
												<div
													onClick={this.hierPlatzieren}
													data-x={x}
													data-y={y}
													className="karte"
												></div>
											);
										return (
											<Fragment>
												<Karte
													wappen={eintrag.wappen}
													id={eintrag.fläche}
													rotation={eintrag.rotation}
												></Karte>
											</Fragment>
										);
									})}
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}

function mapMinuxIndexArray(arr, map) {
	return Object.keys(arr)
		.map((x) => parseInt(x))
		.sort((a, b) => a - b)
		.map((x) => map(arr[x], x));
}
