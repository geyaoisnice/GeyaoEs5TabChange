var initTools=(function(){
    function getTarget(ev){
        var e=ev||window.event;
        return e.target||e.srcElement
    }
    return{
        getTarget:getTarget
    }
})()