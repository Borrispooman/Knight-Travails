function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, i) => val === b[i]);
}

function arrayOfArraysContains(arrOfArrs, target) {
  return arrOfArrs.some(subArr =>
    Array.isArray(subArr) &&
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

function XYtoIndex([x, y], width = 8) {
  return x * width + y;
}

function indexToXY(index, width = 8) {
  const x = Math.floor(index / width);
  const y = index % width;
  return [x, y];
}

function arrOfArrsIndexOf(arrOfArrs, target) {
  for (let i = 0; i < arrOfArrs.length; i++) {
    if (Array.isArray(arrOfArrs[i]) && arraysEqual(arrOfArrs[i], target)) {
      return i;
    }
  }
  return -1; 
}

function shortestPath(startXY, targetXY){

		const visitedVertexes = [];
	 
		const parentPointers = {};

		const queue = [];

		if(isCoordinate(startXY) && isCoordinate(targetXY)){
			queue.push(startXY)
		}
		while(queue.length > 0){

			if(arraysEqual(queue[0], targetXY)){
				break;	
			}

			if(arrayOfArraysContains(visitedVertexes, queue[0])){
				queue.shift();
				continue;
			}

			const index = XYtoIndex(queue[0]);
			const nextSpaces = getAdjVertexs(queue[0])
			
			if(arrayOfArraysContains(nextSpaces, targetXY)){
				const childIndex = XYtoIndex(targetXY)
					parentPointers[childIndex] = index;
				break;
			}

			for(let i = 0;i < nextSpaces.length; i++){
				if(nextSpaces[i] !== null){
					const childIndex = XYtoIndex(nextSpaces[i])
					if(parentPointers[childIndex]=== undefined){
						parentPointers[childIndex] = index;
					};
					queue.push(nextSpaces[i]);
				}
			};
			visitedVertexes.push(queue[0]);
			queue.shift();
		};

		const path = [];
		
		path.push(targetXY);
		let parentIndex = parentPointers[XYtoIndex(targetXY).toString()]
		while(true){
			if(arraysEqual(indexToXY(parentIndex), startXY)){
				path.push(indexToXY(parentIndex));
				break;
			}
			path.push(indexToXY(parentIndex))
			parentIndex = parentPointers[parentIndex.toString()];
		}
		return path.reverse();
};

function knightMoves(startXY, targetXY){
	console.log(shortestPath(startXY, targetXY));	
};

knightMoves([0,0], [7,7])
