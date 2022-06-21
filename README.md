# HanSpoon

> 한솔 임직원을 위한 함께 식사할 멤버를 구하는 웹 서비스
> 
  
## 📌프로젝트 배경

- 2인 이상 주문 가능 메뉴 선택 시 어려움 해결
- 사원 간의 친목 다지기  

## 📌프로젝트 기대 효과

- 구성원 간 친목 도모를 통한 사내 활력 증진
- 함께 식사할 구성원 모집
- 성사된 모임에 대하여 식대 일부 지원하는 등 사내 복지 서비스로 활용 가능

## 📌차별 점

- 개인 정보 공개 범위 설정 가능 (이름, 연령대, 직급, 부서, 성별, 소속 회사)
- 숟가락 모으기 (모임에 몇 회 참석하였는지)

## 📌기술 스택

### [Front-end]
- Node.js 16.15.0
- React 18.0.0
- React Router 6
- Bootstrap
- node-sass 6.0.1

### [Back-end]
- Spring boot 2.6.8 / Tomcat
    - Spring Data JPA
    - Spring Security
- MariaDB 10.6.8
- Java 11
- Gradle
- jar
- CentOS 7

### [API]

- Kakao Map API
- Java Mail API

## 📌구현 기능

1. 회원 가입/로그인
2. 게시판 CRUD
3. 인원 만료 또는 식사일 지나면 게시글 상태 변경
4. 모임 참여 신청/취소
5. 이메일 전송
    - 신청 시 - 신청자, 주최자에게 전송
    - 취소 시 - 모든 신청자에게 전송

## 📌구현 화면

- 로그인/회원가입 화면 *@김태은*
- 메인 화면(전체 목록) *@이현지*
- 상세 페이지 (모달) *@김태은 @이현지*
- 마이 페이지 *@이현지*
- 등록/수정 페이지 *@김태은 @이현지*

## 📌자료

### 프로토타입
 - [한스푼 프로토타입 바로가기 - 카카오 오븐](https://ovenapp.io/view/Zz27B6TVt18BNWpqnJi0XR4NfvJogMnE/)
 
### WBS
- [한스푼 WBS 바로가기 - 스프레드시트](https://docs.google.com/spreadsheets/d/1X0EKgVEjBqoFMm54vrsC8frt5eyryRRWc9dAod6J7Fw/edit#gid=0)

### notion
- [한스푼 notion 바로가기](https://www.notion.so/4d9088a8da414d4ab8f6225d3e55be18)

### ERD
![erd3](/uploads/17804c9ed7fcfb91aa367024ceb03a37/erd3.PNG)
