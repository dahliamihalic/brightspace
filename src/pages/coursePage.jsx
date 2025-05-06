import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AssignmentCard } from '../components/assignmentCard';
import styles from '../styles/course.module.css';

export const CoursePage = () => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAssignments = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/assignments.php?course_id=${courseId}`, {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (result.success) {
                setAssignments(result.data);
            } else {
                throw new Error(result.error || "Failed to load assignments");
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, [courseId]);

    if (loading) return <div className={styles.loading}>Loading assignments...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.coursePage}>
            <h2>Course Assignments</h2>
            {assignments.length > 0 ? (
                <div className={styles.assignmentsGrid}>
                    {assignments.map(assignment => (
                        <AssignmentCard
                            key={assignment.id}
                            assignment={assignment}
                            onUpdate={fetchAssignments}
                        />
                    ))}
                </div>
            ) : (
                <p>No assignments found for this course.</p>
            )}
        </div>
    );
};