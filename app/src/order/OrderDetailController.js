angular.module('eArkPlatform.order').controller('MyOrderDetailController', OrderDetailController);

/**
 * Main controller for the order management module
 */
function OrderDetailController($stateParams, orderService, fileUtilsService, $mdDialog) {
    var oddCtrl = this;
    oddCtrl.orderId = $stateParams.orderId;
    oddCtrl.data = [];
    oddCtrl.assigneeSelector = 'none';
    oddCtrl.fileInfoDiag = fileInfoDiag;
    oddCtrl.refreshOrderDetails = refreshOrderDetails;

    oddCtrl.refreshOrderDetails(oddCtrl.orderId);

    function refreshOrderDetails(oid) {
        orderService.getOrderDetail( oid ).then(function(response) {
            response.items.forEach(function (item) {
                var pathparts1 = item.path.split('/');
                item.filename = pathparts1[pathparts1.length - 1];
                var pathparts2 = item.packageId.split(':');
                item.eadid_s = pathparts2[pathparts2.length - 1];
                
                item.eadaccessrestrict_s = item.confidential;
            });
            oddCtrl.data = response;
        });
    }

    function fileInfoDiag(ev, doc) {
        $mdDialog.show({
          controller: fileInfoDialogController,
          templateUrl: 'app/src/order/view/fileInfoDiag.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: { document: doc },
          clickOutsideToClose: true,
          fullscreen: true
        });
    }
    function fileInfoDialogController($scope, $mdDialog, document) {
        var fidc = this;
        
        $scope.doc = document;
        
        $scope.hide = function() {
          $mdDialog.hide();
        };
    
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
    }
}