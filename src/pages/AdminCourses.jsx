import React, { useState, useEffect } from 'react';
import { addCourse, getAllCourses, updateCourse, deleteCourse } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AdminCourses.module.css';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseInstructor, setCourseInstructor] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState('');
  const [courseTags, setCourseTags] = useState('');
  const [courseDomain, setCourseDomain] = useState('others');
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: '', description: '', imageUrl: '' });
  const [curriculum, setCurriculum] = useState([]);
  const [newCurriculumItem, setNewCurriculumItem] = useState({ heading: '', subTopics: [] });
  const [newSubTopic, setNewSubTopic] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const domains = ['cse', 'ece', 'mech', 'civil', 'management', 'pharmacy', 'agriculture', 'others'];
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getAllCourses()
      .then(response => {
        console.log('API response:', response);
        setCourses(Array.isArray(response) ? response : []);
        setIsLoading(false);
      })
      .catch(error => {
        setMessage('Error fetching courses: ' + error.message);
        setIsError(true);
        setCourses([]);
        setIsLoading(false);
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleAddCourse = () => {
    if (!courseName.trim()) {
      setMessage('Course Name is required');
      setIsError(true);
      return;
    }

    const tagsArray = courseTags && typeof courseTags === 'string'
      ? courseTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [];

    const courseData = {
      name: courseName,
      ...(courseDescription.trim() && { description: courseDescription }),
      ...(courseInstructor.trim() && { instructor: courseInstructor }),
      ...(courseThumbnail.trim() && { thumbnail: courseThumbnail }),
      tags: tagsArray,
      domain: courseDomain,
      projects: projects.length > 0 ? projects : [],
      curriculum: curriculum.length > 0 ? curriculum : [],
    };

    if (editIndex !== null) {
      updateCourse(courses[editIndex]._id, courseData)
        .then(response => {
          const updatedCourses = [...courses];
          updatedCourses[editIndex] = response;
          setCourses(updatedCourses);
          setEditIndex(null);
          setMessage('Course updated successfully');
          setIsError(false);
        })
        .catch(error => {
          setMessage('Error updating course: ' + error.message);
          setIsError(true);
          console.error('Error updating course:', error);
        });
    } else {
      addCourse(courseData)
        .then(response => {
          setCourses([...courses, response]);
          setMessage('Course added successfully');
          setIsError(false);
        })
        .catch(error => {
          setMessage('Error adding course: ' + error.message);
          setIsError(true);
          console.error('Error adding course:', error);
        });
    }

    setCourseName('');
    setCourseDescription('');
    setCourseInstructor('');
    setCourseThumbnail('');
    setCourseTags('');
    setProjects([]);
    setCurriculum([]);
    setNewProject({ name: '', description: '', imageUrl: '' });
    setNewCurriculumItem({ heading: '', subTopics: [] });
    setNewSubTopic('');
    setCourseDomain('others');
  };

  const handleDeleteCourse = (courseId) => {
    deleteCourse(courseId)
      .then(() => {
        setCourses(courses.filter(course => course._id !== courseId));
        setMessage('Course deleted successfully');
        setIsError(false);
      })
      .catch(error => {
        setMessage('Error deleting course: ' + error.message);
        setIsError(true);
        console.error('Error deleting course:', error);
      });
  };

  const handleEditCourse = (index) => {
    const course = courses[index];
    setEditIndex(index);
    setCourseName(course.name || '');
    setCourseDescription(course.description || '');
    setCourseInstructor(course.instructor || '');
    setCourseThumbnail(course.thumbnail || '');
    setCourseTags(course.tags ? course.tags.join(', ') : '');
    setProjects(course.projects || []);
    setCurriculum(course.curriculum || []);
    setCourseDomain(course.domain || 'others');
  };

  const handleAddProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      setProjects([...projects, { ...newProject }]);
      setNewProject({ name: '', description: '', imageUrl: '' });
    } else {
      setMessage('Project name and description are required');
      setIsError(true);
    }
  };

  const handleRemoveProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const handleAddCurriculumItem = () => {
    if (newCurriculumItem.heading.trim()) {
      setCurriculum([...curriculum, { ...newCurriculumItem }]);
      setNewCurriculumItem({ heading: '', subTopics: [] });
      setNewSubTopic('');
    } else {
      setMessage('Curriculum heading is required');
      setIsError(true);
    }
  };

  const handleRemoveCurriculumItem = (index) => {
    setCurriculum(curriculum.filter((_, i) => i !== index));
  };

  const handleCurriculumChange = (index, field, value) => {
    const updatedCurriculum = [...curriculum];
    if (field === 'heading') {
      updatedCurriculum[index].heading = value;
    }
    setCurriculum(updatedCurriculum);
  };

  const handleAddSubTopic = (curriculumIndex) => {
    if (newSubTopic.trim()) {
      const updatedCurriculum = [...curriculum];
      updatedCurriculum[curriculumIndex].subTopics.push(newSubTopic.trim());
      setCurriculum(updatedCurriculum);
      setNewSubTopic('');
    } else {
      setMessage('Sub-topic cannot be empty');
      setIsError(true);
    }
  };

  const handleRemoveSubTopic = (curriculumIndex, subTopicIndex) => {
    const updatedCurriculum = [...curriculum];
    updatedCurriculum[curriculumIndex].subTopics = updatedCurriculum[curriculumIndex].subTopics.filter(
      (_, i) => i !== subTopicIndex
    );
    setCurriculum(updatedCurriculum);
  };

  const handleSubTopicChange = (curriculumIndex, subTopicIndex, value) => {
    const updatedCurriculum = [...curriculum];
    updatedCurriculum[curriculumIndex].subTopics[subTopicIndex] = value;
    setCurriculum(updatedCurriculum);
  };

  const filteredCourses = Array.isArray(courses)
    ? courses.filter(course =>
        course.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
      )
    : [];

  return (
    <div className={styles.adminCourses}>
      {message && (
        <div className={`${styles.messagePopup} ${isError ? styles.error : styles.success}`}>
          <span>{message}</span>
          <button className={styles.closeBtn} onClick={() => setMessage(null)}>×</button>
        </div>
      )}
      <div className={styles.formSection}>
        <div className={styles.heading}>
          <h1 className={styles.sectionTitle}>Manage Courses</h1>
          <p className={styles.sectionSubtitle}>Add, edit, or remove courses efficiently</p>
        </div>

        <div className={styles.courseForm}>
          <div className={styles.basicFields}>
            <input
              type="text"
              placeholder="Course Name *"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
            />
            <textarea
              placeholder="Course Description"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows="4"
            />
            <input
              type="text"
              placeholder="Instructor Name"
              value={courseInstructor}
              onChange={(e) => setCourseInstructor(e.target.value)}
            />
            <select
              value={courseDomain}
              onChange={(e) => setCourseDomain(e.target.value)}
              className={styles.domainSelect}
            >
              {domains.map(domain => (
                <option key={domain} value={domain}>
                  {domain.toUpperCase()}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Thumbnail URL (optional)"
              value={courseThumbnail}
              onChange={(e) => setCourseThumbnail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={courseTags}
              onChange={(e) => setCourseTags(e.target.value)}
            />
          </div>
          <div className={styles.advancedFields}>
            <div className={styles.curriculumSection}>
              <h3>Curriculum</h3>
              <div className={styles.curriculumInput}>
                <input
                  type="text"
                  placeholder="Add Heading *"
                  value={newCurriculumItem.heading}
                  onChange={(e) => setNewCurriculumItem({ ...newCurriculumItem, heading: e.target.value })}
                />
                <button
                  type="button"
                  onClick={handleAddCurriculumItem}
                  className={styles.addCurriculumBtn}
                >
                  Add Heading
                </button>
              </div>
              {curriculum.length > 0 && (
                <ul className={styles.curriculumList}>
                  {curriculum.map((item, index) => (
                    <li key={index} className={styles.curriculumItem}>
                      <div className={styles.curriculumHeading}>
                        <input
                          type="text"
                          value={item.heading}
                          onChange={(e) => handleCurriculumChange(index, 'heading', e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveCurriculumItem(index)}
                          className={styles.removeCurriculumBtn}
                        >
                          Remove
                        </button>
                      </div>
                      <div className={styles.subTopicInput}>
                        <input
                          type="text"
                          placeholder="Add Sub-Topic"
                          value={newSubTopic}
                          onChange={(e) => setNewSubTopic(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddSubTopic(index)}
                          className={styles.addSubTopicBtn}
                        >
                          Add Sub-Topic
                        </button>
                      </div>
                      {item.subTopics.length > 0 && (
                        <ul className={styles.subTopicList}>
                          {item.subTopics.map((subTopic, subIndex) => (
                            <li key={subIndex} className={styles.subTopicItem}>
                              <input
                                type="text"
                                value={subTopic}
                                onChange={(e) => handleSubTopicChange(index, subIndex, e.target.value)}
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveSubTopic(index, subIndex)}
                                className={styles.removeSubTopicBtn}
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.projectsSection}>
              <h3>Projects</h3>
              <div className={styles.projectInput}>
                <input
                  type="text"
                  placeholder="Project Name *"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
                <textarea
                  placeholder="Project Description *"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  rows="3"
                />
                <input
                  type="text"
                  placeholder="Project Image URL (optional)"
                  value={newProject.imageUrl}
                  onChange={(e) => setNewProject({ ...newProject, imageUrl: e.target.value })}
                />
                <button
                  type="button"
                  onClick={handleAddProject}
                  className={styles.addProjectBtn}
                >
                  Add Project
                </button>
              </div>
              {projects.length > 0 && (
                <ul className={styles.projectList}>
                  {projects.map((project, index) => (
                    <li key={index} className={styles.projectItem}>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                      />
                      <textarea
                        value={project.description}
                        onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                        rows="3"
                      />
                      <input
                        type="text"
                        value={project.imageUrl}
                        onChange={(e) => handleProjectChange(index, 'imageUrl', e.target.value)}
                        placeholder="Image URL"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveProject(index)}
                        className={styles.removeProjectBtn}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <button className={styles.formBtn} onClick={handleAddCourse}>
            {editIndex !== null ? 'Update Course' : 'Add Course'}
          </button>
        </div>

        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchBar}
        />
      </div>

      <div className={styles.coursesList}>
        {isLoading ? (
          <p className={styles.noCourses}>Loading courses...</p>
        ) : filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div className={styles.courseCard} key={course._id}>
              <img
                src={course.thumbnail || '/default-thumbnail.png'}
                alt={course.name || 'Course'}
                className={styles.courseThumbnail}
                loading="lazy"
                onError={e => (e.target.src = '/default-thumbnail.png')}
              />
              <div className={styles.courseContent}>
                <h3 className={styles.courseTitle}>{course.name || 'Untitled Course'}</h3>
                <p className={styles.courseDesc}>
                  {course.description || 'No description available'}
                </p>
                <p className={styles.courseInfo}>
                  <strong>Instructor:</strong> {course.instructor || 'N/A'}
                </p>
                <p className={styles.courseInfo}>
                  <strong>Domain:</strong> {(course.domain || 'others').toUpperCase()}
                </p>
                <div className={styles.courseTags}>
                  {Array.isArray(course.tags) &&
                    course.tags.map((tag, idx) => (
                      <span key={idx} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                </div>
                <div className={styles.courseActions}>
                  <button
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    onClick={() => handleEditCourse(index)}
                  >
                    Edit
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    Delete
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.videoBtn}`}
                    onClick={() => navigate(`/course/${course._id}/videos`)}
                  >
                    Manage Videos
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noCourses}>
            {searchTerm ? 'No courses found.' : 'No courses were added.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminCourses;
