export function findInLibrary(name,library){
    for(const item of library){
        console.log(name,item.name,name.indexOf(item.name));
        if(name.indexOf(item.name)!==-1){
            return(item);
        }
    }
    return null;
}