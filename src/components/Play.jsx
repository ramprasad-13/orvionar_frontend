import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideosByCourseId } from '../utils/api';
import VideoPlayer from '../components/VideoPlayer';
import styles from '../styles/Play.module.css';

const Play = () => {
  const { courseId, videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError('');
      try {
        const videos = await getVideosByCourseId(courseId);
        const selectedVideo = videos.find((v) => v._id === videoId);
        if (selectedVideo) {
          setVideo(selectedVideo);
        } else {
          setError('Video not found.');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load video. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [courseId, videoId]);

  const handleBack = () => {
    navigate(`/course/${courseId}/videos`);
  };

  return (
    <div className={styles.playPage}>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {!loading && !error && video && (
        <div className={styles.videoContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            ← Back to Course
          </button>
          <h1 className={styles.videoTitle}>{video.name}</h1>
          <div className={styles.playerWrapper}>
            <VideoPlayer videoUrl={video.signedUrl} thumbnail={video.thumbnail} />
          </div>
          <p className={styles.videoDescription}>{video.description}</p>
        </div>
      )}
    </div>
  );
};

export default Play;