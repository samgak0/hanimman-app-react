# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

# 한국어 기반의 Git 커밋 메시지 컨벤션

## 1. 개요
이 문서는 Git 커밋 메시지를 한국어로 작성할 때 사용하는 컨벤션을 설명합니다. 이 컨벤션은 협업 및 변경 사항 추적의 명확성을 높이는 것을 목표로 합니다.

---

## 2. 커밋 메시지 형식
커밋 메시지는 다음과 같은 구성 요소를 따릅니다:

1. **타입(Type)**: 작업의 종류를 나타내며, 소문자로 작성합니다.
2. **제목(Subject)**: 변경 사항에 대한 간단하고 명령형으로 작성된 설명입니다.
3. **본문(Body, 선택 사항)**: 구체적인 변경 사항에 대한 설명입니다. 필요할 때만 작성합니다.
4. **푸터(Footer, 선택 사항)**: 참고할 이슈 번호나 추가 정보를 포함합니다.

---

## 3. 타입(Type)
다양한 작업 유형을 구분하기 위해 타입을 사용합니다. 각 타입은 의미에 맞게 일관되게 작성해야 합니다:

- **기능**: 새로운 기능 추가 (`feat`)
- **수정**: 버그 수정 (`fix`)
- **문서**: 문서 관련 변경 (`docs`)
- **스타일**: 코드 스타일 변경, 포맷팅, 주석 수정 등 (`style`)
- **리팩토링**: 코드 리팩토링, 기능 변경 없이 구조 개선 (`refactor`)
- **테스트**: 테스트 코드 추가 또는 수정 (`test`)
- **빌드**: 빌드 시스템 또는 외부 종속성 관련 작업 (`build`)
- **성능**: 성능을 개선하는 변경 (`perf`)
- **환경설정**: 프로젝트 환경설정 관련 작업 (`chore`)

---

## 4. 커밋 메시지 예시
### 4.1. 타입과 제목만 사용하는 경우
```
기능: 사용자 로그인 기능 추가
수정: 비밀번호 해시 오류 수정
문서: README에 사용법 추가
스타일: 코드 정렬 및 주석 수정
```

### 4.2. 타입, 제목, 본문 사용하는 경우
```
기능: 사용자 로그인 기능 추가
- JWT 토큰 발급 기능 구현
- 로그인 시 유효성 검사 추가
- 기존 회원가입 기능과 연동 완료
```

```
수정: 비밀번호 해시 오류 수정
- 비밀번호 해시 로직 오류 수정
- 잘못된 입력 처리 로직 개선
```

### 4.3. 이슈와 연관이 있는 경우
```
환경설정: CI/CD 설정 파일 추가
- GitHub Actions 사용해 자동 빌드 설정
- 코드 변경 시 자동 테스트 실행

참고: #123
```

---

## 5. 작성 규칙
1. **명령형 사용**: 커밋 메시지는 명령형으로 작성합니다. 예를 들어, "추가함", "수정함" 대신 "추가", "수정"을 사용합니다.
2. **길이 제한**: 제목은 50자 이내로 작성합니다. 본문은 필요한 경우에만 작성하며, 각 줄은 72자를 넘지 않도록 합니다.
3. **본문 작성**: 변경 사항을 설명할 때 “무엇을” 변경했는지와 “왜” 변경했는지를 포함합니다.

---

## 6. 참고 사항
- **일관성 유지**: 모든 팀원이 동일한 스타일을 따르도록 권장합니다.
- **명확한 설명**: 커밋 메시지는 팀원들이 쉽게 이해할 수 있도록 명확하게 작성합니다.
- **체계적인 추적**: 이슈 번호를 푸터에 추가해 변경 사항을 체계적으로 관리합니다.