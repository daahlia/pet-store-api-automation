import { expect } from 'chai';
import supertest from 'supertest';
const request = supertest('https://petstore.swagger.io/v2/');
let petId = `${Math.floor(Math.random() * 9999)}`;
let petName = `testPetName-${Math.floor(Math.random() * 9999)}`;
let petStatus;

describe('1.AddANewPet', ()=> {
    it('POST AddANewPet', async() => {
        const data = {
        id: petId,  
        name: petName,
        status: "pending"
        };
    await request
        .post('pet')
        .set('Content-Type', 'application/json')
        .send(data)
        .then((res) => {
            console.log(res.body);
            console.log(res.err);
            expect(res.body).not.to.be.empty;
            petId = res.body.id;
            console.log("Newly created pet id: " + petId);           
            petStatus = res.body.status;
            console.log("Newly created pet id: " + petStatus);            
        });
    });
});

describe('2.FindPetByStatusPending', () => {
    it('GET FindPetByStatusPending', () => {
        console.log("Newly created pet id from FindPetByStatusPending: " + petId);
    request.get(`pet/${petId}`).end((err,res) => {
        console.log(res.body);
        console.log(res.err);
        expect(res.body).not.to.be.empty;
        expect(res.status).to.equals(200);   
        expect(res.body).to.includes.keys('name', 'status');
        expect(res.body.name).to.eql(`${petName}`);
        expect(res.body.status).to.eql('pending');
       });
    });
});

describe('2.FindNewlyCreatedPetById', () => {
    it('GET FindNewlyCreatedPetById', () => {
        console.log("Newly created pet id from FindNewlyCreatedPetById: " + petId);
    request.get(`pet/${petId}`).end((err,res) => {
        console.log(res.body);
        console.log(res.err);
        expect(res.body).not.to.be.empty;
        expect(res.status).to.equals(200);   
        expect(res.body).to.includes.keys('name', 'status');
        expect(res.body.name).to.eql(`${petName}`);
        expect(res.body.status).to.eql(`${petStatus}`);
       });
    });
});

describe('3.UpdateNewlyCreatedPet', () => {
    it('PUT UpdateNewlyCreatedPet', async() => {
        console.log("Newly created pet id from UpdateNewlyCreatedPet: " + petId);
        const data = {
        id: petId,  
        name: petName,
        status: "available"
        };
    await request
        .put('pet')
        .set('Content-Type', 'application/json')
        .send(data)
        .then((res) => {          
            expect(res.body).not.to.be.empty;
            expect(res.body).to.includes.keys('name', 'status');
            expect(res.body.name).to.eql(`${petName}`);
            expect(res.body.status).to.eql('available');
        });
    });
});


describe('4.DeleteNewlyCreatedPetById', () => {
    it('DELETE DeleteNewlyCreatedPetById', () => {
        console.log("Newly created pet id from DeleteNewlyCreatedPetById: " + petId);
    request.delete(`pet/${petId}`).end((err,res) => {
        console.log(res.body);
        console.log(res.err);
        expect(res.body).not.to.be.empty;
        expect(res.status).to.equals(200);   
        expect(res.body).to.includes.keys('code', 'message');
        expect(res.body.code).to.eql(200);
        expect(res.body.message).to.eql(`${petId}`);
        });
    });
});
    

describe('5.FindADeletedPetById', () => {
    it('GET FindADeletedPetById', () => {
        console.log("Newly created pet id from GET FindADeletedPetById: " + petId);
    request.get(`pet/${petId}`).end((err,res) => {
        console.log(res.body);
        console.log(res.err);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.includes.keys('code', 'type', 'message');
        expect(res.body.code).to.eql(1);
        expect(res.body.type).to.eql('error');
        expect(res.status).to.equals(404);   
        expect(res.body.message).to.eql('Pet not found');
        });
    });
}); 
