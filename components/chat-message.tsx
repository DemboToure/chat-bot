import { cn } from "@/lib/utils";
import { MessageItem } from "@/type";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export const ChatMessage = ({ messageItem }: { messageItem: MessageItem }) => {
  const botTemplate = () => {
    return (
      <div className="flex flex-row gap-3">
        <div className=" w-[30px] h-[30px] ">
          <Image
            src="/bot-icon.png"
            width={28}
            height={30}
            className=" max-w-[30px] max-h-[35px] "
            alt="bot icon"
          />
        </div>
        <div className="flex flex-col">
          <ReactMarkdown>{messageItem.message}</ReactMarkdown>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={cn(
          "flex items-center p-4 rounded-xl max-w-lg ml-3 mr-3 ",
          messageItem.side === "server"
            ? "self-start"
            : "self-end ml-auto bg-black/5"
        )}
      >
        {messageItem.side === "server" ? (
          botTemplate()
        ) : (
          <>{messageItem.message}</>
        )}
      </div>
    </>
  );
};
