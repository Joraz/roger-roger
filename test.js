const expect = require('chai').expect;
const deepClone = require('./index');

/*
  Asserts that objects are not the same object by using the chai 'equal' method
  This does a strict assertion, ensuring that the returned object is different by reference
  Then, do a deep equal to check that properties are the same
  For good measure, do extra assertions on the properties
*/
describe('deepClone', () => {
    it('should clone a simple object', () => {
        const objectToTest = {
            hello: 'world'
        };

        const clonedObject = deepClone(objectToTest);

        expect(clonedObject).to.not.equal(objectToTest);
        expect(clonedObject).to.deep.equal(objectToTest);
        expect(clonedObject).to.have.property('hello', 'world');
    });

    it('should clone a nested object', () => {
        const objectToTest = {
            name: 'Paddy',
            address: {
                town: 'Lerum',
                country: 'Sweden'
            }
        };

        const clonedObject = deepClone(objectToTest);

        expect(clonedObject).to.not.equal(objectToTest);
        expect(clonedObject).to.deep.equal(objectToTest);
        expect(clonedObject).to.have.property('name', 'Paddy');
        const address = clonedObject.address;
        expect(address).to.have.property('town', 'Lerum');
        expect(address).to.have.property('country', 'Sweden');
    });

    it('should clone an object containing nulls', () => {
        const objectWithNull = {
            hello: null
        };

        const clonedObject = deepClone(objectWithNull);
        expect(clonedObject).to.not.equal(objectWithNull);
        expect(clonedObject).to.deep.equal(objectWithNull);
        expect(clonedObject).to.have.property('hello', null);
    });

    it('should clone an object containing undefineds', () => {
        const objectWithUndefined = {
            hello: undefined
        };

        const clonedObject = deepClone(objectWithUndefined);
        expect(clonedObject).to.not.equal(objectWithUndefined);
        expect(clonedObject).to.deep.equal(objectWithUndefined);
        expect(clonedObject).to.have.property('hello', undefined);
    });

    it('should clone an object containing strings', () => {
        const objectWithString = {
            hello: 'string'
        };

        const clonedObject = deepClone(objectWithString);

        expect(clonedObject).to.not.equal(objectWithString);
        expect(clonedObject).to.deep.equal(objectWithString);
        expect(clonedObject).to.have.property('hello');
        expect(clonedObject.hello).to.be.a('string');
        expect(clonedObject.hello).to.equal('string');
    });

    it('should clone an object containing numbers', () => {
        const objectWithNumber = {
            hello: 1
        };

        const clonedObject = deepClone(objectWithNumber);

        expect(clonedObject).to.not.equal(objectWithNumber);
        expect(clonedObject).to.deep.equal(objectWithNumber);
        expect(clonedObject).to.have.property('hello');
        expect(clonedObject.hello).to.be.a('number');
        expect(clonedObject.hello).to.equal(1);
    });

    it('should clone an object containing booleans', () => {
        const objectWithBool = {
            hello: false
        };

        const clonedObject = deepClone(objectWithBool);

        expect(clonedObject).to.not.equal(objectWithBool);
        expect(clonedObject).to.deep.equal(objectWithBool);
        expect(clonedObject).to.have.property('hello');
        expect(clonedObject.hello).to.be.a('boolean');
        expect(clonedObject.hello).to.equal(false);
    });

    it('should clone an object containing arrays', () => {
        const objectWithArray = {
            worlds: [
                'Asgard',
                'Midgard',
                'Jotunheim'
            ]
        };

        const clonedObject = deepClone(objectWithArray);

        expect(clonedObject).to.not.equal(objectWithArray);
        expect(clonedObject).to.deep.equal(objectWithArray);
        expect(clonedObject).to.have.property('worlds');
        expect(clonedObject.worlds).to.not.equal(objectWithArray.worlds);
        expect(clonedObject.worlds).to.be.an('array');
        expect(clonedObject.worlds[0]).to.equal('Asgard');
        expect(clonedObject.worlds[1]).to.equal('Midgard');
        expect(clonedObject.worlds[2]).to.equal('Jotunheim');
    });

    it('should clone an object containing dates', () => {
        const objectWithDate = {
            birthday: new Date(1984, 8, 19)
        };

        const clonedObject = deepClone(objectWithDate);

        expect(clonedObject).to.not.equal(objectWithDate);
        expect(clonedObject).to.deep.equal(objectWithDate);
        expect(clonedObject).to.have.property('birthday');
        expect(clonedObject.birthday.getDay()).to.equal(3) // Wednesday
    });

    it('should clone an object containing regexs', () => {
        const objectWithRegex = {
            email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }

        const clonedObject = deepClone(objectWithRegex);

        expect(clonedObject).to.not.equal(objectWithRegex);
        expect(clonedObject).to.deep.equal(objectWithRegex);
        expect(clonedObject.email.test('dan@test.com')).to.equal(true); // Verify that the regex still works
    });

    it('should handle complex structures', () => {
        const complexObject = {
            details: {
                firstName: 'John',
                lastName: 'Doe',
                emails: [
                    {
                        address: 'john.doe@mail.com',
                        verified: true
                    }
                ],
                favouriteFoods: [
                    'pizza',
                    'chocolate',
                    'spaghetti'
                ]
            },
            activated: true
        };

        const clonedObject = deepClone(complexObject);
        expect(clonedObject).to.not.equal(complexObject);
        expect(clonedObject).to.deep.equal(complexObject);
        expect(clonedObject.details.emails[0].address).to.equal('john.doe@mail.com');
    });

    it('should allow changing the original without affecting the clone', () => {
        const object = {
            fruits: [
                'apples',
                'bananas'
            ]
        };

        const clonedObject = deepClone(object);

        object.fruits.push('oranges');

        expect(object.fruits).to.have.lengthOf(3);
        expect(clonedObject.fruits).to.have.lengthOf(2);
    });
});
