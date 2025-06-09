
  

## 🔧 프론트엔드 실행 전 필수 설정

  

### DB 초기 데이터 설정

  

**1. 카테고리 요청 예시**:

POST http://localhost:8080/api/categories

Content-Type: application/json

	   	[
	   
		   	{
		   
		   	"categoryCode": "KOREAN",
		   
		   	"categoryName": "한식"
		   
		   	},
		   
		   	{
		   
		   	"categoryCode": "CHINESE",
		   
		   	"categoryName": "중식"
		   
		   	},
		   
		   	{
		   
		   	"categoryCode": "JAPANESE",
		   
		   	"categoryName": "일식"
		   
		   	},
		   
		   	{
		   
		   	"categoryCode": "WESTERN",
		   
		   	"categoryName": "양식"
		   
		   	},
		   
		   	{
		   
		   	"categoryCode": "ASIAN",
		   
		   	"categoryName": "아시안"
		   
		   	},
		   
		   	{
		   
		   	"categoryCode": "DESSERT",
		   
		   	"categoryName": "디저트"
		   
		   	}
	   
	   	]

  

**1. 식당 요청 예시**:


POST http://localhost:8080/api/restaurants

Content-Type: application/json

  

		{

		"restaurantName": "한촌설렁탕",

		"location": "서울특별시 종로구 종로5가 195-5",

		"description": "뽀얀 사골 국물이 일품인 전통 설렁탕 전문점입니다. 깔끔하고 부담 없는 맛을 제공합니다.",

		"parking": "근처 공영주차장 이용 가능 ",

		"imageUrl": "/images/resto1.png",

		"categoryCode": "KOREAN",

		"contactNumber": "02-734-1234",

		"openingHours": "07:00-21:00",

		"dailyLimitedTeams": 20,

		"availableTeams": 18

		},

		{

		"restaurantName": "전주비빔관",

		"location": "서울특별시 마포구 서교동 358-2",

		"description": "전주의 맛을 그대로 재현한 비빔밥 전문점입니다. 신선한 나물과 고소한 고추장이 조화를 이룹니다.",

		"parking": "주차 가능",

		"imageUrl": "/images/resto2.png",

		"categoryCode": "KOREAN",

		"contactNumber": "02-325-5678",

		"openingHours": "11:00-22:00",

		"dailyLimitedTeams": 15,

		"availableTeams": 15

		},

		{

		"restaurantName": "광화문 미진 칼국수",

		"location": "서울특별시 종로구 세종로 81-1",

		"description": "쫄깃한 면발과 깊은 멸치 육수가 특징인 칼국수 전문점입니다. 사리 추가와 직접 담근 김치가 인기 메뉴입니다.",

		"parking": "근처 공영주차장 이용 가능 ",

		"imageUrl": "/images/resto3.png",

		"categoryCode": "KOREAN",

		"contactNumber": "02-720-3344",

		"openingHours": "10:30-20:00",

		"dailyLimitedTeams": 12,

		"availableTeams": 9

		},

		{

		"restaurantName": "뚝배기집",

		"location": "서울특별시 강남구 역삼동 678-10",

		"description": "다양한 전골과 찌개를 뚝배기에 제공하는 한식당입니다. 점심 특선으로 된장찌개 정식이 인기입니다.",

		"parking": "주차 가능 ",

		"imageUrl": "/images/resto4.png",

		"categoryCode": "KOREAN",

		"contactNumber": "02-545-7788",

		"openingHours": "11:00-23:00",

		"dailyLimitedTeams": 25,

		"availableTeams": 22

		},

		{

		"restaurantName": "청년다방 불고기백반",

		"location": "서울특별시 서초구 반포동 32-4",

		"description": "매일 신선한 한우 불고기를 제공하는 백반 전문점입니다. 반찬이 풍성하고 식사 후 디저트 제공도 포함됩니다.",

		"parking": "근처 공영주차장 이용 가능",

		"imageUrl": "/images/resto5.png",

		"categoryCode": "KOREAN",

		"contactNumber": "02-598-1122",

		"openingHours": "11:30-21:30",

		"dailyLimitedTeams": 18,

		"availableTeams": 18

		}

  

**3. 식당 메뉴 요청 예시**:


POST http://localhost:8080/api/restaurants/${restaurantsId}/menus

Content-Type: application/json

  
		{

		"name": "설렁탕",

		"description": "진한 사골 육수에 밥과 소고기가 듬뿍 들어있는 전통 설렁탕",

		"price": 9000.00,

		"imageUrl": "/images/resto1-1.png",

		"available": true

		}

		{

		"name": "특설렁탕",

		"description": "고기의 양을 늘리고, 고명으로 양지와 우둔살이 추가된 특별 설렁탕",

		"price": 12000.00,

		"imageUrl": "/images/resto1-2.png",

		"available": true

		}

		{

		"name": "수육 소",

		"description": "부드러운 양지와 사태 부위를 푹 삶아낸 수육 소사이즈",

		"price": 25000.00,

		"imageUrl": "/images/resto1-3.png",

		"available": true

		}

  

# MUCK(먹) - 웨이팅 예약 웹페이지

  

## 👋 팀 소개

  

안녕하세요. 저희는 웨이팅 예약 웹페이지 구현을 목표로 프로젝트를 진행한 **8조 먹(MUCK) 팀**입니다.

  

- **팀원**: 주혁(팀 리더), 김나혜, 장종원, 장채민, 박정호

- **역할**: 전원 **풀스택 개발** 참여. 각자 역할을 분담하여 협업 진행.

  

---

  

## 💡 프로젝트 개요

  

**MUCK(먹)**은 기존 예약 시스템의 한계를 보완하고, 대기 시간을 줄이며 회전율을 높이기 위한 **스마트 웨이팅 예약 플랫폼**입니다.

  

- 고객 이름과 인원 외에도 **음식 선호, 좌석 위치 등 세부 요청**을 사전에 받아 준비 시간 단축

- 고객이 "기다릴 가치가 있는지" 판단할 수 있도록 **웨이팅 점수 및 리뷰 데이터** 제공

- 리뷰 기능을 통해 사용자 피드백을 직접 수집하고, 매장 운영 효율 향상 도모

  

---

  

## 🚨 개발 배경 및 필요성

  

기존 예약 시스템의 문제점:

- 주말/피크타임 대기 인원 예측 불가 → 고객 불만, 운영 비효율

- 고객 요청사항 반영 어려움 (예: 유아 의자, 좌석 위치 등)

- "기다릴 가치"에 대한 판단 기준 부족

  

MUCK은 이를 해결하기 위해 다음을 제공합니다:

- **실시간 요청 접수**

- **평균 대기 인원 수 제공**

- 사용자 참여 기반의 **웨이팅 점수 시스템**

  

---

  

## 🛠️ 기술 스택 및 아키텍처

  

### 🔙 백엔드

  

- **프레임워크**: Spring Boot (Java 17)

- **데이터베이스**: MariaDB

- **ORM**: JPA (Hibernate)

- **빌드 도구**: Maven

- **API 설계**: REST API with Spring MVC (`@RestController`)

- **Validation**: DTO 및 Bean Validation 적용

- **커넥션 풀**: HikariCP

- **로그 관리**: SLF4J + Logback

  

### 🔜 프론트엔드

  

- **프레임워크**: React (함수형 컴포넌트)

- **상태 관리**: useState, useEffect

- **서버 통신**: Axios

- **스타일링**: Module CSS (컴포넌트 범위 격리)

- **환경**: Create React App / Vite, npm 스크립트로 실행

  

---

  
  

## 📌 마무리

  

MUCK은 단순한 예약 시스템이 아닌, **사용자 경험을 고려한 맞춤형 웨이팅 예약 플랫폼**입니다.

기다림이 낭비되지 않도록, 가게와 손님 모두에게 의미 있는 시간을 제공하는 것을 목표로 했습니다.
