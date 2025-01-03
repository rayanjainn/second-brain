import { useRef, useState } from "react";
import { Button } from "./ui/Button";
import { CrossIcon } from "./ui/icons/CrossIcon";
import { Input } from "./ui/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  youtube = "youtube",
  twitter = "twitter",
} // TODO: add more content types
export const CreateContent = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.youtube);

  return (
    <div>
      {open && (
        <div className="w-screen h-screen backdrop-blur-[1px] fixed top-0 left-0 bg-black bg-opacity-30 z-50 flex justify-center items-center">
          <div className="w-[300px] p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center gap-4">
              <h3 className="text-2xl font-semibold text-slate-500">
                Create Content
              </h3>
              <div className="cursor-pointer" onClick={onClose}>
                <CrossIcon size="lg" />
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex flex-col gap-4">
                <Input reference={titleRef} type="text" placeholder="Title" />
                <Input reference={linkRef} type="text" placeholder="Link" />
              </div>
              <div className="flex justify-center items-center font-normal text-xl text-gray-500">
                Type
              </div>
              <div className="flex justify-center gap-4 pb-3">
                <Button
                  text="Youtube"
                  size="sm"
                  variant={
                    type === ContentType.youtube ? "primary" : "secondary"
                  }
                  onClick={() => setType(ContentType.youtube)}
                />
                <Button
                  text="Twitter"
                  size="sm"
                  variant={
                    type === ContentType.twitter ? "primary" : "secondary"
                  }
                  onClick={() => setType(ContentType.twitter)}
                />
              </div>
              <Button
                variant="primary"
                size="md"
                text="Add"
                onClick={async () => {
                  const title = titleRef.current?.value;
                  const link = linkRef.current?.value;
                  try {
                    await axios.post(
                      `${BACKEND_URL}/api/v1/user/content`,
                      {
                        type,
                        title,
                        link,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "token"
                          )}`,
                        },
                      }
                    );
                    onClose();
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
