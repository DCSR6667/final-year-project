const red = document.getElementsByClassName('red')[0];
const yellow = document.getElementsByClassName('yellow')[0];
const green = document.getElementsByClassName('green')[0];
const redc = document.getElementsByClassName('red')[1];
const yellowc = document.getElementsByClassName('yellow')[1];
const greenc = document.getElementsByClassName('green')[1];
var form=document.getElementById('form1');
var x,r,y,g,go,c,rc,yc,gc;
var aud= document.getElementById("aud");
var timer=document.getElementById("timer");
var timerc=document.getElementById("timerc");

function changeLights(){
        setTimeout(() => {
        timer.style.color="red";
        var t=5;
        
        r=setInterval(()=>
        {
            if(t==1)
            {
                clearInterval(r);
            }
            timer.innerHTML="0"+t;
            t=t-1;   
        },1000);
        redLight()
    }, 0);


        setTimeout(() => {

        timer.style.color="green";
        var t=6;
        
        g=setInterval(()=>
        {
            if(t==1)
            {
                clearInterval(g);
            }
            timer.innerHTML="0"+t;
            t=t-1;   
        },1000);
        greenLight()
    }, 6000);
    

        setTimeout(() => {

        timer.style.color="yellow";
        var t=3;
        
        y=setInterval(()=>
        {
            if(t==1)
            {
                clearInterval(y);
            }
            timer.innerHTML="0"+t;
            t=t-1;   
        },1000);
        yellowLight()
    }, 13000);
}

function changeLightsc(){
    setTimeout(() => {

        timerc.style.color="green";
        var t=6;
        
        gc=setInterval(()=>
        {
            if(t==1)
            {
                clearInterval(gc);
            }
            timerc.innerHTML="0"+t;
            t=t-1;   
        },1000);


    greenLightc()
}, 0);


    setTimeout(() => {

        timerc.style.color="yellow";
        var t=3;
        
        yc=setInterval(()=>
        {
            if(t==1)
            {
                clearInterval(yc);
            }
            timerc.innerHTML="0"+t;
            t=t-1;   
        },1000);



    yellowLightc()
}, 7000);


    setTimeout(() => {

        timerc.style.color="red";
        var t=5;
        
        rc=setInterval(()=>
        {
            if(t==1)
            {
                clearInterval(rc);
            }
            timerc.innerHTML="0"+t;
            t=t-1;   
        },1000);

    redLightc()
}, 11000);
}


function redLight(){
    red.classList.add('active');
    setTimeout(() => {
        red.classList.remove('active');
        
    }, 6000);
}


function yellowLight(){
    yellow.classList.add('active');
    setTimeout(() => {
        yellow.classList.remove('active');

    }, 4000);
}


function greenLight(){
    green.classList.add('active');
    setTimeout(() =>{
        green.classList.remove('active');
    }, 7000);
}


function redLightc(){
    redc.classList.add('active');
    setTimeout(() => {
        redc.classList.remove('active');
        
    }, 6000);
}


function yellowLightc(){
    yellowc.classList.add('active');
    setTimeout(() => {
        yellowc.classList.remove('active');

    }, 4000);
}


function greenLightc(){
    greenc.classList.add('active');
    setTimeout(() =>{
        greenc.classList.remove('active');
    }, 7000);
}


function countdigits(num)
{
    var count=0;
    while(num>0)
    {
        count=count+1;
        num=Math.floor(num/10);
        
    }
    return count;
}


const submithandler=(event)=>
{
    event.preventDefault();
    var input=document.getElementById('input1').files[0];
    var formData=new FormData();
    formData.append('doc',input);
    fetch("http://127.0.0.1:5000/",{
        method:'POST',
        body:formData
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        if(data.score>=98)
        {
            clearInterval(x);
            clearInterval(c)

            setTimeout(()=>
            {
                var status=document.getElementsByClassName("status")[0];
                var statusc=document.getElementsByClassName("status")[1];
                var sig=document.getElementsByClassName('sig')[0];
                var sigc=document.getElementsByClassName('sigc')[0];
                status.innerHTML="Status: Emergency";
                statusc.innerHTML="Status: Emergency";
                sig.style.color="red";
                sig.style.border="3px solid red";
                sigc.style.color="red";
                sigc.style.border="3px solid red";
                green.classList.remove('active');
                red.classList.remove('active');
                yellow.classList.remove('active');
                green.classList.add('active');

                greenc.classList.remove('active');
                redc.classList.remove('active');
                yellowc.classList.remove('active');
                redc.classList.add('active');

                aud.loop=true;
                aud.play();

                timer.style.color="green";
                var t=30;
                go=setInterval(()=>
                {
                    if(t==1)
                    {
                        clearInterval(go);
                    }
                    if(countdigits(t)==1)
                    {
                        timer.innerHTML="0"+t;
                    }
                    else
                    {
                        timer.innerHTML=t;
                    }
                    
                    t=t-1;   
                },1000);


                timerc.style.color="red";
                var tc=30;
                co=setInterval(()=>
                {
                    if(tc==1)
                    {
                        clearInterval(co);
                    }
                    if(countdigits(tc)==1)
                    {
                        timerc.innerHTML="0"+tc;
                    }
                    else
                    {
                        timerc.innerHTML=tc;
                    }
                    
                    tc=tc-1;   
                },1000);

            },13000);

           
            setTimeout(()=>
            {
                var status=document.getElementsByClassName("status")[0];
                var statusc=document.getElementsByClassName("status")[1];
                var sig=document.getElementsByClassName('sig')[0];
                var sigc=document.getElementsByClassName('sigc')[0];
                status.innerHTML="Status: Normal";
                statusc.innerHTML="Status: Normal";
                sig.style.color="white";
                sig.style.border="3px solid #1e272e";
                sigc.style.color="white";
                sigc.style.border="3px solid #1e272e";
                aud.loop=false;
                aud.pause();
                green.classList.remove('active');
                redc.classList.remove('active');
                changeLights();
                changeLightsc();
                x=setInterval(changeLights,17000);
                c=setInterval(changeLightsc,17000);
            },43000)
        }
    }).catch(err=>
        {
         console.log(err);
        });
};


form.addEventListener('submit',submithandler);
changeLights();
changeLightsc();
x=setInterval(changeLights,17000);
c=setInterval(changeLightsc,17000);


