# FE-1 Study Repository

프론트엔드 테크스터디 **개인 실습 코드 공유용 Repository**입니다.

각자 본인의 **GitHub ID 폴더**에서 개인 실습 웹을 관리하며,  
매주 **개인 브랜치에서 작업 → Push → Pull Request 생성 → main 반영** 방식으로 진행합니다.

---

## 📌 1. 기본 규칙

- 개인 폴더명은 **본인의 GitHub ID**를 사용합니다.
- 본인 폴더 안에서만 작업합니다.
- 다른 멤버의 폴더는 수정하지 않습니다.
- 공용 파일을 수정해야 하는 경우 먼저 공유해주세요.
- `node_modules`는 업로드하지 않습니다.
- 브랜치명은 `github-id/week번호` 형식으로 통일합니다.

### 폴더 구조 예시

```text
FE-1/
├─ README.md
├─ member-a/
├─ member-b/
└─ member-c/
```

### 브랜치명 예시

```text
member-a/week1
member-a/week2
member-b/week1
```

---

# 🚀 처음 한 번만 하기

## 2. Repository 받기

터미널에서 아래 명령어를 실행합니다.

```bash
git clone https://github.com/26-27-GDGoC-SSWU/FE-1.git
cd FE-1
```

---

## 3. 내 Week 1 브랜치 만들기

```bash
git checkout -b member-a/week1
```

`member-a` 부분을 **본인의 GitHub ID**로 변경해주세요.

예:

```bash
git checkout -b myGithubId/week1
```

---

## 4. 개인 실습 프로젝트 만들기

본인의 GitHub ID를 프로젝트 폴더명으로 사용합니다.

```bash
npm create vite@latest member-a
```

`member-a` 부분을 본인의 GitHub ID로 변경해주세요.

프로젝트 생성 시 스터디에서는 아래 설정을 사용합니다.

```text
Framework → React
Variant → JavaScript
Linter → ESLint
Install with npm and start now? → Yes
```

생성 후 구조는 대략 다음과 같습니다.

```text
FE-1/
├─ README.md
└─ member-a/
   ├─ public/
   ├─ src/
   ├─ package.json
   └─ ...
```

이미 로컬에 React 프로젝트를 만들어둔 경우에는  
해당 프로젝트를 **본인의 GitHub ID 폴더 안으로 옮겨도 됩니다.**

---

# 💻 매주 실습 후

## 5. 변경 내용 확인하기

```bash
git status
```

내가 수정하거나 새로 만든 파일을 확인합니다.

---

## 6. Commit 하기

변경된 파일을 추가합니다.

```bash
git add .
```

그다음 Commit Message를 작성합니다.

```bash
git commit -m "feat: add week1 react practice"
```

### Commit Message 예시

```text
feat: add component
feat: add todo list
feat: add routing

fix: handle empty state

refactor: split components

docs: update README
```

가능하면 **무엇을 구현하거나 수정했는지 알 수 있도록** 작성해주세요.

---

## 7. 내 브랜치 Push 하기

처음 해당 브랜치를 GitHub에 올릴 때:

```bash
git push -u origin member-a/week1
```

`member-a/week1` 부분은 본인의 브랜치명으로 변경해주세요.

한 번 연결한 이후 같은 브랜치에서 추가 작업을 올릴 때는:

```bash
git push
```

만 입력하면 됩니다.

---

# 🔀 Pull Request 생성하기

## 8. Pull Request

Push를 완료한 뒤 GitHub Repository에 접속합니다.

상단에 표시되는 **`Compare & pull request`** 버튼을 클릭합니다.

다음과 같이 설정되어 있는지 확인해주세요.

```text
Base     → main
Compare  → 본인의 브랜치
```

예:

```text
Base     → main
Compare  → member-a/week1
```

확인 후 Pull Request를 생성합니다.

---

### PR 제목

아래 형식을 사용합니다.

```text
[Week 1] 이름 - React 기본 실습
```

예:

```text
[Week 1] Lina - React 기본 실습
```

---

### PR 본문 예시

```markdown
## 구현 내용
- React 프로젝트 생성
- Header Component 분리
- 개인 실습 웹 기본 화면 구현

## 새롭게 알게 된 점
- Component를 별도 파일로 분리하는 방법
- JSX 기본 문법
```

길게 작성할 필요는 없으며,  
**이번 주에 구현한 내용과 새롭게 알게 된 내용을 간단히 작성**하면 됩니다.

---

# 🔄 다음 주 시작 전

이전 주차의 Pull Request가 `main`에 Merge된 것을 확인한 뒤 시작합니다.

## 9. 최신 main 받아오기

먼저 `main` 브랜치로 이동합니다.

```bash
git checkout main
```

최신 내용을 받아옵니다.

```bash
git pull origin main
```

---

## 10. 새로운 주차 브랜치 만들기

Week 2라면:

```bash
git checkout -b member-a/week2
```

Week 3라면:

```bash
git checkout -b member-a/week3
```

매주 본인의 GitHub ID와 주차에 맞게 생성해주세요.

---

# ✅ 전체 흐름 한눈에 보기

### 처음 한 번

```text
Repository Clone
↓
Week 1 브랜치 생성
↓
내 GitHub ID 폴더에 React 프로젝트 생성
```

### 매주

```text
main 최신화
↓
새로운 주차 브랜치 생성
↓
개인 실습 웹 작업
↓
git add
↓
git commit
↓
git push
↓
Pull Request 생성
↓
main Merge
```
