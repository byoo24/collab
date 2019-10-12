import axios from 'axios';


export const createList = (list) => {
    return axios.post('/api/v1/lists', list);
}


export const updateList = (list) => {
    const listId = list.id;
    return axios.put(`/api/v1/lists/${listId}`, list);
}


export const updateListsArr = (listsArr) => {
    return axios.put('/api/v1/lists', listsArr);
}


// export const createList = (input) => {
//     const { name, boardId, listIds } = input;
    
//     return axios({
//         url: '/graphql',
//         method: 'post',
//         data: {
//             query: `
//                 mutation {
//                     createList(name:"${name}" boardId:"${boardId}" listIds:"${listIds}"){
//                         id,
//                         name,
//                         boardId,
//                         board {
//                             id,
//                             listIds
//                         }
//                     }
//                 }`
//         }
//     });
// }