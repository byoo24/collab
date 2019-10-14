


export default {
    User: {
        boards: (parent, args, context, info) => parent.getBoards(),
    },
    Query: {
        users: (parent, args, { db }, info) => db.user.findAll(),
        user: (parent, args, { db }, info) => db.user.findByPk(args.id)
    }
};