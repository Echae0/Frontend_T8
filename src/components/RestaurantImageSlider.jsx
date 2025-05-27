const RestaurantImageSlider = () => {
  return (
    <div className="grid grid-cols-4 gap-2 my-4">
      {[...Array(4)].map((_, i) => (
        <img key={i} src={`/assets/sample-images/restaurant${i + 1}.jpg`} alt="식당" className="rounded" />
      ))}
    </div>
  );
};

export default RestaurantImageSlider;
