export default {
  async fetch(request, env) {
    if (request.method === "GET") {
      return new Response("LINE webhook endpoint is ready.", {
        status: 200,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, POST" },
      });
    }

    const rawBody = await request.text();

    // 若有設定 LINE_CHANNEL_SECRET，就使用原始 request body 驗證簽章。
    // 未設定時仍可作為短期取得 groupId 的臨時 endpoint。
    if (env.LINE_CHANNEL_SECRET) {
      const signature = request.headers.get("x-line-signature");
      const isValid = await verifyLineSignature(
        rawBody,
        signature,
        env.LINE_CHANNEL_SECRET,
      );

      if (!isValid) {
        console.warn("LINE webhook signature 驗證失敗");
        return new Response("Unauthorized", { status: 401 });
      }
    } else {
      console.warn(
        "尚未設定 LINE_CHANNEL_SECRET，目前未驗證 x-line-signature。",
      );
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch (error) {
      console.error("Webhook body 不是有效 JSON", error);
      // LINE 只需要 endpoint 正常回應；避免臨時偵錯期間被判定失敗。
      return new Response("OK", { status: 200 });
    }

    console.log("LINE_WEBHOOK_BODY =", JSON.stringify(body));

    const events = Array.isArray(body.events) ? body.events : [];
    for (const event of events) {
      if (
        event?.source?.type === "group" &&
        typeof event.source.groupId === "string"
      ) {
        console.log("LINE_GROUP_ID = " + event.source.groupId);
      }
    }

    return new Response("OK", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};

async function verifyLineSignature(rawBody, signature, channelSecret) {
  if (!signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(channelSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const digest = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(rawBody),
  );

  return timingSafeEqual(toBase64(digest), signature);
}

function toBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary);
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) return false;

  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) {
    mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return mismatch === 0;
}
