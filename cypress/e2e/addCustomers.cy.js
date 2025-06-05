describe('user should get logged in', () => {
  it('should add customers', () => {
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

      cy.contains('Customers').click()

      users.forEach((user) => {
        cy.get('[placeholder="Search Customer"]').clear().type(user.firstName)
        cy.get('table tbody tr').each(($row) => {
          const rowText = $row.text()
          if (
            rowText.includes(user.firstName) &&
            rowText.includes(user.lastName) &&
            rowText.includes(user.postCode)
          ) {
            cy.wrap($row).within(() => {
              cy.contains(user.firstName)
              cy.contains(user.lastName)
              cy.contains(user.postCode)
            })
          }
        })
      })
    })
  })
})
