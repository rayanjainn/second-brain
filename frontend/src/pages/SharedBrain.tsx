import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

export const SharedBrain = () => {
  const shareId = useParams().shareId;
  const [contents, setContents] = useState([]);
  const [username, setUsername] = useState("");
  const getContents = async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
    setContents(response.data.content);
    setUsername(response.data.username);
  };

  useEffect(() => {
    getContents();
  }, []);
  return (
    <div>
      <h1>Shared Brain</h1>
      <h2>{username}</h2>
      {contents.map(({ title, link, type, _id }) => (
        <Card
          title={title}
          link={link}
          type={type}
          id={_id}
          key={_id}
          refresh={getContents}
        />
      ))}
    </div>
  );
};
