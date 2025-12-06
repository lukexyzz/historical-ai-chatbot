describe('Home Page - All Elements', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  describe('Page Structure', () => {
    it('should display the main heading', () => {
      cy.contains('h1', 'Choose Your Ancient Guide')
        .should('exist')
        .should('be.visible');
    });

    it('should display the page container with proper background', () => {
      cy.get('h1').parent().should('exist').should('be.visible');
    });
  });

  describe('Persona Cards', () => {
    it('should display exactly 3 persona cards', () => {
      cy.get('[role="button"][tabindex="0"]').should('have.length', 3);
    });

    it('should display all persona cards as visible', () => {
      cy.get('[role="button"][tabindex="0"]').each(($card) => {
        cy.wrap($card).should('be.visible');
      });
    });

    it('should have role="button" on each persona card', () => {
      cy.get('[role="button"][tabindex="0"]').each(($card) => {
        cy.wrap($card).should('have.attr', 'role', 'button');
      });
    });

    it('should have tabIndex="0" on each persona card for accessibility', () => {
      cy.get('[role="button"][tabindex="0"]').each(($card) => {
        cy.wrap($card).should('have.attr', 'tabindex', '0');
      });
    });
  });

  describe('Persona: Cleopatra', () => {
    it('should display Cleopatra persona card', () => {
      cy.contains('Cleopatra').should('exist').should('be.visible');
    });

    it('should display Cleopatra name as heading', () => {
      cy.contains('h2', 'Cleopatra').should('exist');
    });

    it('should display Cleopatra description', () => {
      cy.contains('The last active ruler of the Ptolemaic Kingdom of Egypt.')
        .should('exist')
        .should('be.visible');
    });

    it('should display "Chat Now" button for Cleopatra', () => {
      cy.contains('h2', 'Cleopatra')
        .parent()
        .parent()
        .contains('Chat Now')
        .should('exist');
    });

    it('should navigate to chat page when Cleopatra card is clicked', () => {
      cy.contains('h2', 'Cleopatra').parent().parent().click();
      cy.url().should('include', '/chat');
    });
  });

  describe('Persona: Ramesses II', () => {
    it('should display Ramesses II persona card', () => {
      cy.contains('Ramesses II').should('exist').should('be.visible');
    });

    it('should display Ramesses II name as heading', () => {
      cy.contains('h2', 'Ramesses II').should('exist');
    });

    it('should display Ramesses II description', () => {
      cy.contains('The third pharaoh of the Nineteenth Dynasty of Egypt.')
        .should('exist')
        .should('be.visible');
    });

    it('should display "Chat Now" button for Ramesses II', () => {
      cy.contains('h2', 'Ramesses II')
        .parent()
        .parent()
        .contains('Chat Now')
        .should('exist');
    });

    it('should navigate to chat page when Ramesses II card is clicked', () => {
      cy.contains('h2', 'Ramesses II').parent().parent().click();
      cy.url().should('include', '/chat');
    });
  });

  describe('Persona: Tutankhamun', () => {
    it('should display Tutankhamun persona card', () => {
      cy.contains('Tutankhamun').should('exist').should('be.visible');
    });

    it('should display Tutankhamun name as heading', () => {
      cy.contains('h2', 'Tutankhamun').should('exist');
    });

    it('should display Tutankhamun description', () => {
      cy.contains('The ancient Egyptian pharaoh who was the last of his royal family.')
        .should('exist')
        .should('be.visible');
    });

    it('should display "Chat Now" button for Tutankhamun', () => {
      cy.contains('h2', 'Tutankhamun')
        .parent()
        .parent()
        .contains('Chat Now')
        .should('exist');
    });

    it('should navigate to chat page when Tutankhamun card is clicked', () => {
      cy.contains('h2', 'Tutankhamun').parent().parent().click();
      cy.url().should('include', '/chat');
    });
  });

  describe('All "Chat Now" Buttons', () => {
    it('should display "Chat Now" text on all 3 persona cards', () => {
      cy.get('h2').should('have.length', 3);
      cy.get('h2').each(($heading) => {
        cy.wrap($heading).parent().parent().should('contain.text', 'Chat Now');
      });
    });

    it('should have "Chat Now" button visible on each card', () => {
      cy.get('h2').each(($heading) => {
        cy.wrap($heading)
          .parent()
          .parent()
          .contains('Chat Now')
          .should('be.visible');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('should navigate to chat when Enter key is pressed on persona card', () => {
      cy.get('[role="button"][tabindex="0"]').first().focus().type('{enter}');
      cy.url().should('include', '/chat');
    });

    it('should navigate to chat when Space key is pressed on persona card', () => {
      cy.visit('http://localhost:5173/');
      cy.get('[role="button"][tabindex="0"]').eq(1).focus().type(' ');
      cy.url().should('include', '/chat');
    });

    it('should be able to tab between persona cards', () => {
      cy.get('[role="button"][tabindex="0"]').first().focus().should('have.focus');
    });
  });

  describe('Page Content Validation', () => {
    it('should have all persona names visible on page load', () => {
      cy.contains('Cleopatra').should('be.visible');
      cy.contains('Ramesses II').should('be.visible');
      cy.contains('Tutankhamun').should('be.visible');
    });

    it('should have all persona descriptions visible', () => {
      cy.contains('The last active ruler of the Ptolemaic Kingdom of Egypt.').should('be.visible');
      cy.contains('The third pharaoh of the Nineteenth Dynasty of Egypt.').should('be.visible');
      cy.contains('The ancient Egyptian pharaoh who was the last of his royal family.').should('be.visible');
    });

    it('should display page title correctly', () => {
      cy.title().should('not.be.empty');
    });
  });
});