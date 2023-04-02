import { Text, View, Pressable, StyleSheet } from "react-native";

const PrimaryButton = (props) => {
  const { children } = props;
  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.pressed, styles.container] : styles.container
        }
        android_ripple={{ color: "#640233" }}
      >
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#72063c",
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
