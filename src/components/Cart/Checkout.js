import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

//Helper Validation Functions
const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim() == 5;

const Checkout = (props) => {
  const [formInputValidty, setFormInputValidty] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputValidty({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
  };

  // Helper Classes
  const nameControlClasses = `${classes.control} ${
    formInputValidty.name ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputValidty.street ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputValidty.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputValidty.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmLFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidty.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlLFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidty.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputValidty.postalCode && (
          <p>Please enter a valid postal code</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="City">City</label>
        <input type="text" id="City" ref={cityInputRef} />
        {!formInputValidty.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
