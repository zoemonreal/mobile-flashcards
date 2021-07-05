import AsyncStorage from '@react-native-async-storage/async-storage';
import { _getDecks } from './_DATA'

export const MOBILE_STORAGE_KEY = "Udacity:MobileFlashCards";

export const fetchDecks = () => {

  return AsyncStorage.getItem(MOBILE_STORAGE_KEY).then(results => {
    if (results != "undefined") {
      const data = JSON.parse(results);
      // return Object.keys(decks).map((title) => ({
      //     title,
      //     numCards: decks[title].questions.length
      // }))
      return data;
  }
  AsyncStorage.setItem(MOBILE_STORAGE_KEY, JSON.stringify({}))

  return []
  
   
   
  });
};

function setInitial(){
  
  AsyncStorage.setItem(MOBILE_STORAGE_KEY, JSON.stringify(_getDecks))

}

export function submitDeck (name) {
  let deck = {}
  deck[name] = { name, questions: [] }

  console.log(JSON.stringify(deck))
  console.log(JSON.parse(JSON.stringify(deck)))
  return AsyncStorage.mergeItem(MOBILE_STORAGE_KEY, JSON.stringify(deck))
}

export function submitQuestion({ question, answer, name }) {
  return AsyncStorage.getItem(MOBILE_STORAGE_KEY).then(results => {
    let decks = { ...JSON.parse(results) };
    decks = {
      ...decks,
      [name]: {
        ...decks[name],
        questions: decks[name].questions.concat([{ question, answer }])
      }
    };
    AsyncStorage.mergeItem(MOBILE_STORAGE_KEY, JSON.stringify(decks));
  });
}

export function removeEntry (key) {
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
    })
}