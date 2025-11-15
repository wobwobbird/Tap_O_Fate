import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput } from "react-native";


export default function Ran2() {
    return (
        <LinearGradient 
            colors={['#ff9a56', '#ff6a88']}
            style={style.pageContainer}
        >
            <Text>Hello, World 3</Text>
        </LinearGradient>

    )
}

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 10,
    },
})