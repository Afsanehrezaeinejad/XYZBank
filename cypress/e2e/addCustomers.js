describe('user should get logged in',()=>{
    it('should add customers',()=>{
        cy.visit('/')
        cy.contains('Bank Manager Login').click()
        cy.contains('Add Customer').click()
        cy.fixture('customers').then((users) => {
         users.forEach((user) => {
            cy.get('[ng-model="fName"]').type(user.firstName)
            cy.get('[ng-model="lName"]').type(user.lastName)
            cy.get('[ng-model="postCd"]').type(user.postCode)
            cy.get('[type="submit"]').click()
              })
            })
          })
        })
