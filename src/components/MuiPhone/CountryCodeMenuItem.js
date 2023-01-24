import React from "react";

import * as countryFlagIcons from "country-flag-icons";

const CountryCodeMenuItem = ({ country, countryAbrv, countryCode }) => {
  let icon = countryAbrv;
  if (countryFlagIcons.hasFlag(countryAbrv)) {
    icon = (
      <img
        style={{ width: "24px" }}
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryAbrv}.svg`}
        alt={`${country} flag`}
      />
    );
  }

  return (
    <React.Fragment>
      <div
        style={{ display: "inline-block" }}
        data-country-code={`+${countryCode}`}
        className={"flag"}
      >
        {icon}
        <div style={{ display: "inline-block", padding: "0px 5px" }}></div>
      </div>
      {/*       <div style={{ display: "inline-block", marginLeft: "10px" }}>
        +{countryCode}
      </div> */}
    </React.Fragment>
  );
};

export default CountryCodeMenuItem;
