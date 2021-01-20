jest.mock("lodash/debounce", () => jest.fn((fn) => fn));
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { createMount } from "@material-ui/core/test-utils";
import { RateQuoteControls } from "./controls";
import { PROPERTY_TYPE, OCCUPANCY } from "../../enums";
import * as Actions from "./actions";
const MockStore = configureStore([]);

describe("<RateQuoteControls />", () => {
  let initialState;
  let component;
  let store;
  let mount;

  beforeAll(() => {
    mount = createMount();
    initialState = {
      loanSize: 300000,
      creditScore: 400,
      propertyType: PROPERTY_TYPE.Condo,
      occupancy: OCCUPANCY.Investment,
    };
    store = MockStore({ rateQuotes: initialState });
    component = mount(
      <Provider store={store}>
        {" "}
        <RateQuoteControls />{" "}
      </Provider>
    );
  });

  beforeEach(() => {
    store.clearActions();
    Object.assign(store.getState().rateQuotes, initialState);
  });

  describe("when the state is valid", () => {
    it("it matches the snapshot", () => {
      expect(component.render()).toMatchSnapshot();
    });

    it("it properly renders Loan Size", () => {
      expect(component.find("#rate-quotes-loan-amount").first().text()).toBe(
        "$"
      );
      expect(
        component.find("#rate-quotes-loan-amount input").prop("value")
      ).toBe("300,000");
    });

    it("it properly renders Credit Score", () => {
      expect(
        component.find("#rate-quotes-credit-score input").prop("value")
      ).toBe("400");
    });

    it("it properly renders Property Type", () => {
      expect(
        component.find("#rate-quotes-property-type input").prop("value")
      ).toBe("Condo");
    });

    it("it properly renders Occupancy", () => {
      expect(component.find("#rate-quotes-occupancy input").prop("value")).toBe(
        "Investment"
      );
    });

    it("when changing the Loan Size it generates rateQuotes/setLoanSize", () => {
      component
        .find("#rate-quotes-loan-amount input")
        .first()
        .simulate("change", {
          target: { name: "setLoanSize", value: "100000", focus: () => {} },
        });

      expect(store.getActions()).toStrictEqual([
        {
          type: "rateQuotes/setLoanSize",
          payload: {
            loanSize: 100000,
          },
        },
      ]);

      component.update();
      expect(
        component.find("#rate-quotes-loan-amount input").prop("value")
      ).toBe("100,000");
    });

    it("when changing the Property Type it generates rateQuotes/setPropertyType", () => {
      component
        .find("#rate-quotes-property-type input")
        .first()
        .simulate("change", {
          target: {
            name: "setPropertyType",
            value: PROPERTY_TYPE.Townhouse,
            focus: () => {},
          },
        });

      expect(store.getActions()).toStrictEqual([
        {
          type: "rateQuotes/setPropertyType",
          payload: {
            propertyType: PROPERTY_TYPE.Townhouse,
          },
        },
      ]);
    });

    it("when changing the Occupancy it generates rateQuotes/setOccupancy", () => {
      component
        .find("#rate-quotes-occupancy input")
        .first()
        .simulate("change", {
          target: {
            name: "setOccupancy",
            value: OCCUPANCY.Primary,
            focus: () => {},
          },
        });

      expect(store.getActions()).toStrictEqual([
        {
          type: "rateQuotes/setOccupancy",
          payload: {
            occupancy: OCCUPANCY.Primary,
          },
        },
      ]);
    });

    it("when clicking Quote Rates it calls getRateQuotes", () => {
      jest.spyOn(Actions, "getRateQuotes");
      Actions.getRateQuotes.mockReturnValue({
        type: "rateQuotes/getRateQuotes",
      });
      component.find("#rate-quotes-quote-rates").first().simulate("click");

      expect(store.getActions()).toStrictEqual([
        {
          type: "rateQuotes/getRateQuotes",
        },
      ]);
    });

    it("sets calls the rateQuotes/setCreditScore action", () => {
      component
        .find("#rate-quotes-credit-score input")
        .first()
        .simulate("change", {
          target: { name: "setCreditScore", value: "732", focus: () => {} },
        });

      expect(store.getActions()).toStrictEqual([
        {
          type: "rateQuotes/setCreditScore",
          payload: {
            creditScore: "732",
          },
        },
      ]);

      component.update();
      expect(
        component.find("#rate-quotes-credit-score input").prop("value")
      ).toBe("732");
    });
  });

  describe("when the credit score is set to an invalid value", () => {
    beforeEach(() => {
      store.getState().rateQuotes.creditScore = 123;
      component = mount(
        <Provider store={store}>
          {" "}
          <RateQuoteControls />{" "}
        </Provider>
      );
    });

    it("sets the error and helper text properties ont he input", () => {
      store.getState().rateQuotes.creditScore = 123;
      component.update();
      expect(
        component.find("#rate-quotes-credit-score input").prop("value")
      ).toBe("123");
      expect(
        component.find("#rate-quotes-credit-score").first().prop("error")
      ).toBe(true);
      expect(
        component.find("#rate-quotes-credit-score").first().prop("helperText")
      ).toBe("must be between 300 and 800");
    });

    it("the Quote Rates button is enabled", () => {
      store.getState().rateQuotes.creditScore = 123;
      component.update();
      expect(
        component.find("#rate-quotes-quote-rates").first().prop("disabled")
      ).toBe(true);
    });
  });
});
