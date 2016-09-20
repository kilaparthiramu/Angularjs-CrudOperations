/**
 * Created with JetBrains WebStorm.
 * User: rkilaparthi
 * Date: 8/4/16
 * Time: 4:03 PM
 * To change this template use File | Settings | File Templates.
 */
var app=angular.module("myApp",[]);
app.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, Ctrl) {
            function num(text) {
                if (text) {
                    var input = text.replace(/[^0-9]/g, '');

                    if (input !== text) {
                        Ctrl.$setViewValue(input);
                        Ctrl.$render();
                    }
                    return input;
                }
                return undefined;
            }
            Ctrl.$parsers.push(num);
        }
    };
});
app.controller("myCtrl",function($scope,$http){
    $scope.model={};
    $scope.data={
        edit:true,
        add:false,
        noInvalid:false,
        nameInvalid:false,
        descriptionInvalid:false,
        moneyInvalid:false
    };
    $scope.selection = [];
    $scope.books=[ { "no": 1, "name": "os", "description": {"name": "os", "description": "operating system"},"money":1000, "checked": false},
        { "no": 2, "name": "Google","description": {"name": "Google","description": "Browser"},"money":2000, "checked": true},
        { "no": 3,"name": "Edc","description": {"name": "Edc","description": "Electronic devices"},"money":3000,"checked": false},
        { "no": 4, "name": "Daa", "description": {"name": "Daa", "description": "Design analysis"}, "money":4000,"checked": true },
        { "no": 5, "name": "Flat", "description": {"name": "Dbms", "description": "Data Base"},"money":5000,"checked": false },
        { "no": 6,"name": "social", "description": {"name": "Sql", "description": "sequential query"}, "money":6000,"checked": true } ]
    $scope.products=[ {"name": "os", "description": "operating system","checked":false},
        {"name": "Edc","description": "Electronic devices","checked":false},
        {"name": "Daa", "description": "Design analysis","checked":true},
        {"name": "Dbms", "description": "Data Base","checked":false},
        {"name": "Sql", "description": "sequential query","checked":true},
        {"name": "Html", "description":"hipher text","checked":true}]
    $scope.nameChange = function(){
        $scope.model.name=$scope.model.description.name;
    }
    $scope.check = function(){
        $scope.model.name="";
    };
    $scope.add = function(){
        $scope.books.push($scope.model);
            /*$scope.data.add = true;
            if (!$scope.model.no) {
                $scope.data.noInvalid = true;
            } else if (!$scope.model.name) {
                $scope.data.nameInvalid = true;
            } else if (!$scope.model.description) {
                $scope.data.descriptionInvalid = true;
            } else { if ($scope.model.money()) {
                    $scope.data.moneyInvalid = true;
                }
            }
            $scope.displayToaster('success', 'success');*/
        };
    $scope.update = function(){
        $scope.books[$scope.index]= $scope.model;
        $scope.data.edit=true;
    };
    $scope.edit = function(book,index){
        $scope.model=angular.copy(book);
      /*  $scope.model.no = book.no;
        $scope.model.name = book.name;
        $scope.model.description = book.description.description;
        $scope.model.money = book.money;*/
        $scope.index=index;

        // $scope.screenData= angular.copy($scope.model);*/
        $scope.data.edit=false;
        $scope.model.description= _.find($scope.products,function(i){
            return i.description === book.description.description;
        })
    }
    $scope.removeItem = function (x) {
        $scope.books.splice(x,1);
    }
    $scope.clear = function(){
        $scope.model="";
    }

});