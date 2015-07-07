import angular from 'angular';
import MainController from './main';
 
var moduleName = 'blackjack.controllers';
 
angular.module(moduleName, [])
	.controller('MainController', MainController);

export default moduleName;
