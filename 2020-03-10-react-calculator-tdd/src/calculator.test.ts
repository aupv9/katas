import { Operator } from "./types";
import {
  INITIAL_STATE,
  appendToCurrentValue,
  setOperator,
  execute
} from "./calculator";

describe("appendToCurrentValue", () => {
  test("when a number is entered, that number is set as the current value", () => {
    const newState = appendToCurrentValue("1", INITIAL_STATE);
    const expectedState = {
      ...INITIAL_STATE,
      currentValue: "1"
    };
    expect(newState).toEqual(expectedState);
  });

  test("when a number is entered and currentValue is non-empty, that number is appended to the current value", () => {
    const initialState = {
      ...INITIAL_STATE,
      currentValue: "1"
    };
    const newState = appendToCurrentValue("2", initialState);
    const expectedState = {
      ...INITIAL_STATE,
      currentValue: "12"
    };
    expect(newState).toEqual(expectedState);
  });

  test("when a number less than 0 is entered, an exception is thrown", () => {
    const fn = () => appendToCurrentValue("-1", INITIAL_STATE);
    expect(fn).toThrow();
  });

  test("when a number greater than 9 is entered, an exception is thrown", () => {
    const fn = () => appendToCurrentValue("10", INITIAL_STATE);
    expect(fn).toThrow();
  });

  test("when a period is entered and currentValue is a non-zero digit, it appends the period", () => {
    const initialState = {
      ...INITIAL_STATE,
      currentValue: "1"
    };
    const newState = appendToCurrentValue(".", initialState);
    const expectedState = {
      ...INITIAL_STATE,
      currentValue: "1."
    };
    expect(newState).toEqual(expectedState);
  });

  test("when a period is entered and currentValue already has a period, it is ignored", () => {
    const initialState = {
      ...INITIAL_STATE,
      currentValue: "1."
    };
    const newState = appendToCurrentValue(".", initialState);
    const expectedState = {
      ...INITIAL_STATE,
      currentValue: "1."
    };
    expect(newState).toEqual(expectedState);
  });

  test("when a digit is entered after a period, it is append as usual", () => {
    const initialState = {
      ...INITIAL_STATE,
      currentValue: "1."
    };
    const newState = appendToCurrentValue("2", initialState);
    const expectedState = {
      ...INITIAL_STATE,
      currentValue: "1.2"
    };
    expect(newState).toEqual(expectedState);
  });
});

describe("setOperator", () => {
  test("when currentValue is non-empty, the operator is set, currentValue is copied to operand and currentValue is cleared", () => {
    const initialState = {
      ...INITIAL_STATE,
      currentValue: "1"
    };
    const newState = setOperator(Operator.Add, initialState);
    const expectedState = {
      ...INITIAL_STATE,
      currentValue: "",
      operator: Operator.Add,
      operand: "1"
    };
    expect(newState).toEqual(expectedState);
  });

  test("when operator is already set, execute current operation first", () => {
    const initialState = {
      ...INITIAL_STATE,
      operand: "4",
      currentValue: "2",
      operator: Operator.Add
    };
    const newState = setOperator(Operator.Subtract, initialState);
    const expectedState = {
      ...INITIAL_STATE,
      currentValue: "",
      operator: Operator.Subtract,
      operand: "6"
    };
    expect(newState).toEqual(expectedState);
  });
});

describe("execute", () => {
  function happyPath(
    operator: Operator,
    operand1: string,
    operand2: string,
    result: string
  ) {
    test(`happy path execute: ${operand1} ${operator} ${operand2} = ${result}`, () => {
      const initialState = {
        ...INITIAL_STATE,
        operand: operand1,
        currentValue: operand2,
        operator
      };
      const newState = execute(initialState);
      const expectedState = {
        ...INITIAL_STATE,
        currentValue: result,
        operator: Operator.None,
        operand: ""
      };
      expect(newState).toEqual(expectedState);
    });
  }

  happyPath(Operator.Add, "1", "2", "3");
  happyPath(Operator.Subtract, "5", "2", "3");
  happyPath(Operator.Multiply, "2", "3", "6");
  happyPath(Operator.Divide, "6", "2", "3");
  happyPath(Operator.Divide, "6.4", "2", "3.2");
});

export {};
