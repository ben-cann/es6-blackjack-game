import lodash from 'lodash';

/**
 * Player 
 * 
 * Stores id and name of player
 * Stores hand Array containing list of players current cards
 * 
 * Provides method to add card to Player hand
 * Provides method to total value of Player hand
 * 
 * Provides state for bust and win 
 */
class Player {

	/**
	 * constructor() sets id, name, creates hand array
	 * @param  {Integer} id
	 * @param  {String} name
	 * @return {Void}
	 */
	constructor(id, name) {
		this.id = id;
		this.name = name;
		this.hand = [];
		this.winner = false;
	}

	/**
	 * addCard() Adds card to Players hand
	 * Checks if hand contains an Ace
	 * @param {Card} card
	 */
	addCard(card) {
		// console.log('adding card', card);
		this.hand.push(card);
		this.checkAces();


	}

	/**
	 * checkAces() Called each time a new card is added to the Players hand
	 * If the Players hand is bust it checks if they have an Ace which
	 * can be flipped to unbust them.
	 * @return {Void}
	 */
	checkAces() {
		if (this.getBust()) {
			let foundAce = false;
			_.each(this.hand, (card) => {
				if (card.id === 1 && card.value === 11 && !foundAce) {
					card.value = 1;
				}
			});
		}
	}

	/**
	 * reset() Resets player hand and win state
	 */
	reset() {
		this.winner = false;
		this.hand = [];
	}

	/**
	 * setWinner() Sets win state to true
	 */
	setWinner() {
		this.winner = true;
	}

	/**
	 * getWinner() Returns win state
	 * @return {Boolean} this.winner
	 */
	getWinner() {
		return this.winner;
	}

	/**
	 * getBust() Getter for Player being bust, if their total is > 21
	 * @return {Boolean} 
	 */
	getBust() {
		return this.getTotal() > 21;
	}

	/**
	 * getTotal() Get total of Card.value in hand
	 * @return {Integer}
	 */
	getTotal() {
		return _.reduce(this.hand, (total, card) => {
			total += card.value;
			return total;
		}, 0);
	}

}

export default Player;
