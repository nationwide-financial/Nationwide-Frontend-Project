import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FormControl,
  InputLabel,
  InputAdornment,
  Input,
  Select,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  AsYouType,
  getCountryCallingCode,
  parseIncompletePhoneNumber,
} from "libphonenumber-js";

import CountryCodeMenuItem from "./CountryCodeMenuItem";
import TextField from "@mui/material/TextField";
const useLabelStyles = makeStyles({
  root: {
    transform: "translate(60%, 24px)",
    "&.hasValue": {
      transform: "translate(0, 2px) scale(0.75)",
    },
  },
  focused: {
    transform: "translate(0, 2px) scale(0.75)",
  },
});

const useMenuItemStyles = makeStyles({
  menuItem: {
    "& .flag::after": {
      content: "attr(data-country-code)",
    },
  },
  selected: {
    "& .flag::after": {
      content: "''",
    },
  },
});

const asYouType = new AsYouType("US");

const MuiPhone = ({
  value,
  label,
  selectedCountryOverride = "US", // init selectedCountry state
  countryOptions,
  onChange,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    selectedCountryOverride
  );
  const [cursor, setCursor] = useState(null);
  const phoneRef = useRef();
  const labelClasses = useLabelStyles();
  const menuItemClasses = useMenuItemStyles();

  const inputPhone = useCallback((phoneNumber) => {
    asYouType.reset();
    return asYouType.input(phoneNumber);
  }, []);

  let val = inputPhone(value);

  if (asYouType?.getNumber?.()?.countryCallingCode === "1") {
    val = inputPhone(asYouType.getNationalNumber());
  }

  const selectionStart = phoneRef?.current?.selectionStart;
  const selectionEnd = phoneRef?.current?.selectionStart;

  useEffect(() => {
    //reset the cursor position for input
    if (
      (selectionStart && selectionEnd) ||
      (selectionStart === 0 && selectionEnd === 0)
    ) {
      phoneRef.current.selectionStart = cursor;
      phoneRef.current.selectionEnd = cursor;
    }
  }, [cursor, selectionStart, selectionEnd]);

  const getParsedPhoneNumber = useCallback(() => {
    let parsed;

    if (asYouType && asYouType.getNumber) {
      parsed = asYouType.getNumber();
    }
    return parsed;
  }, []);

  const getNewPhone = useCallback(
    (phone, newCountryCode) => {
      let newPhone = phone;
      const parsedPhone = getParsedPhoneNumber(value);

      if ((!parsedPhone || newPhone.trim() === "") && newCountryCode !== "1") {
        return `+${newCountryCode}`;
      } else if (!parsedPhone) {
        return newPhone;
      }

      newPhone =
        newCountryCode === "1"
          ? parsedPhone.nationalNumber
          : `+${newCountryCode}${parsedPhone.nationalNumber}`;

      return newPhone;
    },
    [getParsedPhoneNumber, value]
  );

  const countryCodeChanged = useCallback(
    (ev) => {
      const newCountry = ev.target.value;
      const code = getCountryCallingCode(newCountry);
      const newPhone = getNewPhone(value, code);

      if (newPhone !== value) {
        onChange(newPhone);
      }
      setSelectedCountry(newCountry);
    },
    [value, onChange, getNewPhone]
  );

  const phoneNumberChanged = useCallback(
    (ev) => {
      setCursor(ev.target.selectionStart);
      const newPhone = parseIncompletePhoneNumber(ev.target.value);
      inputPhone(newPhone);
      const parsedPhone = getParsedPhoneNumber(value);

      onChange(parseIncompletePhoneNumber(ev.target.value));

      if (parsedPhone) {
        let newCountryCode = parsedPhone.country;
        if (parsedPhone.countryCallingCode === "44") {
          newCountryCode = "GB";
        } else if (parsedPhone.countryCallingCode === "1") {
          newCountryCode = "US";
        }
        setSelectedCountry(newCountryCode);
      }
    },
    [onChange, inputPhone, getParsedPhoneNumber, value]
  );

  const menuItems = Object.keys(countryOptions).map((k) => {
    const countryData = {
      ...countryOptions[k],
      countryAbrv: k,
    };

    return (
      <MenuItem value={k} key={k} className={menuItemClasses.menuItem}>
        <CountryCodeMenuItem {...countryData} />
      </MenuItem>
    );
  });

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel
        htmlFor="phoneText"
        shrink={false}
        classes={labelClasses}
        className={value.trim() !== "" ? "hasValue" : ""}
      >
        {label}
      </InputLabel>

      <Input
        style={{
          border: 2,
          borderColor: "#C2C9D2",
          borderStyle: "solid",
          borderRadius: 5,
          padding: 1,
        }}
        id="phoneText"
        value={val}
        onChange={phoneNumberChanged}
        type="tel"
        autoFocus
        size="small"
        margin="normal"
        variant="outlined"
        startAdornment={
          <InputAdornment position="start">
            <Select
              fullWidth
              disableUnderline={true}
              value={selectedCountry}
              onChange={countryCodeChanged}
            >
              {menuItems}
            </Select>
          </InputAdornment>
        }
        inputProps={{
          ref: phoneRef,
        }}
      />
    </FormControl>
  );
};

export default MuiPhone;
