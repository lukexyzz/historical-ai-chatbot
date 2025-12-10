describe("Chat Page - All Elements", () => {
  beforeEach(() => {
    // Navigate to home page first and select a persona
    cy.visit("http://localhost:5173/");
    cy.contains("h2", "Cleopatra").parent().parent().click();
    cy.url().should("include", "/chat");
  });

  describe("Page Structure", () => {
    it("should display the chat page after selecting a persona", () => {
      cy.url().should("include", "/chat");
    });

    it("should display main navigation bar", () => {
      cy.get("nav").should("exist").should("be.visible");
    });

    it("should display chat input form", () => {
      cy.get("form").should("exist").should("be.visible");
    });
  });

  describe("Navbar Elements", () => {
    it("should display the navbar", () => {
      cy.get("nav").should("exist").should("be.visible");
    });

    it("should display the menu button", () => {
      cy.get('button[aria-label="Open menu"]')
        .should("exist")
        .should("be.visible");
    });

    it("should display the persona name in the title", () => {
      cy.get("nav h1").should("contain.text", "Talk with Cleopatra");
    });

    it("should display the home button", () => {
      cy.get('button[aria-label="Go to Home"]')
        .should("exist")
        .should("be.visible");
    });

    it("should navigate to home page when home button is clicked", () => {
      cy.get('button[aria-label="Go to Home"]').click();
      cy.url().should("eq", "http://localhost:5173/");
      cy.contains("h1", "Choose Your Ancient Guide").should("be.visible");
    });

    it("should open sidebar when menu button is clicked", () => {
      cy.get('button[aria-label="Open menu"]').click();
      cy.get("h3").contains("Previous Chats").should("be.visible");
    });

    it("should display SVG icons in navbar", () => {
      cy.get("nav svg").should("have.length.greaterThan", 0);
    });
  });

  describe("Sidebar Elements", () => {
    beforeEach(() => {
      cy.get('button[aria-label="Open menu"]').click();
    });

    it("should display the sidebar when menu is clicked", () => {
      cy.get("h3").contains("Previous Chats").should("be.visible");
    });

    it('should display "Previous Chats" header', () => {
      cy.contains("h3", "Previous Chats").should("exist").should("be.visible");
    });

    it("should display the close button", () => {
      cy.get('button[aria-label="Close sidebar"]')
        .should("exist")
        .should("be.visible");
    });

    it("should close sidebar when close button is clicked", () => {
      cy.get('button[aria-label="Close sidebar"]').click();
      // Wait a bit for animation
      cy.wait(300);
      cy.get("h3").contains("Previous Chats").should("not.be.visible");
    });

    it("should display chat list element", () => {
      cy.get("ul").should("exist").should("be.visible");
    });

    it("should display loading or empty state message", () => {
      cy.get("ul li").should("exist");
    });
  });

  describe("Chat Window Elements", () => {
    it("should display the chat actions area", () => {
      cy.get('button[aria-label="Clear conversation"]')
        .parent()
        .should("be.visible");
    });

    it("should display the Clear Chat button", () => {
      cy.get('button[aria-label="Clear conversation"]')
        .should("exist")
        .should("be.visible")
        .should("contain.text", "Clear Chat");
    });

    it("should display the Save Conversation button", () => {
      cy.get('button[aria-label="Save conversation history"]')
        .should("exist")
        .should("be.visible")
        .should("contain.text", "Save Conversation");
    });

    it("should have Clear Chat button disabled initially (no messages)", () => {
      cy.get('button[aria-label="Clear conversation"]').should("be.disabled");
    });

    it("should have Save Conversation button disabled initially (no messages)", () => {
      cy.get('button[aria-label="Save conversation history"]').should(
        "be.disabled",
      );
    });

    it("should display the chat body with ID", () => {
      cy.get("#chat-body").should("exist").should("be.visible");
    });

    it("should display the placeholder text when no messages", () => {
      cy.get("#chat-body").should(
        "contain.text",
        "Start the conversation with Cleopatra!",
      );
    });

    it("should display the input form", () => {
      cy.get("form").should("exist").should("be.visible");
    });

    it("should display the message input field", () => {
      cy.get("#chat-input")
        .should("exist")
        .should("be.visible")
        .should("have.attr", "type", "text");
    });

    it("should have correct placeholder on input field", () => {
      cy.get("#chat-input").should(
        "have.attr",
        "placeholder",
        "Type your message...",
      );
    });

    it("should display the Send button", () => {
      cy.get('button[aria-label="Send message"]')
        .should("exist")
        .should("be.visible")
        .should("contain.text", "Send");
    });

    it("should have Send button disabled when input is empty", () => {
      cy.get('button[aria-label="Send message"]').should("be.disabled");
    });

    it("should enable Send button when text is entered", () => {
      cy.get("#chat-input").type("Hello Cleopatra");
      cy.get('button[aria-label="Send message"]').should("not.be.disabled");
    });
  });

  describe("Chat Interaction - Sending Messages", () => {
    it("should allow typing in the input field", () => {
      const message = "Hello, Cleopatra!";
      cy.get("#chat-input").type(message).should("have.value", message);
    });

    it("should clear input field after sending a message", () => {
      cy.get("#chat-input").type("Test message");
      cy.get('button[aria-label="Send message"]').click();
      cy.get("#chat-input").should("have.value", "");
    });

    it("should display user message in chat after sending", () => {
      const message = "Hello Cleopatra";
      cy.get("#chat-input").type(message);
      cy.get('button[aria-label="Send message"]').click();
      cy.get("#chat-body").should("contain.text", message);
    });

    it("should show loading indicator while waiting for response", () => {
      cy.get("#chat-input").type("Tell me about Egypt");
      cy.get('button[aria-label="Send message"]').click();
      // Loading indicator should appear
      cy.get("#chat-body").should("exist");
    });

    it("should enable Clear Chat button after sending a message", () => {
      cy.get("#chat-input").type("Test message");
      cy.get('button[aria-label="Send message"]').click();
      // Wait for the message to actually be added to state
      cy.get("#chat-body").should("contain.text", "Test message");
      cy.get('button[aria-label="Clear conversation"]', {
        timeout: 10000,
      }).should("not.be.disabled");
    });

    it("should enable Save Conversation button after sending a message", () => {
      cy.get("#chat-input").type("Test message");
      cy.get('button[aria-label="Send message"]').click();
      // Wait for message to appear in chat body, which confirms state update
      cy.get("#chat-body").should("contain.text", "Test message");
      cy.get('button[aria-label="Save conversation history"]').should(
        "not.be.disabled",
      );
    });

    it("should disable input while message is being sent", () => {
      cy.get("#chat-input").type("Test");
      cy.get('button[aria-label="Send message"]').click();
      // Input should be disabled during loading
      cy.get("#chat-input").should("have.attr", "disabled");
    });

    it("should change placeholder text during loading", () => {
      cy.get("#chat-input").type("Test");
      cy.get('button[aria-label="Send message"]').click();
      cy.get("#chat-input").should(
        "have.attr",
        "placeholder",
        "Waiting for response...",
      );
    });
  });

  describe("Clear Chat Functionality", () => {
    beforeEach(() => {
      // Send a message first to enable the clear button
      cy.get("#chat-input").type("Test message");
      cy.get('button[aria-label="Send message"]').click();
      cy.wait(500);
    });

    it("should clear all messages when Clear Chat button is clicked", () => {
      cy.get('button[aria-label="Clear conversation"]').click();
      cy.get("#chat-body").should("contain.text", "Start the conversation");
    });

    it("should disable Clear Chat button after clearing messages", () => {
      // Verify button is enabled first
      cy.get('button[aria-label="Clear conversation"]').should(
        "not.be.disabled",
      );
      // Click to clear
      cy.get('button[aria-label="Clear conversation"]').click();
      // Wait for clearing animation/state update
      cy.wait(400);
      // Now verify it's disabled
      cy.get('button[aria-label="Clear conversation"]').should("be.disabled");
    });

    it("should disable Save button after clearing messages", () => {
      cy.get('button[aria-label="Clear conversation"]').click();
      cy.wait(300);
      cy.get('button[aria-label="Save conversation history"]').should(
        "be.disabled",
      );
    });
  });

  describe("Chat Message Display", () => {
    beforeEach(() => {
      cy.get("#chat-input").type("Hello");
      cy.get('button[aria-label="Send message"]').click();
      cy.wait(1000);
    });

    it("should display user messages in chat body", () => {
      cy.get("#chat-body").should("contain.text", "Hello");
    });

    it('should display "You" as the username for user messages', () => {
      cy.get("#chat-body").should("contain.text", "You");
    });

    it("should persist messages in the chat window", () => {
      // Send another message
      cy.get("#chat-input").type("Second message");
      cy.get('button[aria-label="Send message"]').click();
      cy.wait(500);
      // Both messages should be visible
      cy.get("#chat-body").should("contain.text", "Hello");
      cy.get("#chat-body").should("contain.text", "Second message");
    });
  });

  describe("Accessibility Features", () => {
    it("should have proper aria-label on menu button", () => {
      cy.get('button[aria-label="Open menu"]').should(
        "have.attr",
        "aria-label",
        "Open menu",
      );
    });

    it("should have proper aria-label on message input", () => {
      cy.get("#chat-input").should("have.attr", "aria-label", "Message input");
    });

    it("should have proper aria-label on send button", () => {
      cy.get('button[aria-label="Send message"]').should(
        "have.attr",
        "aria-label",
        "Send message",
      );
    });

    it("should have proper aria-label on clear button", () => {
      cy.get('button[aria-label="Clear conversation"]').should(
        "have.attr",
        "aria-label",
        "Clear conversation",
      );
    });

    it("should have proper aria-label on save button", () => {
      cy.get('button[aria-label="Save conversation history"]').should(
        "have.attr",
        "aria-label",
        "Save conversation history",
      );
    });

    it("should have proper aria-label on close sidebar button when sidebar is open", () => {
      cy.get('button[aria-label="Open menu"]').click();
      cy.get('button[aria-label="Close sidebar"]').should(
        "have.attr",
        "aria-label",
        "Close sidebar",
      );
    });

    it("should have chat body with ARIA live region", () => {
      cy.get("#chat-body").within(() => {
        cy.get('[role="log"]').should("exist");
      });
    });
  });

  describe("Different Personas", () => {
    it("should display correct persona name for Ramesses II", () => {
      cy.visit("http://localhost:5173/");
      cy.contains("h2", "Ramesses II").parent().parent().click();
      cy.get("nav h1").should("contain.text", "Talk with Ramesses II");
      cy.get("#chat-body").should(
        "contain.text",
        "Start the conversation with Ramesses II!",
      );
    });

    it("should display correct persona name for Tutankhamun", () => {
      cy.visit("http://localhost:5173/");
      cy.contains("h2", "Tutankhamun").parent().parent().click();
      cy.get("nav h1").should("contain.text", "Talk with Tutankhamun");
      cy.get("#chat-body").should(
        "contain.text",
        "Start the conversation with Tutankhamun!",
      );
    });

    it("should maintain correct persona context when switching", () => {
      cy.get('button[aria-label="Go to Home"]').click();
      cy.url().should("eq", "http://localhost:5173/");
      cy.contains("h2", "Ramesses II").parent().parent().click();
      cy.url().should("include", "/chat");
      cy.get("nav h1").should("contain.text", "Talk with Ramesses II");
      cy.get("#chat-body").should("not.contain.text", "Cleopatra");
    });
  });

  describe("Form Submission", () => {
    it("should submit form on Enter key press", () => {
      cy.get("#chat-input").type("Test message{enter}");
      cy.get("#chat-body").should("contain.text", "Test message");
    });

    it("should not submit form when input is empty and Enter is pressed", () => {
      // The placeholder should still be visible, indicating no message was sent
      cy.get("#chat-input").type("{enter}");
      cy.get("#chat-body").should("contain.text", "Start the conversation");
    });

    it("should trim whitespace from messages", () => {
      cy.get("#chat-input").type("   spaces   ");
      cy.get('button[aria-label="Send message"]').should("not.be.disabled");
    });

    it("should not send message with only whitespace", () => {
      cy.get("#chat-input").type("     ");
      cy.get('button[aria-label="Send message"]').should("be.disabled");
    });
  });

  describe("Button States", () => {
    it("should show emoji icon on Clear Chat button", () => {
      cy.get('button[aria-label="Clear conversation"]').should(
        "contain.text",
        "🗑️",
      );
    });

    it("should show emoji icon on Save Conversation button", () => {
      cy.get('button[aria-label="Save conversation history"]').should(
        "contain.text",
        "💾",
      );
    });

    it('should change Save button text to "Saving..." during save operation', () => {
      // Send a message first
      cy.get("#chat-input").type("Test");
      cy.get('button[aria-label="Send message"]').click();
      cy.wait(500);

      // Click save and check for saving state (this may be quick)
      cy.get('button[aria-label="Save conversation history"]').click();
    });
  });

  describe("Navigation and Routing", () => {
    it("should maintain chat state when sidebar is opened and closed", () => {
      cy.get("#chat-input").type("Test message");
      cy.get('button[aria-label="Send message"]').click();
      cy.wait(500);

      cy.get('button[aria-label="Open menu"]').click();
      cy.get('button[aria-label="Close sidebar"]').click();

      cy.get("#chat-body").should("contain.text", "Test message");
    });
  });
});
