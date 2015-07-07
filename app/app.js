import angular from 'angular';
import ngRoute from 'angular-route';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';

import controllers from './blackjack/controllers/index';
import services from './blackjack/services/index';

export default angular
	.module('blackjack', ['ngRoute', 'ngResource', 'ngCookies', services, controllers]);
