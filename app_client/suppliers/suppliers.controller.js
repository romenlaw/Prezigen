angular.module('preziAdmin')
.controller('suppliersCtrl', suppliersCtrl);


function suppliersCtrl($scope){
    $scope.selectionCount = 0;
    $scope.checkBoxChanged = function (a) {
        if (a)
            $scope.selectionCount++;
        else
            $scope.selectionCount--;
    }
    $scope.suppliers = [
        {
            _id: "989803282",
            name: "ABC Co.",
            abn: '03284727229',
            status: 'Active',
            description: 'Large retailer of office supplies in the St George area, Sydney.',
            tags: ['office', 'good'],
            address: {
                line1: '238 Bourke St',
                line2: '',
                suburb: 'Oatley',
                state: 'NSW',
                postcode: '2223',
                country: 'Australia'
            },
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
            abc: '928282394333',
            status: 'Active',
            description: "supplier for infant and parenting needs",
            tags: ['baby', 'parent'],
            address: {
                line1: "1 Big Ave",
                suburb: 'Melbourne',
                state: 'VIC',
                postcode: '3000',
            },
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
    ];;
}