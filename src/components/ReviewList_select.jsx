import styles from './ReviewList_select.module.css';
import ReviewCard_select from './ReviewCard_select';

const ReviewList_select = () => {
  const reviews = [
    {
      nickname: 'nickname1',
      rating: 3,
      reviewText: '먹국도 맛있고 캣알위에 불고기올리고 마늘올려서 왕하고 먹..',
      waitingTime: '1시간 10분',
      visitTime: '12시 45분',
      visitCount: '8번째',
      image: '/assets/sample-images/review1.jpg'
    },
    {
      nickname: 'nickname2',
      rating: 2,
      reviewText: '맛은 괜찮지만 서비스가 별로였습니다.',
      waitingTime: '30분',
      visitTime: '18시 20분',
      visitCount: '2번째',
      image: '/assets/sample-images/review2.jpg'
    },
    {
      nickname: 'nickname3',
      rating: 5,
      reviewText: '여기 진짜 인생 맛집이에요. 고기 질도 좋고 분위기도 굿!',
      waitingTime: '45분',
      visitTime: '19시 00분',
      visitCount: '4번째',
      image: '/assets/sample-images/review3.jpg'
    },
    {
      nickname: 'nickname4',
      rating: 4,
      reviewText: '양도 많고 맛도 좋아요. 다음에도 또 올 예정!',
      waitingTime: '20분',
      visitTime: '13시 10분',
      visitCount: '6번째',
      image: '/assets/sample-images/review4.jpg'
    },
    {
      nickname: 'nickname5',
      rating: 1,
      reviewText: '기대 이하였어요. 고기가 질기고 불친절했어요.',
      waitingTime: '50분',
      visitTime: '17시 30분',
      visitCount: '1번째',
      image: '/assets/sample-images/review5.jpg'
    },
    {
      nickname: 'nickname6',
      rating: 5,
      reviewText: '대기 오래했지만 그만한 가치가 있었어요!',
      waitingTime: '1시간',
      visitTime: '20시 15분',
      visitCount: '3번째',
      image: '/assets/sample-images/review6.jpg'
    },
    {
      nickname: 'nickname7',
      rating: 3,
      reviewText: '무난하게 괜찮은 편. 특별하진 않지만 재방문 의사는 있어요.',
      waitingTime: '25분',
      visitTime: '14시 50분',
      visitCount: '2번째',
      image: '/assets/sample-images/review7.jpg'
    },
    {
      nickname: 'nickname8',
      rating: 4,
      reviewText: '친구랑 갔는데 분위기 좋고, 고기 질도 꽤 괜찮았어요!',
      waitingTime: '35분',
      visitTime: '18시 40분',
      visitCount: '5번째',
      image: '/assets/sample-images/review8.jpg'
    },
    {
      nickname: 'nickname9',
      rating: 2,
      reviewText: '맛은 그냥저냥인데 너무 시끄럽고 자리도 좁았어요.',
      waitingTime: '40분',
      visitTime: '15시 20분',
      visitCount: '1번째',
      image: '/assets/sample-images/review9.jpg'
    },
    {
      nickname: 'nickname10',
      rating: 5,
      reviewText: '여기서 고기 먹고 다른 데 못 갑니다. 최고예요!',
      waitingTime: '1시간 20분',
      visitTime: '19시 45분',
      visitCount: '10번째',
      image: '/assets/sample-images/review10.jpg'
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>선택 메뉴 포함 리뷰</h2>
      <div className={styles.reviewsList}>
        {reviews.map((review, index) => (
          <ReviewCard_select key={index} {...review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList_select;