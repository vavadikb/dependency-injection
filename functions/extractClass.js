

function extractClass(fileContent) {

const regex = /class\s+(\w+)/g;
const matches = fileContent.match(regex);
let classNames
let constructorParams 

if (matches) {
    const result = matches.map(match => match.split(' ')[1]);
    classNames = result
}

const constructorRegex = /constructor\s*\(([^)]*)\)/;
const constructorMatch = fileContent.match(constructorRegex);

if (constructorMatch) {
   constructorParams = constructorMatch[1].split(',').map(param => param.trim());
} 
    let resultArr = []
    let classCount = 0 
    let count = 0;
    let result = '';
    let insideClass = false;

    for (let char of fileContent) {
        if (char === '{') {
            count++;
            insideClass = true;
        } else if (char === '}') {
            count--;
        }

        if (insideClass) {
            result += char;
        }

        if (count === 0 && insideClass) {
            const paramRegex = /\/\*\*\s*\n\s*\*\s*@\w+\s+{(.+?)}\s+(\w+)\s*\*\//;
            const match = result.trim().match(paramRegex);

            const params = match
            ? { paramType: match[1], paramName: match[2] }
            : null;
            
            const paramArray = extractParams(fileContent)
            const item= {className: `${classNames[classCount]}`, classfileContent: `${matches[classCount]} ${result.trim()}`,paramArray , paramName: params ? params.paramName : null, paramType: params? params.paramType : null, constructorParams: constructorParams ? constructorParams : []}
            resultArr.push(item)
            insideClass = false;
            result = '';
            classCount++
        }

    }
    return resultArr

}

function extractParams(fileContent) {
    const paramRegex = /@\w+\s+\{\s*(\w+)\s*\}\s*(\w+)/g;

    let matches;
    const params = [];
    let found = false;

    while ((matches = paramRegex.exec(fileContent)) !== null) {
        found = true;
        params.push({
            paramName: matches[2],
            paramType: matches[1]
        });
    }

    return found ? params : null;
}

module.exports = extractClass
