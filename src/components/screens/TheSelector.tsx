import { Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TextInput, View, Pressable, Image } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

export default function TheSelector() {
    const [currentInput, setCurrentInput] = useState('');
    const [players, setPlayers] = useState<Array<{ name: string; number: string }>>([ { name: '', number: ''}]);
    const [sliderNumber, setSliderNumber] = useState(90);
    const [saveCheckAllowed, setSaveCheckAllowed] = useState(false);
    const [namesSaved, setNamesSaved] = useState(false);
    const [randomNumber, setRandomNumber] = useState(0);
    const [randomNumberSelected, setRandomNumberSelected] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const [winnerName, setWinnerName] = useState('');

    const resetGame = () => {
        setCurrentInput('');
        setPlayers([ { name: '', number: '' } ]);
        setSliderNumber(0);
        setSaveCheckAllowed(false);
        setNamesSaved(false);
        setRandomNumber(0);
        setRandomNumberSelected(false);
        setGameEnded(false);
        setWinnerName('');
    }

    const playAGain = () => {
        setRandomNumber(0);
        setRandomNumberSelected(false);
        setGameEnded(false);
        setWinnerName('');
    }

    const checkSaveCanClick = () => {
        for (let i = 0; i < players.length; i++) {
            const playerNumber = parseInt(players[i].number) || 0;
            if (playerNumber === 0) {
                setSaveCheckAllowed(false);
                return;
            }
            if (playerNumber <= sliderNumber) {
                // setSaveCheckAllowed(true);
            } else {
                setSaveCheckAllowed(false);
                return;
            }
            setSaveCheckAllowed(true);
        }
    }

    useEffect(() => {
        checkSaveCanClick();
    }, [sliderNumber, players])

    const playerSelect = (index: number) => {
        return (
            <View key={index} style={style.nameInput}>
                <TextInput
                    style={style.nameInputName}
                    placeholder="Name"
                    onChangeText={(text) => {
                        const updatedPlayers = [...players];
                        updatedPlayers[index] = { ...updatedPlayers[index], name: text};
                        setPlayers(updatedPlayers);
                    }}
                    value={players[index]?.name || ""}
                ></TextInput>
                <TextInput
                    style={style.nameInputNumber}
                    placeholder="Number"
                    onChangeText={(text) => {
                        const updatedPlayers = [...players];
                        updatedPlayers[index] = { ...updatedPlayers[index], number: text};
                        setPlayers(updatedPlayers);
                    }}
                    value={players[index]?.number || ""}
                ></TextInput>
            </View>
        )
    }

    const playerList = (player: {name: string, number: string}) => {
        return (
            <>
                <Text style={style.playerListIndividualText}>{player.name}</Text>
                <Text style={style.playerListIndividualText}>{player.number}</Text>
            </>
        )
    }

    const checkForWinningNumber = (number: number) => {
        return players.find(player => {
            const playerNumber = parseInt(player.number) || 0;
            return playerNumber == number;
        });
    }

    const generateNumber = async (time: number) => {
        let num = await new Promise<number>((resolve) => {
            setTimeout(() => {
                resolve(Math.floor(Math.random() * 9) + 1);
            }, time); //300
        });
        return num;
    }
    
    async function takeTurn() {
        let finalNumber = 0;

        setRandomNumberSelected(false);
        finalNumber = Math.floor(Math.random() * 9) + 1;
        setRandomNumber(finalNumber);
        finalNumber = await generateNumber(300);
        setRandomNumber(finalNumber);
        finalNumber = await generateNumber(350);
        setRandomNumber(finalNumber);
        finalNumber = await generateNumber(300);
        setRandomNumber(finalNumber);
        finalNumber = await generateNumber(300);
        setRandomNumber(finalNumber);
        finalNumber = await generateNumber(500);
        setRandomNumber(finalNumber);

        setRandomNumberSelected(true);

        const winner = checkForWinningNumber(finalNumber);
        if (winner) {
            setGameEnded(true);
            setWinnerName(winner.name);
        }
    }

    return (
        <LinearGradient 
        colors={['#43e97b', '#38f9d7']}
        style={style.pageContainer}
        >
            <Text style={style.title} >The Selector</Text>
            <View style={style.howTo}>
                <Text style={style.howToText}>Select a number to play between</Text>
                <Text style={style.howToText}>Choose name and number</Text>
                <Text style={style.howToText}>A random number is generated, if yours is selected you win</Text>
                <Pressable>
                    <Text 
                        style={style.howToTextReset}
                        onPress={resetGame}
                    >Click here to reset</Text>
                </Pressable>
            </View>
            {!namesSaved && (
                <View style={style.namePanel}>

                    <Text>Enter player names</Text>
                    {players.map((_, index) => playerSelect(index))}
                    <View style={style.namePanelAddRemove}>
                        <Pressable 
                            style={style.namePanelAddPlayer}
                            onPress={() => {
                                setPlayers([...players, {name: '', number: ''}]);
                            }}
                        >
                            <Ionicons name="add-circle" size={20} color='rgba(0, 0, 0, 0.29)' ></Ionicons>
                            <Text style={style.namePanelAddPlayerText}>Add player</Text>
                        </Pressable>
                        {players.length > 0 && (
                            <Pressable 
                            style={style.namePanelAddPlayer}
                            onPress={() => {
                                setPlayers(players.slice(0, -1));
                            }}
                            >
                                <Text style={style.namePanelAddPlayerText}>Remove player</Text>
                                <Ionicons name="remove-circle" size={20} color='rgba(0, 0, 0, 0.29)' ></Ionicons>
                            </Pressable>
                        )}
                    </View>
                    <Text>{`Select a number to play between${sliderNumber === 0 ? '' : `: ${sliderNumber}`}`}</Text>
                    <Slider
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor='rgba(0, 148, 32, 0.83)'
                        onValueChange={setSliderNumber}
                        value={sliderNumber}
                        step={1}
                    />
                    <Pressable // TODO: add disabled={!saveCheckAllowed}
                        onPress={saveCheckAllowed ? () => setNamesSaved(true) : undefined}
                    >
                        <Text style={[style.nameSaveButton, saveCheckAllowed && {backgroundColor: 'rgba(0, 148, 32, 0.83)' }]}>Save & Continue</Text>
                    </Pressable>
                    <Text>{saveCheckAllowed}</Text>

                </View>
            )}
            {/* {!namesSaved && ( */}
                <>
                    <View style={style.playerListWrapper}>
                        {players.map((player, index) => (
                            <View style={style.playerListIndividual} key={index}>
                                {playerList(player)}
                            </View>
                                
                        ))}
                    </View>
                    <Pressable
                        style={style.selectNumberButton}
                        onPress={() => takeTurn()}
                        disabled={gameEnded}
                    >
                        <Text>Select Number!</Text>
                    </Pressable>
                    <View style={[style.theRandomNumberHolder, randomNumberSelected && { backgroundColor: 'rgba(0, 148, 32, 0.83)', }]}>
                        <Text>Random Number: </Text>
                        <Text style={style.theRandomNumberTheNumber}>{randomNumber}</Text>
                    </View>
                </>
            {/* )} */}
            {gameEnded && (
                <>
                    <View style={style.scoreHolder}>
                        <Text style={style.scoreText2}>Congratulations!</Text>
                        <Text style={style.scoreText2} >{`${winnerName} is the Winner!!!`}</Text>
                    </View>
                    <Pressable
                        style={style.selectNumberButton}
                        onPress={() => playAGain()}
                    >
                        <Text>Play again?</Text>
                    </Pressable>
                    {/* <View style={style.gameRow1}>
                        <Pressable 
                            style={style.playAgainButton}
                            onPress={handlePlayAgain}
                        >
                            <Text style={style.playAgainText}>Play again?</Text>
                        </Pressable>
                    </View> */}
                </>
            )}
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
    nameInputName: {
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
        width: 100,
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
    namePanelAddRemove: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
    },
    namePanelAddPlayer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    namePanelAddPlayerText: {
        color: 'rgba(0, 0, 0, 0.40)',
        fontWeight: 700,
    },
    nameSaveButton: {
        backgroundColor: 'rgba(175, 175, 175, 0.83)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 15,
    },
    playerListWrapper: {
        flexDirection: 'row',
        gap: 10,
        justifyContent: "center",
    },
    playerListIndividual: {
        gap: 5,
    },
    playerListIndividualText: {
        textAlign: "center",
        alignSelf: 'center',
        fontSize: 15,
        fontWeight: 600,
    },
    selectNumberButton: {
        backgroundColor: 'rgba(0, 148, 32, 0.83)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 15,
    },
    theRandomNumberHolder: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: 'rgba(138, 148, 0, 0.83)',
        alignSelf: 'center',
        padding: 10,
        borderRadius: 15,
    },
    theRandomNumberTheNumber: {
    },
    scoreHolder: {
        gap: 10,
    },
    scoreText1: {
        fontSize: 20,
        gap: 10,
    },
    scoreText2: {
        fontSize: 20,
        fontWeight: 800,
        gap: 10,
        textAlign: "center",
    },
})
