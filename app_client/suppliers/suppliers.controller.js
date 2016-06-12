(function () {
    angular.module('preziAdmin')
.controller('suppliersCtrl', suppliersCtrl)
    ;
    
    suppliersCtrl.$inject = ['$scope', '$http'];
    function suppliersCtrl($scope, $http) {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.selectionCount = 0;
        //$scope.editing = false;
        $scope.mode = 'view'; // one of 'view', 'create', 'edit'
        $scope.selectedAll = false;
        $scope.supplier = { tags:['']};
        $scope.formError = "";
        // find all suppliers from database
        $http.get("/api/suppliers")
            .then(function successCallback(response) {
            $scope.suppliers = response.data;
        },
            function errorCallback(response) {
            console.log("error finding all suppliers " + response);
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
                $scope.selectionCount = $scope.suppliers.length;
            } else {
                $scope.selectedAll = false;
                $scope.selectionCount = 0;
            }
            angular.forEach($scope.suppliers, function (supplier) {
                supplier.selected = $scope.selectedAll;
            });
        }
        $scope.view = function (supplier) {
            $scope.edit(supplier);
            $scope.mode = 'view';
        }
        $scope.edit = function (supplier) {
            /*
            if ($scope.supplier) {
                $scope.supplier.isCurrent = false;
            };*/
            $scope.mode = 'edit';
            //supplier.isCurrent = true;
            //$scope.supplier = supplier;
            $scope.supplier = JSON.parse(JSON.stringify(supplier)); // make a copy instead
        }
        $scope.cancelEdit = function () {
            var supplier = $scope.supplier;
            for (s of $scope.suppliers) {
                if(s._id===supplier._id) {
                    $scope.supplier=JSON.parse(JSON.stringify(s));
                    break;
                }
            }
            setPristine($scope.supplierForm);
        }
        $scope.addContact = function () {
            var supplier = $scope.supplier;
            if (!supplier.contacts) {
                supplier.contacts = [];
            }
            supplier.contacts.push({});
        }
        $scope.addAddress = function () {
            var supplier = $scope.supplier;
            if (!supplier.addresses) {
                supplier.addresses = [];
            }
            supplier.addresses.push({});
        }
        $scope.addTag = function () {
            var supplier = $scope.supplier;
            if (!supplier.tags) {
                supplier.tags = [];
            }
            supplier.tags.push('');
        }
        $scope.createSupplier = function () {
            var supplier = $scope.supplier;
            delete supplier._id;
            console.log("creating supplier: after delete id" + supplier);
            
            $http.post('/api/suppliers', { "supplier": supplier })
            .success(function (data) {
                //$scope.formError = "Successfully created new Suppier.";
                $scope.suppliers.push(data);
                $scope.supplier = JSON.parse(JSON.stringify(data));
                setPristine($scope.supplierForm);
            })
            .error(function (data) {
                $scope.formError = "Cannot create new Suppier: " + data;
            });
        }
        $scope.updateSupplier = function () {
            var supplier = $scope.supplier;
            //console.log("updating supplier: " + supplier);

            $http.put('/api/suppliers/' + supplier._id, { "supplier": supplier })
            .then(function successCallback(response){
                console.log("updating supplier: success");
                var suppliers = $scope.suppliers;
                for (i in suppliers) {
                    var s = suppliers[i];
                    if (supplier._id === s._id) {
                        suppliers[i] = JSON.parse(JSON.stringify(supplier));
                        break;
                    }
                }
                setPristine($scope.supplierForm);
            }, function errorCallback(response){
                $scope.formError = "Cannot update Suppier: " + response.status+":"+response.data.message;
            });
        }
        $scope.deleteSelected = function () {
            var count = 0;
            var selectionCount = $scope.selectionCount;
            var suppliers = $scope.suppliers;
            if (selectionCount < 1)
                return;
            //$scope.formError = "deleting selected " + $scope.selectionCount;
            for (i in suppliers) {
                var s = suppliers[i];
                if (s.selected) {
                    $http.delete("/api/suppliers/" + s._id)
                    .then(function successCallback(response) {
                        //$scope.formError = "success:"+ response.headers()['supplierid'];
                        deleteFromDisplay(response.headers()['supplierid']);
                        
                        count++;
                    },
                    function errorCallback(response) {
                        //$scope.formError = "cannot delete " + s._id + ", " + response.headers;
                    });
                    /*
                    .success(function(data, status, headers, config) {
                        $scope.formError = "success:"+headers;
                        //deleteFromDisplay(response.getHeader("supplierid"));
                        
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
            var suppliers = $scope.suppliers;
            for (i in suppliers) {
                var s = suppliers[i];
                if ($scope.supplier._id === s._id) {
                    $scope.supplier = {};
                }
                if (s._id === id) {
                    //suppliers.splice(i, 1);
                    s._id = null;
                }
            }
        };
        //////////////////////////////////////////////////////////////////////////////////
        /*
        $scope.suppliers = [
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
                description: "supplier for infant and parenting needs",
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