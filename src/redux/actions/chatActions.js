import { SEND_MESSAGE, GET_MESSAGES } from "./types";

export const sendMessage = (msg) => {
  return { type: SEND_MESSAGE, payload: msg };
};
