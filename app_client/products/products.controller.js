(function () {
    angular.module('preziAdmin')
.controller('productsCtrl', productsCtrl)
    ;
    
    productsCtrl.$inject = ['$scope', '$http', 'sharedData'];
    function productsCtrl($scope, $http, sharedData) {
        $scope.suppliers = sharedData.getSuppliers();
        $scope.$watch(
            function () { return sharedData.getSuppliers(); }, 
            function (newValue, oldValue) {
                if (newValue !== oldValue) $scope.suppliers = newValue;
        });
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.selectionCount = 0;
        $scope.sortBy = 'name';
        //$scope.editing = false;
        $scope.mode = 'view'; // one of 'view', 'create', 'edit'
        $scope.selectedAll = false;
        $scope.product = { tags:['']};
        $scope.formError = "";
        // find all products from database
        $http.get("/api/products")
            .then(function successCallback(response) {
            $scope.products = response.data;
            calculateRatings($scope.products);
        },
            function errorCallback(response) {
            console.log("error finding all products " + response);
        });
        $scope.checkBoxChanged = function (selected) {
            if (selected)
                $scope.selectionCount++;
            else
                $scope.selectionCount--;
        }
        $scope.selectAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
                $scope.selectionCount = $scope.products.length;
            } else {
                $scope.selectedAll = false;
                $scope.selectionCount = 0;
            }
            angular.forEach($scope.products, function (product) {
                product.selected = $scope.selectedAll;
            });
        }
        $scope.view = function (product) {
            $scope.edit(product);
            $scope.mode = 'view';
        }
        $scope.edit = function (product) {
            /*
            if ($scope.product) {
                $scope.product.isCurrent = false;
            };*/
            $scope.mode = 'edit';
            //product.isCurrent = true;
            //$scope.product = product;
            $scope.product = JSON.parse(JSON.stringify(product)); // make a copy instead
        }
        $scope.cancelEdit = function () {
            var product = $scope.product;
            for (p of $scope.products) {
                if(p._id===product._id) {
                    $scope.product=JSON.parse(JSON.stringify(p));
                    break;
                }
            }
            setPristine($scope.productForm);
        }
        $scope.addPhoto = function () {
            var product = $scope.product;
            if (!product.photos) {
                product.photos = [];
            }
            product.photos.push({ url: '', description: ''});
        }
        $scope.addDisplayedProperty = function () {
            var product = $scope.product;
            if (!product.displayedProperties) {
                product.displayedProperties = [];
            }
            product.displayedProperties.push({ sortOrder: product.displayedProperties.length+1, property: { name: '', value: '' } });
        }
        $scope.addSelectableProperty = function () {
            var product = $scope.product;
            if (!product.selectableProperties) {
                product.selectableProperties = [];
            }
            product.selectableProperties.push({ sortOrder: product.selectableProperties.length+1, property: { name: '', value: '' } });
        }
        $scope.addTag = function () {
            var product = $scope.product;
            if (!product.tags) {
                product.tags = [];
            }
            product.tags.push('');
        }

        $scope.createProduct = function () {
            var product = $scope.product;
            delete product._id;
            product.reviews = [];
            delete product.rating;
            product.supplierName = getSupplierName(product.supplierId);
            //console.log("creating product: after delete id" + product);
            
            $http.post('/api/products', { "product": product })
            .success(function (data) {
                $scope.formError = "Successfully created new Product.";
                $scope.products.push(data);
                $scope.product = JSON.parse(JSON.stringify(data));
                setPristine($scope.productForm);
            })
            .error(function (data) {
                $scope.formError = "Cannot create new Product: " + JSON.stringify(data);
            });
        }
        $scope.updateProduct = function () {
            var product = $scope.product;
            product.supplierName = getSupplierName(product.supplierId);
            //console.log("updating product: " + product);

            $http.put('/api/products/' + product._id, { "product": product })
            .then(function successCallback(response){
                //console.log("updating product: success");
                var products = $scope.products;
                for (i in products) {
                    var s = products[i];
                    if (product._id === s._id) {
                        products[i] = JSON.parse(JSON.stringify(product));
                        break;
                    }
                }
                setPristine($scope.productForm);
            }, function errorCallback(response){
                $scope.formError = "Cannot update product: " + JSON.stringify(response);
            });
        }
        $scope.deleteSelected = function () {
            var count = 0;
            var selectionCount = $scope.selectionCount;
            var products = $scope.products;
            if (selectionCount < 1)
                return;
            //$scope.formError = "deleting selected " + $scope.selectionCount;
            for (i in products) {
                var s = products[i];
                if (s.selected) {
                    $http.delete("/api/products/" + s._id)
                    .then(function successCallback(response) {
                        //$scope.formError = "success:"+ response.headers()['productid'];
                        deleteFromDisplay(response.headers()['productid']);
                        
                        count++;
                    },
                    function errorCallback(response) {
                        //$scope.formError = "cannot delete " + s._id + ", " + response.headers;
                    });
                }
                if (count == selectionCount)
                    break;
            }
        }
        var getSupplierName = function (id) {
            //console.log("looking for supplier id:" + id);
            //console.log("suppliers:" + $scope.suppliers.length);
            if (!id) {
                return '';
            }
            for (supplier of $scope.suppliers) {
                //console.log("checking supplier:"+supplier._id.str);
                if(!supplier.id) {
                    supplier.id=supplier._id.toString();
                }
                if(supplier.id==id) {
                    return supplier.name;
                }
            }
            return '';
        }
        var deleteFromDisplay = function (id) {
            //console.log("working on " + id);
            var products = $scope.products;
            for (i in products) {
                var s = products[i];
                if ($scope.product._id === s._id) {
                    $scope.product = {};
                }
                if (s._id === id) {
                    //products.splice(i, 1);
                    s._id = null;
                }
            }
        };
        
    };
    var setPristine = function (form) {
        if (form.$setPristine) {//only supported from v1.1.x
            form.$setPristine();
        } else {
            
            /*
                 *Underscore looping form properties, you can use for loop too like:
                 *for(var i in form){ 
                 *  var input = form[i]; ...
                 */
                _.each(form, function (input) {
                if (input.$dirty) {
                    input.$dirty = false;
                }
            });
        }
    };
    var calculateRatings = function (products) {
        if (products) {
            for (p of products)
                calculateRating(p);
        }
    }
    var calculateRating = function (product) {
        if (product.reviews.length > 0) {
            product.rating=product.reviews.map((c, i, arr)=> c.rating / arr.length).reduce((p, c) => c + p);
        }
    }
})();