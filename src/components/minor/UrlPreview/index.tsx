import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./UrlPreview.module.scss";

interface UrlPreviewProps {
  url: string;
}

interface UrlMetadata {
  title: string;
  image: string;
}

const UrlPreview: React.FC<UrlPreviewProps> = ({ url }) => {
  const [metadata, setMetadata] = useState<UrlMetadata>({
    title: "",
    image: "",
  });

  useEffect(() => {
    const fetchUrlMetadata = async () => {
      try {
        const response = await axios.get(
          `/api/proxy?url=${encodeURIComponent(url)}`
        );
        const html = response.data;

        // Extract metadata using regular expressions
        const metaTitleMatch =
          /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i.exec(html);

        const metaImageMatch =
          /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i.exec(html);

        const newMetadata = {
          title: metaTitleMatch ? metaTitleMatch[1] : "",
          image: metaImageMatch ? metaImageMatch[1] : "",
        };

        setMetadata(newMetadata);
      } catch (error) {
        console.error("Error fetching URL metadata:", error);
      }
    };

    fetchUrlMetadata();
  }, [url]);

  return (
    <a className={classes.OuterAnchor} href={url} target="_blank">
      <div className={classes.UrlPreview}>
        {metadata.image && (
          <img
            src={metadata.image}
            className={classes.UrlPreviewImage}
            alt="Preview"
          />
        )}
        {metadata.title && (
          <h4 className={classes.UrlPreviewTitle}>{metadata.title}</h4>
        )}
      </div>
    </a>
  );
};

export default UrlPreview;
