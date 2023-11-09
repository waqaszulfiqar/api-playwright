import { test, expect } from '@playwright/test';
const API_ENDPOINT = 'http://dummy.restapiexample.com/api/v1/employees';

test('should verify the salary of employee "Michael Silva"', async ({ request }) => {
  
  const response = await request.get(API_ENDPOINT);
  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();
  
  const employees = await response.json();
  const michaelSilva = employees.data.find(employee => employee.employee_name === 'Michael Silva');
  expect(michaelSilva).toBeDefined();
  expect(michaelSilva.employee_salary).toBe(198500);
});
