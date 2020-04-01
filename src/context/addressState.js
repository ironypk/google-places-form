import React, { useReducer } from "react";
import { AddressContext } from "./addressContext";
import { addressReducer } from "./addressReducer";
import { SET_ADDRESS, POST_ADDRESS } from "./types";


export const AddressState = ({ children }) => {
  const initialState = {
    address: {
      street_number : '',
      route : '',
      locality : '',
      administrative_area_level_3 : '',
      administrative_area_level_2 : '',
      administrative_area_level_1 : '',
      country : '',
      postal_code : ''
    }
  };

  const dataParser = ({address_components}) => {
    const readyData = {};
    Object.keys(address_components).forEach(
      item => (readyData[address_components[item].types[0]] = address_components[item].long_name)
    );
    return readyData;
  };

  const setAddress = async data => {
    const address = dataParser(data[0]);
    dispatch({ type: SET_ADDRESS, payload: address });
  };

  const postAddress = async address => {
    await fetch("https://react-quiz-7aa70.firebaseio.com/address.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(address)
    });
    dispatch({ type: POST_ADDRESS, payload: address });
  };

  const [state, dispatch] = useReducer(addressReducer, initialState);
  const { address, isLoading } = state;
  return (
    <AddressContext.Provider
      value={{ address, isLoading, setAddress, postAddress}}
    >
      {children}
    </AddressContext.Provider>
  );
};

