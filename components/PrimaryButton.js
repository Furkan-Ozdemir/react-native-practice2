import { Text, View, Pressable, StyleSheet } from "react-native";
import Colors from "../constants/colors";
const PrimaryButton = (props) => {
  const { children, onPress } = props;

  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressed, styles.container] : styles.container
        }
        android_ripple={{ color: Colors.primary600 }}
        onPress={onPress}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, //for android
  },
  text: {
    color: "white",
    textAlign: "center",
  },
  outerContainer: {
    margin: 4,
    borderRadius: "50%",
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.75,
  },
});
