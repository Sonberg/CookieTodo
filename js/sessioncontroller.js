(function () {
    todoApp.controller('SessionController', ['$cookies', '$scope', function ($cookies, $scope) {

        // Spara i session
        (function () {
            // Du har varit här tidigiare och din gamala lista ska hämtas
            if (document.cookie.indexOf("sessionTodo") >= 0) {
                $scope.user = 'old';
                console.log($cookies.getObject('sessionTodo'));
                $scope.tasks = ($cookies.getObject('sessionTodo'));
            } else {
                // Nya användare och en ny lista ska sparas i cookie
                $scope.user = 'new';
                $scope.tasks = [
                    {
                        time: new Date(),
                        title: 'Welcome to Cookietodo!',
                        desc: 'It´s easy to add new tasks och clean out the list. Press on the checkbox on the left side to mark this tasks as completed',
                        completed: false
                            }
                ];
                $cookies.putObject('sessionTodo', $scope.tasks);
                console.log($cookies.getObject('sessionTodo'));
            };
        })();

        // Spara nuvarande session
        $scope.saveSession = function () {
            console.log($scope.tasks);
            $cookies.putObject('sessionTodo', $scope.tasks);
        }

        //Återställ och förstör session
        $scope.destroySession = function () {
            $cookies.remove('sessionTodo');
            location.reload();
        }


        // Ta bort slutförda
        $scope.removeCompleted = function () {
            console.log($scope.tasks.length);
            var i = ($scope.tasks.length - 1);
            for (i; i >= 0; i--) {
                if ($scope.tasks.length === 1) {
                    $scope.tasks = [{}];
                    $scope.saveSession();
                } else if ($scope.tasks[i].completed == true) {
                    removeThis(i);
                    $scope.saveSession();
                };
            };

        }

        function removeThis(index) {
            return [$scope.tasks.splice(index, 1)];
        };

}]);
})();