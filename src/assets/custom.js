var cur_bloks_passed = 0;
var cur_rest_blocks_passed = 0;
var working = true;

function start_time(){
    var block_size_in_seconds = document.getElementById("block_size").value * 60;
    var num_blocks = document.getElementById("num_blocks").value;
    var rest_time_in_seconds = document.getElementById("rest_time").value * 60;
    var num_rest_blocks = num_blocks-1;
    var num_total_seconds = (block_size_in_seconds * num_blocks + rest_time_in_seconds * num_rest_blocks);
    var i;
    var j;
    var k;
    var num_seconds = 0;
    document.getElementById("state").innerHTML = "Status: Working";
    var id = setInterval(() => {  
        actualizeClock(num_seconds);
        actualizeBar(num_total_seconds, num_seconds);
        actualizeStatus(block_size_in_seconds,rest_time_in_seconds,num_seconds,num_total_seconds)
        if(num_seconds == num_total_seconds){
            clearInterval(id);
        }
        num_seconds++; 
    }, 1000);
                
}

function actualizeClock(d){
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    newTime = h + ":" + m + ":" + s;
    document.getElementById("basicUsage").innerHTML = newTime;
}

function actualizeBar(total_seconds, cur_seconds){
    document.getElementById("progress-bar").setAttribute("style", "width:"+cur_seconds/total_seconds*100+"%");
}

function actualizeStatus(block_size_in_seconds,rest_time_in_seconds,num_seconds,num_total_seconds){
    if(num_seconds != 0){
        if(num_seconds%block_size_in_seconds == 0 && working == true){
            cur_bloks_passed++;
        }
        if(num_seconds%(block_size_in_seconds+rest_time_in_seconds) == 0 && working == false){
            cur_rest_blocks_passed++;
        }
    }
    if(num_seconds%(block_size_in_seconds*cur_bloks_passed + rest_time_in_seconds*cur_rest_blocks_passed) == 0){
        if(working == true){
            working = false;
            document.getElementById("state").innerHTML = "Status: Resting";
        }else{
            working = true;
            document.getElementById("state").innerHTML = "Status: Working";
        }
    }
    if(num_seconds == num_total_seconds){
        document.getElementById("state").innerHTML = "Status: Finished!!";
    }
}