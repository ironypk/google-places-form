import React, { useState, useContext } from "react";
import { AddressContext } from "../../context/addressContext";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";
import { NavLink } from "react-router-dom";

import { withStyles } from "@material-ui/core";
import { palette, spacing, typography } from "@material-ui/system";
import { createMuiTheme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import styled, { ThemeProvider } from "styled-components";

const theme = createMuiTheme();

const styles = theme => ({
  root: {
    "& > *": {
      width: 300,
      margin: theme.spacing(1)
    }
  }
});

const Box = styled.div`
  ${spacing}${palette}${typography}
`;

const InputForm = props => {
  const { root } = props.classes;
  const { setAddress } = useContext(AddressContext);
  const [autocomplete, setAutocomplete] = useState("");

  const handleSelect = async value => {
    if (value) {
      const results = await geocodeByAddress(value);
      setAutocomplete(value);
      setAddress(results);
      props.history.push("/advanced");
    }
  };

  return (
    <>
      <PlacesAutocomplete
        value={autocomplete}
        onChange={setAutocomplete}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <form className={root} noValidate autoComplete="off">
            <TextField
              label="Введите и выберите адресс"
              variant="outlined"
              {...getInputProps()}
            />
            <ThemeProvider theme={theme}>
              <div>
                {loading && <div>loading...</div>}
                {suggestions.map(suggestion => {
                  return (
                    <Box
                      fontFamily="fontFamily"
                      p="1rem"
                      bgcolor={suggestion.active ? "primary.main" : "#fff"}
                      {...getSuggestionItemProps(suggestion)}
                    >
                      {suggestion.description}
                    </Box>
                  );
                })}
              </div>
            </ThemeProvider>
            <NavLink to="/advanced">
              <Button variant="outlined" size="medium" color="primary">
                К Форме
              </Button>
            </NavLink>
          </form>
        )}
      </PlacesAutocomplete>
    </>
  );
};

export default withStyles(styles)(InputForm);
