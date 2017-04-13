

let cache = {};




export function makeRequest (method, url, data={}, headers={}) {


    if(method=='GET'){
        if(url in cache){
            return Promise.resolve(cache[url]);
        }
    }



    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {


                cache[url] = xhr.response;
                resolve(xhr.response);




            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };





        if(method === 'POST'){


            for(let header in headers){
                xhr.setRequestHeader(header, headers[header]);
            }
            xhr.send(data);

        }else{


            xhr.send();

        }





    });
}
