import {
  createUserObject,
  createCorporateEmailAddress,
  generateRandomNumberFrom1to10,
} from "../utils/matchers";

/**
 * Write the assertions using the most appropriate matcher
 */
describe("04-exercises", () => {
  test("createUserObject returns a user object with the right properties", () => {
    expect.assertions(3);

    /**
     * Write 3 assertions that check if executing the createUserObject function
     * with the following arguments:
     *
     * "Alex", "Spence", "alex@mail.com"
     *
     * returns an object with the following properties with a truthy value:
     *
     * firstName
     * lastName
     * email
     *
     * @example
     * expect(obj.prop).toBeTruthy()
     *
     * @tip
     * you can store the result of executing the function in a variable
     * to reuse the same function return value in differente assertions
     */

    // Write the assertions
    const result = createUserObject("Alex", "Spence", "alex@mail.com");
    expect(result.firstName).toBeTruthy();
    expect(result.lastName).toBeTruthy();
    expect(result.email).toBeTruthy();
  });

  test("createCorporateEmailAddress appends the corporate email domain", () => {
    expect.assertions(1);

    /**
     * Write an assertion using the `.toMatch()` matcher that the result
     * of executing the createCorporateEmailAddress function with an argument
     * of "dani" returns a string that includes the rest of the corporate
     * email address: "@company.com"
     */

    // Write the assertion
    const result = createCorporateEmailAddress('dani');
    expect(result).toMatch(/dani@company.com/);
  });

  test("generateRandomNumberFrom1to10 returns a number between 1 and 10", () => {
    expect.assertions(2);

    /**
     * Write 2 assertions to check that the generateRandomNumberFrom1to10 function
     * returns a number that is greater than 0 and lower than 11
     */

    // Write the assertions
    const result = generateRandomNumberFrom1to10();
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(11);
  });
});
