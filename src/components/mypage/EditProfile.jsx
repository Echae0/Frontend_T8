import { useState } from 'react';
import './EditProfile.css';

export default function EditProfile() {
  const [form, setForm] = useState({
    name: '',
    id: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('수정된 정보:', form);
    // TODO: 서버에 저장 요청 보내기
  };


  return (
    <div className="edit-profile-wrapper">
      <h2 className="section-title">내 정보 수정</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>이름</label>
        <input type="text" name="name" value={form.name} onChange={handleChange} />

        <label>아이디</label>
        <input type="text" name="id" value={form.id} onChange={handleChange} />

        <label>비밀번호</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />

        <label>이메일</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />

        <div className="edit-buttons">
          <button type="submit" className="save-button">수정</button>
        </div>
      </form>
    </div>
  );
}
