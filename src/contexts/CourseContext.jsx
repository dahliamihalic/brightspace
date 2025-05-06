import { createContext, useState, useLayoutEffect, useContext } from "react";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [course, setCourse] = useState(null);
    const { isLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    
    useLayoutEffect(() => {
        if (isLogin) {
        fetch("https://web.ics.purdue.edu/~omihalic/brightspace-app/course.php")
            .then((response) => response.json())
            .then((data) => {
            if (data.course) {
                setCourse(data.course);
            } else {
                console.log(data.message);
            }
            })
            .catch((error) => {
            console.error("Error:", error);
            });
        } else {
        navigate("/login");
        }
    }, [isLogin, navigate]);
    
    return (
        <CourseContext.Provider value={{ course }}>
            {children}
        </CourseContext.Provider>
    );
    }