
import angular from 'angular';
import css from './main.less';

class MainController {
	
	 
	constructor($scope, gameService) {


		$scope.start = function() {
			gameService.start($scope.numberOfPlayers);
			gameService.deal();
			$scope.playerList = gameService.getPlayers();
		}
		
		$scope.twist = function() {
			gameService.twist();
		};

		$scope.stick = function() {
			gameService.next();
		};

		$scope.restart = function() {
			gameService.restart();
		}

		$scope.getCurrentPlayer = function() {
			return gameService.getCurrentPlayer();
		}

		$scope.getEnded = function() {
			return gameService.getEnded();
		}

		$scope.getStarted = function() {
			return gameService.getStarted();
		}

	}

}

MainController.$inject = ['$scope', 'blackjack.services.game'];

export default MainController;
