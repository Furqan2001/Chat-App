// pages/api/proxy.js

import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "URL is missing" });
  }

  try {
    const response = await axios.get(url.toString());
    const html = response.data;

    // You can further process the HTML here if needed
    // For this example, we're returning the HTML as is
    res.status(200).send(html);
  } catch (error) {
    console.error("Error fetching URL content:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
