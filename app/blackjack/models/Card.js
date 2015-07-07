/**
 * Card
 * Stores suit, id, value and label
 */
class Card {

    /** 
     * constructor() takes suit and id
     * sets value and label
     * @param  {String} suit
     * @param  {Integer} id
     * @return {Void}
     */
    constructor(suit, id) {
        this.suit = suit;
        this.id = id;
        // used to calculate hand score
        this.value = this.makeValue(id);
        // used to set class for card div
        this.label = this.makeLabel(id);
    }

    /**
     * makeValue() Determines value of card based on its id
     * @param  {Integer} id
     * @return {Integer} id or int
     */
    makeValue(id) {
        // is an ace
        if (id === 0) return 11;
        // is a face card
        if (id > 9) return 10;
        // is a normal card
        return id + 1;
    }

    /**
     * makeLabel() Determines label of card based on its id
     * @param  {Integer} id
     * @return {String} 
     */
    makeLabel(id) {
        // is an ace
        if (id === 0) return 'A';
        // is a jack, queen or king
        if (id === 10) return 'J';
        if (id === 11) return 'Q';
        if (id === 12) return 'K';
        // is a normal card
        return String(Number(id+1));
    }

}

export default Card;
