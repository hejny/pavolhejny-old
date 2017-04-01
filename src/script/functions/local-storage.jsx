



export const loadState = (initialState) => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return initialState;
        }


        return (<any>Object).assign({},initialState, JSON.parse(serializedState));


    } catch (err) {
        return initialState;
    }
};





export const saveState = (state) => {
    try {


        //location.hash = '#'+state.problem;



        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);






    } catch (err) {
        console.warn('Cant save app state.');
        // Ignore write errors.
    }
};


