import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput } from "react-native";


export default function Ran2() {
    return (
        <LinearGradient 
            colors={['#43e97b', '#38f9d7']}
            style={style.pageContainer}
        >
            <Text>Hello, World 4</Text>
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