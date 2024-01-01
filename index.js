const fs = require('fs');
const path = require('path');
const extractClass = require('./extractClassFunc.js');
const sortObjects = require('./register.js')
const createClassConstructor = require('./createClass.js')

const srcDirectoryPath = path.resolve(__dirname, 'src');
const allClasses = [];

class Container {
  constructor() {
    this.container = {};
  }

  get() {
    return this.container;
  }

  register(className, instance) {
    this.container[className] = instance;
  }

  resolve(className) {
    if (this.container.hasOwnProperty(className)) {
      return this.container[className];
    } else {
      throw new Error(`Dependency not found for class: ${className}`);
    }
  }
}

let container = new Container()


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
        let resultClasses = sortObjects(allClasses)
        registerClasses(resultClasses, container)
        testing(container) // testing functionality of classes 
      });
function registerClasses(classArray, container) {
    const classMap = new Map();

    let sortedClasses = sortObjects(classArray).flat();

    sortedClasses.forEach(classInfo => {
        const { className, classfileContent, paramType } = classInfo;

        let instance;
        if (paramType === null) {
            instance = createClassConstructor(classfileContent, className);
        } else {
            const dependency = container.resolve(paramType);
            instance = createClassConstructor(classfileContent, className, dependency);
        }

        container.register(className, instance);
        classMap.set(className, instance);
    });

    return container;
}

async function testing(container){
  const userServiceInstance = container.resolve("UserService");
  const userControllerInstance = container.resolve("UserController");
  const repositoryInstance = container.resolve("Repository");
  console.log(await userControllerInstance.getUsers())
}