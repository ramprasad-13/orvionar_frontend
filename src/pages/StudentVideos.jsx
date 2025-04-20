import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, getVideosByCourseId } from '../utils/api';
import styles from '../styles/StudentVideos.module.css';

const StudentVideos = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const courseResponse = await getCourseById(courseId);
        setCourseDetails(courseResponse);

        const videosResponse = await getVideosByCourseId(courseId);
        setVideos(videosResponse);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load course or videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleVideoSelect = (videoId) => {
    navigate(`/play/${courseId}/${videoId}`);
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
                {courseDetails.tags?.length > 0 ? courseDetails.tags.join(', ') : 'None'}
              </p>
            </div>
          </div>

          <div className={styles.curriculum}>
            <h2 className={styles.sectionTitle}>Curriculum</h2>
            {courseDetails.curriculum?.length > 0 ? (
              <div className={styles.curriculumCard}>
                <ul className={styles.curriculumList}>
                  {courseDetails.curriculum.map((item, index) => (
                    <li key={index} className={styles.curriculumItem}>
                      <h3 className={styles.curriculumHeading}>{item.heading}</h3>
                      {item.subTopics?.length > 0 ? (
                        <ul className={styles.subTopicList}>
                          {item.subTopics.map((subTopic, subIndex) => (
                            <li key={subIndex} className={styles.subTopicItem}>
                              {subTopic}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={styles.noSubTopics}>No sub-topics available</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className={styles.noCurriculum}>No curriculum available.</p>
            )}
          </div>

          <div className={styles.videosSection}>
            <h2 className={styles.sectionTitle}>Course Videos</h2>
            {videos.length > 0 ? (
              <div className={styles.videosGrid}>
                {videos.map((video) => (
                  <div key={video._id} className={styles.videoCard}>
                    <div
                      className={styles.videoPreview}
                      onClick={() => handleVideoSelect(video._id)}
                    >
                      <img src={video.thumbnail} alt={video.name} />
                      <div className={styles.playButton}>
                        <span>▶</span>
                      </div>
                    </div>
                    <div className={styles.videoInfo}>
                      <h3 className={styles.videoTitle}>{video.name}</h3>
                      <p className={styles.videoDesc}>{video.description}</p>
                      <p className={styles.videoTags}>
                        <strong>Tags:</strong>{' '}
                        {video.tags?.length > 0 ? video.tags.join(', ') : 'None'}
                      </p>
                    </div>
                  </div>
                ))}
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