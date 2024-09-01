import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

type State = {
  buttonClicked: boolean;
};

class SplashScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      buttonClicked: true,
    };
  }

  handleButtonClick = () => {
    this.setState({ buttonClicked: false });
  };

  render() {
    const { navigation } = this.props;
    const { buttonClicked } = this.state;

    return (
      <ImageBackground style={{ flex: 1 }} source={require("../assets/GroupBackground.png")}>
        {buttonClicked ? (
          <View style={styles.container}>
            <TouchableOpacity onPress={this.handleButtonClick} style={styles.subContainer}>
              <Image source={require("../assets/ClickHand.png")} style={styles.image} />
              <Text style={styles.text}>Tap to Start</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ justifyContent: "center", width: "70%", flex: 1, alignSelf: "center" }}>
            <Text style={{ textTransform: "uppercase", fontFamily: "Poppins-Bold", color: "white" }}>
              Ready to Get Started?
            </Text>
            <Text style={{ fontSize: 14, marginVertical: 13, color: "white", fontFamily: "Poppins-Regular" }}>
              Choose an option to Begin.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={{ backgroundColor: "#E9F3F9", borderRadius: 12, paddingVertical: 30, marginTop: 20 }}
            >
              <Text style={{ color: "#001737", fontSize: 17, marginLeft: 20, fontFamily: "Poppins-SemiBold" }}>
                Buy Tickets
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginTop: 25,
    fontFamily: "Poppins-SemiBold",
  },
  image: {
    height: 60,
    width: 40,
  },
  subContainer: {
    alignItems: "center",
    marginBottom: 100,
  },
});

export default SplashScreen;
