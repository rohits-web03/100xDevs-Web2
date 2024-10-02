import fs from 'fs';
//Promisified Version of readFile
const readFilePromisified=(filepath,encoding)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath,encoding,(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    });
}
readFilePromisified("a.txt","utf-8")
    .then((data)=>{
        console.log(`File contents: ${data}`);
    })
    .catch((err)=>{
        console.log(`Error while reading file: ${err}`);
    })

//Promisified Version of writeFile
const writeFilePromisified=(filepath,contents,encoding)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(filepath,contents,encoding,(err)=>{
            if(err) reject(err);
            resolve("Content written in file successfully:)");
        })
    });
}
writeFilePromisified("b.txt","Hello from b.txt. Testing writeFile","utf-8")
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log(`Error while writing file: ${err}`);
    })

//Promisified Version of cleanFile
// Reads the contents of a file
// Trims the extra space from the left and right
// Writes it back to the file
const cleanFilePromisified=(filepath,encoding)=>{
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath,encoding,(err,data)=>{
            if(err) {
                reject(err);
                return;
            }
            const cleanData=data.trim();
            fs.writeFile(filepath,cleanData,encoding,(err)=>{
                if(err) return reject(err);
                else {
                    resolve("File contents cleaned successfully");
                }
            })
        })
    });
}
cleanFilePromisified("b.txt","utf-8")
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log(`Error while writing file: ${err}`);
    })

//Promisified Version of setTimeout
const setTimeoutPromisified=(timeout)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,timeout);
    });
}
setTimeoutPromisified(3000)
    .then(()=>{
        console.log("Async func executed");
    })
    .catch((err)=>{
        console.log(`Error while setting timeout: ${err}`);
    });

//Promisified version of unlink
const unlinkPromisified=(filepath)=>{
    return new Promise((resolve,reject)=>{
        fs.unlink(filepath,(err)=>{
            if(err){
                reject(err);
                return;
            }
            resolve("File deleted successfully");
        })
    })
}
unlinkPromisified("b.txt")
    .then(data=>console.log(data))
    .catch(err=>console.log(`Error deleting file: ${err}`))