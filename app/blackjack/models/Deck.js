import lodash from 'lodash';
import Card from './Card';

/**
 * Deck
 * 
 * Builds Array of cards for use in game
 * 
 * Provides method to add Card to Player hand
 * Provides methods to shuffle and reset deck
 */

const _suits = ['hearts', 'diams', 'clubs', 'spades'];
const _cardsPerSuit = 13;

let _cardArray = [];
let _usedCardArray = [];

class Deck {

    /**
     * constructor() Calls makeCards() to build deck
     * @return {Void}
     */
    constructor() {
        this.makeCards();
    }

    /**
     * makeCards() Build the deck of cards
     * @return {void}
     */
    makeCards() {
        _.each(_suits, (suit) => {
            _.each(_.range(_cardsPerSuit), (id) => {
                _cardArray.push(new Card(suit, id));
            });
        });
    }

    /**
     * dealCard() Returns card at front of _cardArray
     * Removes from _cardArray and adds to _usedCardArray for retrieval
     * @return {Card} card
     */
    dealCard() {
        let card = _cardArray.shift();
        _usedCardArray.push(card);
        return card;
    }

    /**
     * shuffle() Shuffles cards using Fisher-Yates method
     * @return {void}
     */
    shuffle() {
        _cardArray = _.shuffle(_cardArray);
    }

    /**
     * reset() Returns used cards to deck and clears used card array
     * @return {void}
     */
    reset() {
        _cardArray = _cardArray.concat(_usedCardArray);
        _usedCardArray = [];
    }

}

export default Deck;

