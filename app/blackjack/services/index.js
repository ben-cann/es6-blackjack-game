import angular from 'angular';
import GameService from './GameService';
 
var moduleName = 'blackjack.services';
 
angular.module(moduleName, [])
	.service('blackjack.services.game', GameService);
 
export default moduleName;
