function generateLink() {
    const url = document.getElementById("videoUrl").value.trim();
    const time = document.getElementById("timestamp").value.trim();
    const output = document.getElementById("output");
    const result = document.getElementById("result");
  
    if (!url || !time) {
      alert("Please enter both the video URL and time.");
      return;
    }
  
    const timeInSeconds = convertToSeconds(time);
    if (timeInSeconds === null) {
      alert("Invalid time format. Use hh:mm:ss or mm:ss or ss.");
      return;
    }
  
    const fullLink = getYouTubeTimestampLink(url, timeInSeconds);
    if (!fullLink) {
      alert("Invalid YouTube URL.");
      return;
    }
  
    result.href = fullLink;
    result.textContent = fullLink;
    output.style.display = "block";
  }
  
  function convertToSeconds(time) {
    const parts = time.split(":").map(Number);
    if (parts.some(isNaN)) return null;
  
    let seconds = 0;
    if (parts.length === 3) {
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 1) {
      seconds = parts[0];
    } else {
      return null;
    }
    return seconds;
  }
  
  function getYouTubeTimestampLink(url, seconds) {
    try {
      const urlObj = new URL(url);
      let videoId = "";
  
      // Handle short links (youtu.be)
      if (urlObj.hostname === "youtu.be") {
        videoId = urlObj.pathname.substring(1); // e.g. /VIDEO_ID
      }
  
      // Handle regular youtube links (youtube.com)
      else if (urlObj.hostname.includes("youtube.com")) {
        videoId = urlObj.searchParams.get("v");
      }
  
      if (!videoId) return null;
  
      return `https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`;
    } catch (error) {
      return null;
    }
  }
  
  function copyLink() {
    const link = document.getElementById("result").textContent;
    navigator.clipboard.writeText(link).then(() => {
      alert("Copied to clipboard!");
    });
  }
  