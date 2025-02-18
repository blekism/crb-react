import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function UseAuth() {
  const [cookies] = useCookies(["logged_user"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!cookies.logged_user) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        console.log("Verifying token...");
        const response = await axios.get(
          "http://localhost/crb-react/PHP/api/read/checkAuth.php",
          {
            headers: {
              Authorization: `Bearer ${cookies.logged_user}`,
            },
            withCredentials: true,
          }
        );
        if (response.data.status === 200) {
          console.log(response.data);
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          console.log(response.data);
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [cookies.logged_user]);

  return { isAuthenticated, loading };
}
