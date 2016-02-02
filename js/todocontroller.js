(function () {
    todoApp.controller('TodoController', ['$scope', function ($scope) {

        //Visa / dölj info-panel för varje task
        $scope.displayInfo = function (event) {
            $(event.target).parentsUntil('.items').find('.panel-body').slideToggle();
        };

        // Lägg till nya tasks
        $scope.addTask = function () {
            $scope.tasks.push({
                time: new Date(),
                title: $scope.newTitle,
                desc: $scope.newDesc,
                completed: false

            });

            $scope.tab = 'incompleted';
            $('ul.nav-pills li').removeClass('active');
            $('ul.nav-pills li.incompleted').addClass('active');
            $scope.newTitle = '';
            $scope.newDesc = '';
            return $scope.saveSession();
        };

        // Räkna antalen tasks som inte är slutförda
        function countIncomplete() {
            var count = 0;
            var i = 0;
            for (i; i < $scope.tasks.length; i++) {
                if ($scope.tasks[i].completed == false) {
                    $('.checkbox').find('b').removeClass('strike-completed');
                    count++;
                } else {
                    $('.checkbox').find('b').addClass('strike-completed');
                }
            };
            return $scope.countIncomplete = count;
        }


        //Ändra position för klassen 'active'
        function changeActive(tab) {
            $('ul.nav-pills li').removeClass('active');
            $().addClass('active');
        }

        // Navigation och tabbar
        $scope.tab = 'incompleted';
        $scope.tabSet = function (tab) {
            $scope.tab = tab;
        };
        $scope.tabToggle = function (task) {
            if ($scope.tab == 'incompleted') {
                $scope.countIncomplete = countIncomplete();
                $('form').show();
                return (task.completed == false);
            } else {
                $('form').hide();
                $scope.countIncomplete = countIncomplete();
                return (task.completed == true);
            }
        };

    }]);
})();