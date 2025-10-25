class WebTablesPage {
  url = '/webtables';

  visit() {
    cy.visit(this.url);
  }

  // Buttons
  clickAddButton() {
    cy.get('#addNewRecordButton').click();
  }

  submitForm() {
    cy.get('#submit').click();
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
  fillEmployeeForm(worker) {
    this.firstNameField.clear().type(worker.firstName);
    this.lastNameField.clear().type(worker.lastName);
    this.emailField.clear().type(worker.email);
    this.ageField.clear().type(worker.age);
    this.salaryField.clear().type(worker.salary);
    this.departmentField.clear().type(worker.department);
  }

  deleteRowByEmail(email) {
    this.getRowData(email).find('[title="Delete"]').click();
  }

  deleteAllRows() {
    this.rows.then(($rows) => {
      if ($rows.length > 0) {
        cy.wrap($rows[0]).find('[title="Delete"]').click();
        this.deleteAllRows(); // recursive deletion
      }
    });
  }

  search(value) {
    this.searchField.clear().type(value);
  }

  getRowData(email) {
    return this.rows.contains(email).parents('.rt-tr-group');
  }

  editRowByEmail(email) {
    this.search(email);
    this.getRowData(email).find('[title="Edit"]').click();
  }

  // Pagination
  setRowsPerPage(count) {
    cy.get('select[aria-label="rows per page"]').select(count.toString());
  }

  nextPage() {
    cy.get('button[aria-label="Next"]').click();
  }

  previousPage() {
    cy.get('button[aria-label="Previous"]').click();
  }
}

export default WebTablesPage;
