import { test, expect } from '@playwright/test';

const API_ENDPOINT = 'http://dummy.restapiexample.com/api/v1/employees/5';

test('should verify the response and values for employee with ID 5', async ({ request }) => {
  let retryCount = 0;
  let response;

  while (retryCount < 3) {  
    response = await request.get(API_ENDPOINT);

    if (response.status() === 429) {
      const retryAfter = response.headers()['retry-after'] || 1000;  
      await new Promise(resolve => setTimeout(resolve, retryAfter));
      retryCount++;
    } else {
      break;
    }
  }

  if (response.status() === 200) {
    const employee = await response.json();

    expect(employee.data).toBeDefined();
    expect(employee.data.id).toBe(5);
    expect(employee.data.employee_name).toBeDefined();
    expect(employee.data.employee_salary).toBeDefined();
    expect(employee.data.employee_age).toBeDefined();

  } else {
    console.error(`Failed to retrieve data. Status code: ${response.status()}`);
  }
});
