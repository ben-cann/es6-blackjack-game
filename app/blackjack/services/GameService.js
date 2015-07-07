import PlayerList from '../models/PlayerList';
import Deck from '../models/Deck';

/**
 * GameService
 * Core game functionality
 */

const _playerList = new PlayerList();
const _deck = new Deck();

let _totalPlayers = 0;
let _currentPlayerId = 0;
let _currentPlayer = {};
let _dealer = {};
let _ended = false;
let _started = false;

class GameService {

    constructor() {}

    /**
     * start() Creates players based on input
     * Sets Dealer to first player in list
     * @param {Integer} numberOfPlayers Number of players in game
     * @return {Void}
     */
    start(numberOfPlayers) {
        _started = true;
        _totalPlayers = numberOfPlayers;
        _playerList.makePlayers(numberOfPlayers);
        _dealer = _playerList.getDealer();
    }

    /**
     * next() Determines if next player is dealer or human
     * Called from twist when bust
     * Called from controller when sticking
     * @return {Void}
     */
    next() {
        if (_currentPlayerId === _totalPlayers) {
            _currentPlayer = _dealer;
            this.playDealer();
        } else {
            this.nextPlayer();
        }
    }

    /**
     * end() Called when dealer has completed turn
     * Sets hand winners
     * @return {Void}
     */
    end() {
        _playerList.makeWinners();
        _ended = true;
    }

    /**
     * restart() Clears cards of each Player
     * Resets deck
     * Deals new hand
     * @return {Void}
     */
    restart() {
        _currentPlayerId = 0;
        _playerList.resetPlayers();
        _deck.reset();
        _ended = false;
        this.deal();
    }

    /**
     * nextPlayer() Increments current Player
     * @return {Void}
     */
    nextPlayer() {
        _currentPlayerId++;
        _currentPlayer = _playerList.players[_currentPlayerId];
    }

    /**
     * playDealer() Handles decision making for dealers go
     * @return {Void}
     */
    playDealer() {
        if(_dealer.getTotal() >= _playerList.getHandToBeat()) {
            this.end();
        } else {
             _currentPlayer.addCard(_deck.dealCard());
            this.playDealer();
        }
    }

    /**
     * deal() Shuffles the deck, deals each player two cards
     * then starts go of first Player
     * @return {Void}
     */
    deal() {
        _deck.shuffle();
        _.each(_playerList.players, (player) => {
            player.addCard(_deck.dealCard());
            player.addCard(_deck.dealCard());
        });
        this.next();
    }

    /**
     * twist() Adds new card to current players hand
     * checks if player is bust, if so calls next()
     * @return {Void}
     */
    twist() {
        _currentPlayer.addCard(_deck.dealCard());
        if (_currentPlayer.getBust()) this.next();
    }

    /**
     * setTotalPlayers() sets the number of total players
     * @param {Integer} totalPlayers
     * @return {Void} 
     */
    setTotalPlayers(totalPlayers) {
        _totalPlayers = totalPlayers;
    }

    /**
     * getStarted() Getter for started
     * @return {Boolean} _started
     */
    getStarted() {
        return _started;
    }
    /**
     * getEnded() Getter for ended
     * @return {Boolean} _ended
     */
    getEnded() {
        return _ended;
    }

    /**
     * getPlayers() Getter for player list array
     * @return {Array} _playerList.players
     */
    getPlayers() {
        return _playerList.players;
    }

    /**
     * getCurrentPlayer() Getter for current Player
     * @return {Player} _currentPlayer
     */
    getCurrentPlayer() {
        return _currentPlayer;
    }
}

export default GameService;
