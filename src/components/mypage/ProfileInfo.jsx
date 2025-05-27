import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileInfo() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/user/profile").then((res) => setUser(res.data));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">내 정보</h2>
      <p>이름: {user.name}</p>
      <p>이메일: {user.email}</p>
    </div>
  );
}
