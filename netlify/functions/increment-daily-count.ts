import type { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

function getBlobsStore() {
  try {
    return getStore({ name: "daily-game-counts" });
  } catch (err: any) {
    if (err?.name === "MissingBlobsEnvironmentError") {
      const siteID = process.env.NETLIFY_SITE_ID;
      const token = process.env.NETLIFY_AUTH_TOKEN;
      if (siteID && token) {
        return getStore({ name: "daily-game-counts", siteID, token });
      }
    }
    throw err;
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const store = getBlobsStore();
    const key = "counts.json";
    const todayKey = new Date().toISOString().slice(0, 10); // UTC day

    let data = (await store.get(key, { type: "json" })) as Record<
      string,
      number
    > | null;
    if (!data) data = {};

    const updatedCount = (data[todayKey] ?? 0) + 1;
    data[todayKey] = updatedCount;

    // Persist JSON (third arg optional; omit to satisfy local type constraints)
    await store.set(key, JSON.stringify(data));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: todayKey, count: updatedCount }),
    };
  } catch (error: any) {
    console.error("[increment-daily-count] Error", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Failed to increment daily count" }),
    };
  }
};
