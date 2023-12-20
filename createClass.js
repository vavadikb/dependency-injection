function createClassConstructor(classText, className, constructorArgs) {
    if(constructorArgs.data){
      console.log(constructorArgs.data, 'constArgsData')

    }else{
      console.log(constructorArgs, 'constArgs')
    }
  console.log(typeof constructorArgs, 'ARGS', constructorArgs, className)
    const classWithConstructor = `
      ${classText}
      const ${className}Instance = new ${className}(${JSON.stringify(constructorArgs) });
      return ${className}Instance;
    `;

    const classConstructor = new Function(classWithConstructor);
 
    return classConstructor();
}

module.exports = createClassConstructor

// const classTextWithConstructor = 'class Repository {\n' +
//     '\n' +
//     '    constructor(data){\n' +
//     '        this.data = data\n' +
//     '    }\n' +
//     '\n' +
//     '    get(){\n' +
//     '        return this.data\n' +
//     '    }\n' +
//     '    getById(id) {\n' +
//     '        console.log(this.data);\n' +
//     '        let item = this.data.find(item => item.id === id);\n' +
//     '        console.log(item)\n' +
//     '        return item.length ? item[0] : `Object with id ${id} not found`;\n' +
//     '    }\n' +
//     '\n' +
//     '    post(newObj){\n' +
//     '        return this.data.push({id:this.data[this.data.length - 1].id + 1 , ...newObj})\n' +
//     '    }\n' +
//     '\n' +
//     '    put(id, newObj){\n' +
//     '        try {\n' +
//     '            const index = this.data.findIndex(item => item.id === id);\n' +
//     '            try {\n' +
//     '                if(index){\n' +
//     '                    return this.data[index] = {id, ...newObj}\n' +
//     '                } else{\n' +
//     '                    throw new Error(`Object with id ${id} not found`)\n' +
//     '                }\n' +
//     '            }catch(e){\n' +
//     '                console.log(e)\n' +
//     '                throw e \n' +
//     '            }\n' +
//     '        }catch(e){\n' +
//     '            console.log(e)\n' +
//     '            throw e \n' +
//     '        }\n' +
//     '    }\n' +
//     '\n' +
//     '    delete(id){\n' +
//     '        try{\n' +
//     '            let item = this.data.find(item => item.id === id);\n' +
//     '            return item.length ? this.data = this.data.filter(item => item.id !== id) : `Object with id ${id} not found`;\n' +
//     '        }catch(e){\n' +
//     '            console.error(e)\n' +
//     '            throw e\n' +
//     '        }\n' +
//     '    }\n' +
//     '}'


// const className = 'Repository';
// const constructorArgs = [{id: 1, name: 'Vadim', age: 20}, {id: 2, name: 'Vasya', age: 22}, {
//     id: 3,
//     name: 'Petya',
//     age: 33
// }, {id: 4, name: 'Kolya', age: 25}];

// const repositoryInstance = createClassConstructor(classTextWithConstructor, className, constructorArgs);

// console.log(repositoryInstance.get());
