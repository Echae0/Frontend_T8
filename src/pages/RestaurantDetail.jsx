import RestaurantImageSlider from '../components/RestaurantImageSlider';
import RestaurantInfo from '../components/RestaurantInfo';
import MenuPreview from '../components/MenuPreview';
import MenuList from '../components/MenuList';
import ReviewList from '../components/ReviewList';
import WaitingButton from '../components/WaitingButton';
import '../components/Form_RD.css';


const RestaurantDetail = () => {
  return (
    <div className="restaurant-detail-page p-4 max-w-6xl mx-auto bg-white rounded shadow">
      <RestaurantImageSlider />
      <div className="flex justify-between items-center my-2">
        <RestaurantInfo />
        <WaitingButton />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <MenuPreview />
          <MenuList />
        </div>
        <div className="w-1/2">
          <ReviewList />
        </div>
      </div>
      <div className="mt-6">
        <ReviewList isBottomSection />
      </div>
      <div className="text-center mt-6">
        <button className="bg-green-300 px-8 py-2 rounded-full font-bold">웨이팅</button>
      </div>
    </div>
  );
};

export default RestaurantDetail;
