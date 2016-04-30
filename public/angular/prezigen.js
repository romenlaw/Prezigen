angular.module('prezigen', []);

var productListCtrl = function ($scope){
    $scope.data = {
        products: [
            {
                name : 'Personalised Chocolate',
                sku : 'sji0934827',
                price : '16.50',
                orderUrl : 'http://google.com',
                photos : [
                    { url : '/images/sample_product.jpg', description : 'dark chocolate' },
                    { url : '/images/sample_product2.jpg', description: 'white chocolate' }, 
                    { url : '/images/sample_product3.jpg' }],
                description : "Personalised Chocolate box is included in our catalog because it's a nice little gift and flexible enough to give to anyone. If you have tried it and like it - or if you don't - please leave a review to help other people just like you.",
                tags : ['food & drink'],
                displayedProperties : [
                    { sortOrder: 1, property : { name: "What\'s in the box?", value: "20 pieces of Belgian dark or white chocolate with letters arranged into your personalised message to that special someone." } },
                    { sortOrder: 3, property : { name: "Weight: ", value : "120g" } },
                    { sortOrder: 2, property : { name: "Dimension (L x W x H): ", value: "30cm x 20cm x 1.5cm" } }
                ],
                selectableProperties : [
                    { property: { name: "Color", value : ["Dark", "White"] }, sortOrder: 2 },
                    { property : { name: "Personalised Message", value : "" }, sortOrder: 1 }
                ],
                rating: 3.5,
                reviews : [
                    {
                        userName : 'joe1983',
                        date : '12 March 2016',
                        comment : "What a treat! It's really a great gift for anyone.",
                        rating : 5
                    },
                    {
                        userName : 'romen',
                        date : '18 March 2016',
                        comment : "Looks great and taste great. The only draw back is the extra calories.",
                        rating : 4
                    },
                    {
                        userName : 'chris938',
                        date : '20 March 2016',
                        comment : "My chocolate melted.",
                        rating : 3
                    }
                ]
            },
            {
                name : 'A Plot of Land on the Moon',
                sku : 'ieu8736112',
                price : '59.95',
                orderUrl : 'https://www.google.com.au/?gws_rd=ssl#q=javascript+json+print+name',
                photos : [
                    { url : 'http://en.es-static.us/upl/2012/09/moon_8-31-2012_Priya_Kumar_Muscat_Masqat_Oman.jpeg' }
                ],
                description : "Own your own block of land on the moon and have an official certificate to prove it!",
                tags : ['space'],
                displayedProperties : [
                    { sortOrder: 1, property: { name: "Size", value : "1x1 sqm block on the moon" } }
                ],
                selectableProperties : [
                    { sortOrder: 1, property: { name: "Name of land title", value : "" } }
                ]
            }
        ]
    }
}
var ratingStars = function () {
  return {
    // restrict: 'EA',
    scope: {
      thisRating : '=rating'
    },
    // template : "{{ thisRating }}"
    templateUrl: '/angular/rating-stars.html'
  };
};
angular.module('prezigen')
    .controller('productListCtrl', productListCtrl)
    .directive('ratingStars', ratingStars)
    ;