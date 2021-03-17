import { Component } from "react";
import { request } from "../../Util/request";
import { Game } from "../Game/Game";

export default class GameList extends Component {
	constructor() {
		super();
		this.state = { games: [], selected: null };
	}

	async refresh() {
		const games = await request("/games");
		this.setState({ games });
		if (!this.state.selected) this.setState({ selected: games.first() });
	}

	componentDidMount() {
		this.refresh();
	}

	select = (event) => {
		const id = event.target.getAttribute("data-id");
		this.setState({ selected: id });
	};

	create = async (event) => {
		const { id } = await request("/games", { body: { playerCount: 2 } });
		await this.refresh();
		this.setState({ selected: id });
	};

	render() {
		console.log(this.state.selected);
		return (
			<div>
				<ul>
					{this.state.games.map((game) => (
						<li key={game} data-id={game} onClick={this.select}>
							{game}
						</li>
					))}
				</ul>
				<button className="primary button" onClick={this.create}>
					Create new game
				</button>
				{this.state.selected && <Game id={this.state.selected}></Game>}
			</div>
		);
	}
}
