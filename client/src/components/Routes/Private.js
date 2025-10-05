import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    let isMounted = true;

    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth");
        if (isMounted) {
          setOk(res.data.ok);
        }
      } catch (error) {
        if (isMounted) {
          setOk(false);
        }
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      setOk(false);
    }

    return () => {
      isMounted = false;
    };
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
