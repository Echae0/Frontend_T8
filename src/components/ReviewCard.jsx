const ReviewCard = ({ nickname = 'nickname', menuImage }) => {
  return (
    <div className="border p-2 rounded mb-2">
      <div className="flex gap-2 mb-1">
        <img src={menuImage} alt="메뉴" className="w-20 h-20 object-cover rounded" />
        <div>
          <p className="font-bold">{nickname}</p>
          <p className="text-sm">먹고도 맛있고 먹었더니 불고기불타고 마늘후라이...</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
