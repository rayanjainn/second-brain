import axios from "axios";
import { DeleteIcon } from "./ui/icons/DeleteIcon";
import { DocIcon } from "./ui/icons/DocIcon";
import { ShareIcon } from "./ui/icons/ShareIcon";
import { TwitterIcon } from "./ui/icons/TwitterIcon";
import { YoutubeIcon } from "./ui/icons/YoutubeIcon";
import { Twitter } from "./ui/Twitter";
import { Youtube } from "./ui/Youtube";
import { BACKEND_URL } from "../config";

interface CardProps {
  type: "twitter" | "youtube" | "document";
  title: string;
  link: string;
  id: string; // TODO: add unique id for each card to delete it easily. Use a database to store and retrieve ids.
  refresh: () => void;
}

export const Card = (props: CardProps) => {
  return (
    <div className="bg-white rounded-md border-2 border-gray-200 w-[325px] h-72 overflow-hidden overflow-y-scroll  p-2 hover:bg-gray-100 transition-all duration-200">
      <div className="flex justify-between items-center pr-2">
        <div className="flex items-center gap-2">
          <div className="text-gray-500 pl-2">
            {props.type === "youtube" && <YoutubeIcon />}
            {props.type === "twitter" && <TwitterIcon />}
            {props.type === "document" && <DocIcon />}
          </div>
          <div className="pl-2 text-lg font-normal text-gray-700">
            {props.title}
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-500">
          <a href={props.link} target="_blank">
            <ShareIcon size="sm" />
          </a>
          <div
            className="cursor-pointer"
            onClick={async () => {
              const id = props.id;
              try {
                await axios.delete(`${BACKEND_URL}/api/v1/user/content`, {
                  data: {
                    id,
                  },
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                });
                props.refresh();
              } catch (err) {
                console.log(err);
              }
            }}
          >
            <DeleteIcon size="sm" />
          </div>
        </div>
      </div>
      <div className="pt-5 justify-center">
        {props.type === "youtube" && <Youtube link={props.link} />}
        {props.type === "twitter" && <Twitter link={props.link} />}
      </div>
    </div>
  );
};
