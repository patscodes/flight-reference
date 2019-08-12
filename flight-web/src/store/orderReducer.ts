export const SUBMIT = "SUBMIT";

const initState: { showUi: boolean, orderID: string, airline: string } = {
  showUi: false,
  orderID: "",
  airline: ""
};

export const orderReducer = (
  state = initState,
  action: { type: string, orderID: string; airline: string, payload?: any }
) => {
  console.log("Action:", action);
  switch (action.type) {
    case SUBMIT:
      return { ...state, orderID: action.orderID, airline: action.airline, showUi: !state.showUi };

    default:
      return state;
  }
};
