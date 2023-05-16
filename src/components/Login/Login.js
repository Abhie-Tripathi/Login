import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const emailReducer = (state, actions) => {
  if (actions.type === "UserInput") {
    return { value: actions.val, isValid: actions.val.includes("@") };
  }
  if (actions.type === "InputBlur") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: null };
};

const passwordReducer = (state, actions) => {
  if (actions.type === "Passinput") {
    return { value: actions.val, isValid: actions.val.trim().length > 6 };
  }
  if (actions.type === "InputBlur") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: null };
};

const Login = (props) => {
  const [emailstate, dispatchemail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordstate, dispatchpassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [enteredcollege, setenteredcollege] = useState("");
  const [collegeisvalid, setcollegeisvalid] = useState();

  useEffect(() => {
    setFormIsValid(
      emailstate.isValid &&
        passwordstate.isValid &&
        enteredcollege.trim().length > 0
    );
  }, [emailstate, passwordstate, enteredcollege]);

  const emailChangeHandler = (event) => {
    dispatchemail({ type: "UserInput", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchpassword({ type: "Passinput", val: event.target.value });
  };

  const collegeChangeHandler = (event) => {
    setenteredcollege(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchemail({ type: "InputBlur" });
  };

  const validatePasswordHandler = () => {
    dispatchpassword({ type: "InputBlur" });
  };

  const validatecollegeHandler = () => {
    setcollegeisvalid(enteredcollege.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordstate.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="email"
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          isValid={emailstate.isValid}
          label="E-Mail"
          value={emailstate.value}
        />
        <Input
          id="password"
          type="password"
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          isValid={passwordstate.isValid}
          label="Password"
          value={passwordstate.value}
        />
        <Input
          id="college"
          type="text"
          onChange={collegeChangeHandler}
          onBlur={validatecollegeHandler}
          isValid={collegeisvalid}
          label="College"
          value={enteredcollege}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
