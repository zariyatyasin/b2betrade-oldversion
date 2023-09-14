"use client";

import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const Auth0Provider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default Auth0Provider;
