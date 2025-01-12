describe('PWA Features', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('shows online status', () => {
    cy.get('span').contains('Online').should('be.visible')
  })

  it('shows offline status when offline', () => {
    cy.window().then((win) => {
      // Simulate offline
      cy.stub(win.navigator, 'onLine').value(false)
      cy.get('span').contains('Offline').should('be.visible')
    })
  })

  it('shows offline ready status', () => {
    cy.get('span').contains('Ready for offline', { timeout: 10000 }).should('be.visible')
  })
})
