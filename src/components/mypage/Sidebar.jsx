export default function Sidebar({ setView }) {
  return (
    <div className="w-64 p-4 bg-gray-100">
      <button onClick={() => setView("profile")}>내 정보</button>
      <button onClick={() => setView("edit")}>정보 수정</button>
      <button onClick={() => setView("history")}>예약 내역</button>
      <button onClick={() => setView("favorites")}>찜 목록</button>
      <button onClick={() => setView("password")}>비밀번호 변경</button>
    </div>
  );
}