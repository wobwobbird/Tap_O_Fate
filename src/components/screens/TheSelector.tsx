import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Pressable, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';




export default function TheSelector() {
    const [currentInput, setCurrentInput] = useState('');
    const [players, setPlayers] = useState<Array<{ name: string; number: string }>>([ { name: '', number: ''}]);

    const playerSelect = (index: number) => {
        return (
            <View key={index} style={style.nameInput}>
                <TextInput
                    style={style.nameInputBox}
                    placeholder="Enter name"
                    onChangeText={(text) => {
                        const updatedPlayers = [...players];
                        updatedPlayers[index] = { ...updatedPlayers[index], name: text};
                        setPlayers(updatedPlayers);
                    }}
                    value={players[index]?.name || ""}
                ></TextInput>
                <TextInput
                    style={style.nameInputNumber}
                    placeholder="Select Number"
                    onChangeText={(text) => {
                        const updatedPlayers = [...players];
                        updatedPlayers[index] = { ...updatedPlayers[index], number: text};
                        setPlayers(updatedPlayers);
                    }}
                    value={players[index]?.number || ""}
                ></TextInput>
                {/* <Pressable
                    style={style.nameInputSaveButton}
                    onPress={() => {
                        setPlayers([...players, {name: '', number: ''}]);
                    }}
                >
                    <Text>Save</Text>
                </Pressable> */}
            </View>
        )
    }

    return (
        <LinearGradient 
        colors={['#43e97b', '#38f9d7']}
        style={style.pageContainer}
        >
            {/* <Text>Hello, World 4</Text>
            <View  >
                <Text style={style.taps} >Under Construction...</Text>
            </View> */}
            <Text style={style.title} >The Selector</Text>
            <View style={style.howTo}>
                <Text style={style.howToText}>Select a number to play between</Text>
                <Text style={style.howToText}>Choose name and number</Text>
                <Text style={style.howToText}>A random number is generated, if yours is selected you win</Text>
                <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        // onPress={resetGame}
                    >Click here to reset</Text>
                </Pressable>
            </View>
            <View style={style.namePanel}>
                <Text>Select a number to play between</Text>

                <Text>Enter player names</Text>
                {players.map((_, index) => playerSelect(index))}
                <Pressable 
                    style={style.namePanelAddPlayer}
                    onPress={() => {
                        setPlayers([...players, {name: '', number: ''}]);
                    }}
                >
                    <Ionicons name="add-circle-sharp" size={20} color='rgba(0, 0, 0, 0.29)' ></Ionicons>

                    <Text style={style.namePanelAddPlayerText}>Add another player</Text>
                </Pressable>
            </View>

        </LinearGradient>

    )
}

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 10,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontWeight: 800,
    },
    howTo: {
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        gap: 5,
        padding: 5,
    },
    howToText: {
        fontSize: 18,
    },
    howToTextReset: {
        fontSize: 18,
        fontWeight: 600,
    },
    taps: {
        fontSize: 30,
        textAlign: "center",
    },
    namePanel: {
        gap: 10,
    },
    nameInput: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    nameInputBox: {
        flex: 1,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        padding: 10,
    },
    nameInputNumber: {
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        padding: 10,
    },
    nameInputSaveButton: {
        width: 50,
        height: 50,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.29)',
        justifyContent: "center",
        alignItems: "center",
    },
    namePanelAddPlayer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingLeft: 5,
    },
    namePanelAddPlayerText: {
        color: 'rgba(0, 0, 0, 0.40)',
        fontWeight: 700,
    }

})