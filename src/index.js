import { StatusCodes } from "http-status-codes";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  async fetch(request, env) {
    let objects_results = await env.BUCKET.list({prefix: "teapots"});
    let object_id = randomInteger(0, objects_results.objects.length - 1);

    return new Response(
    `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Teapot</title>
          <link rel="icon" href="/favicon.ico" type="image/x-icon">
        </head>
        <body style="margin:0;">
          <main>
              <img style="max-width: 98vw; max-height: 30em; margin-top:1vh; margin-bottom:1vh; margin-left:auto; margin-right:auto; display: block;" src="https://files.nathanv.me/${objects_results.objects[object_id].key}" alt="Teapot" />
              <p style="text-align: center;">Error 418: Cannot brew coffee, I'm a teapot</p>
          </main>
        </body>
      </html>`, {
      status: StatusCodes.IM_A_TEAPOT,
      headers: {
        "content-type": "text/html",
      },
    });
  },
};
