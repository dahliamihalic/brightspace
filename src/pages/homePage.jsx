import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/homepage.module.css';
import { Link } from 'react-router-dom';


export const HomePage = () => {
    const { user } = useAuth();
    const [errors, setErrors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const response = await fetch('https://web.ics.purdue.edu/~omihalic/brightspace-app/get_courses.php');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched result:", data);

            if (data.error) {
                throw new Error(data.error);
            }

            setCourses(data);
        } catch (error) {
            console.error("Fetch error:", error);
            setErrors(error.message || "Failed to load courses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses(); // <== call it here
    }, [user]);


    return (
        <>
            < nav className={styles.topNav} >
                <ul>
                    <li>Announcements</li>
                    <li>Calendar</li>
                    <li>Help</li>
                </ul>
            </nav >
            <div className={styles.homeContainer}>

                {/* Banner */}
                <div className={styles.bannerContainer}>
                    <img
                        src="https://web.ics.purdue.edu/~omihalic/brightspace-app/banner_gate.jpg"
                        alt="Purdue University"
                        className={styles.bannerImage}
                    />
                    <div className={styles.headerOverlay}>
                        <h2 className={styles.campusTitle}>Purdue West Lafayette/Indianapolis</h2>
                    </div>
                </div>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    <section className={styles.coursesSection}>
                        <h3>My Courses</h3>

                        {loading ? (
                            <div className={styles.loading}>Loading courses...</div>
                        ) : (
                            <div className={styles.coursesGrid}>
                                {courses.map((course) => (
                                    <Link to={`/course/${course.id}`} key={course.id}>
                                        <div className={styles.courseCard}>
                                            <img src={`https://web.ics.purdue.edu/~omihalic/brightspace-app/${course.img}`} className={styles.courseImage} alt={course.name} />
                                            <h4>{course.code}</h4>
                                            <p>{course.name}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </>
    );
};