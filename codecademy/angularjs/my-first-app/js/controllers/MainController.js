app.controller('MainController',
  ['$scope', function($scope) {
    $scope.title = 'Some of our books';
    $scope.promo = 'some great resources below';
    $scope.products = [ 
  { 
    name: 'The Book of Trees', 
    price: 19, 
    pubdate: new Date('2014', '03', '08'), 
    cover: 'img/the-book-of-trees.jpg',
    likes: 0,
    dislikes: 0
  }, 
  { 
    name: 'Program or be Programmed', 
    price: 8, 
    pubdate: new Date('2013', '08', '01'), 
    cover: 'img/program-or-be-programmed.jpg',
    likes: 0,
    dislikes: 0 
  }, 
  { 
    name: 'HTML & CSS: Designing and Building Web Sites', 
    price: 19, 
    pubdate: new Date('2011', '11', '08'), 
    cover: 'https://images-na.ssl-images-amazon.com/images/I/41Z2swEmwaL._SX396_BO1,204,203,200_.jpg',
    likes: 0,
    dislikes: 0
  }, 
  { 
    name: 'JavaScript and JQuery: Interactive Front-End Web Development', 
    price: 28, 
    pubdate: new Date('2014', '06', '30'), 
    cover: 'https://images-na.ssl-images-amazon.com/images/I/41oa41LdNdL._SX400_BO1,204,203,200_.jpg',
    likes: 0,
    dislikes: 0
  } 
];
    $scope.minusOne = function(index) {
      $scope.products[index].dislikes +=1;
    };
    $scope.plusOne = function(index) {
      $scope.products[index].likes += 1;
    };
  }]);





