export default store => next => action => {
    //if action is not a func, leave it alone. else go on to next func.
    if(typeof action !== 'function'){
        return next(action);
    }

    action(store.dispatch); //giving ourself access to dispatch
};

//redux thunk gives us ability to dispatch actions.

//same as
// function name(store){
//     return function(next){
//         return function(action){
//
//         }
//     }
// }