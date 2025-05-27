import { useState } from "react";
import Sidebar from "@/components/mypage/Sidebar";
import ProfileInfo from "@/components/mypage/ProfileInfo";
import EditProfile from "@/components/mypage/EditProfile";
import ReservationHistory from "@/components/mypage/ReservationHistory";
import FavoriteList from "@/components/mypage/FavoriteList";
import PasswordChange from "@/components/mypage/PasswordChange";

export default function MyPage() {
  const [view, setView] = useState("profile");

  const renderView = () => {
    switch (view) {
      case "profile":
        return <ProfileInfo />;
      case "edit":
        return <EditProfile />;
      case "history":
        return <ReservationHistory />;
      case "favorites":
        return <FavoriteList />;
      case "password":
        return <PasswordChange />;
      default:
        return <ProfileInfo />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setView={setView} />
      <div className="flex-1 p-6">{renderView()}</div>
    </div>
  );
}
