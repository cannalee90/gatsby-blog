---
title: package-lock.json에 대해서
date: "2019-02-08"
---

### 개요

프로젝트를 진행하면서 항상 `package-lock.json`이 변경되는 경우를 자주 겪었다. 애초에 이 파일이 무엇인지, 어떤 목적으로 쓰이는지 항상 궁금했었다. npm에 공식 사이트에 들어가서 간단하게 읽어보았는데 설명이 이해되지 않았다. 공식 문서를 읽어보면 `npm install`의 경우 `package-lock.json`을 우선적으로 사용해서 해당 커맨드를 실행한다고 한다. 따라서 `package-lock.json`의 변경이 일어나서는 안되는 것 같았는데 회사에서 프로젝트를 진행하다보면 해당 파일에 대한 변경이 수시로 일어난다. 이러한 현상에 대한 글이 별로 없어서 좀 더 찾아보았다.

###  package-lock.json

`package-lock.json` 파일은 `npm@^5.1`에서 부터 `npm install`을 실행할 경우 새롭게 생성되는 파일이다. 이상적으로 `npm install`을 실행할 경우 동일한 `package.json`에 대해서 동일한 `node_module tree` 를 생성해야 하지만 다양한 이유로 인해서 동일한 트리가 생성되지 않는다. 해당 이유를 간단하게 나열해 보자면 다음과 같다.
  - npm의 버젼에 따라서 사용되는 알고리즘이 조금씩 다르기 때문에, 다른 트리가 생성된다
  - 내가 마지막에 설치한 버젼이 아닌, semver-range의 새로운 버젼의 패키지가 퍼블리쉬 될 경우 새로운 버젼이 사용된다
  - 내가 설치한 패키지의 `registry`가 더이상 사용 불가능하거나 혹은 같은 버젼을 가지고 있지만 변경된 패키지가 등록되어 있을 경우
  - 나의 dependency의 dependency가 새로운 버젼을 배포했을 경우 [참조](https://docs.npmjs.com/files/package-locks) (A dependency of one of your dependencies may have published a new version, which will update even if you used pinned dependency specifiers (1.2.3 instead of ^1.2.3))

해당 경우에는 동일한 `node_module tree`가 생성되지 않는다. 즉 각각의 머신마다 다른 모듈을 사용하는 일이 발생할 수 있게 되고 이는 충분히 문제가 될 수 있다. 이를 해결하기 위해서 npm측에서는 package-locking이라는 기능을 제공하기로 했고, 해당 기능은 `package-lock.json` 파일을 사용하도록 되어있다. 공식 문서를 보면 해당 파일이 존재할 경우 `npm install`를 실행할 때 기존과 다르게 행동한다고 명시되어 있다.

  1. The module tree described by the package lock is reproduced. This means reproducing the structure described in the file, using the specific files referenced in "resolved" if available, falling back to normal package resolution using "version" if one isn’t.
  2. The tree is walked and any missing dependencies are installed in the usual fashion.

간단하게 해석해보면 다음과 같다. 모듈트리는 package lock이 문제 없이  의해서 다시 만들어지
그리고 트리가 변경되거나 누락된 종속성에 대해서는 원래 방식대로 설치된다고 명시되어 있다.

### 해당파일을 저장소에 포함해야 하는지

공식 문서를 읽어보면 해당파일을 반드시 저장소에 포함하라고 한다. 왜냐하면 해당 파일을 사용해야지만 `npm install` 명령어를 실행할때 동일한 모듈 트리를 생성하기 때문입니다. 또한 해당 파일을 기록하다보면 어떤 변경이 이루어졌는지에 대한 추적이 가능하기 때문에 저장소에 포함해달라고 합니다.

### 왜 이 파일이 변경되는지

해당 내용에 대한 문서를 읽어보면 파일이 변경될일은 별로 없어보인다. 하지만 다음과 같은 상황에서 `package-lock.json`이 변경될 수 있다.
  - `package.json`에서 패키지 버져닝에 대한 변경을 수동으로 할 경우 `package-lock.json`이 업데이트 된다.
  - npm에 버그가 있고 해당 버젼에서는 `package-lock.json`이 변경된다고 합니다. 해당 내용에 대한 [이슈](https://github.com/npm/npm/issues/17979)를 확인할 수 있다.
  - npm 버젼이 다를 경우 `package-lock.json`이 다르게 생성된다.
  - npm 버젼이 같을 경우에도 플랫폼에 따라서 `package-lock.json`이 다르게 생성 될 수 있다고 합니다. 해당 내용에 대한 [이슈](https://github.com/npm/npm/issues/20934)가 열려있다.

### 해결 방법

프로젝트에 참여하는 사람들이 일단 npm 버젼을 어느정도 통일하는 것이 중요하다고 생각한다. 하지만 버젼을 통일한다고 해도 위에서 언급한대로 npm에 버그로 인해서 `package-lock.json`을 업데이트 하는 경우가 있을 수 있다. 따라서 패키지를 업데이트 하는 경우가 아니라면(배포 혹은 로컬에 새롭게 설치) `npm ci` 명령어를 사용해서 패키지를 설치하는 것이 좋은 방법인 것 같다. 해당 명령어는 `package-lock.json`만을 참고해서 노드 모듈을 설치하기 때문에 좀 더 빠르게 패키지를 설치 할 수 있고 `package-lock.json`을 변경하지 않는다.


### 3줄 요약

1. `package-lock.json`은 커밋해야한다.
2. OS 혹은 npm 버젼때문에 `npm install` 명령어 실행시 `package-lock.json`이 이유없이 변경되는 경우가 있다.
3. 패키지 버젼업 하는게 아니라면 `npm ci`로 노드 모듈설치를 해준다.
