echo "START <==============="
echo "start watch dell all <==============="
watchman watch-del-all
echo "start delete node modules, .lock files <==============="
sudo rm -rf node_modules \
&& sudo rm -rf package-lock.json \
&& sudo rm -rf yarn.lock
echo "clean android build <==============="
cd android \
&& sudo rm -rf app/build \
&& sudo rm -rf .gradle \
&& sudo rm -rf build \
&& cd ..
echo "start clean ios <==============="
cd ios \
&& sudo rm -rf ~/Library/Developer/Xcode/DerivedData \
&& sudo rm -rf Pods \
&& sudo rm -rf Podfile.lock \
&& sudo rm -rf build \
&& cd ..
echo "start install RN-modules and POD-modules"
npm install --legacy-peer-deps \
&& cd ios \
&& pod install \
&& cd ..
echo "start project on ios   <==============="
#react-native run-android --variant=variant --appIdSuffix suffix
#react-native run-ios --scheme Scheme
#npx react-native run-android
npx react-native run-ios
echo "END"
