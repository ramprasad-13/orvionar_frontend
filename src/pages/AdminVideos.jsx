import React, { useState, useEffect, useCallback } from 'react';
import { addVideo, getVideosByCourseId, deleteVideo, updateVideo, getCourseById } from '../utils/api';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import styles from '../styles/AdminVideos.module.css';

const AdminVideos = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [name, setName] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoTags, setVideoTags] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [error, setError] = useState(null);

  // Parse src from iframe embed code
  const extractSrcFromIframe = (iframeCode) => {
    try {
      const srcMatch = iframeCode.match(/src=["'](.*?)["']/i);
      return srcMatch && srcMatch[1] ? srcMatch[1] : null;
    } catch {
      return null;
    }
  };

  // Validate Vimeo embed code
  const isValidVimeoEmbedCode = (iframeCode) => {
    const src = extractSrcFromIframe(iframeCode);
    if (!src) {
      return false;
    }
    try {
      new URL(src);
      return /^https:\/\/player\.vimeo\.com\/video\/\d+/.test(src);
    } catch {
      return false;
    }
  };

  const refreshVideos = useCallback(() => {
    setLoading(true);
    getVideosByCourseId(courseId)
      .then(response => {
        setVideos(response.videos || []);
        console.log('Frontend received video embed codes:', response.videos.map(v => v.embedCode));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching videos:', error);
        setLoading(false);
      });
  }, [courseId]);

  useEffect(() => {
    setLoading(true);
    getCourseById(courseId)
      .then(response => {
        setCourseDetails(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching course:', error);
        setLoading(false);
      });

    refreshVideos();
  }, [courseId, refreshVideos]);

  const handleVideoSubmit = async () => {
    // Validate embedCode
    if (embedCode && !isValidVimeoEmbedCode(embedCode)) {
      alert('Invalid Vimeo iframe embed code. Must contain a src starting with https://player.vimeo.com/video/');
      return;
    }

    const videoData = {};
    if (name) videoData.name = name;
    if (videoDescription) videoData.description = videoDescription;
    if (videoTags) videoData.tags = videoTags.split(',').map(tag => tag.trim());
    if (thumbnail) videoData.thumbnail = thumbnail;
    if (embedCode) videoData.videoEmbedCode = embedCode;
    videoData.courseId = courseId;

    try {
      setLoading(true);
      if (editIndex !== null) {
        const videoId = videos[editIndex]._id;
        await updateVideo(videoId, videoData);
      } else {
        await addVideo(videoData);
      }
      setLoading(false);
      resetForm();
      refreshVideos();
    } catch (error) {
      setLoading(false);
      console.error('Error submitting video:', error);
      alert('Error submitting video: ' + (error.message || 'Unknown error'));
    }
  };

  const resetForm = () => {
    setName('');
    setVideoDescription('');
    setVideoTags('');
    setThumbnail('');
    setEmbedCode('');
    setEditIndex(null);
    setError(null);
  };

  const handleDeleteVideo = (videoId) => {
    setLoading(true);
    deleteVideo(videoId)
      .then(() => {
        setVideos(videos.filter(video => video._id !== videoId));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error deleting video:', error);
        setLoading(false);
      });
  };

  const handleEditVideo = (index) => {
    const video = videos[index];
    setEditIndex(index);
    setName(video.name);
    setVideoDescription(video.description);
    setVideoTags(video.tags.join(', '));
    setThumbnail(video.thumbnail);
    setEmbedCode(video.embedCode);
    setError(null);
  };

  const filteredVideos = videos.filter(video =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayClick = (videoId) => {
    setError(null);
    setLoading(true);
    setSelectedVideoId(selectedVideoId === videoId ? null : videoId);
  };

  return (
    <div className={styles.adminVideosSection}>
      {loading && <Spinner />}
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

      <div className={styles.videoUploadForm}>
        <h2 className={styles.formTitle}>{editIndex !== null ? 'Edit Video' : 'Add New Video'}</h2>
        <input type="text" placeholder="Video Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Thumbnail URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
        <textarea placeholder="Video Description" value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} rows="4" />
        <textarea
          placeholder="Vimeo Embed Code (e.g., <iframe src='https://player.vimeo.com/video/1072433320?...' ...></iframe>)"
          value={embedCode}
          onChange={(e) => setEmbedCode(e.target.value)}
          rows="3"
        />
        <input type="text" placeholder="Tags (comma separated)" value={videoTags} onChange={(e) => setVideoTags(e.target.value)} />
        <button className={styles.uploadBtn} onClick={handleVideoSubmit} disabled={loading || (!embedCode && editIndex === null)}>
          {loading ? 'Processing...' : (editIndex !== null ? 'Update Video' : 'Add Video')}
        </button>
        <input type="text" placeholder="Search videos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className={styles.searchBar} />
      </div>

      <div className={styles.videosList}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div className={styles.videoCard} key={video._id}>
              <div className={styles.videoPreview}>
                {selectedVideoId === video._id ? (
                  <div className={styles.videoEmbed}>
                    {loading && <Spinner />}
                    {video.embedCode ? (
                      (() => {
                        const src = extractSrcFromIframe(video.embedCode);
                        return src ? (
                          <>
                            {console.log('Iframe src:', src)}
                            <iframe
                              src={src}
                              frameBorder="0"
                              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                              title={video.name}
                              onLoad={() => setLoading(false)}
                              onError={() => {
                                setLoading(false);
                                setError('Failed to load video. Please check the Vimeo embed code or settings.');
                              }}
                            />
                            {error && <p className={styles.error}>{error}</p>}
                          </>
                        ) : (
                          <p className={styles.error}>Error: Invalid embed code.</p>
                        );
                      })()
                    ) : (
                      <p className={styles.error}>Error: Video embed code is missing.</p>
                    )}
                  </div>
                ) : (
                  <>
                    <img src={video.thumbnail} alt={video.name} />
                    <div className={styles.playButton} onClick={() => handlePlayClick(video._id)}>
                      <span>▶</span>
                    </div>
                  </>
                )}
              </div>
              <div className={styles.videoInfo}>
                <h3 className={styles.videoTitle}>{video.name}</h3>
                <p className={styles.videoDesc}>{video.description}</p>
                <p className={styles.videoTags}><strong>Tags:</strong> {video.tags.join(', ')}</p>
                <div className={styles.videoActions}>
                  <button className={styles.editBtn} onClick={() => handleEditVideo(index)}>Edit</button>
                  <button className={styles.deleteBtn} onClick={() => handleDeleteVideo(video._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noVideos}>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;
