    angular
        .module('angularStubApp.header')
        .controller('ModulesMenuController', ModulesMenuController);
    
    function ModulesMenuController(modulesMenuService){
        var vm = this;
        vm.items = modulesMenuService.getItems();
    }