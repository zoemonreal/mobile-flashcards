import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import TextButton from "./TextButton";
import {submitQuestion} from "../utils/api";
import {connect} from 'react-redux';
import {addQuestion} from "../actions";
import {purple, white, gray} from "../utils/colors";
import {CommonActions} from '@react-navigation/native';

function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            style={styles.androidSubmitBtn}
            onPress={onPress}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}


class AddQuestion extends Component {

    state = {
        question: "",
        answer: ""
       
       
    }  

    submit = () => {
        const name = this.props.deckName; // 
        

        const question = this.state.question;
        const answer = this.state.answer;

        const newQuestion = {
           name,
           question,
           answer
        }
        this.props.dispatch(addQuestion(newQuestion));

        

        this.toHome();

        submitQuestion(newQuestion);

        this.setState({
            question: '',
            answer: ''
        })

        // todo: Clear local notification
    }

    handleChange = (title) => this.setState({ title })    
    toHome = () => {
        this.props.navigation.navigate("DeckDetail", { deckId: this.props.deckName});

    }
    handleQuestionChange = (question) => this.setState({ question })
    handleAnswerChange = (answer) => this.setState({ answer })

    render() {
        const { question, answer } = this.state;
        return (
            <View style={styles.container}>
              <TextInput
                style={styles.input}
                placeholder="Enter question"
                value={question}
                onChangeText={this.handleQuestionChange}
                
              ></TextInput>
              <TextInput
                style={styles.input}
                placeholder="Enter answer"
                value={answer}
                onChangeText={this.handleAnswerChange}
                
              ></TextInput>
              {(question!= '' && answer!='' ) &&
              <TouchableOpacity onPress={this.submit} style={styles.SubmitBtn}>
                <Text style={styles.submitBtnText}>Add Card</Text>
              </TouchableOpacity>}
            </View>
        );
      }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
      },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    SubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,
    }
});

function mapStateToProps(state, {route}) {
    
    const {title} = route.params;
    const deckName = title;
    return ({
            deckName,
        }
    )
}

export default connect(mapStateToProps)(AddQuestion);