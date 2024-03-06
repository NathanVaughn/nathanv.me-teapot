import { StatusCodes } from "http-status-codes";

export default {
  fetch() {
    return new Response("I'm a teapot!", {
      status: StatusCodes.IM_A_TEAPOT,
      headers: {
        "content-type": "text/plain",
      },
    });
  },
};
