import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
  Alert,
} from "react-native";

const ImageLoader = (props) => {
  const state = {
    opacity: new Animated.Value(0),
  };

  const onLoad = () => {
    Animated.timing(state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <Animated.Image
      onLoad={onLoad}
      {...props}
      style={[
        {
          opacity: state.opacity,
          transform: [
            {
              scale: state.opacity.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
        },
        props.style,
      ]}
    />
  );
};

export default function App() {
  const [showSpiner, setShowSpiner] = useState(false);
  const handlerTextPres = () => {
    console.log("Text been clicked!");
  };

  const spinerShowingHandler = () => {
    setShowSpiner(true);
    return setTimeout(() => {
      setShowSpiner(false);
    }, 3000);
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        {/* SafeAreaView works only for IOS */}
        {showSpiner ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Button onPress={spinerShowingHandler} title="Show Spiner" />
        )}

        <Text numberOfLines={1} onPress={handlerTextPres}>
          React Native! - realy realy long text. I wanna make this text even
          longer to si what heppens.
        </Text>

        <TouchableHighlight onPress={() => console.log("Image tapped")}>
          <Image
            style={styles.image}
            fadeDuration={1000}
            source={require("./assets/e01dcd6ca7d0387380817a09e0977d3c.jpg")}
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={() => console.log("Image tapped")}>
          <Image
            style={styles.image}
            fadeDuration={1000}
            source={{
              uri: "https://picsum.photos/200/300",
            }}
          />
        </TouchableOpacity>

        <ImageLoader
          style={styles.image}
          source={{
            uri: "https://picsum.photos/200/300",
          }}
        />

        <TouchableNativeFeedback>
          <View style={styles.native}>
            <Text style={styles.androidOnly}>
              This TouchableNativeFeedback will work only for Android App
            </Text>
          </View>
        </TouchableNativeFeedback>

        <Button
          color="orange"
          title="Click Me"
          onPress={() => console.log("Click Me button been clicked")}
        />
        <Button
          color="orange"
          title="Call Alert"
          onPress={() =>
            Alert.alert("Alert box name", "Alert box content", [
              {
                text: "Ok button",
                onPress: () => console.log("Ok button been clicked"),
              },
              {
                text: "Cancal button",
                onPress: () => console.log("Cancal button been clicked"),
              },
            ])
          }
        />
        {/*prompt not working for Android app*/}
        <Button
          color="lightgreen"
          title="Call Prompt dialog"
          onPress={() => {
            Alert.prompt(
              "Some title of prompt dialog",
              "Question for user",
              (textWithUserAnswer) =>
                alert(`Your answer is ${textWithUserAnswer}`)
            );
          }}
        />
        <View style={[firstStyles.first, newStyles]}>
          <Text>This blok shows how styles for react native works</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
const firstStyles = StyleSheet.create({
  first: {
    backgroundColor: "magenta",
    width: 200,
    height: 300,
  },
});
const newStyles = {
  backgroundColor: "lightblue",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  native: {
    width: 200,
    height: 100,
    backgroundColor: "lightblue",
  },
  androidOnly: {
    fontSize: 16,
    color: "red",
  },
});
