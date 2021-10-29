echo "START <==============="
echo "start watch dell all <==============="
watchman watch-del-all
echo "start delete node modules and Pods modules <==============="
#pod install --repo-update
#rm -fr node_modules && cd ios && rm -fr Pods && cd ..
sudo rm -rf node_modules/ && rm -rf package-lock.json && rm -rf yarn.lock && npm install --legacy-peer-deps && cd ios/ && rm -rf ~/Library/Developer/Xcode/DerivedData && rm -rf Pods/ && rm -rf build/ && rm -rf Podfile.lock && pod install  && cd ..

echo "start install RN-modules and POD-modules"
#npm install && cd ios && pod install && cd ..
#npm install
echo "start project on ios   <==============="

#npx react-native run-ios
#npx react-native run-android

#react-native run-android --variant=trugreatDebug
#react-native run-android --variant=trugreatStagingDebug --appIdSuffix staging

react-native run-ios --scheme TruGreat
#react-native run-ios --scheme TruGreatStaging

echo "END"

# watch-del-all
# Analogous to the watch-del this command will remove all watches and associated
# triggers from the running process, and the state file
# ( unless watchman service was started with
