import { StatusCodes } from "http-status-codes";

function randomInteger(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    let objects_results = await env.BUCKET.list({ prefix: "teapots" });

    // return 404 if no objects are found
    if (objects_results.objects.length === 0) {
      return new Response("No teapot found", {
        status: StatusCodes.NOT_FOUND,
        headers: {
          "content-type": "text/plain",
        },
      });
    }

    // select a random image from the bucket
    let object_id = randomInteger(0, objects_results.objects.length - 1);

    // build reused variables
    let title = "Teapot";
    let description = "Error 418: Cannot brew coffee, I'm a teapot";
    let image_url = `https://files.nathanv.me/${objects_results.objects[object_id].key}`;

    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">

          <meta property="og:type" content="website">
          <meta property="og:title" content="${title}">
          <meta property="og:url" content="${request.url}">
          <meta property="og:image" content="${image_url}">
          <meta property="og:description" content="${description}">

          <title>${title}</title>
          <link rel="icon" href="/favicon.ico" type="image/x-icon">
        </head>
        <body style="margin:0;">
          <main>
              <img style="max-width: 98vw; max-height: 30em; margin-top:1vh; margin-bottom:1vh; margin-left:auto; margin-right:auto; display: block;" src="${image_url}" alt="Teapot" />
              <p style="text-align: center;">${description}</p>
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
