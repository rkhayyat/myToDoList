angular.module('starter.controllers', [])

    .controller('ToDoListCtrl', function ($scope,$ionicModal,$ionicPopup,SQLService) {
    	
    	
    	SQLService.setup();
    	
    	$scope.loadTask = function(){
    		
    		SQLService.all().then(function (results) {
			$scope.toDoListItems = results;
		});
    		
    		
    		
    		
			/*$scope.saved = localStorage.getItem('todos1');
    		$scope.toDoListItems = localStorage.getItem('todos1') !== null ? JSON.parse($scope.saved) : [
			{
	    		"task": "Ionic platform",
	    		"id": 1
	    	},{
	    		"task": "JQuery",
	    		"id": 2
	    	},{
	    		"task": "AngularJS",
	    		"id": 4
	    	},{
	    		"task": "Symfony2",
	    		"id": 5    		
	    	},
			{
	    		"task": "Android",
	    		"id": 6    		
	    	}
			];
    	
	    	localStorage.setItem('todos1', JSON.stringify($scope.toDoListItems));*/
    	}

    	$scope.loadTask();
    	    	
  
    	 $scope.onItemDelete=function(id){
    	 	alert(id);
    		
    		$ionicPopup.confirm({
    			title:'Confirm Delete',
    			content:'Are you sure'
    		}).then(function(res) {
     		if(res) {
     			
     			SQLService.del(id);
     			$scope.loadTask();
     			console.log('You are sure');
     			$scope.loadTask();
     		} else {
       			console.log('You are not sure');
     			}
   			}
   		)}
    	

    	 $scope.onItemEdit=function(id){
    		
    		$ionicPopup.prompt({
   				title: 'Edit Task',
   				subTitle: 'Enter new task', // String (optional). The sub-title of the popup.
   				inputType: 'text',
   				inputPlaceholder: 'Your task'
    		}).then(function(res) {
     			console.log('You edited the task');
     			SQLService.edit(res,id);
     			$scope.loadTask();
   			}
   		)}

    	 $scope.moveItem=function(item,fromIndex,toIndex){
    
    		$scope.toDoListItems.splice(fromIndex,1);    		
    		$scope.toDoListItems.splice(toIndex,0,item);

    		
    	}



/*   	 $http.get('data/ToDoData.json').success(function(data) {
      		$scope.toDoListItems=data;
    	});*/
    	

    	
    	$scope.AddItem = function(data){
    		
    		SQLService.set(data.newItem);
    		/*alert(data.newItem);*/
    		$scope.loadTask();
    		
    		/*var dataObj = {
				task : data.newItem,
				id : 7
				};
    		

	 		$scope.toDoListItems.push(dataObj);
    	    localStorage.setItem('todos1', JSON.stringify($scope.toDoListItems));*/
	 		data.newItem = ' ';
        	$scope.closeModal();
  		};
  
$ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

    });

