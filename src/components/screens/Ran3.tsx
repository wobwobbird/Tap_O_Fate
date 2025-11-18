import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Pressable } from "react-native";
import { useState } from "react";
import SegmentedControl from "react-native-segmented-control-2";



export default function Ran2() {
    const [p1Name, onChangeP1Name] = useState('');
    const [p2Name, onChangeP2Name] = useState('');
    const [playersNamed, setPlayersNamed] = useState(false);
    const [p1Score, setP1Score] = useState(0);
    const [p2Score, setP2Score] = useState(0);
    const [p1SelectedIndex, setP1SelectedIndex] = useState(0);
    const [p2SelectedIndex, setP2SelectedIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [p1TurnSelected, setP1TurnSelected] = useState(false);
    const [p2TurnSelected, setP2TurnSelected] = useState(false);

    function resetGame() {
        onChangeP1Name('');
        onChangeP2Name('');
        setPlayersNamed(false);
        setP1Score(0);
        setP2Score(0);
        setP1SelectedIndex(0);
        setP2SelectedIndex(0);
        setGameOver(false);
        setP1TurnSelected(false);
        setP2TurnSelected(false);
    }


    return (
        <LinearGradient 
            colors={['#ff9a56', '#ff6a88']}
            style={style.pageContainer}
        >
            <Text style={style.title} >Random Number Generator: 31</Text>
            <View style={style.howTo}>
                <Text style={style.howToText}>The closest to 31 wins</Text>
                <Text style={style.howToText}>When it's your turn, either go, or hold</Text>
                <Text style={style.howToText}>If you go it generates a random number between 1-9, and adds it to your total</Text>
                <Text style={style.howToText}>Go over 31, and you automatically lose</Text>
                <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        onPress={resetGame}
                    >Click here to reset</Text>
                    
                </Pressable>

            </View>
            {!playersNamed && (
                <>
                    <View style={style.playerInfo}>
                            <Text style={style.display} >{"Player 1 | " + p1Name}</Text>
                            <Text style={style.display} >{"Player 2 | " + p2Name}</Text>
                    </View>
                    <View style={style.playerInput}>
                        <View style={style.playerInputHolder}>
                            <Text style={style.playerInputName}>Player 1</Text>
                            <TextInput
                                onChangeText={onChangeP1Name}
                                value={p1Name}
                                placeholder="Enter p1 name"          
                                style={style.input}          
                                ></TextInput>
                        </View>
                        <View style={style.playerInputHolder}>
                            <Text style={style.playerInputName}>Player 2</Text>
                            <TextInput
                                onChangeText={onChangeP2Name}
                                value={p2Name}
                                placeholder="Enter p2 name"                    
                                style={style.input}          
                            ></TextInput>
                        </View>
                        <Pressable
                            style={style.saveButton}
                            onPress={() => {
                                if (p1Name !== "" && p2Name !== "") {
                                    setPlayersNamed(true)}
                            }}
                        ><Text>Save Players</Text></Pressable>
                    </View>
                </>
            )}
            {playersNamed && (
                <View style={style.game}>
                    <View style={style.gameRow1}>
                        <Text style={style.gameRow1Text}>{p1Name}</Text>
                        <Text style={style.gameRow1Text}>{p2Name}</Text>
                    </View>
                    <View style={style.gameRow1}>
                        <Text style={style.gameRow1Text}>{p1Score + p1SelectedIndex}</Text>
                        <Text style={style.gameRow1Text}>{p2Score + p2SelectedIndex}</Text>
                    </View>
                    <View style={style.gameRow1}>
                        <SegmentedControl
                         tabs={["Roll", "Stop"]}
                         style={style.gameRow3Button}
                         onChange={(index: number) => setP1SelectedIndex(index)}
                         />
                        <SegmentedControl
                         tabs={["Roll", "Stop"]}
                         style={style.gameRow3Button}
                         onChange={(index: number) => setP2SelectedIndex(index)}                        
                        />
                    </View>
                    <View style={style.gameRow1}>
                        <Pressable
                            style={style.gameRow4Button}
                        >
                            <Text style={style.gameRow4Text}>{p1SelectedIndex === 0 ? "Click to roll" : "Click to stop"}</Text>
                        </Pressable>
                        <Pressable
                            style={style.gameRow4Button}
                        >
                            <Text style={style.gameRow4Text}>{p2SelectedIndex === 0 ? "Click to roll" : "Click to stop"}</Text>
                        </Pressable>
                    </View>
                </View>
            )}


        </LinearGradient>

    )
}
// CLOSEST TO 21 wins

const style = StyleSheet.create({
    pageContainer: {
        flex: 1,
        padding: 10,
        gap: 20,
        // justifyContent: "center",
        // alignItems: "center"
    },
    taps: {
        fontSize: 30,
        textAlign: "center",

        // writingDirection: "rtl",
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
    playerInfo: {
        // backgroundColor: "pink",
        fontSize: 20,
        marginHorizontal: 10,
        gap: 10,
        
        // justifyContent: "center",
        
    },
    display: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 600,
        
    },
    playerInput: {
        // backgroundColor: "red",
        gap: 20,
        // flexDirection: "row",
    },
    playerInputHolder: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    },
    playerInputName: {
        // padding: "auto",
    },
    input: {
        height: 40,
        // margin: 12,
        borderWidth: 1,
        padding: 10,
        flex: 1,
        backgroundColor: "green,",
        borderRadius: 12,
    },
    saveButton: {
        backgroundColor: "pink",
        alignSelf: "center",
        alignItems: "center",
        padding: 10,
        width: 200,
        borderRadius: 20,
    },
    game: {
        backgroundColor: "magenta",
        minHeight: 200,
        gap: 20,
    },
    gameRow1: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
    },
    gameRow1Text: {
        backgroundColor: "red",
        // alignSelf: "center",s
        width: "40%",
        marginHorizontal: 10,
        fontSize: 20,
        fontWeight: "800",
        textAlign: "center",
    },
    gameRow3Button: {
        backgroundColor: "green",
        // flex: 1,
        width: "45%",
    },
    gameRow4Button: {
        backgroundColor: "grey",
        marginHorizontal: "auto",
        paddingHorizontal: 20,
        alignSelf: "center",
        height: 30,
        borderRadius: 20,
        justifyContent: "center",
        width: 150,
    },
    gameRow4Text: {
        textAlign: "center",
        fontSize: 20,
    }
    


})