angular
    .module('eArkPlatform.ordermanagement')
    .factory('ordermanagementService', ordermanagementService);

function ordermanagementService($http, $filter) {
    var service = {
        getOrders: getOrders,
        getOrder: getOrder,
        getArchivists: getArchivists,
        updateOrder: updateOrder,
        processOrder: processOrder
    };

    return service;

    function getOrders() {
        return $http.get('/api/getOrders').then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };
    
    function getOrder(orderId) {
        return $http.get('/api/getOrderData?orderId=' + orderId).then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };
    
    function updateOrder(queryObj) {
        
        console.log($filter('json')(queryObj));
        return $http.put('/api/updateOrder', $filter('json')(queryObj)).then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };
    
    function getArchivists() {
        return $http.get('/api/getArchivists').then(
            function (response) {
                return response.data;
            }, function (response) {
                console.log('nasty error');
            }
        );
    };

    //TODO: resolve this interface call
    function processOrder(order) {
        return $http.post('/earkweb/submitOrder', order).then(
            function (response) {
                console.log('Post order for execute: Success');
                return response.data;
            }, function (response) {
                console.log('Post order for execute: Error');
                return false;
            }
        );
    }

}