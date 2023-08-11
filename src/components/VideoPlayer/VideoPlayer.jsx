import axios from "axios";
import React, { useEffect, useState } from "react";
import { serverName } from "../../constants/server";

export default function VideoPlayer({ file }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const options = {
          responseType: "arraybuffer",
          headers: {
            "ngrok-skip-browser-warning": "1",
          },
        };
        const response = await axios.get(
          `${serverName}${file.file_path}`,
          options
        );
        const blob = new Blob([response.data], { type: "video/webm" });
        const fileUrl = URL.createObjectURL(blob);
        setUrl(fileUrl);
      } catch (error) {
        console.error("Error fetching file:", error);
      }
    };

    fetchFile();
  }, [file.file_path]);

  return url ? (
      <video
        controls
        controlsList="nodownload"
        width="100%"
        height="auto"
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src={url} type="video/webm" />
      </video>
  ) : (
    <div></div>
  );
}
