describe('User management flow', () => {
  it('should add, verify, and delete customers', () => {
    cy.visit('/')

    cy.contains('Bank Manager Login').click()
    cy.contains('Add Customer').click()

    cy.fixture('customers').then((users) => {
      users.forEach((user) => {
        cy.get('[ng-model="fName"]').clear().type(user.firstName)
        cy.get('[ng-model="lName"]').clear().type(user.lastName)
        cy.get('[ng-model="postCd"]').clear().type(user.postCode)
        cy.get('[type="submit"]').click()
        cy.on('window:alert', (text) => {
          expect(text).to.include('Customer added successfully')
        })
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

      cy.get('[placeholder="Search Customer"]').clear().type('Jackson')
      cy.get('table tbody tr').each(($row) => {
        const rowText = $row.text()
        if (
          rowText.includes('Jackson') &&
          rowText.includes('Frank') &&
          rowText.includes('L789C349')
        ) {
          cy.wrap($row).within(() => {
            cy.contains('Delete').click()
          })
        }
      })

      cy.get('[placeholder="Search Customer"]').clear().type('Christopher')
      cy.get('table tbody tr').each(($row) => {
        const rowText = $row.text()
        if (
          rowText.includes('Christopher') &&
          rowText.includes('Connely') &&
          rowText.includes('L789C349')
        ) {
          cy.wrap($row).within(() => {
            cy.contains('Delete').click()
          })
        }
      })
    })
  })
})
