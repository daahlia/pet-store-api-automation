# Pet Store API automation testing with mocha and chai

## Environment Setup

## Install the following 

1. npm
2. VSCode
3. mocha
4. chai
5. supertest
6. rest
7. allure/ mochawesome
8. node


## Instruction to Run the API tests

1. Clone the project(pet-store-api-automation-by-sabina) from github
2. Open the Project(pet-store-api-automation-by-sabina) in Visual Studio Code
<<<<<<< HEAD
3. To run the tests use the following command and this should run all the tests under test folder
- npm test
5. To generate the test execution report with mochawesome execute the following 
- npx mocha --reporter mochawesome
=======
3. To run the tests user the following command and this should run all the tests under test folder
- npm test
5. To generate the test outcome with mochawesome execute the following 
- mocha petStoreAPI.js --reporter mochawesome
>>>>>>> 6a3e25e3b8527ef563fc9b8f4b9bf382bededcae

## Issues

## Observed the following issues, while performing testing

Unexpected return of 200 response agasint POST request, even when no new records is created
Steps to reproduce the issue are as below
1. Hit the POST request https://petstore.swagger.io/v2/pet to create new pet
payload eg. {
  "id": 9222968140497269735,  
  "name": "TEST",
  "status": "pending"
}
2. For the first request, it creates a new pet, which is fine.
3. Now hit it again with no changes in the request
4. It keeps on returing 200 response code, when no new record is created. It should return a 
validation error against the unique key (eg.record already exist.)  

Put API works as POST API and creates a new pet with a unique id, when user id is passed as 0.
1. Hit the PUT request https://petstore.swagger.io/v2/pet to update an existing record. Please use id as 0.
payload eg. {
  "id": 0,
  "name": "myPet",
  "status": "available"
}
2. For every request, it creates a new pet, where PUT is suppose to update an exising pet. Because there exist not per in the 
system, where id is 0. PUT works as POST and kepps on creating new pets.
c. In this case system should return and error (eg.The provided petid is invalid.) 

