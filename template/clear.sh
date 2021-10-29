echo "START <==============="
echo "start watch dell all <==============="
watchman watch-del-all
echo "start delete node modules, install node modules <==============="
sudo rm -rf node_modules \
&& rm -rf package-lock.json \
&& rm -rf yarn.lock \
&& npm install --legacy-peer-deps
echo "clean android build <==============="
sudo rm -rf android/app/build
echo "start clean ios, install Pods <==============="
sudo cd ios \
&& rm -rf ~/Library/Developer/Xcode/DerivedData \
&& rm -rf Pods \
&& rm -rf build \
&& rm -rf Podfile.lock \
&& pod install \
&& cd ..
echo "start install RN-modules and POD-modules"
npm install && cd ios && pod install && cd ..
echo "start project on ios   <==============="
#react-native run-android --variant=variant --appIdSuffix suffix
#react-native run-ios --scheme Scheme
#npx react-native run-android
npx react-native run-ios
echo "END"
