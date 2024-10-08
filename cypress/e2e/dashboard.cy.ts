describe("Dashboard Page", () => {
  beforeEach(() => {
    // Visita a página do Dashboard antes de cada teste
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
});
