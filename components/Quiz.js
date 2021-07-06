import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import {connect} from 'react-redux';
import {white , purple, blue, red, green, gray} from "../utils/colors";

import {getDailyReminderValue,
    clearLocalNotification,
    setLocalNotification} from "../utils/helpers";
import TextButton from "./TextButton";



class Quiz extends Component {
    state ={
        currentQuestion : 0,
        correct: 0,
        incorrect : 0,
        endQuiz: false,
        revealAnswer: false
    }

    setTitle = (entryId) => {
        if (!entryId) return;

       

        this.props.navigation.setOptions({
            title: entryId
        });
    };

    reset = () => {
        this.setState({
        currentQuestion : 0,
        correct: 0,
        incorrect : 0,
        endQuiz: false
        });
    }
    toDeck = () => {
        this.props.navigation.navigate("DeckDetail", { deckId: this.props.deckId});

    }
    addQuestion = () =>{
        this.props.navigation.navigate('AddQuestion', {
            title: this.props.deck.name
        })
    }
    addCorrect = () =>{
        const newCorrect = this.state.correct + 1;
        const newIndex = this.state.currentQuestion + 1;

       if(this.props.deck.questions.length <= newIndex)
       {
        this.setState({
            endQuiz: true,
            correct: newCorrect,

        })
        this.clearNotification();
       
    }else{
        this.setState({
            correct: newCorrect,
            revealAnswer: false,
            currentQuestion: newIndex
        })
    }

    }
    showAnswer = () =>{
        this.setState({
            revealAnswer: true
        })
    }
    
    addIncorrect = () =>{
       const newIncorrect = this.state.incorrect + 1;
       const newIndex = this.state.currentQuestion + 1;

       if(this.props.deck.questions.length <= newIndex)
        {
            this.setState({
                endQuiz: true,
                incorrect: newIncorrect,
            })
            this.clearNotification();
        
       }else{
        this.setState({
            revealAnswer: false,
            incorrect: newIncorrect,
            currentQuestion: newIndex
        })
       }
    }
    clearNotification = ()=>{
        clearLocalNotification()
        .then(setLocalNotification)
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return nextProps.metrics && !nextProps.metrics.today;
    // }

    render() {
        const { deck} = this.props;
        const {currentQuestion, correct, incorrect, endQuiz, revealAnswer} = this.state;
        const currentQuestionPos = currentQuestion +1;
        return (
            <View style={styles.container}>
                {endQuiz? 
                <View style={styles.item}>
                <Text style={styles.title}>{deck.name} </Text>
                <Text style={styles.subtitle}>({deck.questions.length} Questions)</Text>
                <Text style={styles.subtitle}>{correct} Correct answers</Text>
                <Text style={styles.subtitle}>{incorrect} Incorrect answers</Text>
                <TextButton onPress={this.reset} style={[styles.purpleBtn, styles.btnText]}>Restart Quiz</TextButton>
                <TextButton onPress={this.toDeck} style={[styles.blueBtn, styles.btnText]}>Back to Deck</TextButton>
                </View> :
            
                <View style={styles.item}>
                <Text style={styles.title}>{deck.name} ({currentQuestionPos}/{deck.questions.length})</Text>
                 
                <Text style={styles.title}>{deck.questions[currentQuestion].question}</Text> 

                <TextButton onPress={this.showAnswer} style={[styles.blueBtn, styles.btnText]}>Reveal Answer</TextButton>
                {revealAnswer && <Text style={styles.subtitle}>{deck.questions[currentQuestion].answer}</Text> }

               
                <TextButton onPress={this.addCorrect} style={[styles.greenBtn, styles.btnText]}>Correct</TextButton>
                <TextButton onPress={this.addIncorrect} style={[styles.redBtn, styles.btnText]}>Incorrect</TextButton>
                </View>
    }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title:{
        fontSize: 22,

        textAlign: 'center'
    },
    subtitle: {
        fontSize: 22,
        textAlign: 'center',
        color: gray
    },
    correctText :{
        fontSize: 22,
        textAlign: 'center',
        color: green
    },
    incorrectText: {

    },
    item: {
        backgroundColor: white,
        borderRadius:  2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
      },
    container: {
        flex: 1,
        backgroundColor: white,
        padding: 15
    },
    greenBtn:{
        backgroundColor: green,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    redBtn:{
        backgroundColor: red,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    purpleBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    blueBtn:{
        backgroundColor: blue,
        marginTop: 10,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'

    },
    btnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
});


function mapStateToProps(state, {route}) {
    const {deckId} = route.params;
    
    return ({
            deckId,
            deck: state[deckId],
             
        }
    )
}

function mapDispatchToProps(dispatch, {route, navigation}) {
    const {entryId} = route.params;
    return {
      
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);