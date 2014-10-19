'use strict';

/**
 * @ngdoc overview
 * @name CNAE
 * @description
 * # CNAE
 *
 * Main module of the application.
 */


(function () {
    var app = angular.module('CNAE', ['ngAnimate', 'ui.bootstrap','angular-loading-bar']);
    
    app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    }]);
    app.filter('startFrom', function () {
        return function (input, start) {

            if (input) {
                if (start === 0) {
                    start = 1;
                }
                var s = input.length;
                if (s > 0) {
                    start = +start; //parse to int
                    console.log(start);
                    return input.slice(start);
                } else {
                    return [];
                }
            }
            return [];
        };
    });
    app.controller('IndexCNAEController', ['$scope', '$http',
        function ($scope, $http) {
            $scope.cnaes = {};
            $scope.cnaes.result = {};




            /* GetCNAES */
            $scope.getcnaes = function (search) {
                $http({
                    method: 'GET',
                    url: 'http://open.nfe.io/v1/cnaes/search?text=' + search + '&apikey=b58801a82418463f961cff952b27baaa'
                }).success(function (data) {
                    $scope.cnaes.result = data;

                    /*{ codigo: data.codigo,
                        secao: data.secao,
                        divisao: data.divisao,
                        grupo: data.grupo,
                        classe: data.classe,
                        subclasse: data.subclasse,
                        descricao: data.descricao,
                        impeditivoSN: data.impeditivosimplesnacional,
                        permitidoSN: data.permitidosimplesnacional}
                    */



                    $scope.paginacao(data);

                    // console.log(data);

                }).error(function (err) {

                    console.log(err);
                });
                //   console.log(Codigo);  
            };
            $scope.callload = function () {
                if (event.keyCode === 13) {
                    var search = $scope.search;
                    //    console.log(search);
                    if (search !== '') {
                        $scope.getcnaes(search);
                    }
                }

            };
            $scope.loadmain = function () {

                var search = $scope.search;
                // console.log(search);
                if (search !== '') {
                    $scope.getcnaes(search);

                }
            };

            $scope.loadmain = function () {

                var search = $scope.search;
                // console.log(search);
                if (search !== '') {
                    $scope.getcnaes(search);

                }
            };

            $scope.allcheck = function () {
                var isn = $scope.impeditivoSimplesNacional;
                var psn = $scope.permitidoSimplesNacional;
                $scope.togetherSimplesNacional = false;
                if (isn === false && psn === false) {
                    $scope.impeditivoSimplesNacional = '';
                    $scope.permitidoSimplesNacional = '';

                }
                if (isn === true && psn === true) {
                    $scope.togetherSimplesNacional = true;
                }

            };
            $scope.allcheckall = function () {
                if ($scope.togetherSimplesNacional === true) {
                    $scope.impeditivoSimplesNacional = true;
                    $scope.permitidoSimplesNacional = true;
                } else {
                    $scope.impeditivoSimplesNacional = '';
                    $scope.permitidoSimplesNacional = '';
                }

            };

            $scope.showclick = function (name) {
                var sname = $scope.name;
                // console.log(sname);
            };

            /*Paging*/

            $scope.paginacao = function (data) {
                $scope.list = data;
                $scope.currentPage = 1; //current page
                $scope.entryLimit = 50; //max no of items to display in a page
                $scope.filteredItems = $scope.list.length; //Initially for no filter

                //  $scope.totalItems = $scope.list.length;

                $scope.maxSize = 5;
                $scope.bigTotalItems = $scope.filteredItems;
                $scope.bigCurrentPage = 1;

            };


            $scope.pageChanged = function () {
                $scope.currentPage = $scope.bigCurrentPage;
            };

            $scope.sort_by = function (predicate) {
                $scope.predicate = predicate;
                $scope.reverse = !$scope.reverse;
            };


            /*end paging*/


    }]);




    app.directive('result', function () {
        return {
            restrict: 'E',
            templateUrl: '/views/cnaes_search.html'
        };

    });




})();