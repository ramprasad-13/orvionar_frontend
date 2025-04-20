import React, { useState, useEffect } from 'react';
import { addVideo, getVideosByCourseId, deleteVideo, updateVideo, getCourseById } from '../utils/api';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import styles from '../styles/AdminVideos.module.css';
import VideoPlayer from '../components/VideoPlayer';

const AdminVideos = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoTags, setVideoTags] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    getCourseById(courseId)
      .then(response => setCourseDetails(response))
      .catch(error => console.error('Error fetching course:', error));

    getVideosByCourseId(courseId)
      .then(response => setVideos(response))
      .catch(error => console.error('Error fetching videos:', error));
  }, [courseId]);

  const handleVideoUpload = async () => {
    const videoData = {};
    if (name) videoData.name = name;
    if (videoDescription) videoData.description = videoDescription;
    if (videoTags) videoData.tags = videoTags.split(',').map(tag => tag.trim());
    if (thumbnail) videoData.thumbnail = thumbnail;

    if (editIndex !== null) {
      try {
        setLoading(true);
        const videoId = videos[editIndex]._id;
        await updateVideo(videoId, videoData);
        setLoading(false);
        resetForm();
        refreshVideos();
      } catch (error) {
        setLoading(false);
        console.error('Error updating video:', error);
      }
    } else {
      if (!selectedVideo) {
        console.log('Please select a video file');
        return;
      }
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('name', name);
      formData.append('description', videoDescription);
      formData.append('thumbnail', thumbnail);
      formData.append('tags', videoTags);
      formData.append('video', selectedVideo);

      try {
        setLoading(true);
        await addVideo(formData);
        setLoading(false);
        resetForm();
        refreshVideos();
      } catch (error) {
        setLoading(false);
        console.error('Error uploading video:', error);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setVideoDescription('');
    setVideoTags('');
    setThumbnail('');
    setSelectedVideo(null);
    setEditIndex(null);
  };

  const refreshVideos = () => {
    getVideosByCourseId(courseId)
      .then(response => setVideos(response))
      .catch(error => console.error('Error fetching videos:', error));
  };

  const handleFileChange = (e) => setSelectedVideo(e.target.files[0]);

  const handleDeleteVideo = (videoId) => {
    deleteVideo(videoId)
      .then(() => setVideos(videos.filter(video => video._id !== videoId)))
      .catch(error => console.error('Error deleting video:', error));
  };

  const handleEditVideo = (index) => {
    const video = videos[index];
    setEditIndex(index);
    setName(video.name);
    setVideoDescription(video.description);
    setVideoTags(video.tags.join(', '));
    setThumbnail(video.thumbnail);
  };

  const filteredVideos = videos.filter(video =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openVideoModal = (video) => {
    setCurrentVideo(video);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className={styles.adminVideosSection}>
      {courseDetails && (
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
          </div>
        </div>
      )}

      <div className={styles.curriculum}>
        <h2 className={styles.sectionTitle}>Curriculum</h2>
        {courseDetails && courseDetails.curriculum && courseDetails.curriculum.length > 0 ? (
          <div className={styles.curriculumCard}>
            <ul className={styles.curriculumList}>
              {courseDetails.curriculum.map((item, index) => (
                <li key={index} className={styles.curriculumItem}>
                  <h3 className={styles.curriculumHeading}>{item.heading}</h3>
                  {item.subTopics && item.subTopics.length > 0 ? (
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
          <p className={styles.noCurriculum}>No curriculum available</p>
        )}
      </div>

      <div className={styles.videoUploadForm}>
        <h2 className={styles.formTitle}>{editIndex !== null ? 'Edit Video' : 'Add New Video'}</h2>
        <input
          type="text"
          placeholder="Video Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
        />
        <textarea
          placeholder="Video Description"
          value={videoDescription}
          onChange={(e) => setVideoDescription(e.target.value)}
          rows="4"
        />
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          disabled={editIndex !== null}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={videoTags}
          onChange={(e) => setVideoTags(e.target.value)}
        />
        <button
          className={styles.uploadBtn}
          onClick={handleVideoUpload}
          disabled={loading || (!selectedVideo && editIndex === null)}
        >
          {loading ? 'Processing...' : (editIndex !== null ? 'Update Video' : 'Add Video')}
        </button>
        {loading && <Spinner />}
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
      </div>

      <div className={styles.videosList}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div className={styles.videoCard} key={video._id}>
              <div className={styles.videoPreview} onClick={() => openVideoModal(video)}>
                <img src={video.thumbnail} alt={video.name} />
                <div className={styles.playButton}>
                  <span>▶</span>
                </div>
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.name}</h3>
                <p className={styles.videoDesc}>{video.description}</p>
                <p className={styles.videoTags}>
                  <strong>Tags:</strong> {video.tags.join(', ')}
                </p>
                <div className={styles.videoActions}>
                  <button className={styles.editBtn} onClick={() => handleEditVideo(index)}>
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteVideo(video._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noVideos}>No videos found.</p>
        )}
      </div>

      {isModalOpen && currentVideo && (
        <div className={styles.videoModal}>
          <div className={styles.modalContent}>
            <button className={styles.closeBtn} onClick={closeVideoModal}>
              ×
            </button>
            <VideoPlayer videoUrl={currentVideo.signedUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVideos;