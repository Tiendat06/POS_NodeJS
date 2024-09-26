db = db.getSiblingDB('POS');

// Collection 1
db.createCollection('account');
db.account.insertMany([
  {
    "account_id": "ACC0000001",
    "account_password": "123456789",
    "account_code_forgot": "",
    "role_id": 1,
    "createAt": new Date("2024-06-04T17:00:00.000Z"),
    "deleted": false,
    "updateAt": new Date("2024-06-04T17:00:00.000Z"),
    "jwt": ""
  },
  {
    "account_id": "ACC0000002",
    "account_password": "tiendat79197@gmail.com",
    "account_code_forgot": "",
    "role_id": 2,
    "createAt": new Date("2024-06-05T17:17:08.874Z"),
    "updateAt": new Date("2024-06-05T17:17:08.874Z"),
    "deleted": false,
    "__v": 0,
    "jwt": ""
  },
  {
    "account_id": "ACC0000003",
    "account_password": "ryannguyen1905@gmail.com",
    "account_code_forgot": "",
    "role_id": 2,
    "jwt": "f7a748ac1f4f858d11497b0e9ef6200191f011f66eaf409f85cbb82afa9f25950352134ca2e7cfc380b9b33e33379da98bda86868590f3ab082774cdaaf6d896",
    "createAt": new Date("2024-06-06T06:46:57.693Z"),
    "updateAt": new Date("2024-06-07T14:18:51.105Z"),
    "deleted": true,
    "__v": 0
  },
  {
    "account_id": "ACC0000004",
    "account_password": "tadat123456789@gmail.com",
    "account_code_forgot": "",
    "role_id": 3,
    "jwt": "50c7a892abf5351fc2de6da5b3dd6e8fa5bf4c01eb09a6152eb7cbe8e9e3db691ce51d88d3107fa94623e854c58d11439774917cea3a9be025fd1b6db318ce70",
    "createAt": new Date("2024-06-28T16:26:27.662Z"),
    "updateAt": new Date("2024-06-28T16:39:40.322Z"),
    "deleted": true,
    "__v": 0
  }
]);

//Collection 2
db.createCollection('category');
db.category.insertMany([
  {
    "category_id": 1,
    "category_name": "Electronics"
  },
  {
    "category_id": 2,
    "category_name": "Clothings"
  },
  {
    "category_id": 3,
    "category_name": "Books"
  },
  {
    "category_id": 4,
    "category_name": "Decor"
  },
  {
    "category_id": 5,
    "category_name": "Beauty"
  },
  {
    "category_id": 6,
    "category_name": "Sports"
  },
  {
    "category_id": 7,
    "category_name": "Toys"
  },
  {
    "category_id": 8,
    "category_name": "Food"
  },
  {
    "category_id": 9,
    "category_name": "Furniture"
  },
  {
    "category_id": 10,
    "category_name": "Jewelry"
  }
]);

//Collection 3

//Collection 4
db.createCollection('customer_voucher');
db.customer_voucher.insertMany([
  {
    "customer_voucher_id": "CSV0000001",
    "voucher_id": 1,
    "customer_id": "CUS0000001",
    "date_used": new Date("2024-06-18T16:35:53.322Z"),
    "__v": 0
  },
  {
    "customer_voucher_id": "CSV0000002",
    "voucher_id": 1,
    "customer_id": "CUS0000001",
    "date_used": new Date("2024-06-18T16:39:18.023Z"),
    "__v": 0
  }
])

//collection 5
db.createCollection('customer');
db.customer.insertMany([
  {
    "customer_id": "CUS0000001",
    "customer_first_name": "admin",
    "customer_last_name": "Admin 2",
    "customer_email": "ryannguyen1905@gmail.com",
    "customer_phone_number": "0356779198",
    "customer_address": "Admin Address",
    "customer_dob": "2024-05-28",
    "customer_gender": "Male",
    "customer_point": 5,
    "createAt": new Date("2024-06-10T14:21:55.339Z"),  // Use new Date
    "updateAt": new Date("2024-06-12T05:27:43.486Z"),  // Use new Date
    "deleted": false,
    "__v": 0
  },
  {
    "customer_id": "",
    "customer_first_name": "",
    "customer_last_name": "",
    "customer_email": "",
    "customer_phone_number": "",
    "customer_address": "",
    "customer_dob": "",
    "customer_gender": "",
    "customer_point": 0,
    "createAt": new Date("2024-06-10T14:21:55.339Z"),  // Use new Date
    "updateAt": new Date("2024-06-12T05:27:43.486Z"),  // Use new Date
    "deleted": false,
    "__v": 0
  }
])

//collection 6
db.createCollection('order_details');
db.order_details.insertMany(
  [{
    "order_list_id": "ODT0000001",
    "order_id": "ORD0000001",
    "product_id": "PRO0000003",
    "quantity": 1,
    "__v": 0
  },
    {
      "order_list_id": "ODT0000002",
      "order_id": "ORD0000001",
      "product_id": "PRO0000001",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000003",
      "order_id": "ORD0000002",
      "product_id": "PRO0000003",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000004",
      "order_id": "ORD0000003",
      "product_id": "PRO0000006",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000005",
      "order_id": "ORD0000004",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000006",
      "order_id": "ORD0000004",
      "product_id": "PRO0000006",
      "quantity": 2,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000007",
      "order_id": "ORD0000005",
      "product_id": "PRO0000005",
      "quantity": 3,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000008",
      "order_id": "ORD0000005",
      "product_id": "PRO0000004",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000009",
      "order_id": "ORD0000006",
      "product_id": "PRO0000005",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000010",
      "order_id": "ORD0000007",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000011",
      "order_id": "ORD0000008",
      "product_id": "PRO0000004",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000012",
      "order_id": "ORD0000009",
      "product_id": "PRO0000003",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000013",
      "order_id": "ORD0000010",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000014",
      "order_id": "ORD0000011",
      "product_id": "PRO0000001",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000015",
      "order_id": "ORD0000012",
      "product_id": "PRO0000007",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000016",
      "order_id": "ORD0000013",
      "product_id": "PRO0000001",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000017",
      "order_id": "ORD0000014",
      "product_id": "PRO0000003",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000018",
      "order_id": "ORD0000015",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000019",
      "order_id": "ORD0000016",
      "product_id": "PRO0000006",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000020",
      "order_id": "ORD0000017",
      "product_id": "PRO0000001",
      "quantity": 2,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000021",
      "order_id": "ORD0000018",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000022",
      "order_id": "ORD0000019",
      "product_id": "PRO0000003",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000023",
      "order_id": "ORD0000020",
      "product_id": "PRO0000003",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000024",
      "order_id": "ORD0000021",
      "product_id": "PRO0000005",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000025",
      "order_id": "ORD0000022",
      "product_id": "PRO0000001",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000026",
      "order_id": "ORD0000022",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000027",
      "order_id": "ORD0000023",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000028",
      "order_id": "ORD0000024",
      "product_id": "PRO0000003",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000029",
      "order_id": "ORD0000025",
      "product_id": "PRO0000004",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000030",
      "order_id": "ORD0000025",
      "product_id": "PRO0000006",
      "quantity": 2,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000031",
      "order_id": "ORD0000026",
      "product_id": "PRO0000009",
      "quantity": 2,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000032",
      "order_id": "ORD0000027",
      "product_id": "PRO0000002",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000033",
      "order_id": "ORD0000028",
      "product_id": "PRO0000006",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000034",
      "order_id": "ORD0000029",
      "product_id": "PRO0000008",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000035",
      "order_id": "ORD0000030",
      "product_id": "PRO0000009",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000036",
      "order_id": "ORD0000031",
      "product_id": "PRO0000007",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000037",
      "order_id": "ORD0000032",
      "product_id": "PRO0000011",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000038",
      "order_id": "ORD0000033",
      "product_id": "PRO0000010",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000039",
      "order_id": "ORD0000034",
      "product_id": "PRO0000010",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000040",
      "order_id": "ORD0000035",
      "product_id": "PRO0000010",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000041",
      "order_id": "ORD0000036",
      "product_id": "PRO0000011",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000042",
      "order_id": "ORD0000037",
      "product_id": "PRO0000011",
      "quantity": 1,
      "__v": 0
    },
    {
      "order_list_id": "ODT0000043",
      "order_id": "ORD0000038",
      "product_id": "PRO0000005",
      "quantity": 2,
      "__v": 0
    }]
)

//collection 7
db.createCollection('order');
db.order.insertMany(
  [{
    "order_id": "ORD0000001",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-09T08:45:10.606Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000002",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-11T10:19:34.306Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000003",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-11T10:22:34.441Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000004",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-11T11:38:28.733Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000005",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-11T15:45:06.006Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000006",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T10:36:21.958Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000007",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T10:41:18.635Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000008",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T10:45:24.153Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000009",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T10:46:36.413Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000010",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T10:50:45.557Z")
    ,
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000011",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T10:54:23.948Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000012",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T10:58:15.895Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000013",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:00:11.445Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000014",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:01:34.944Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000015",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000016",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000017",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000018",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000019",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000020",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000021",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000022",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000023",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000024",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000025",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  },
  {
    "order_id": "ORD0000026",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000027",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000028",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000029",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000030",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000031",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000032",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000033",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000034",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000035",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000036",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000037",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "CUS0000001",
    "__v": 0
  },
  {
    "order_id": "ORD0000038",
    "user_id": "USE0000001",
    "date_created": new Date("2024-06-12T11:03:08.729Z"),
    "note": "",
    "customer_id": "",
    "__v": 0
  }]
);

//collection 8
db.createCollection('payment_method');
db.payment_method.insertMany(
  [{
    "payment_method_id": 1,
    "payment_name": "Cash"
  },
    {
      "payment_method_id": 2,
      "payment_name": "VNPay"
    },
    {
      "payment_method_id": 3,
      "payment_name": "Paypal"
    }]
)

//collection 9
db.createCollection("payment");
db.payment.insertMany(
  [{
    
    "payment_id": "PAY0000001",
    "order_id": "ORD0000001",
    "payment_method_id": 1,
    "total_amount": 215.5,
    "change_given": 84.5,
    "__v": 0
  },
    {
     
      "payment_id": "PAY0000002",
      "order_id": "ORD0000002",
      "payment_method_id": 1,
      "total_amount": 65,
      "change_given": 3,
      "__v": 0
    },
    {
     
      "payment_id": "PAY0000003",
      "order_id": "ORD0000003",
      "payment_method_id": 1,
      "total_amount": 25,
      "change_given": 0,
      "__v": 0
    },
    {
      
      "payment_id": "PAY0000004",
      "order_id": "ORD0000004",
      "payment_method_id": 1,
      "total_amount": 130.5,
      "change_given": 19.5,
      "__v": 0
    },
    {
     
      "payment_id": "PAY0000005",
      "order_id": "ORD0000005",
      "payment_method_id": 1,
      "total_amount": 120,
      "change_given": 10,
      "__v": 0
    },
    {
     
      "payment_id": "PAY0000006",
      "order_id": "ORD0000006",
      "payment_method_id": 1,
      "total_amount": 35,
      "change_given": 0,
      "__v": 0
    },
    {
     
      "payment_id": "PAY0000007",
      "order_id": "ORD0000007",
      "payment_method_id": 1,
      "total_amount": 80.5,
      "change_given": 9.5,
      "__v": 0
    },
    {
      
      "payment_id": "PAY0000008",
      "order_id": "ORD0000008",
      "payment_method_id": 1,
      "total_amount": 15,
      "change_given": 0,
      "__v": 0
    },
    {
      
      "payment_id": "PAY0000009",
      "order_id": "ORD0000009",
      "payment_method_id": 1,
      "total_amount": 65,
      "change_given": 5,
      "__v": 0
    },
    {
     
      "payment_id": "PAY0000010",
      "order_id": "ORD0000010",
      "payment_method_id": 1,
      "total_amount": 80.5,
      "change_given": 9.5,
      "__v": 0
    },
    {
      
      "payment_id": "PAY0000011",
      "order_id": "ORD0000011",
      "payment_method_id": 1,
      "total_amount": 150.5,
      "change_given": 49.5,
      "__v": 0
    },
    {
     
      "payment_id": "PAY0000012",
      "order_id": "ORD0000012",
      "payment_method_id": 1,
      "total_amount": 10,
      "change_given": 0,
      "__v": 0
    },
    {
     
      "payment_id": "PAY0000013",
      "order_id": "ORD0000013",
      "payment_method_id": 1,
      "total_amount": 150.5,
      "change_given": 49.5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000014",
      "order_id": "ORD0000014",
      "payment_method_id": 1,
      "total_amount": 65,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000015",
      "order_id": "ORD0000015",
      "payment_method_id": 1,
      "total_amount": 80.5,
      "change_given": 1.5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000016",
      "order_id": "ORD0000016",
      "payment_method_id": 1,
      "total_amount": 25,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000017",
      "order_id": "ORD0000017",
      "payment_method_id": 1,
      "total_amount": 301,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000018",
      "order_id": "ORD0000018",
      "payment_method_id": 1,
      "total_amount": 80.5,
      "change_given": 9.5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000019",
      "order_id": "ORD0000019",
      "payment_method_id": 1,
      "total_amount": 65,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000020",
      "order_id": "ORD0000020",
      "payment_method_id": 1,
      "total_amount": 65,
      "change_given": 5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000021",
      "order_id": "ORD0000021",
      "payment_method_id": 1,
      "total_amount": 35,
      "change_given": 5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000022",
      "order_id": "ORD0000022",
      "payment_method_id": 1,
      "total_amount": 231,
      "change_given": 9,
      "__v": 0
    },
    {
      "payment_id": "PAY0000023",
      "order_id": "ORD0000023",
      "payment_method_id": 1,
      "total_amount": 80.5,
      "change_given": 9.5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000024",
      "order_id": "ORD0000024",
      "payment_method_id": 1,
      "total_amount": 65,
      "change_given": 5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000025",
      "order_id": "ORD0000025",
      "payment_method_id": 1,
      "total_amount": 65,
      "change_given": 5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000026",
      "order_id": "ORD0000026",
      "payment_method_id": 3,
      "total_amount": 60,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000027",
      "order_id": "ORD0000027",
      "payment_method_id": 3,
      "total_amount": 80.5,
      "change_given": 9.5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000028",
      "order_id": "ORD0000028",
      "payment_method_id": 3,
      "total_amount": 25,
      "change_given": 5,
      "__v": 0
    },
    {
      "payment_id": "PAY0000029",
      "order_id": "ORD0000029",
      "payment_method_id": 3,
      "total_amount": 20,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000030",
      "order_id": "ORD0000030",
      "payment_method_id": 3,
      "total_amount": 30,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000031",
      "order_id": "ORD0000031",
      "payment_method_id": 1,
      "total_amount": 10,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000032",
      "order_id": "ORD0000032",
      "payment_method_id": 1,
      "total_amount": 255.55,
      "change_given": 44.44999999999999,
      "__v": 0
    },
    {
      "payment_id": "PAY0000033",
      "order_id": "ORD0000033",
      "payment_method_id": 1,
      "total_amount": 120.55,
      "change_given": 9.450000000000003,
      "__v": 0
    },
    {
      "payment_id": "PAY0000034",
      "order_id": "ORD0000034",
      "payment_method_id": 1,
      "total_amount": 120.55,
      "change_given": 9.450000000000003,
      "__v": 0
    },
    {
      "payment_id": "PAY0000035",
      "order_id": "ORD0000035",
      "payment_method_id": 1,
      "total_amount": 110.55,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000036",
      "order_id": "ORD0000036",
      "payment_method_id": 1,
      "total_amount": 245.55,
      "change_given": 0,
      "__v": 0
    },
    {
      "payment_id": "PAY0000037",
      "order_id": "ORD0000037",
      "payment_method_id": 3,
      "total_amount": 255.55,
      "change_given": 4.449999999999989,
      "__v": 0
    },
    {
      "payment_id": "PAY0000038",
      "order_id": "ORD0000038",
      "payment_method_id": 3,
      "total_amount": 70,
      "change_given": 70,
      "__v": 0
    },
    {
      "payment_id": "PAY0000039",
      "order_id": "ORD0000038",
      "payment_method_id": 3,
      "total_amount": 70,
      "change_given": 70,
      "__v": 0
    }]
)

//collection 10
db.createCollection("product");
db.product.insertMany(
  [{
    "product_id": "PRO0000001",
    "product_name": "Laptop",
    "product_description": "This is an UK Laptop",
    "quantity": 90,
    "real_price": 100.5,
    "retail_price": 150.5,
    "category_id": 1,
    "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512713/POS/gr23m8vo4ljbbxlq7oiw.jpg",
    "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748542/POS/wgv0pvbisa7kt0lsh2o7.png",
    "createAt": new Date("2024-06-07T10:31:07.084Z"),
    "updateAt": new Date("2024-06-07T14:07:00.010Z"),
    "deleted": false,
    "barcode_public_id": "",
    "image_public_id": "POS/gr23m8vo4ljbbxlq7oiw"
  },
    {
      "product_id": "PRO0000002",
      "product_name": "T-Shirt",
      "product_description": "This is an US T-Shirt",
      "quantity": 91,
      "real_price": 45,
      "retail_price": 80.5,
      "category_id": 2,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512711/POS/jkus18gabszvv9rapn47.jpg",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748541/POS/qtakimpx1ih3k5ebr7wl.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/jkus18gabszvv9rapn47"
    },
    {
      "product_id": "PRO0000003",
      "product_name": "Harry Potter",
      "product_description": "This is a famous books",
      "quantity": 91,
      "real_price": 30,
      "retail_price": 65,
      "category_id": 3,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512711/POS/tskriemmbo54mywv8rgv.jpg",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748542/POS/hnh5acsrtlstqr3gzwek.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/tskriemmbo54mywv8rgv"
    },
    {
      "product_id": "PRO0000004",
      "product_name": "Statue",
      "product_description": "Made in VN",
      "quantity": 92,
      "real_price": 5,
      "retail_price": 15,
      "category_id": 4,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512711/POS/f4gofyw88aouewely0kw.jpg",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748542/POS/d5utf3svoywwvfxgcsve.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/f4gofyw88aouewely0kw"
    },
    {
      "product_id": "PRO0000005",
      "product_name": "Lipstick",
      "product_description": "Made in VN",
      "quantity": 91,
      "real_price": 20,
      "retail_price": 35,
      "category_id": 5,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512712/POS/lvinaprwulojpbxckcya.png",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748543/POS/qabvhlws2tcskhrn6k78.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/lvinaprwulojpbxckcya"
    },
    {
      "product_id": "PRO0000006",
      "product_name": "Soccer Ball",
      "product_description": "Made in China",
      "quantity": 92,
      "real_price": 10,
      "retail_price": 25,
      "category_id": 6,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512711/POS/ytvwtb77vantwctbzpxk.webp",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748542/POS/ksg8brlvt8u06t0utmuq.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/ytvwtb77vantwctbzpxk"
    },
    {
      "product_id": "PRO0000007",
      "product_name": "Car Toys",
      "product_description": "Made in UK",
      "quantity": 98,
      "real_price": 5,
      "retail_price": 10,
      "category_id": 7,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512710/POS/rmquswdfgjvyklnsnmle.jpg",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748542/POS/om6hxd4o9yixiod0zybi.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/rmquswdfgjvyklnsnmle"
    },
    {
      "product_id": "PRO0000008",
      "product_name": "Shushi",
      "product_description": "Made in Japan",
      "quantity": 96,
      "real_price": 10,
      "retail_price": 20,
      "category_id": 8,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512710/POS/wmegy0ykgxmwfhyxoimy.png",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748542/POS/hvvnwwkrydtosj35trju.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/wmegy0ykgxmwfhyxoimy"
    },
    {
      "product_id": "PRO0000009",
      "product_name": "Chair",
      "product_description": "Made in VN",
      "quantity": 96,
      "real_price": 20,
      "retail_price": 30,
      "category_id": 9,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717512710/POS/wxmfat7u7vogulgnriei.jpg",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748543/POS/ck87pkfmt1eiaydxwnte.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/wxmfat7u7vogulgnriei"
    },
    {
      "product_id": "PRO0000010",
      "product_name": "Ring",
      "product_description": "Made in VN",
      "quantity": 96,
      "real_price": 80,
      "retail_price": 120.55,
      "category_id": 10,
      "product_image": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717565802/POS/wcq5utaycsitnkryst1j.png",
      "product_barcode": "https://res.cloudinary.com/dervs0fx5/image/upload/v1717748543/POS/cyjextusjgxu9zqvse8f.png",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "barcode_public_id": "",
      "image_public_id": "POS/wcq5utaycsitnkryst1j"
    },
    {
      "product_id": "PRO0000011",
      "product_name": "Macbook Air Pro",
      "product_description": "Made in Vietnam.",
      "quantity": 96,
      "real_price": 200,
      "retail_price": 255.55,
      "category_id": 1,
      "product_image": "http://res.cloudinary.com/dervs0fx5/image/upload/v1717755783/POS/i1bcw06ivxjjudd7lvtk.png",
      "product_barcode": "http://res.cloudinary.com/dervs0fx5/image/upload/v1717755784/POS/scikc8d7qtcqly8jv7pi.png",
      "image_public_id": "POS/i1bcw06ivxjjudd7lvtk",
      "barcode_public_id": "POS/scikc8d7qtcqly8jv7pi",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": false,
      "__v": 0
    },
    {
      "product_id": "PRO0000012",
      "product_name": "Tablet Pro",
      "product_description": "Made in Vietnam",
      "quantity": 100,
      "real_price": 100,
      "retail_price": 160.35,
      "category_id": 1,
      "product_image": "http://res.cloudinary.com/dervs0fx5/image/upload/v1717766461/POS/xk1skwvkt6ishahjl3x6.jpg",
      "product_barcode": "http://res.cloudinary.com/dervs0fx5/image/upload/v1717756299/POS/ov2s0fj9s3y7g8yrdfdo.png",
      "image_public_id": "POS/xk1skwvkt6ishahjl3x6",
      "barcode_public_id": "POS/ov2s0fj9s3y7g8yrdfdo",
      "createAt": new Date("2024-06-07T10:31:07.084Z"),
      "updateAt": new Date("2024-06-07T14:07:00.010Z"),
      "deleted": true,
      "__v": 0
    }]
)

//collection 11
db.createCollection("role");
db.role.insertMany(
  [{
    "role_id": 1,
    "role_name": "Admin"
  },
    {
      "role_id": 2,
      "role_name": "Staff"
    },
    {
      "role_id": 3,
      "role_name": "Lock"
    }]
)

//collection 12
db.createCollection("user");
db.user.insertMany(
  [{
    "user_id": "USE0000001",
    "user_first_name": "Jake",
    "user_last_name": "Johnson",
    "user_email": "tadat290903@gmail.com",
    "user_phone": "0356779197",
    "user_address": "Ho Chi Minh",
    "user_dob": "2003-09-29",
    "user_gender": "Male",
    "account_id": "ACC0000001",
    "createAt": new Date("2024-06-28T16:26:27.370Z"),
    "updateAt": new Date("2024-06-28T16:39:40.322Z"),
    "deleted": false,
    "user_img": "http://res.cloudinary.com/dervs0fx5/image/upload/v1717597798/POS/snrnkisfujsrptpcilnb.jpg"
  },
    {
      "user_id": "USE0000002",
      "user_first_name": "Tạ",
      "user_last_name": "Tiến Đạt",
      "user_email": "tiendat79197@gmail.com",
      "user_phone": "0356779197",
      "user_address": "Ha Noi",
      "user_dob": "2024-03-26",
      "user_gender": "Male",
      "user_img": "https://res.cloudinary.com/dervs0fx5/image/upload/v1709054146/cl0hmsqdjl1lwnahek0i.png",
      "account_id": "ACC0000002",
      "createAt": new Date("2024-06-28T16:26:27.370Z"),
      "updateAt": new Date("2024-06-28T16:39:40.322Z"),
      "deleted": false,
      "__v": 0
    },
    {
      "user_id": "USE0000003",
      "user_first_name": "admin",
      "user_last_name": "Admin 2",
      "user_email": "ryannguyen1905@gmail.com",
      "user_phone": "0356779198",
      "user_address": "Admin Address",
      "user_dob": "2024-05-27",
      "user_gender": "Male",
      "user_img": "https://res.cloudinary.com/dervs0fx5/image/upload/v1709054146/cl0hmsqdjl1lwnahek0i.png",
      "account_id": "ACC0000003",
      "createAt": new Date("2024-06-28T16:26:27.370Z"),
      "updateAt": new Date("2024-06-28T16:39:40.322Z"),
      "deleted": true,
      "__v": 0
    },
    {
      "user_id": "USE0000004",
      "user_first_name": "Jakyyyyy",
      "user_last_name": "Maley",
      "user_email": "tadat123456789@gmail.com",
      "user_phone": "0123456789",
      "user_address": "124 ST Stress",
      "user_dob": "2024-06-14",
      "user_gender": "Male",
      "user_img": "https://res.cloudinary.com/dervs0fx5/image/upload/v1709054146/cl0hmsqdjl1lwnahek0i.png",
      "account_id": "ACC0000004",
      "createAt": new Date("2024-06-28T16:26:27.370Z"),
      "updateAt": new Date("2024-06-28T16:39:40.322Z"),
      "deleted": true,
      "__v": 0
    }]
)

//collection 13
db.createCollection("voucher");
db.voucher.insertMany(
  [{
    "voucher_id": 1,
    "voucher_name": "HAPPY10",
    "voucher_discount": 10,
    "voucher_description": "Discount 10%"
  },
    {
      "voucher_id": 2,
      "voucher_name": "HAPPY20",
      "voucher_discount": 20,
      "voucher_description": "Discount 20%"
    },
    {
      "voucher_id": 3,
      "voucher_name": "HAPPY30",
      "voucher_discount": 30,
      "voucher_description": "Discount 30%"
    }]
)


