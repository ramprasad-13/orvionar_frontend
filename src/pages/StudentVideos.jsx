import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, getVideosByCourseId } from '../utils/api';

import Spinner from '../components/Spinner';

const StudentVideos = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [watchedVideos, setWatchedVideos] = useState([]);
  const [lastWatchedVideoId, setLastWatchedVideoId] = useState(null);

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
        console.log(err);
        setError('Failed to load course or videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  const handleMarkAsRead = (videoId) => {
    setWatchedVideos((prev) => {
      const updated = [...new Set([...prev, videoId])];
      setLastWatchedVideoId(videoId);
      return updated;
    });
  };

  const handlePlayVideo = (videoId) => {
    setLastWatchedVideoId(videoId);
    navigate(`/play/${videoId}`);
  };

  const completionRate = videos.length
    ? Math.round((watchedVideos.length / videos.length) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {loading && <Spinner />}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && courseDetails && (
        <>
          {/* Course Info */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <img
              src={courseDetails.thumbnail}
              alt={courseDetails.name}
              className="w-full md:w-1/3 rounded-lg shadow"
            />
            <div className="flex-1 space-y-3">
              <h1 className="text-3xl font-bold text-gray-800">{courseDetails.name}</h1>
              <p className="text-gray-700">{courseDetails.description}</p>
              <p><strong>Instructor:</strong> {courseDetails.instructor || 'N/A'}</p>
              <p><strong>Tags:</strong> {courseDetails.tags?.length ? courseDetails.tags.join(', ') : 'None'}</p>

              {/* Progress */}
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Progress: {completionRate}%</p>
                <div className="w-full h-3 bg-gray-200 rounded-full">
                  <div className="h-3 bg-orange-500 rounded-full transition-all" style={{ width: `${completionRate}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Button */}
          {lastWatchedVideoId && (
            <div className="my-6 text-center">
              <button
                onClick={() => handlePlayVideo(lastWatchedVideoId)}
                className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition font-semibold"
              >
                ▶ Resume Watching
              </button>
            </div>
          )}

          {/* Videos */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Videos</h2>
          {videos.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-4">
              {videos.map((video) => {
                const isWatched = watchedVideos.includes(video._id);

                return (
                  <div key={video._id} id={`video-${video._id}`} className="border rounded-lg shadow bg-white overflow-hidden">
                    <div className="relative w-full h-56 bg-black cursor-pointer" onClick={() => handlePlayVideo(video._id)}>
                      <img
                        src={video.thumbnail}
                        alt={video.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black/50 hover:bg-black/70 transition">
                        ▶
                      </div>
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-800">{video.name}</h3>
                      <p className="text-sm text-gray-600">{video.description}</p>
                      <p className="text-sm text-gray-500"><strong>Tags:</strong> {video.tags?.length ? video.tags.join(', ') : 'None'}</p>
                      <div className="flex justify-between items-center mt-3">
                        <button
                          onClick={() => handleMarkAsRead(video._id)}
                          className={`text-sm px-4 py-2 rounded transition font-medium ${isWatched ? 'bg-green-500 text-white cursor-default' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                          disabled={isWatched}
                        >
                          {isWatched ? '✅ Completed' : 'Mark as Read'}
                        </button>
                        {isWatched && <span className="text-xs text-green-600 font-medium">✔ Watched</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">No videos available for this course.</p>
          )}
        </>
      )}
    </div>
  );
};

export default StudentVideos;
