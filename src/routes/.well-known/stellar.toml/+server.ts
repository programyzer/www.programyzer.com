import { promises as fs } from "fs"
import type { RequestHandler } from "@sveltejs/kit"

export const GET: RequestHandler = async () => {
  try {
    // Read the content of the stellar.toml file from your filesystem
    const content = await fs.readFile("src/.well-known/stellar.toml", "utf-8")

    return new Response(content, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "content-type": "text/plain",
      },
    })
  } catch (error) {
    console.error("Error reading stellar.toml:", error)
    return new Response("File not found", { status: 404 })
  }
}
