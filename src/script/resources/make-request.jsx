

export function makeRequest (method:string, url:string, data?:string, headers?={}) {


    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {


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
