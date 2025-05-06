import { useState } from 'react';
import styles from '../styles/assignment.module.css';

export const AssignmentCard = ({ assignment, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [submission, setSubmission] = useState(assignment.submission_text || '');
    
    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/assignments.php', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: assignment.id,
                    course_id: assignment.course_id,
                    submission_text: submission,
                    is_completed: true
                })
            });
            const data = await response.json();
            onUpdate();
        } catch (error) {
            console.error('Submission error:', error);
        }
    };

    return (
        <div className={styles.assignmentCard}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>Points: {assignment.points}</p>
            <p>Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
            
            {isEditing ? (
                <div className={styles.submissionForm}>
                    <textarea
                        value={submission}
                        onChange={(e) => setSubmission(e.target.value)}
                        placeholder="Your submission..."
                    />
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    {assignment.submission_text ? (
                        <div className={styles.submittedText}>
                            <h4>Your Submission:</h4>
                            <p>{assignment.submission_text}</p>
                            <button onClick={() => setIsEditing(true)}>
                                Edit Submission
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setIsEditing(true)}>
                            Start Assignment
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};