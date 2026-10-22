'use client';
import { useState,useEffect  } from 'react';
import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      plan: 'Basic',
      agree: false,
  });

const [registered, setRegistered] = useState([]);




useEffect(() => {
  fetch('/api/register')
}, []);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 

      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 
      'application/json',
    },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      alert(`Đăng ký thành công! Chào mừng ${result.data.name}`);
    } else {
      alert(`Lỗi: ${result.error}`);
    }
  } catch (error) {
    alert('Không thể kết nối server!');
  }
};

  return (
    <section className={styles.registerSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Join <span>FitZone</span> Today
        </h2>
        <p className={styles.subtitle}>
          Start your fitness journey with us. Fill out the form below.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />

          <select
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="Basic">Basic - $29/month</option>
            <option value="Pro">Pro - $49/month</option>
            <option value="VIP">VIP - $99/month</option>
          </select>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            <span>I agree to the Terms & Conditions and Privacy Policy</span>
          </label>

          <button type="submit" className={styles.submitBtn}>Register</button>
        </form>


         {registered.length > 0 && (
          <div style={{ marginTop: '40px', textAlign: 'left' }}>
            <h3>Danh sách user đã đăng ký:</h3>
            <ul>
              {registered.map((user, index) => (
                <li 
                  key={index} 
                  dangerouslySetInnerHTML={{ __html: user }}  
                />
              ))}
            </ul>
          </div>
        )}


      </div>
    </section>
  );
}