app.directive('feedsterPost', function() {
  return {
    restruct: 'E',
    scope: {
      post: "="
    },
    templateUrl: 'js/directives/feedsterPost.html'
  };
});