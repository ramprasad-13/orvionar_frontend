import React, { useRef, useState, useEffect } from 'react';
import styles from '../styles/VideoPlayer.module.css';

const VideoPlayer = ({ videoUrl, thumbnail }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const seekTo = (event.nativeEvent.offsetX / event.target.offsetWidth) * duration;
    videoRef.current.currentTime = seekTo;
    setCurrentTime(seekTo);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      videoRef.current.parentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
    videoRef.current.playbackRate = rate;
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const videoNode = videoRef.current;
    if (videoNode) {
      videoNode.addEventListener('timeupdate', handleTimeUpdate);
      videoNode.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (videoNode) {
        videoNode.removeEventListener('timeupdate', handleTimeUpdate);
        videoNode.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);

  return (
    <div className={`${styles.videoPlayer} ${isFullScreen ? styles.fullscreen : ''}`}>
      <video
        ref={videoRef}
        src={videoUrl}
        poster={thumbnail}
        className={styles.videoElement}
        onClick={togglePlayPause}
        controls={false}
      />
      <div className={styles.controls}>
        <button onClick={togglePlayPause} className={styles.controlBtn}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <div className={styles.seekBarContainer}>
          <span className={styles.time}>{formatTime(currentTime)}</span>
          <div className={styles.seekBar} onClick={handleSeek}>
            <div
              className={styles.progress}
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className={styles.time}>{formatTime(duration)}</span>
        </div>
        <div className={styles.volumeContainer}>
          <span className={styles.icon}>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className={styles.volumeSlider}
          />
        </div>
        <select
          className={styles.speedControl}
          value={playbackRate}
          onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
        >
          <option value="0.5">0.5x</option>
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
        <button onClick={toggleFullScreen} className={styles.controlBtn}>
          {isFullScreen ? '🡻' : '🡹'}
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;