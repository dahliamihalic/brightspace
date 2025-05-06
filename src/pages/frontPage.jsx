import { useNavigate } from "react-router-dom";
import styles from "../styles/frontpage.module.css";
import "../styles/global.css";

export const FrontPage = () => {
    const navigate = useNavigate();
    const campusList = [
        "Purdue West Lafayette / Indianapolis", 
        "Purdue Fort Wayne", 
        "Purdue Northwest", 
        "Purdue Global"
    ];
    
    return (
        <div className={styles.frontPage}>
            <img src="/banner_student1.jpg" alt="Purdue University" />
            <h1 className={styles.title}>
                Please choose your campus to log in to Purdue University Brightspace.
            </h1>
            <div className={styles.campusList}>
                {campusList.map((campus) => (
                    <button 
                        key={campus} 
                        className={styles.loginButton}
                        onClick={() => navigate("/login")}
                    >
                        {campus}
                    </button>
                ))}
            </div>
        </div>
    );
}