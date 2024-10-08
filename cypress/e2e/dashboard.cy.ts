describe("Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/dashboard");
  });

  it("should display the dashboard title", () => {
    cy.title().should("eq", "Caju Front Test");
  });

  it("should search for a record by CPF", () => {
    cy.get('input[title="Busque por CPF"]').type("566.421.050-87");

    cy.get('[data-testid="user-card-Luiz Filho"]')
      .should("exist")
      .and("contain", "Luiz Filho")
      .and("contain", "luiz@caju.com.br");
  });

  it("should clear the CPF input after finding the user-card", () => {
    cy.get('input[title="Busque por CPF"]').type("566.421.050-87");

    cy.get('button[title="Limpar CPF"]').click();

    cy.get('input[title="Busque por CPF"]').should("have.value", "");

    cy.get('[data-testid="user-card-Luiz Filho"]').should("be.visible");
    cy.get('[data-testid="user-card-Filipe Marins"]').should("be.visible");
    cy.get('[data-testid="user-card-José Leão"]').should("be.visible");
  });

  it("should clear the CPF input after finding the user-card", () => {
    cy.get('input[title="Busque por CPF"]').type("566.421.050-87");

    cy.get('button[title="Limpar CPF"]').click();

    cy.get('input[title="Busque por CPF"]').should("have.value", "");

    cy.get('[data-testid="user-card-Luiz Filho"]').should("be.visible");
    cy.get('[data-testid="user-card-Filipe Marins"]').should("be.visible");
    cy.get('[data-testid="user-card-José Leão"]').should("be.visible");
  });

  it("should move Filipe Marins from review to approved and delete Luiz Filho", () => {
    cy.get('section[aria-labelledby="column-review"]')
      .find('[data-testid="user-card-Filipe Marins"]')
      .should("be.visible")
      .within(() => {
        cy.get("button").contains("Aprovar").click();
      });
    cy.get("button").contains("Confirmar").click();

    cy.get('section[aria-labelledby="column-approved"]')
      .find('[data-testid="user-card-Filipe Marins"]')
      .should("be.visible");

    cy.get('section[aria-labelledby="column-approved"]')
      .find('[data-testid="user-card-Luiz Filho"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[title="Revisar novamente"]').click();
      });
    cy.get("button").contains("Confirmar").click();

    cy.get('section[aria-labelledby="column-review"]')
      .find('[data-testid="user-card-Luiz Filho"]')
      .should("be.visible")
      .within(() => {
        cy.get('button[title="Deletar"]').click();
      });
    cy.get("button").contains("Confirmar").click();

    cy.get('[data-testid="user-card-Luiz Filho"]').should("not.exist");
  });
});
