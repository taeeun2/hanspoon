# HanSpoon

> 한솔 임직원을 위한 함께 식사할 멤버를 구하는 웹 서비스  
> ( 배포 주소: http://172.27.1.33:8080/ )
  
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
- Material UI

### [Back-end]
- Spring boot 2.6.8 / Tomcat
    - Spring Data JPA
- MariaDB 10.6.8
- Java 11
- Gradle
- jar
- CentOS 7

### [API]

- Kakao Map API
- Java Mail API
- Chart.js

## 📌구현 기능

1. 회원 가입/로그인/비밀번호 찾기
2. 회원 정보 수정
3. 게시판 CRUD
4. 인원 만료 또는 식사일 지나면 게시글 상태 변경
5. 모임 참여 신청/취소/ 삭제
6. 모임 삭제
    - 모임 삭제 시 - 모든 신청자에게 메일 전송
7. 참여 현황 및 랭킹 확인

## 📌구현 화면

- 로그인/회원가입 화면 *@김태은*
- 메인 화면(전체 목록) *@이현지*
- 상세 페이지 *@김태은 @이현지*
- 마이 페이지 *@이현지*
- 등록/수정 페이지 *@김태은 @이현지*
- 참여현황 및 랭킹 화면(모달) *@김태은 @이현지*

## 📌자료

- [프로젝트 세부 정보 (notion)](https://www.notion.so/4d9088a8da414d4ab8f6225d3e55be18)

- [프로토타입 (카카오 오븐)](https://ovenapp.io/view/Zz27B6TVt18BNWpqnJi0XR4NfvJogMnE/)

- [WBS (스프레드시트)](https://docs.google.com/spreadsheets/d/1X0EKgVEjBqoFMm54vrsC8frt5eyryRRWc9dAod6J7Fw/edit#gid=0)

- [API 명세 (스프레드시트)](https://docs.google.com/spreadsheets/d/1bzWlAYT6EyjsIeQWLID8JLNtD7tm5I674uS4Ry2QLEE/edit#gid=1591557038)

- [업무 일지(노션)](https://www.notion.so/2aec221978074d85bc03653127fa03aa)

- [Git Commit Message Convention (노션)](https://www.notion.so/Git-Commit-Message-Convention-c77bb14faec64aae9b3d20d14868c651)

-  ERD

![erd3](/uploads/17804c9ed7fcfb91aa367024ceb03a37/erd3.PNG)
