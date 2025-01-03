import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CreateContent } from "../components/CreateContent";
import { Button } from "../components/ui/Button";
import { ShareIcon } from "../components/ui/icons/ShareIcon";
import { PlusIcon } from "../components/ui/icons/PlusIcon";
import { Card } from "../components/Card";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";

const DashBoard = () => {
  const [open, setOpen] = useState(false);
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, [open]);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="p-4 ml-60 w-full min-h-screen bg-gray-50">
        <CreateContent open={open} onClose={() => setOpen(false)} />
        <div className="flex justify-end gap-6 pr-3 my-5">
          <Button
            variant="secondary"
            text="Share Brain"
            icon={<ShareIcon />}
            size="md"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              const shareLink = `http://localhost:5173/share/${response.data.shareLink}`;
              navigator.clipboard.writeText(shareLink);
              alert("Link copied to clipboard");
            }}
          />
          <Button
            variant="primary"
            text="Add Content"
            icon={<PlusIcon />}
            size="md"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="flex gap-3 flex-wrap items-start">
          {contents.map(({ title, link, type, _id }) => (
            <Card
              title={title}
              link={link}
              type={type}
              id={_id}
              refresh={refresh}
              key={_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
