/* eslint-disable @next/next/no-img-element */
"use client";
import { MessageItem } from "@/type";
import axios from "axios";
import { Download, Info, Loader2, Menu, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ChatMessage } from "../chat-message";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const ChatBot = () => {
  const messagesEndRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [index, setIndex] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [listMessage, setListMessage] = useState<MessageItem[]>([]);

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
        process.env.NEXT_PUBLIC_API_URL + `?index=${index}`,
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
        process.env.NEXT_PUBLIC_API_URL + `?index=${index}`,
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

  const reset = () => {
    setIndex("");
    setListMessage([]);
  };
  useEffect(() => {
    scrollToBottom();
  }, [listMessage]);

  return (
    <>
      <div className="bg-white flex-col justify-end hidden sm:flex ">
        <div className="bg-black  h-[95%] w-20 rounded-tr-[30px] text-white p-5 flex flex-col items-center justify-between ">
          <div>
            <Menu onClick={reset} className="cursor-pointer" />
          </div>
          <div className="flex flex-col gap-5">
            {index == "guideline_features" && (
              <Link target="_blank" href="/guideline.pdf">
                <Download className="cursor-pointer" />
              </Link>
            )}
            {index == "playbook_ocs_features" && (
              <Link target="_blank" href="/playbook_ocs.pdf">
                <Download className="cursor-pointer" />
              </Link>
            )}
            {index == "" && (
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
                {index.length == 0 ? (
                  <div className="w-full p-20 flex justify-center items-center gap-10 flex-col sm:flex-row ">
                    <div
                      onClick={(e) => setIndex("playbook_ocs_features")}
                      className="flex items-center justify-center cursor-pointer h-20 w-[200px] sm:w-[300px] border-2 rounded-xl shadow-lg hover:shadow-xl "
                    >
                      <h2 className="font-bold text-xl">Playbook</h2>
                    </div>
                    <div
                      onClick={(e) => setIndex("guideline_features")}
                      className="flex items-center justify-center cursor-pointer h-20 w-[200px] sm:w-[300px] border-2 rounded-xl shadow-lg hover:shadow-xl"
                    >
                      <h2 className="font-bold text-xl">Guideline</h2>
                    </div>
                  </div>
                ) : (
                  <>
                    {index == "playbook_ocs_features" && (
                      <div className="flex justify-center">
                        <div className=" p-0 sm:p-20 text-center">
                          <h1 className=" font-bold text-sm sm:font-[1000] sm:text-5xl">
                            Mettre en place un{" "}
                            <span className="text-[#ff7800] ">
                              programme <br className="sm:hidden" />{" "}
                              d'incubation à impact{" "}
                            </span>
                          </h1>
                          <div className="flex justify-center gap-5 mt-5 flex-col sm:flex-row ">
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Comment définir les modalités de sélection ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px] border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Comment définir les modalités de sélection ?
                            </div>
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Comment définir un plan de formation ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px] border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Comment définir un plan de formation ?
                            </div>
                          </div>

                          <div className="flex justify-center gap-5 mt-5 flex-col sm:flex-row">
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Comment assurer le suivi des entrepreneurs ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px] border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Comment assurer le suivi des entrepreneurs ?
                            </div>
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Comment garantir un accès au financement ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px] border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Comment garantir un accès au financement ?
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {index == "guideline_features" && (
                      <div className="flex justify-center">
                        <div className="p-20 text-center">
                          <h1 className="font-bold text-sm sm:font-[1000] sm:text-5xl">
                            Le guide du financement{" "}
                            <br className="  sm:hidden" /> pour
                            <span className="text-[#ff7800] ">
                              {" "}
                              les entrepreneurs
                            </span>
                          </h1>

                          <div className="flex justify-center gap-5 mt-5 flex-col sm:flex-row">
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Quel type de financement puis je avoir ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px]  border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Quel type de financement puis je avoir ?
                            </div>
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Quel sont les programmes disponibles ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px]  border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Quel sont les programmes disponibles ?
                            </div>
                          </div>
                          <div className="flex justify-center gap-5 mt-5 flex-col sm:flex-row">
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Comment soumettre sa candidature ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px]  border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Comment soumettre sa candidature ?
                            </div>
                            <div
                              onClick={(e) =>
                                handleShortCut(
                                  "Quelles sont les programmes ouverts aux femmes ?"
                                )
                              }
                              className="flex items-center justify-center cursor-pointer h-24 w-[250px] sm:w-[350px] border-2 rounded-xl shadow-lg hover:shadow-xl"
                            >
                              Quelles sont les programmes ouverts aux femmes ?
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
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
              <div className="flex w-full items-center space-x-2">
                <Input
                  className="rounded-3xl h-11 "
                  placeholder="Entrer le texte ici.."
                  style={{ resize: "none" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isSubmitting}
                />
                <Button onClick={sendMessage}>
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Send />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
