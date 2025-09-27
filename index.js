function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

function arrayOfArraysContains(arrOfArrs, target) {
  return arrOfArrs.some(
    subArr =>
      subArr.length === target.length &&
      subArr.every((val, i) => val === target[i])
  );
}


function isCoordinate(XY){
	[x, y] = XY;	
	if(x >= 0 && x <= 7 && y >= 0 && y <= 7){
		return true;
	}
	return false;
}



function getAdjVertexs(XY){
	[x, y] = XY;	
	//some coordinates may be invalied, so this first array is "unclean"
	const uncleanedVrtxs = [
		[x+1, y+2],
		[x+2, y+1],
		[x+2, y-1],
		[x+1, y-2],
		[x-1, y-2],
		[x-2, y-1],
		[x-2, y+1],
		[x-1, y+2]
	];
	//so we create a new clean array and run validation on each xy pair in the unclean one.
	const cleanVrtxs = [];
	for(let i = 0; i<uncleanedVrtxs.length; i++){
		if(isCoordinate(uncleanedVrtxs[i])){
			cleanVrtxs.push(uncleanedVrtxs[i]);
		}
		else{
			cleanVrtxs.push(null);
		}
	};
	return cleanVrtxs;
}


function explore(startXY, targetXY){

		const adjList = [];	//!!this is just an array of coordinates right now, its not functioning as an adjacencyList.

		const visitedVertexes = [];

		const queue = [];

		if(isCoordinate(startXY) && isCoordinate(targetXY)){
			queue.push(startXY)
		}
		while(queue.length > 0){

			if(arraysEqual(queue[0], targetXY)){
				adjList.push(queue[0]);
				break;	
			}

			if(arrayOfArraysContains(visitedVertexes, queue[0])){
				queue.shift();
				continue;
			}

			adjList.push(queue[0]);
			visitedVertexes.push(queue[0]);


			const nextSpaces = getAdjVertexs(queue[0]); //queue[0] is an arr in [x,y] format

			for(let i = 0;i < nextSpaces.length; i++){

				if(nextSpaces[i] !== null){
					queue.push(nextSpaces[i]);
				}
			};
			queue.shift();
		};
		return adjList;
};



function knightMoves(startXY, targetXY){
	const adjacencyList = explore(startXY, targetXY);	
	console.log(adjacencyList);
};



knightMoves([0,0], [7,7]);
