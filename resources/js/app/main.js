import Environment from "./environment.js"
import EnvironmentDialogs from "./environmentDialogs.js"

document.addEventListener('DOMContentLoaded', function(){
    const environment = new Environment();

    EnvironmentDialogs.events(environment);
});
