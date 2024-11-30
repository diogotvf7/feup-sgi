import * as THREE from 'three';

/**
 *  1. in a given class file MyWhateverNameClass.js in the constructor call:
 * 
 *  this.reader = new MyFileReader(this.onSceneLoaded.bind(this));
 *  this.reader.open("scenes/<path to json file>.json");	
 * 
 *  The last argumet in the constructor is a method that is called when the json file is loaded and parsed (see step 2).
 * 
 *  2. in the MyWhateverNameClass.js class, add a method with signature: 
 *     onSceneLoaded(data) {
 *     }
 * 
 *  This method is called once the json file is loaded and parsed successfully. The data argument is the entire scene data object. 
 * 
 */

class MyFileReader {
    open(filePath) {
        return new Promise((resolve, reject) => {
            fetch(filePath)
                .then(response => {
                    if (!response.ok) throw new Error(`Failed to load: ${response.statusText}`);
                    return response.json();
                })
                .then(data => {
                    resolve(data); 
                })
                .catch(error => {
                    console.error(`Error loading file: ${error}`);
                    reject(error); 
                });
        });
    }
}


export { MyFileReader };
