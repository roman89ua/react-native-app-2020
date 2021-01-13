import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Animated,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  View,
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
        <Text numberOfLines={1} onPress={handlerTextPres}>
          React Native! - realy realy long text. I wanna make this text even
          longer to si what heppens.
        </Text>

        {showSpiner ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <Button onPress={spinerShowingHandler} title="Show Spiner" />
        )}

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

        <StatusBar style="auto" />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
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
