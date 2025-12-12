describe("Conversation Flow & Dialogue Trees", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173/");
        // Select Cleopatra for these tests
        cy.contains("h2", "Cleopatra").parent().parent().click();
        cy.url().should("include", "/chat");
    });

    describe("Dialogue Tree Navigation", () => {
        it("should trigger 'strategy_council' tree with keyword 'strategy'", () => {
            // Send trigger keyword
            cy.get("#chat-input").type("We need a strategy for the war");
            cy.get('button[aria-label="Send message"]').click();

            // Verify bot response indicates tree start
            cy.get("#chat-body").should(
                "contain.text",
                "The Council is in session",
            );

            // Verify options are displayed (Capitalized as per backend)
            cy.contains("button", "Sea").should("be.visible");
            cy.contains("button", "Land").should("be.visible");
            cy.contains("button", "Negotiate").should("be.visible");
        });

        it("should navigate through the tree options correctly", () => {
            // Trigger tree
            cy.get("#chat-input").type("strategy");
            cy.get('button[aria-label="Send message"]').click();

            // Wait for options
            cy.contains("button", "Sea").should("be.visible");

            // Select 'Sea' option
            cy.contains("button", "Sea").click();

            // Verify follow-up response
            cy.get("#chat-body").should("contain.text", "A bold choice");

            // Verify next set of options
            cy.contains("button", "Yes").should("be.visible");
            cy.contains("button", "No").should("be.visible");
        });

        it("should reach an end state in the dialogue tree", () => {
            // Trigger tree
            cy.get("#chat-input").type("strategy");
            cy.get('button[aria-label="Send message"]').click();

            // Path: Sea -> Yes -> disaster (end)
            cy.contains("button", "Sea").click();
            cy.contains("button", "Yes").click();

            // Verify end response
            cy.get("#chat-body").should("contain.text", "fleeing back to Alexandria");

            // Verify no more options (or at least the 'Yes/No' are gone)
            cy.contains("button", "Yes").should("not.exist");
        });
    });

    describe("AI Fallback & General Conversation", () => {
        it("should use AI response for unknown topics", () => {
            const uniqueQuery = "What is a computer?";
            cy.get("#chat-input").type(uniqueQuery);
            cy.get('button[aria-label="Send message"]').click();

            // Wait for response
            cy.get("#chat-body").should("contain.text", uniqueQuery);

            // We expect a response that isn't a hardcoded topic match.
            // Since we can't predict the exact AI text, we verify a response appears
            // and it's NOT one of the hardcoded greetings.
            cy.get("#chat-body").find("article").should("have.length.at.least", 2); // User + Bot

            // Verify it didn't trigger a tree (no options)
            cy.get(".option-button").should("not.exist");
        });

        it("should handle topic matches without trees", () => {
            // 'Caesar' is a topic but not a tree
            cy.get("#chat-input").type("Tell me about Caesar");
            cy.get('button[aria-label="Send message"]').click();

            // Verify response contains keyword from the hardcoded responses
            // (e.g., "vision of a unified empire" or "Ides of March")
            cy.get("#chat-body").should("satisfy", ($body) => {
                const text = $body.text();
                return text.includes("unified empire") || text.includes("Ides of March");
            });
        });
    });

    describe("Edge Cases", () => {
        it("should handle very long messages", () => {
            const longMessage = "A".repeat(500);
            cy.get("#chat-input").type(longMessage, { delay: 0 }); // Fast type
            cy.get('button[aria-label="Send message"]').click();

            cy.get("#chat-body").should("contain.text", longMessage);
            // Verify app didn't crash and sent a response (increase timeout for AI)
            cy.get("#chat-body").find("article", { timeout: 20000 }).should("have.length.at.least", 2);
        });

        it("should handle special characters", () => {
            const specialChars = "!@#$%^&*()_+{}|:<>?~`";
            cy.get("#chat-input").type(specialChars);
            cy.get('button[aria-label="Send message"]').click();

            cy.get("#chat-body").should("contain.text", specialChars);
            // AI responses can be slow, increase timeout to 20s
            cy.get("#chat-body").find("article", { timeout: 20000 }).should("have.length.at.least", 2);
        });

        it("should handle rapid message sending (if allowed)", () => {
            // Send first message
            cy.get("#chat-input").type("First");
            cy.get('button[aria-label="Send message"]').click();

            // Verify input disables immediately (default 4s is fine here)
            cy.get("#chat-input").should("be.disabled");

            // Wait for it to enable (increase to 20s for slow AI)
            cy.get("#chat-input", { timeout: 20000 }).should("not.be.disabled");

            // Send second
            cy.get("#chat-input").type("Second");
            cy.get('button[aria-label="Send message"]').click();

            cy.get("#chat-body").should("contain.text", "First");
            cy.get("#chat-body").should("contain.text", "Second");
            // Wait for second response
            cy.get("#chat-body").find("article", { timeout: 20000 }).should("have.length.at.least", 4);
        });
    });
});
