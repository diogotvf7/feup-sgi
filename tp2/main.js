import { MyApp } from './MyApp.js';
import { MyGuiInterface } from './MyGuiInterface.js';
import { MyContents } from './MyContents.js';

(async function() {
    // create the application object
    const app = new MyApp();

    // initializes the application
    app.init();
    // create the contents object
    const contents = new MyContents(app);
    // initializes the contents
    await contents.init(); 
    // hooks the contents object in the application object
    app.setContents(contents);
    // create the gui interface object

    const gui = new MyGuiInterface(app);
    // set the contents object in the gui interface object

    gui.setContents(contents);
    // we call the gui interface init 
    // after contents were created because
    // interface elements may control contents items
    gui.init();

    // main animation loop - calls every 50-60 ms.
    app.render(); 
})();
