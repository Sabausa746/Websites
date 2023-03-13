let code;
let lines = [];
let ranges = [];
let toPrint = "";


document.getElementById("EnterCode").onclick = function(){
    code = document.getElementById("Code").value; 
    lines = code.split("\n");
    
    getLines();
    var filtered = lines.filter(elem => elem);
    lines = filtered;
    

    findSnippets();
    Scramble();
    findNames();
    document.getElementById("codeman").innerHTML = toPrint;

}

function getLines(){
    for (var i = 0; i < lines.length; i++) {
        lines[i] = lines[i].trim()
    }
    lines.forEach((line,index) => {
        if(line.charAt(1) == '/'){
            delete lines[index];
        }
    });
}

let isFirst = true;
function findSnippets(){
    var brackets = 0;
    var start,end;
    var i = 0;
    while(i<lines.length-1){
        if(lines[i].charAt(lines[i].length-1) == '{' ){
            if(isFirst){
                isFirst = false;
                i++;
                continue;
            }
            start = i;
            brackets+=1;
            i++;
            while(brackets!=0){
                if(i==lines.length-1){
                    break;
                }

                if(lines[i].indexOf('{') != -1){
                    brackets+=1;
                }
                if(lines[i].indexOf('}') != -1){
                    brackets-=1;
                }
                i++;
            }
            end = i-1;
            ranges.push([start,end]);
        }else {i++}
    }
}

function Scramble(){

    var start = ranges[0][0];
    for(let i = 0; i<start; i++){
        toPrint += lines[i];
        toPrint += '\n';
    }

    ranges = shuffle(ranges);
    for(let i = 0; i<ranges.length; i++){
        for(let j = ranges[i][0]; j<ranges[i][1]; j++){
            toPrint += lines[j];
            toPrint += '\n';
        }
        toPrint += '}';
        toPrint += '\n';
    }
    toPrint += '}';
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex != 0) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

document.getElementById("copyButton").onclick = function(){
    document.querySelector("#codeman").select();
    document.execCommand('copy');
}

function findNames(){
    let names = [];


    for(let j = 0; j<lines.length; j++){
        console.log(lines);
        let a = lines.get[j];
        a = a.filter(')' , ' ');
        a = a.filter('(' , ' ');
        let temporary = a.split(' ');
        for(let i = 0; i<temporary.length-1; i++){
            if(temporary[i] == 'int' || temporary[i] == 'String' || temporary[i] == 'Integer' || temporary[i] == 'float' || temporary[i] == 'Float' || temporary[i] == 'Long' || temporary[i] == 'long' || temporary[i] == 'double' || temporary[i] == 'Double' || temporary[i] == 'boolean' || temporary[i] == 'Boolean'){
                names.push(temporary[i+1]);
            }
        }
    }

    
}