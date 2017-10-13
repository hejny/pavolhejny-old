

import * as React from "react";



export class Background extends React.Component {


    constructor(props) {
        super(props);
    }


    render() {

        console.log('Rendring background...');

        return(
            <div className="background">
                <canvas ref={(canvas) => { this.canvas = canvas }} width="500" height="500">
                </canvas>


                <div className="code">
                    <div className="col col1">
                        {JSON.stringify(this.props.content,null,4)}
                    </div>
                    <div className="col col2">
                        {JSON.stringify(this.props.content,null,4)}
                    </div>
                </div>




            </div>
        );
    }

    componentDidMount(){

        console.log('Setting up background...');
        console.log(this);


        var canvas = this.canvas;
        var ctx = canvas.getContext("2d");


        canvas.width = document.body.scrollWidth;
        canvas.height = document.body.scrollHeight;


        let A = null;
        document.addEventListener('mousemove', function(event) {


            let B = {
                x: event.clientX,
                y: event.clientY
            };



            if (A) {


                var distace = Math.sqrt(Math.pow(A.x-B.x,2)+Math.pow(A.y-B.y,2));
                console.log(distace);


                //console.log(distace);
                if(distace<1000){


                    ctx.lineWidth = 50;//100/Math.sqrt(distace);


                    //ctx.globalCompositeOperation = "xor";
                    ctx.globalCompositeOperation = "destination-out";
                    ctx.strokeStyle = "black";
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(A.x, A.y);
                    ctx.lineTo(B.x, B.y);
                    ctx.stroke();

                    /*ctx.strokeStyle = "rgba(255,255,255,0.5)";
                     ctx.globalCompositeOperation = "source-over";
                     ctx.beginPath();
                     ctx.moveTo(a.x, a.y);
                     ctx.lineTo(b.x, b.y);
                     ctx.stroke();*/


                }

            }


            A = {
                x: B.x,
                y: B.y
            };



        }, false);






        /*function renderLoop(){

            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(255,255,255,0.01)";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            //canvas2d.globalCompositeOperation = "lighter";
            //ctx.globalAlpha = 0.5;

            requestAnimationFrame(renderLoop);

        }
        requestAnimationFrame(renderLoop);*/




    }

}