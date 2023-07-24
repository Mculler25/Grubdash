
# GrubDash

Creating a RESTful API project.


## Installation

First clone this repo to your local maching and then cd into. Run npm install to add all of the dependencies.

```bash
  git clone https://github.com/Mculler25/Grubdash.git
  cd Grubdash
  npm install Grubdash
```
    
## /dishes

### GET request

A get request will give you the dishes data.

```js
{
  "data": [
    {
      "id": "d351db2b49b69679504652ea1cf38241",
      "name": "Dolcelatte and chickpea spaghetti",
      "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
      "price": 19,
      "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
    }
  ]
}
```

### POST request

A post request will save the dish and respond with the new dish that was created. This request will validate for the following:

    1. A name property must be included and not empty.
    1. A description property must be included and not empty.
    1. A price property must be included.
    1. The price property must be greater than 0 and an integer.
    1. A image_url property must be included and not empty.

Example data.

```js
{
  "data": {
    "name": "Dolcelatte and chickpea spaghetti",
    "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
    "price": 19,
    "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
  }
}
```

## /dishes/:dishId

### GET request

A get request will give the data of a specific dish.

```js
{
  "data": {
    "id": "d351db2b49b69679504652ea1cf38241",
    "name": "Dolcelatte and chickpea spaghetti",
    "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
    "price": 19,
    "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350"
  }
}
```

### PUT request

A PUT request will update a specific dish. The update validation will include:

    1. dishId must exist.
    1. id in the body must match the dishId in the route.

Example data

```js
{
  "data": {
    "id": "3c637d011d844ebab1205fef8a7e36ea",
    "name": "Century Eggs",
    "description": "Whole eggs preserved in clay and ash for a few months",
    "image_url": "some-valid-url",
    "price": "17"
  }
}
```


## /orders

### GET request

A get request will give you data on all orders.

```js
{
  "data": [
    {
      "id": "5a887d326e83d3c5bdcbee398ea32aff",
      "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
      "mobileNumber": "(505) 143-3369",
      "status": "delivered",
      "dishes": [
        {
          "id": "d351db2b49b69679504652ea1cf38241",
          "name": "Dolcelatte and chickpea spaghetti",
          "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
          "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
          "price": 19,
          "quantity": 2
        }
      ]
    }
  ]
}
```
### POST request 

A post request will create a new order and respond with it. There are validations for:

    1. A deliverTo property must be included and not empty.
    2. A mobileNumber property must be included and not empty.
    3. A dishes property must be an array that is included.
    4. The dishes property must not be empty.
    5. A dish quantity property must be included.
    6. The dish quantity property must be an interger that is greater
       than zero.

Example data:

```js
{
  "data": {
    "deliverTo": "308 Negra Arroyo Lane, Albuquerque, NM",
    "mobileNumber": "(505) 143-3369",
    "status": "delivered",
    "dishes": [
      {
        "id": "d351db2b49b69679504652ea1cf38241",
        "name": "Dolcelatte and chickpea spaghetti",
        "description": "Spaghetti topped with a blend of dolcelatte and fresh chickpeas",
        "image_url": "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?h=530&w=350",
        "price": 19,
        "quantity": 2
      }
    ]
  }
}
```

## /orders/:orderId

### GET request

A get request to this route will return the data for a specific order.

```js
{
  "data": {
    "id": "f6069a542257054114138301947672ba",
    "deliverTo": "1600 Pennsylvania Avenue NW, Washington, DC 20500",
    "mobileNumber": "(202) 456-1111",
    "status": "out-for-delivery",
    "dishes": [
      {
        "id": "90c3d873684bf381dfab29034b5bba73",
        "name": "Falafel and tahini bagel",
        "description": "A warm bagel filled with falafel and tahini",
        "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        "price": 6,
        "quantity": 1
      }
    ]
  }
}
```

### PUT request

A put request to this route will update a specific order and then return that order.

The validations are:
    1. id must exist and order id must match the orderId in the parameters.
    2. The status property must be included and not empty.
    3. If the status of existing order is 'delivered' then the
       order can not be changed.

Example data:

```js
{
  "data": {
    "deliverTo": "Rick Sanchez (C-132)",
    "mobileNumber": "(202) 456-1111",
    "status": "delivered",
    "dishes": [
      {
        "id": "90c3d873684bf381dfab29034b5bba73",
        "name": "Falafel and tahini bagel",
        "description": "A warm bagel filled with falafel and tahini",
        "image_url": "https://images.pexels.com/photos/4560606/pexels-photo-4560606.jpeg?h=530&w=350",
        "price": 6,
        "quantity": 1
      }
    ]
  }
}
```

### DELETE request

You can make a delete request at this route to delete a specific order. The status of the order must be pending to delete it.