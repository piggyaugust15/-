const front = {
    state: {
        url: process.env.VUE_APP_BASE_API,
        lang:'26',
    },
    mutations:{
        CHANGE_LANGUAGE(state,lang){
            state.lang=lang;
        }
    },
    actions:{

    }
}

export default front
