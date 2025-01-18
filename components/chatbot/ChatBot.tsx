/* eslint-disable @next/next/no-img-element */
"use client";
import { Constant } from "@/config/constant";
import { MessageItem } from "@/type";
import axios from "axios";
import { Download, Info, Loader2, Menu, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ChatMessage } from "../chat-message";

const index_name = Constant.INDEX_NAME;
const index_questions = index_name
  ? Constant.INDEX_QUESTIONS[index_name].slice(1)
  : [""];

export const ChatBot = () => {
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [listMessage, setListMessage] = useState<MessageItem[]>(messageData);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && message.length > 2) {
      if (!event.shiftKey) {
        sendMessage();
      }
    }
  };

  const generateRandomId = (): string => {
    return Math.random().toString(36).substring(2, 9); // Génère une chaîne unique.
  };

  const handleShortCut = async (mes: string) => {
    setIsSubmitting(true);
    try {
      const client_mesage: MessageItem = {
        id: generateRandomId(),
        message: mes,
        side: "client",
      };
      setListMessage((prev) => [...prev, client_mesage]);
      const data = {
        query: mes,
        top_k: 7,
      };
      const resp = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `?index=${Constant.INDEX_NAME}`,
        data
      );
      if (resp.status == 200) {
        const server_mesage: MessageItem = {
          id: generateRandomId(),
          message: resp.data.content,
          side: "server",
        };
        setListMessage((prev) => [...prev, server_mesage]);
      } else {
        toast.error("Une erreur s'est produite");
      }
      setIsSubmitting(false);
    } catch (error: any) {
      toast.error("Une erreur s'est produite");
      setIsSubmitting(false);
    }
  };

  const sendMessage = async () => {
    setIsSubmitting(true);
    try {
      const client_mesage: MessageItem = {
        id: generateRandomId(),
        message: message,
        side: "client",
      };
      setListMessage((prev) => [...prev, client_mesage]);
      const data = {
        query: message,
        top_k: 0,
      };
      setMessage("");
      const resp = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `?index=${Constant.INDEX_NAME}`,
        data
      );
      if (resp.status == 200) {
        const server_mesage: MessageItem = {
          id: generateRandomId(),
          message: resp.data.content,
          side: "server",
        };
        setListMessage((prev) => [...prev, server_mesage]);
      } else {
        toast.error("Une erreur s'est produite");
      }
      setIsSubmitting(false);
    } catch (error: any) {
      toast.error("Une erreur s'est produite");
      setIsSubmitting(false);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const IndexTitle = () => {
    if (index_name == "playbook_ocs_features") {
      return (
        <h1 className="text-4xl font-bold mb-12 text-center">
          Mettre en place un{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            programme d'incubation à impact
          </span>
        </h1>
      );
    }

    if (index_name == "guideline_features") {
      return (
        <h1 className="text-4xl font-bold mb-12 text-center">
          Le guide du financement pour
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            {" "}
            les entrepreneurs
          </span>
        </h1>
      );
    }

    return <div></div>;
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  return (
    <>
      <div className="bg-white flex-col justify-end hidden sm:flex ">
        <div className="bg-black h-[95%] w-20 rounded-tr-[30px] text-white p-5 flex flex-col items-center justify-between ">
          <div>
            <Menu className="cursor-pointer" />
          </div>
          <div className="flex flex-col gap-5">
            {Constant.INDEX_NAME == "guideline_features" && (
              <Link target="_blank" href="/guideline.pdf">
                <Download className="cursor-pointer" />
              </Link>
            )}
            {Constant.INDEX_NAME == "playbook_ocs_features" && (
              <Link target="_blank" href="/playbook_ocs.pdf">
                <Download className="cursor-pointer" />
              </Link>
            )}
            {Constant.INDEX_NAME == "" && (
              <Download className="cursor-pointer text-gray-500 " />
            )}
            <Info className="cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center ">
        {listMessage.length > 0 && (
          <div className="mt-20 w-[18%] hidden sm:block ">
            <div>
              <img src="/orange.png" className="w-auto" alt="orange" />
            </div>
            <div>
              <img src="/kingdom.PNG" className="w-auto" alt="orange" />
            </div>
          </div>
        )}
        <div className=" w-[95%] sm:w-[80%] h-screen">
          <div
            className={`w-full overflow-auto h-[90%]`}
            style={{ scrollbarWidth: "none" }}
          >
            {listMessage.length == 0 && (
              <div className="justify-between hidden sm:flex">
                <div>
                  <img
                    src="/orange.png"
                    className="w-[300px] h-auto "
                    alt="orange"
                  />
                </div>
                <div>
                  <img
                    src="/kingdom.PNG"
                    className="w-[300px] h-auto "
                    alt="orange"
                  />
                </div>
              </div>
            )}
            {listMessage.length == 0 && (
              <div className="mt-32 ">
                <div className="flex justify-center">
                  <div className="p-0 sm:p-20 text-center">
                    <IndexTitle />
                    <div className="h-5" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {index_questions.map((question, index) => (
                        <button
                          onClick={(e) => handleShortCut(question)}
                          key={index}
                          className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-left hover:scale-[1.02] transform"
                        >
                          <p className="text-lg font-medium text-gray-800">
                            {question}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className=" w-full flex flex-col justify-end gap-4 pb-[100px] pt-[100px]">
              {listMessage.map((item) => (
                <ChatMessage key={item.id} messageItem={item} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="flex justify-center ">
            <div className="pt-3 w-full sm:w-[80%] ">
              <div className="relative">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitting}
                  type="text"
                  placeholder="Posez votre question ici..."
                  className="w-full p-4 pr-12 rounded-full border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <button
                  onClick={sendMessage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const messageData: MessageItem[] = [
  {
    id: "msg1",
    message: "Bonjour, j'ai besoin d'aide avec ma commande",
    side: "client",
  },
  {
    id: "msg2",
    message:
      "Bonjour! Je suis là pour vous aider. Pouvez-vous me donner votre numéro de commande?",
    side: "server",
  },
  {
    id: "msg3",
    message: "Oui, c'est le CMD-2024-001",
    side: "client",
  },
  {
    id: "msg4",
    message: "Merci, je consulte votre dossier. Un instant s'il vous plaît.",
    side: "server",
  },
  {
    id: "msg5",
    message:
      "Je vois que votre commande est en cours de préparation. Elle devrait être expédiée demain.",
    side: "server",
  },
  {
    id: "msg6",
    message:
      "Super! Pouvez-vous me donner une estimation du délai de livraison?",
    side: "client",
  },
  {
    id: "msg7",
    message:
      "Bien sûr, le délai habituel est de 2-3 jours ouvrés après l'expédition.",
    side: "server",
  },
  {
    id: "msg8",
    message: "Parfait, merci beaucoup pour ces informations!",
    side: "client",
  },
  {
    id: "msg9",
    message: "Je vous en prie. Avez-vous d'autres questions?",
    side: "server",
  },
  {
    id: "msg10",
    message: "Non, c'est tout. Bonne journée!",
    side: "client",
  },
];
