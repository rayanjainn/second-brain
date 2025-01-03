import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useContent = () => {
  const [contents, setContents] = useState([]);

  const refresh = () => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/user/contents`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setContents(res.data.contents);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    refresh();
  }, []);
  return { contents, refresh };
};
