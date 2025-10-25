class WebTablesPage {
  url = '/webtables';

  visit() {
    cy.visit(this.url);
  }

  // Buttons
  get addButton() {
    return cy.get('#addNewRecordButton');
  }

  get submitButton() {
    return cy.get('#submit');
  }

  get deleteButtons() {
    return cy.get('[title="Delete"]');
  }

  get rows() {
    return cy.get('.rt-tbody .rt-tr-group');
  }

  get searchField() {
    return cy.get('#searchBox');
  }

  // Form fields
  get firstNameField() {
    return cy.get('#firstName');
  }

  get lastNameField() {
    return cy.get('#lastName');
  }

  get emailField() {
    return cy.get('#userEmail');
  }

  get ageField() {
    return cy.get('#age');
  }

  get salaryField() {
    return cy.get('#salary');
  }

  get departmentField() {
    return cy.get('#department');
  }

  // Actions
  addNewWorker(worker) {
    this.addButton.click();
    this.firstNameField.type(worker.firstName);
    this.lastNameField.type(worker.lastName);
    this.emailField.type(worker.email);
    this.ageField.type(worker.age);
    this.salaryField.type(worker.salary);
    this.departmentField.type(worker.department);
    this.submitButton.click();
  }

  deleteWorkerByIndex(index) {
    this.deleteButtons.eq(index).click();
  }

  searchWorker(value) {
    this.searchField.clear().type(value);
  }

  getRowByIndex(index) {
    return this.rows.eq(index);
  }
}

export default WebTablesPage;
