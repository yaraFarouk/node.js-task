const fs= require('fs');
const path= require('path');
const dirctory=path.join(__dirname,'folder-name');
let files = new Set(fs.readdirSync(dirctory));
function logChange(type,filename)
{
    if(filename){
        const time=new Date().toLocaleString();
        console.log(`[${time}] ${type.toUpperCase()}: ${filename}`);
    }
}

fs.watch(dirctory,(type,filename)=>{
    if(filename){
        const filepath=path.join(dirctory,filename);
        const fileexist= fs.existsSync(filepath);
        if(!files.has(filename)&&fileexist)
        {
            logChange('created',filename);
            files.add(filename);
        }
        else if(files.has(filename)&& !fileexist)
        {
            logChange('deleted',filename);
            files.delete(filename);
        }
        else if(files.has(filename) && fileexist){
            logChange('modified',filename);
        }
    } else {
        console.log("filename isn't found");
    }
});

console.log(`watching for changes in ${dirctory}...`);