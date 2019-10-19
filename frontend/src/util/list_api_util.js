import axios from 'axios';


export const createList = (list) => {
    return axios.post('/api/v1/lists', list);
}


export const updateList = (list) => {
    const listId = list.id;
    return axios.put(`/api/v1/lists/${listId}`, list);
}


export const updateListsArr = (listsData) => {
    return axios.put('/api/v1/lists', listsData);
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



export const deleteList = (input) => {
    const { id } = input;

    return axios({
        url: '/graphql',
        method: 'post',
        data: {
            query: `
                mutation {
                    deleteList(id:"${id}"){
                        id,
                        boardId
                    }
                }
            `
        }
    })
}