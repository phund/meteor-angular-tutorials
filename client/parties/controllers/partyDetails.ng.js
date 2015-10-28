angular.module("socially").controller("PartyDetailsCtrl", function($scope, $stateParams, $meteor) {
  // $scope.partyId = $stateParams.partyId;
  $scope.party = $meteor.object(Parties, $stateParams.partyId);
  $scope.users = $meteor.collection(Meteor.users, false).subscribe('users');
  $scope.$meteorSubscribe('parties');

  $scope.save = function() {
    $scope.party.save().then(function(numberOfDocs){
      console.log('save success doc affected ', numberOfDocs);
    }, function(error){
      console.log('save error', error);
    });
  };

  $scope.reset = function() {
    $scope.party.reset();
  };

  $scope.invite = function(user){
    $meteor.call('invite', $scope.party._id, user._id).then(
      function(data){
        console.log('success inviting', data);
      },
      function(err){
        console.log('failed', err);
      }
    );
  };

});