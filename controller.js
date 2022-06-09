class Controller{
    constructor(playerID){

        if(playerID==1){
            this.keys = ['A', 'F', 'S', 'D'];
        }else if(playerID==2){
            this.keys = ['H', 'L', 'J', 'K']
        }

        const controller = this;

        window.addEventListener('keydown', function(e){
            controller.controller(e);
        })

        this.controller();

    }

    controller(e){
        console.log(e);
    }
}