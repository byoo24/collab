import axios from 'axios';



// export const createBoard = (input) => {
//     const { name, description, userId, personalBoardIds } = input;
//     personalBoardIds = personalBoardIds.join();
    
//     return axios({
//         url: '/graphql',
//         method: 'post',
//         data: {
//             query: `
//                 mutation {
//                     createBoard(name:"${name}" description:"${description}" userId:"${userId}" personalBoardIds:"${personalBoardIds}"){
//                         id,
//                         name,
//                         description,
//                         listIds,
//                         userId,
//                         user {
//                             personalBoardIds
//                         }
//                     }
//                 }`
//         }
//     });
// }



export const createBoard = (board) => {
    return axios.post('/api/v1/boards', board);
}