
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/loginpage.module.css';

export const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors('');

        try {
            const response = await fetch('https://web.ics.purdue.edu/~omihalic/brightspace-app/auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    username: formData.username.trim(),
                    password: formData.password.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Login failed");

            if (data.status === 'success') {
                login(data.user); // This now properly updates the context
                navigate('/');
            } else {
                setErrors(data.message || "Login failed");
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors(error.message || "Server error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h1 className={styles.loginTitle}>Purdue Login</h1>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    {errors && <div className={styles.errorMessage}>{errors}</div>}

                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.inputLabel}>Career Account Username: (do hhh)</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            placeholder="Username"
                            autoComplete='username'
                            onChange={handleChange}
                            className={styles.inputField}
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.inputLabel}>Password: (do triplehh) </label>
                        <input
                            type="password"
                            name="password"
                            autoComplete='current-password'
                            value={formData.password}
                            onChange={handleChange}
                            className={styles.inputField}
                            placeholder="Password"
                            required
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.helpLinks}>
                        <a href="#" className={styles.helpLink}>Need help?</a>
                    </div>

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={submitting}
                    >
                        {submitting ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

                {/* Keep your existing legalNotice and footer */}
                <div className={styles.legalNotice}>
                    <p>
                        <strong>Note:</strong> Unauthorized access or misuse of computer resources or disclosure of sensitive information may result in disciplinary or legal action. Read Purdue's Acceptable Use Policy.
                    </p>
                </div>

                <div className={styles.footer}>
                    <hr className={styles.divider} />
                    <p>Purdue University, West Lafayette, IN 47907 USA, (765) 494-4600</p>
                    <p>© {new Date().getFullYear()} Purdue University. An equal access, equal opportunity university.</p>
                    <p className={styles.accessibility}>
                        If you have trouble accessing this page because of a disability, please contact the Service Desk at <a href="mailto:it@purdue.edu">it@purdue.edu</a> or (765) 494-4000.
                    </p>
                </div>
            </div>
        </div>
    );
};