import { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfile.css";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const user = useSelector((state) => state.user); // ✅ Redux에서 memberId 사용
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    birthDate: "",
  });

  useEffect(() => {
    if (!user || !user.memberId) {
      alert("로그인이 필요합니다.");
      return;
    }

    axios
      .get(`http://localhost:8080/api/members/${user.memberId}`)
      .then((res) => {
        const data = res.data;
        setForm({
          name: data.name || "",
          phoneNumber: data.phoneNumber || "",
          address: data.address || "",
          birthDate: data.birthDate?.slice(0, 10) || "",
        });
      })
      .catch((err) => {
        console.error("회원 정보 불러오기 실패:", err);
        alert("회원 정보를 불러오는 데 실패했습니다.");
      });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.memberId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/members/${user.memberId}`, form);
      alert("회원 정보가 성공적으로 수정되었습니다!");
    } catch (err) {
      console.error("회원 정보 수정 실패:", err);
      alert("회원 정보 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancel = () => {
    window.location.href = "/mypage";
  };

  return (
    <div className="edit-profile-wrapper">
      <h2 className="section-title">내 정보 수정</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>전화번호</label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        <label>주소</label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <label>생년월일</label>
        <input
          type="date"
          name="birthDate"
          value={form.birthDate}
          onChange={handleChange}
        />

        <div className="edit-buttons">
          <button type="submit" className="save-button">수정</button>
          <button type="button" className="cancel-button" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  );
}
