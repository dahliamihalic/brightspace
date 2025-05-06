import { useState, useEffect } from 'react';
import { AssignmentCard } from '../components/assignmentCard';
import { useParams } from 'react-router-dom';

export const CoursePage = () => {
    const { courseId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssignments = async () => {
        try {
            const response = await fetch(`/api/assignments.php?course_id=${courseId}`);
            const data = await response.json();
            setAssignments(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, [courseId]);

    if (loading) return <div>Loading assignments...</div>;

    return (
        <div>
            <h2>Course Assignments</h2>
            {assignments.length > 0 ? (
                assignments.map(assignment => (
                    <AssignmentCard 
                        key={assignment.id}
                        assignment={assignment}
                        onUpdate={fetchAssignments}
                    />
                ))
            ) : (
                <p>No assignments yet for this course.</p>
            )}
        </div>
    );
};