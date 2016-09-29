angular
    .module('eArkPlatform.search')
    .controller('AdvSearchController', AdvSearchController);

/**
 * Main Controller for the Search module
 * @param $scope
 * @constructor
 */
function AdvSearchController($scope, searchService, basketService, fileUtilsService) {
    
    var sctrl = this;
    
    sctrl.searchStr = '';
    sctrl.searchInputs = [];
    sctrl.searchResults = {};
    sctrl.orderBy = '';
    sctrl.filterBy = { title: '', packageId: '' };
    
    sctrl.executeSearch = executeSearch;
    sctrl.sortThis = sortThis;
    sctrl.addInput = addInput;
    
    sctrl.addInput();
    
    function executeSearch() {
        console.log('searching inputs: ' + sctrl.searchInputs.length);
        console.log(sctrl.searchInputs);
        
        sctrl.searchStr = '';
        for (var i in sctrl.searchInputs) {
            sctrl.searchStr = sctrl.searchStr + ' ' + sctrl.searchInputs[i].operator + ' content:"' + sctrl.searchInputs[i].term + '"';
        };
        
        console.log(sctrl.searchStr);
        
        sctrl.searchResults = {};
        var queryObj = {
            q: sctrl.searchStr,
            rows: 25,
            start: 0,
            wt: "json"
        };
        var encTerm = searchService.objectToQueryString(queryObj);
        console.log(encTerm);

        searchService.aipSearch(encTerm).then(function (response) {
            if (response.numFound > 0) {
                basketService.currentSearch = {
                    documents: response.docs, //An array of objects
                    numberFound: response.numFound
                };
                
                //Let's clean up some of the properties. Temporary solution
                basketService.currentSearch.documents.forEach(function (item) {
                    item.title = item.path.substring(item.path.lastIndexOf('/') + 1, item.path.lastIndexOf('.'));
                    item.packageId = item.package.substring(item.package.indexOf('_') + 1);
                    item.thumbnail = fileUtilsService.getFileIconByMimetype(item.contentType, 24)
                    item.displaySize = formatBytes(item.size);
                });
                sctrl.searchResults = basketService.currentSearch;
            }
        });
    }
    
    function addInput() {
        sctrl.searchInputs.length
        var inputObj = { term: '', operator: 'OR' };
        sctrl.searchInputs.push( inputObj );
        sctrl.searchInputs[0].operator = '';
    }
    
    function sortThis( $event, sortParameter ) {
        if (sctrl.orderBy === sortParameter) {
            sctrl.orderBy = '-' + sortParameter;
        } else if (sctrl.orderBy === '-' + sortParameter) {
            sctrl.orderBy = '';
        } else {
            sctrl.orderBy = sortParameter;
        }
    }
    
    function formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

}