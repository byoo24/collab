import axios from 'axios';




export const createCard = (card) => {
    return axios.post('/api/v1/cards', card);
}


export const updateCard = (card) => {
    const cardId = card.id;
    return axios.put(`/api/v1/cards/${cardId}`, card);
}




// export const createCard = (input) => {
//     const { name, description, listId, cardIds } = input;

//     return axios({
//         url: '/graphql',
//         method: 'post',
//         data: {
//             query: `
//                 mutation {
//                     createCard(name:"${name}" description:"${description}" listId:"${listId}" cardIds:"${cardIds}"){
//                         id,
//                         name,
//                         description,
//                         listId,
//                         list {
//                             id,
//                             cardIds
//                         }
//                     }
//                 }`
//         }
//     });
// }

