import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import TextButton from "./TextButton";
import {submitDeck} from "../utils/api";
import {connect} from 'react-redux';
import {addDeck} from "../actions";
import {purple, white} from "../utils/colors";
import {CommonActions} from '@react-navigation/native';




class AddDeck extends Component {

    state = {
        title: "",
       
       
    } 

    submit = () => {
        const title = this.state.title;
        const deck = {
            name: title,
            questions: []
        }
        this.props.dispatch(addDeck(deck));

        

        this.handleNav(title);

        submitDeck(title);

        this.setState({
            title: ''
        })

        // todo: Clear local notification
    }
    handleNav = deck => {
        
        this.props.navigation.navigate("DeckDetail", { deckId: deck});
      };
    handleChange = (title) => this.setState({ title })  
    

    render() {
        const { title } = this.state

        return (
            <View style={styles.container}>
               
                <TextInput
                    style={styles.input}                    
                    value={title}
                    placeholder="Deck Title"
                    onChangeText={this.handleChange}
                />
            
              
                {title!= '' && <TextButton style={styles.SubmitBtn} onPress={this.submit}>Create Deck</TextButton>}
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
        alignSelf: 'flex-end',
        justifyContent: 'center',
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    title:{
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

function mapStateToProps(state) {
  
    return {
        alreadyLogged: false
    }
}

export default connect(mapStateToProps)(AddDeck);