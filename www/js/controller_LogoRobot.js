angular.module("bleTest.controllers")

.controller("LogoRobot",function($scope, BleServices, UtilServices, BleDefs){
  //var LogoRobotService=BleDefs.LogoRobotService;
  var uartService=BleDefs.uartService;

	var commandList={
		"up":1,
		"down":2,
		"left":3,
		"right":4
	};

	$scope.logoCommands=[];
	var isSent=false;

	$scope.addCmd=function(cmd){
		cleanupCmds();

		if($scope.logoCommands.length<20){
			var cmdCode=commandList[cmd];
			$scope.logoCommands.push({name:cmd,code:cmdCode});
		}
	}

	$scope.sendCmd=function(){
		/*var cmdString=_.join(_.map($scope.logoCommands,"code"),"");
		console.log(cmdString);
		var data=UtilServices.str2ab(cmdString);*/
		var cmdArray=_.concat([],_.map($scope.logoCommands,"code"));
		//console.log(cmdArray);
		var data=new ArrayBuffer(cmdArray.length);
		var bufView=new Uint8Array(data);
		bufView.set(cmdArray);
		//console.log(bufView);
  	
  	BleServices.writeData(
  		$scope.peripheral.id, 
  		data, 
  		uartService.service,
  		uartService.rxChari,
  		onWrite);
		isSent=true;
	}

	$scope.backspace=function(num){
		if(_.isUndefined(num))num=1;
		cleanupCmds();
		$scope.logoCommands=_.dropRight($scope.logoCommands,num);
	}

	function cleanupCmds(){
		if(isSent){
			$scope.logoCommands=[];
			isSent=false;
		}
	}

	function onWrite(bla){
		console.log("write success ", bla);

	}

})