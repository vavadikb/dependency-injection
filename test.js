const fs = require('fs');
const path = require('path');
const extractClass = require('./extractClassFunc.js');

const srcDirectoryPath = path.resolve(__dirname, 'src');
const allClasses = [];

// class Container {
//     constructor(){
//         this.instances = new Map()
//     }

//     register(key, instance){
//         this.instances.set(key,instance)
//     }

//     resolve(key) {
//         if (!this.instances.has(key)) {
//           throw new Error(`Dependency not registered: ${key}`);
//         }
    
//         return this.instances.get(key);
//       }
// }
// let container = new Container()


    fs.readdir(srcDirectoryPath, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          return;
        }
      
        files.forEach((file) => {
          const filePath = path.join(srcDirectoryPath, file);
      
          try {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const regex = /class\s+(\w+)/g;
          const matches = fileContent.match(regex);
          let classNames
      
          if (matches) {
              const result = matches.map(match => match.split(' ')[1]);
              classNames = result
              console.log(classNames);
          }
          const classes = extractClass(fileContent)
          console.log(classes)
          allClasses.push(classes)
          } catch (error) {
            console.error(`Error reading file ${filePath}:`, error);
          }
        });
      
        let res = regDependency(allClasses)
        console.log(res, 'ressss')
      });



function regDependency(allClasses){
    allClasses.map(item => {
        console.log(item[0].constructorParams[0], item[0].paramType, item[0].className , 'parcons')
    })
    return allClasses
}

