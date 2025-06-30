import React, { useState, useEffect, useCallback } from 'react';
import { addVideo, getVideosByCourseId, deleteVideo, updateVideo, getCourseById } from '../utils/api';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const AdminVideos = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
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
  const [, setError] = useState(null);

  const extractSrcFromIframe = (iframeCode) => {
    try {
      const srcMatch = iframeCode.match(/src=["'](.*?)["']/i);
      return srcMatch && srcMatch[1] ? srcMatch[1] : null;
    } catch {
      return null;
    }
  };

  const isValidVimeoEmbedCode = (iframeCode) => {
    const src = extractSrcFromIframe(iframeCode);
    if (!src) return false;
    try {
      new URL(src);
      return /^https:\/\/player\.vimeo\.com\/video\/.*/.test(src);
    } catch {
      return false;
    }
  };

  const refreshVideos = useCallback(() => {
    setLoading(true);
    getVideosByCourseId(courseId)
      .then(response => {
        setVideos(response.videos || []);
        setLoading(false);
      })
      .catch(() => {
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
      .catch(() => {
        setLoading(false);
      });
    refreshVideos();
  }, [courseId, refreshVideos]);

  const handleVideoSubmit = async () => {
    const embedSrc = extractSrcFromIframe(embedCode);

    if (embedCode && !isValidVimeoEmbedCode(embedCode)) {
      alert('Invalid Vimeo iframe embed code.');
      return;
    }

    const videoData = { courseId };
    if (name) videoData.name = name;
    if (videoDescription) videoData.description = videoDescription;
    if (thumbnail) videoData.thumbnail = thumbnail;
    if (embedSrc) {
      videoData.videoEmbedCode = `<iframe src="${embedSrc}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media" allowfullscreen></iframe>`;
    }
    if (videoTags) videoData.tags = videoTags.split(',').map(tag => tag.trim()).filter(tag => tag);

    try {
      setLoading(true);
      if (editIndex !== null) {
        await updateVideo(videos[editIndex]._id, videoData);
      } else {
        await addVideo(videoData);
      }
      setLoading(false);
      resetForm();
      refreshVideos();
    } catch {
      setLoading(false);
      alert('Error submitting video.');
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
      .catch(() => {
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
    setEmbedCode(video.videoEmbedCode);
  };

  const filteredVideos = videos.filter(video =>
    video.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayClick = (videoId) => {
    navigate(`/play/${videoId}`);
  };

  return (
    <div className="p-6 space-y-8">
      {loading && <Spinner />}

      {courseDetails && (
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <img src={courseDetails.thumbnail} alt={courseDetails.name} className="w-60 h-40 mx-auto sm:w-60 h-40 object-cover rounded" />
          <div className="w-full">
            <h1 className="text-2xl font-semibold">{courseDetails.name}</h1>
            <p className='text-justify'>{courseDetails.description}</p>
            <p className="text-sm text-gray-500">Instructor: {courseDetails.instructor || 'N/A'}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md p-6 rounded space-y-4">
        <h2 className="text-xl font-bold">{editIndex !== null ? 'Edit Video' : 'Add New Video'}</h2>
        <input type="text" placeholder="Video Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <input type="text" placeholder="Thumbnail URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} className="w-full border px-3 py-2 rounded" />
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Preview"
            className="w-full h-40 object-cover rounded border"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Thumbnail';
            }}
          />
        )}
        <textarea placeholder="Video Description" value={videoDescription} onChange={(e) => setVideoDescription(e.target.value)} rows="3" className="w-full border px-3 py-2 rounded" />
        <textarea placeholder="Vimeo Embed Code" value={embedCode} onChange={(e) => setEmbedCode(e.target.value)} rows="2" className="w-full border px-3 py-2 rounded" />
        <input type="text" placeholder="Tags (comma separated)" value={videoTags} onChange={(e) => setVideoTags(e.target.value)} className="w-full border px-3 py-2 rounded" />
        <button onClick={handleVideoSubmit} disabled={loading || (!embedCode && editIndex === null)} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {loading ? 'Processing...' : (editIndex !== null ? 'Update Video' : 'Add Video')}
        </button>
        <input type="text" placeholder="Search videos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border px-3 py-2 rounded mt-4" />
      </div>

      <div className="grid gap-6 sm:grid-cols-4">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={video._id} className="bg-white shadow rounded p-4 space-y-2">
              <div className="relative h-40">
                <img
                  src={video.thumbnail}
                  alt={video.name}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Thumbnail';
                  }}
                />
                <button
                  onClick={() => handlePlayClick(video._id)}
                  className="absolute inset-0 flex items-center justify-center text-white text-3xl bg-opacity-50"
                >
                  ▶
                </button>
              </div>
              <h3 className="text-lg font-semibold">{video.name}</h3>
              <p className="text-sm text-gray-600">{video.description}</p>
              <p className="text-xs text-gray-400">Tags: {video.tags.join(', ')}</p>
              <div className="flex space-x-2">
                <button onClick={() => handleEditVideo(index)} className="text-sm px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDeleteVideo(video._id)} className="text-sm px-3 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;
