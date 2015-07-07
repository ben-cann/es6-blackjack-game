import lodash from 'lodash';
import Player from './Player';

/**
 * PlayerList
 * Stores array of Players
 * Provides interface to build Players
 * Provides getter for dealer Player
 */
class PlayerList {

	/**
	 * constructor() Creates refs for player array and dealer object
	 * @return {Void}
	 */
	constructor() {
		this.players = [];
		this.dealer = {};
	}

	/**
	 * makePlayers() Creates a new Player for each human and adds to players array
	 * Assigns dealer reference
	 * @param  {Integer} numberOfPlayers
	 * @return {Void}
	 */
	makePlayers(numberOfPlayers) {
		
		_.each(_.range(numberOfPlayers + 1), (id) => {
			let name = id == 0 ? 'Dealer' : 'Player ' + id;
	    	this.players.push(new Player(id, name));
		});

		this.dealer = this.players[0];
	}

	/**
	 * getHandToBeat() Returns best hand from Players, excluding dealer
	 * @return {Integer} player.getTotal()
	 */
	getHandToBeat() {
		let player =  _.max(this.players, (player) => {
			if(player.id!==0 && !player.getBust()) return player.getTotal();
		});
		
		return player.id ? player.getTotal() : 0;
	}

	/**
	 * makeWinners() Sets win state on Players when game is complete
	 * @return {Void} 
	 */
	makeWinners() {
		_.each(this.players, (player) => {
			if(player === this.dealer) {
				if(!player.getBust() && player.getTotal() >= this.getHandToBeat()) {
					player.setWinner();
				}
			} else if(!player.getBust() && player.getTotal() > this.dealer.getTotal() || this.dealer.getBust() && !player.getBust()) {
				player.setWinner();
			}
		});
	}

	/**
	 * resetPlayers() Resets Players to initial state
	 * @return {void}
	 */
	resetPlayers() {
		_.each(this.players, (player) => {
			player.reset();
		});
	}

	/**
	 * getDealer() Getter for dealer
	 * @return {Player} this.dealer
	 */
	getDealer() {
		return this.dealer;
	}

}

export default PlayerList;
