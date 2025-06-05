describe('Manage customer transactions', () => {
    before(() => {
      cy.visit('/')
      cy.contains('Customer Login').click()
      cy.get('#userSelect').select('Hermoine Granger')
      cy.contains('Login').click()
      cy.get('#accountSelect').select('1001') 
    })
  
    it('should perform multiple transactions and verify balances', () => {
      cy.fixture('transactions').then((transactions) => {
        transactions.forEach((txn) => {
          cy.get('.center strong.ng-binding').eq(1).invoke('text').then((balanceText) => {
            const prevBalance = parseFloat(balanceText.trim())
  
            if (txn.transactionType === 'Credit') {
              cy.contains('Deposit').click()
              
            } else {
              cy.contains('Withdrawl').click()
              cy.contains('Amount to be Withdrawn :').should('be.visible')
            }
            cy.get('[placeholder="amount"]').clear()
            cy.get('[placeholder="amount"]').type(txn.amount)
            cy.get('[type="submit"]').click()
            if (txn.transactionType === 'Credit') {
              cy.contains('Deposit Successful').should('be.visible')
            } else {
              cy.contains('Transaction successful').should('be.visible')
            }
              cy.get('.center strong.ng-binding').eq(1).invoke('text').then((newBalanceText) => {
              const newBalance = parseFloat(newBalanceText.trim())
              const expectedBalance = txn.transactionType === 'Credit'
                ? prevBalance + Number(txn.amount)
                : prevBalance - Number(txn.amount)
  
              expect(newBalance).to.equal(expectedBalance)
            })
          })
        })
      })
    })
  })
  