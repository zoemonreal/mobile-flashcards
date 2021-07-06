import React, {Component} from 'react'
import {StyleSheet, View, Text, Animated} from 'react-native'
import {connect} from 'react-redux';
import {white , purple, blue, gray} from "../utils/colors";
import {removeEntry} from "../utils/api";
import TextButton from "./TextButton";



class DeckDetail extends Component {
    
    
    addQuestion = () =>{
        this.props.navigation.navigate('AddQuestion', {
            title: this.props.deck.name
        })
    }
    startQuiz = () =>{
        this.props.navigation.navigate('Quiz', {
            deckId: this.props.deck.name
        })
    }


    render() {
        const {key, deck} = this.props;
        const noCards = deck.questions.length;
      
        return (
            <View style={styles.container}>
                <View style={styles.item}>
                <Text style={styles.title}>{deck.name}</Text>
                <Text style={styles.subtitle}>{deck.questions.length} Questions</Text>
                
                {noCards > 0 && <TextButton onPress={this.startQuiz} style={[styles.purpleBtn, styles.btnText]}>Start Quiz</TextButton>}
                <TextButton onPress={this.addQuestion} style={[styles.blueBtn, styles.btnText]}>Add Question</TextButton>
                </View>
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
    purpleBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
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
            
            deck: state[deckId]
        }
    )
}

function mapDispatchToProps(dispatch, {route, navigation}) {
    const {entryId} = route.params;
    return {
        
        goBack: () => navigation.goBack()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail);