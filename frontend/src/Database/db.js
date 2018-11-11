module.exports = function() {
    return { 
      "parcels": [ 
        {
            "id": 1,
            "startLocation": "Vilnius",
            "endLocation": "Toronto",
            "status": 3,
            "description": "Books",
            "weight": 1500,
            "createdDate": "1975-08-19T23:15:30.000Z",
            "delivered": "",
            "recipient": {
              "id": 1,
              "firstName": "Johna",
              "lastName": "Bill"
            },
            "courier": {
              "id": 4,
              "firstName": "Osvaldas",
              "lastName": "Kisielius"
            },
            "history": [
              {
                "user": 9,
                "date": "2018-08-18T07:03:54.000Z",
                "status": 1
              },
              {
                "user": 18,
                "date": "2018-08-17T13:18:21.000Z",
                "status": 2
              },
            ]
          },
          {
            "id": 2,
            "startLocation": "Kaunas",
            "endLocation": "Vilnius",
            "status": 1,
            "description": "Laptop",
            "weight": 3000,
            "createdDate": "1975-08-19T23:15:30.000Z",
            "delivered": "",
            "recipient": {
              "id": 2,
              "firstName": "Saulius",
              "lastName": "Virnys"
            },
            "courier": {
              "id": 1,
              "firstName": "Johna",
              "lastName": "Bill"
            },
            "history": [
              {
                "user": 15,
                "date": "2018-08-27T13:30:36.000Z",
                "status": 2
              },
              {
                "user": 9,
                "date": "2018-08-20T18:23:01.000Z",
                "status": 3
              },
            ]
          },
          {
            "id": 3,
            "startLocation": "Chicago",
            "endLocation": "Vilnius",
            "status": 1,
            "description": "Laptop",
            "weight": 3000,
            "createdDate": "1975-08-19T23:15:30.000Z",
            "delivered": "",
            "recipient": {
              "id": 3,
              "firstName": "Kol",
              "lastName": "Bum"
            },
            "courier": {
              "id": 1,
              "firstName": "Johna",
              "lastName": "Bill"
            },
            "history": [],
          },
          {
            "id": 4,
            "startLocation": "Vilnius",
            "endLocation": "London",
            "status": 2,
            "description": "Electronic Goods",
            "weight": 2980,
            "createdDate": "2018-08-05T23:15:30.000Z",
            "delivered": "",
            "recipient": {
              "id": 8,
              "firstName": "John",
              "lastName": "Wick"
            },
            "courier": {
              "id": 3,
              "firstName": "Kol",
              "lastName": "Bum"
            },
            "history": [],
          },
          {
            "id": 5,
            "startLocation": "Chicago",
            "endLocation": "Kaunas",
            "status": 4,
            "description": "Home appliances",
            "weight": 2850,
            "createdDate": "2018-03-28T23:15:30.000Z",
            "delivered": "2018-09-12:15:30.000Z",
            "recipient": {
              "id": 6,
              "firstName": "Vytautas",
              "lastName": "Stankevicius"
            },
            "courier": {
              "id": 7,
              "firstName": "Mat",
              "lastName": "Cox"
            },
            "history": [],
          },
          {
            "id": 6,
            "startLocation": "Kaunas",
            "endLocation": "Vilnius",
            "status": 3,
            "description": "Electronic goods",
            "weight": 500,
            "createdDate": "2018-01-19T23:15:30.000Z",
            "delivered": "",
            "recipient": {
              "id": 9,
              "firstName": "Lindsay",
              "lastName": "Smith"
            },
            "courier": {
              "id": 15,
              "firstName": "Caroline",
              "lastName": "Jaymes"
            },
            "history": [],
          },
          {
            "id": 7,
            "startLocation": "Vilnius",
            "endLocation": "London",
            "status": 2,
            "description": "Electronic Goods",
            "weight": 2980,
            "createdDate": "2018-08-05T23:15:30.000Z",
            "delivered": "",
            "recipient": {
              "id": 18,
              "firstName": "Patrick",
              "lastName": "Strongwell"
            },
            "courier": {
              "id": 13,
              "firstName": "Monica",
              "lastName": "Wilde"
            },
            "history": [],
        }
    ],
    "parcelStatusHistory":[
      {
        "id": 1,
        "changed": [ 
          {
            "user": 1,
            "status": 1,
            "date": "2018-08-05T23:15:30.000Z"
          },
          {
            "user": 2,
            "status": 2,
            "date": "2018-08-08T13:08:03.000Z"
          }
        ]
      },
      {
        "id": 2,
        "changed": [ 
          {
            "user": 18,
            "status": 1,
            "date": "2018-08-03T08:01:13.000Z"
          },
          {
            "user": 9,
            "status": 2,
            "date": "2018-08-08T20:06:13.000Z"
          }
        ]
      },      
    ]
  }
}