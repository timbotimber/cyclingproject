import React from "react";

const Login = () => {
  return (
    <form>
      <label htmlFor="email">Email: </label>
      <input type="text" id="email" name="email" />

      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />

      <button>Log in</button>
    </form>
  );
};

export default Login;
