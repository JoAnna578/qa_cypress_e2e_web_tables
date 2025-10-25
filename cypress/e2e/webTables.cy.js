/// <reference types='cypress' />
import WebTablesPage from '../support/pages/WebTablesPage';

describe('Web Tables page', () => {
  const webTables = new WebTablesPage();
  const employee = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: '30',
    salary: '5000',
    department: 'IT'
  };

  before(() => {
    webTables.visit();
    // Czyścimy wszystkie dane na początek
    webTables.deleteAllRows();
  });

  it('should add a new worker', () => {
    webTables.clickAddButton();
    webTables.fillEmployeeForm(employee);
    webTables.submitForm();
    webTables.getRowData(employee.email).should('contain', employee.firstName)
      .and('contain', employee.lastName)
      .and('contain', employee.email)
      .and('contain', employee.age)
      .and('contain', employee.salary)
      .and('contain', employee.department);
  });

  it('should edit the worker', () => {
    const updatedEmployee = { ...employee, salary: '6000', department: 'HR' };
    webTables.editRowByEmail(employee.email);
    webTables.fillEmployeeForm(updatedEmployee);
    webTables.submitForm();

    webTables.getRowData(employee.email)
      .should('contain', updatedEmployee.salary)
      .and('contain', updatedEmployee.department);
  });

  it('should delete the worker', () => {
    webTables.deleteRowByEmail(employee.email);
    webTables.search(employee.email);
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 0);
  });

  it('should add multiple workers and delete all', () => {
    const employees = [
      { firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', age: '28', salary: '4000', department: 'Sales' },
      { firstName: 'Bob', lastName: 'Brown', email: 'bob@example.com', age: '35', salary: '4500', department: 'Marketing' }
    ];

    employees.forEach(emp => {
      webTables.clickAddButton();
      webTables.fillEmployeeForm(emp);
      webTables.submitForm();
    });

    webTables.deleteAllRows();
    cy.get('.rt-tbody .rt-tr-group').should('have.length', 0);
  });

  it('should validate pagination and rows per page', () => {
    webTables.setRowsPerPage(5);
    cy.get('.rt-tbody .rt-tr-group').should('have.length.lte', 5);
    webTables.nextPage();
    webTables.previousPage();
  });

});
