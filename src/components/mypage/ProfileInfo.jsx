export default function ProfileInfo() {
  const user = {
    name: '홍길동',
    email: 'hong@example.com',
  };

  return (
    <div>
      <h2>내 정보</h2>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}
