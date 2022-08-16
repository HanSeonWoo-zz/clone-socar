# clone-socar

App socar clone coding project with React-Native

# 테스트환경

MacBook Pro (Retina, 15-inch, Mid 2015)  
macOS Monterey 버전 12.5  
iPhone X  
iOS 15.6

안드로이드 환경에서는 테스트가 불가할 수 있습니다.

<br/>

# Install

```
yarn install
sudo gem install cocoapods
brew install git-lfs
git-lfs install
yarn pod
```

git-lfs는 네이버지도를 사용하기 위해 필요합니다.

<br/>

# 실행

## 맥북 Simulator

```
yarn ip11p
```

## 아이폰 실제 기기 (추천)

```
xed ./ios
```

명령어로 xcode를 실행한 후
command+R 명령어를 통해 앱을 직접 설치

<br/>

# Demo

[![Watch the video](https://img.youtube.com/vi/QN5QRwieLU0/hqdefault.jpg)](https://youtu.be/QN5QRwieLU0)

<br/>

# 참고

- 쏘카존에서 차량 빌리기 기능 위주로 구현이 됐습니다.
- 이용 내역에 4개의 내역이 들어가 있습니다.
- 예약 정보는 앱을 종료하고 재실행하면 정보가 사라집니다.

<br/>

# Troubleshooting

## 신뢰할 수 없는 개발자

> 설정 - 일반 - VPN 및 기기 관리

위치로 들어가서 개발자를 신뢰하는 설정.

<br/>

## Simulator 내 위치

Simulator에서는 내 위치를 가져올 수 없습니다.

<br/>
