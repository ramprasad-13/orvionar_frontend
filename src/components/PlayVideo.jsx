import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoById } from '../utils/api';
import Spinner from './Spinner';

const PlayVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideoById(videoId)
      .then(response => {
        setVideo(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Failed to load video');
        navigate('/');
      });
  }, [videoId, navigate]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{video.name}</h1>
      <div className="aspect-video mb-6">
        <div dangerouslySetInnerHTML={{ __html: video.embedCode }} className="w-full h-full" />
      </div>
      <p className="text-lg mb-2">{video.description}</p>
      <p className="text-sm text-gray-500">Tags: {video.tags.join(', ')}</p>
      <button onClick={() => navigate(-1)} className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800">Go Back</button>
    </div>
  );
};

export default PlayVideo;
