angular
    .module('eArkPlatform.order')
    .factory('orderService', orderService);

function orderService($http) {
    var service = {
        getUserOrderHistory: getOrderHistory,
        getOrderDetail: getOrderDetail
    };

    return service;

    function getOrderHistory(userName) {
        return $http.get('/api/getOrders?userName='+ userName).then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
                return response.statusText;
            }
        );
    }

    function getOrderDetail(orderId) {

        return $http.get('/api/getOrderData?orderId=' + orderId).then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    }
}