import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  //handle pause button
  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //handle volume
  const handleVolumeToggle = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  //handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === "0");
  };

  //handle video progess
  const handleProgressUpdate = () => {
    setProgress(
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    );
  };

  //handle video progressbar click
  const handleProgressBarClick = (e) => {
    const newTime =
      (e.nativeEvent.offsetX / e.target.clientWidth) *
      videoRef.current.duration;
    videoRef.current.currentTime = newTime;
  };

  //hanlde back button
  const goBack = () => {
    navigate(-1);
  };

  // fetching the video from backend
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch("/api/v1/video");
        const data = await response.json();
        if (data.videos && data.videos.length > 0) {
          setVideo(data.videos[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchVideo();
  }, []);

  //loading effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && video) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  }, [loading, video]);

  return (
    <div className="video-player">
      {!loading && (
        <button className="back-btn" onClick={goBack}>
          <FaArrowLeft /> Back
        </button>
      )}

      {loading && (
        <div
          className="spinner-border position-absolute text-danger"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {video && !loading && (
        <video
          ref={videoRef}
          src={video.url}
          onTimeUpdate={handleProgressUpdate}
          onLoadedMetadata={() => {
            setDuration(videoRef.current.duration);
            setIsPlaying(true);
          }}
          className={`video-element ${loading ? "" : "visible"}`}
        />
      )}

      {!loading && video && (
        <div className="controls">
          <button onClick={togglePlayPause} className="control-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <div className="progress-bar" onClick={handleProgressBarClick}>
            <div className="progress" style={{ width: `${progress}%` }} />
          </div>
          <button onClick={handleVolumeToggle} className="control-button ">
            {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
          <span className="time">
            {Math.floor(progress / 60)}:
            {("0" + Math.floor(progress % 60)).slice(-2)}
          </span>
          <button
            onClick={() => videoRef.current.requestFullscreen()}
            className="control-button"
          >
            <FaExpand />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
