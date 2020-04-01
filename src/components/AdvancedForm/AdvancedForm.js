import React, { useContext, useState, useEffect } from "react";
import { AddressContext } from "../../context/addressContext";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { createControl } from "../../formFamework";

const createOptionControl = label => {
  return createControl(
    {
      label: label
    },
    { required: true, minLength: true }
  );
};

const AdvancedForm = props => {
  const classes = useStyles();
  const { address, postAddress } = useContext(AddressContext);
  const [formControls, setFormControls] = useState("");
  const [formValid, setformValid] = useState(false);
  useEffect(() => {
    const state = {
      street_number: createOptionControl("Номер дома"),
      route: createOptionControl("route"),
      locality: createOptionControl("locality"),
      administrative_area_level_3: createOptionControl(
        "administrative_area_level_3"
      ),
      administrative_area_level_2: createOptionControl(
        "administrative_area_level_2"
      ),
      administrative_area_level_1: createOptionControl(
        "administrative_area_level_1"
      ),
      country: createOptionControl("country"),
      postal_code: createOptionControl("postal_code")
    };
    const copyFormControls = { ...state };
    Object.keys(copyFormControls).forEach(controlName => {
      const control = { ...copyFormControls[controlName] };
      control.value = address[controlName];
      if (address[controlName].trim()) {
        control.valid = true;
      }
      copyFormControls[controlName] = control;
    });
    setFormControls(copyFormControls);
  }, []);

  const onAddressHandler = e => {
    e.preventDefault();
    const copyFormControls = { ...formControls };
    Object.keys(copyFormControls).forEach(item => {
      copyFormControls[item] = copyFormControls[item].value;
    });
    postAddress(copyFormControls);
    console.log(copyFormControls)
    props.history.push("/");
  };

  const validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== "";
    }

    if (validation.minLength) {
      isValid = value.trim().length >= 1 && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (value, controllName) => {
    const copyFormControls = { ...formControls };
    const control = { ...copyFormControls[controllName] };
    control.value = value;
    control.valid = validateControl(control.value, control.validation);
    control.error = !validateControl(control.value, control.validation);
    copyFormControls[controllName] = control;

    if (control.error) {
      control.helperText = "Введите коректное значение";
    } else {
      control.helperText = "";
    }

    let isFormValid = true;
    Object.keys(copyFormControls).forEach(item => {
      isFormValid = copyFormControls[item].valid && isFormValid;
    });

    setFormControls(copyFormControls);
    setformValid(isFormValid);
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controllName, index) => {
      const control = formControls[controllName];
      return (
        <TextField
          key={controllName + index}
          required={!!control.validation}
          label={control.label}
          variant="outlined"
          error={control.error}
          defaultValue={control.value}
          helperText={control.helperText}
          onChange={e => onChangeHandler(e.target.value, controllName)}
        />
      );
    });
  };
  return (
    <form
      onSubmit={onAddressHandler}
      className={classes.root}
      autoComplete="off"
    >
      {renderControls()}
      <Button
        disabled={!formValid}
        type="submit"
        variant="outlined"
        size="medium"
        color="primary"
      >
        Отправить
      </Button>
    </form>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 300,
      display: "flex",
      flexDirection: "column"
    }
  }
}));

export default AdvancedForm;
