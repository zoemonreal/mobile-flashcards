import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION } from '../actions'

const decks = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK: {      
     
      const name = action.deck.name;

      return {
        ...state,
        [name]: {
        
          name: name,
          questions: []
        }
      };
    }
    case ADD_QUESTION: {
      const name = action.question.name;
      const question = action.question.question;
      const answer = action.question.answer;
      

      return {
        ...state,
        [name]: {
          ...state[name],
          questions: state[name].questions.concat([{ question, answer }])
        }
      };
    }
    default:
      return state;
  }
};

export default decks