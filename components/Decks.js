import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity  , ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { fetchDecks } from '../utils/api'
import { white } from '../utils/colors'


class Decks extends Component {
  state = {
    ready: false,

  }
  componentDidMount () {
    const { dispatch } = this.props

    fetchDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => {
        this.setState({ ready: true });
      });
  }
  handleNav = deck => {
    
    this.props.navigation.navigate("DeckDetail", { deckId: deck});
  };
  renderItem = ({item}) => (
    <View style={styles.item}>
      
     
         <TouchableOpacity
            onPress={() => console.log('Pressed!')}
          >
            <Text>{item.name} adasd </Text>
          </TouchableOpacity>
    </View>
  )
 
  render() {
    const { decks } = this.props
    const { ready } = this.state
        if (decks) {
            return (
              <ScrollView>
                <View >
                {Object.keys(decks).map(deck => (
              <View key={deck} style={styles.item}>
                <TouchableOpacity  onPress={()=>this.handleNav(deck)} >
                <Text style={styles.title}> {decks[deck].name} ({decks[deck].questions.length})</Text>
                </TouchableOpacity>
               
                {/* <DeckItem deck={decks[deck]} toDeck={this.handleNav} /> */}
              </View>
            ))}

                </View>
                </ScrollView>
            )
        }
        return (
           
                <View style={styles.noDataText}>
                    <Text>There is no decks available</Text>
                </View>
          
        )
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize: 22,

    textAlign: 'center'
},
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
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
  noDataText: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})


function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)