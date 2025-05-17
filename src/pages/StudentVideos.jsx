import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById, getVideosByCourseId } from '../utils/api';
import styles from '../styles/StudentVideos.module.css';

const StudentVideos = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const extractSrcFromIframe = (iframeCode) => {
    try {
      if (!iframeCode || typeof iframeCode !== 'string') return null;
      const match = iframeCode.match(/src=["']([^"']+)["']/i);
      return match && match[1] ? match[1] : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const course = await getCourseById(courseId);
        setCourseDetails(course);
        const videoRes = await getVideosByCourseId(courseId);
        setVideos(videoRes.videos || []);
      } catch (err) {
        setError('Failed to load course or videos. Please try again later.');
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  const handlePlayClick = (e, videoId) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');
    setSelectedVideoId(selectedVideoId === videoId ? null : videoId);
  };

  return (
    <div className={styles.studentVideos}>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {!loading && !error && courseDetails && (
        <>
          <div className={styles.courseDetails}>
            <div className={styles.courseThumbnail}>
              <img src={courseDetails.thumbnail} alt={courseDetails.name} />
            </div>
            <div className={styles.courseInfo}>
              <h1 className={styles.courseTitle}>{courseDetails.name}</h1>
              <p className={styles.courseDesc}>{courseDetails.description}</p>
              <p className={styles.courseInstructor}>
                <strong>Instructor:</strong> {courseDetails.instructor || 'N/A'}
              </p>
              <p className={styles.courseTags}>
                <strong>Tags:</strong>{' '}
                {courseDetails.tags?.length ? courseDetails.tags.join(', ') : 'None'}
              </p>
            </div>
          </div>

          <div className={styles.videosSection}>
            <h2 className={styles.sectionTitle}>Course Videos</h2>
            {videos.length > 0 ? (
              <div className={styles.videosGrid}>
                {videos.map((video) => {
                  const src = extractSrcFromIframe(video.embedCode);
                  return (
                    <div key={video._id} className={styles.videoCard}>
                      <div className={styles.videoPreview}>
                        {selectedVideoId === video._id && src ? (
                          <div className={styles.videoEmbed}>
                            <iframe
                              src={src}
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                              allowFullScreen
                              style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                              }}
                              title={video.name}
                              onError={() =>
                                setError('Failed to load video. Please check the Vimeo embed code.')
                              }
                            />
                          </div>
                        ) : (
                          <>
                            <img src={video.thumbnail} alt={video.name} />
                            <div
                              className={styles.playButton}
                              onClick={(e) => handlePlayClick(e, video._id)}
                            >
                              <span>▶</span>
                            </div>
                          </>
                        )}
                      </div>
                      <div className={styles.videoInfo}>
                        <h3 className={styles.videoTitle}>{video.name}</h3>
                        <p className={styles.videoDesc}>{video.description}</p>
                        <p className={styles.videoTags}>
                          <strong>Tags:</strong>{' '}
                          {video.tags?.length ? video.tags.join(', ') : 'None'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className={styles.noVideos}>No videos available for this course.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentVideos;
