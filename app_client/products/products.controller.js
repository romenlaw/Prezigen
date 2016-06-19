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
        //$scope.editing = false;
        $scope.mode = 'view'; // one of 'view', 'create', 'edit'
        $scope.selectedAll = false;
        $scope.product = { tags:['']};
        $scope.formError = "";
        // find all products from database
        $http.get("/api/products")
            .then(function successCallback(response) {
            $scope.products = response.data;
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
        $scope.addContact = function () {
            var product = $scope.product;
            if (!product.photos) {
                product.photos = [];
            }
            product.photos.push({ });
        }
        $scope.addPhoto = function () {
            var product = $scope.product;
            if (!product.photos) {
                product.photos = [];
            }
            product.photos.push({ url: '', description: ''});
        }
        $scope.addTag = function () {
            var product = $scope.product;
            if (!product.tags) {
                product.tags = [];
            }
            product.tags.push('');
        }
        $scope.createproduct = function () {
            var product = $scope.product;
            delete product._id;
            console.log("creating product: after delete id" + product);
            
            $http.post('/api/products', { "product": product })
            .success(function (data) {
                //$scope.formError = "Successfully created new Suppier.";
                $scope.products.push(data);
                $scope.product = JSON.parse(JSON.stringify(data));
                setPristine($scope.productForm);
            })
            .error(function (data) {
                $scope.formError = "Cannot create new Suppier: " + data;
            });
        }
        $scope.updateproduct = function () {
            var product = $scope.product;
            //console.log("updating product: " + product);

            $http.put('/api/products/' + product._id, { "product": product })
            .then(function successCallback(response){
                console.log("updating product: success");
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
                $scope.formError = "Cannot update Suppier: " + response.status+":"+response.data.message;
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
                    /*
                    .success(function(data, status, headers, config) {
                        $scope.formError = "success:"+headers;
                        //deleteFromDisplay(response.getHeader("productid"));
                        
                        count++;
                    })
                    .error(function(data, status, headers, config) {
                        $scope.formError = "cannot delete " + s._id + ", " + response.headers;
                    });
                     */ 
                }
                if (count == selectionCount)
                    break;
            }
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
        //////////////////////////////////////////////////////////////////////////////////
        /*
        $scope.products = [
            {
                _id: "989803282",
                name: "ABC Co.",
                abn: '03284727229',
                status: 'Active',
                description: 'Large retailer of office supplies in the St George area, Sydney.',
                tags: ['office', 'good'],
                addresses: [
                    {
                        line1: '238 Bourke St',
                        line2: '',
                        suburb: 'Oatley',
                        state: 'NSW',
                        postcode: '2223',
                        country: 'Australia'
                    }
                ],
                email: 'admin@abc.com.au',
                contacts: [
                    {
                        fullName: 'John Doe',
                        gender: 'M',
                        phoneNumber: '0298730984',
                        mobileNumber: '0453987234',
                        email: 'jdoe@abc.com.au',
                        remarks: 'sales director'
                    }
                ]
            },
            {
                _id: "098239873209",
                name: "Babys R Us",
                abn: '928282394333',
                status: 'Active',
                description: "product for infant and parenting needs",
                tags: ['baby', 'parent'],
                addresses: [
                    {
                        label: "head office",
                        line1: "1 Big Ave",
                        suburb: 'Melbourne',
                        state: 'VIC',
                        postcode: '3000',
                    },
                    {
                        label: "warehouse",
                        line1: "2 Sussex St",
                        suburb: 'Sydney',
                        state: 'NSW',
                        postcode: '2000',
                    }
                ],
                email: 'sales@babysrus.com',
                contacts: [
                    {
                        fullName: 'Jane Doe',
                        gender: 'F',
                        phoneNumber: '0398757476',
                        mobileNumber: '0454567234',
                        email: 'jdoe@babiesrus.com',
                        remarks: 'partner mgmt dpt.'
                    },
                    {
                        fullName: "Chris O'Donnel",
                        gender: 'M',
                        phoneNumber: '0398757476',
                        mobileNumber: '0454549873',
                        email: 'codonnel@babiesrus.com',
                        remarks: 'billing department'
                    }
                ]
            }
        ];
         */
        
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
})();