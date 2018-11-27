app.config(function($stateProvider){
    const state = [{
        name: 'home',
        url: '/',
        component: 'home'
    }];
    state.forEach(state => {
        $stateProvider.state(state);
    })
})