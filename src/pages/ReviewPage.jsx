import React, { useState } from 'react'
import { FaWalking } from 'react-icons/fa'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
`

const Card = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
`

const RestaurantInfo = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr 150px;
  padding: 20px;
  gap: 20px;
  border-bottom: 1px solid #eee;
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`


const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background: #ccc;
  border-radius: 50%;
`


const Nickname = styled.span`
  margin-left: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`

const ImageContainer = styled.div`
  width: 100%;
`

const RestaurantImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
`

const InfoContainer = styled.div`
  padding-right: 20px;
`

const RestaurantName = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
`

const InfoText = styled.p`
  color: #666;
  margin: 5px 0;
  font-size: 14px;
`

const StatsContainer = styled.div`
  text-align: right;
  font-size: 13px;
  color: #666;
  line-height: 1.6;
`

const PriceButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  border-bottom: 1px solid #eee;
  background: #fff;
`

const PriceButton = styled.button`
  padding: 8px 15px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: white;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`

const ReviewSection = styled.div`
  padding: 20px;
  background: white;
`

const ReviewContent = styled.div`
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 20px;
  margin-bottom: 20px;
`

const PhotoPlaceholder = styled.div`
  width: 150px;
  height: 150px;
  background: #f0f0f0;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #e8e8e8;
  }
`

const UploadButton = styled.button`
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
`

const ReviewTextarea = styled.textarea`
  width: 100%;
  height: 150px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  font-size: 14px;
  line-height: 1.5;
  &::placeholder {
    color: #999;
  }
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;
`

const WalkingIcon = styled(FaWalking)`
  font-size: 24px;
  cursor: pointer;
  color: ${props => props.$active ? '#1976d2' : '#ddd'};
`

const RatingText = styled.span`
  margin-left: 10px;
  font-size: 14px;
  color: #666;
`

const SubmitButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #43A047;
  }
`

function ReviewPage() {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  return (
    <Container>
        <Container>
    
  </Container>
      <Card>
        <RestaurantInfo>
          <ImageContainer>
            <RestaurantImage
              src="https://images.pexels.com/photos/6267/menu-restaurant-vintage-table.jpg"
              alt="식당 이미지"
            />
          </ImageContainer>
          <InfoContainer>
            <RestaurantName>새마을 식당</RestaurantName>
            <InfoText>신천동 400-2번지 동구 대구광역시 KR</InfoText>
            <InfoText>영업시간: ~~ 주차 ~~</InfoText>
          </InfoContainer>
          <StatsContainer>
            <InfoText>
              대기 시간 : 1시간 10분<br />
              방문 시각 : 12시 45분 <br />
              방문 횟수 : 8번째 <br />
              안원 : 4인 <br />
            </InfoText>
          </StatsContainer>
        </RestaurantInfo>

        <PriceButtons>
          {[2000, 3000, 5000, 8000, 10000].map((price) => (
            <PriceButton key={price}>
              {price}원대
            </PriceButton>
          ))}
        </PriceButtons>

        <ReviewSection>
          <ProfileHeader>
      <Avatar />            
      <Nickname>nickname</Nickname>
    </ProfileHeader>
     <Card>
    </Card>
          <ReviewContent>
            
            <PhotoPlaceholder>
              <UploadButton>사진 업로드</UploadButton>
            </PhotoPlaceholder>
            <ReviewTextarea
              placeholder="친구한테 추천받고 갔는데 성공!고기 먹고 김치국물에 밥 말아 먹는 순간… 그냥 행복.
🔥 불향 가득 열탄불고기 강추, 혼밥도 부담 없는 식당이에요!"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </ReviewContent>

          <RatingContainer>
            {[1, 2, 3, 4, 5].map((score) => (
              <WalkingIcon
                key={score}
                $active={score <= rating}
                onClick={() => setRating(score)}
              />
            ))}
            <RatingText>웨이팅 점수</RatingText>
          </RatingContainer>

          <SubmitButton>
            작성 완료
          </SubmitButton>
        </ReviewSection>
      </Card>
    </Container>
  )
}

export default ReviewPage