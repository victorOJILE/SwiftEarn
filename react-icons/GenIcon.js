export function GenIcon(data) {
 function genChild(child) {
  function recursivelyCheckForPath(g) {
  	let hasChild = false;
  	for(let key of g) {
  		if(key.child) {
  			hasChild = true;
  			recursivelyCheckForPath(key.child);
  		}
  	}
  	if(!hasChild) {
  	 child = g;
  	}
  }
  let hasNestedChild = false;
  if(child.child) {
  	hasNestedChild = true;
  	recursivelyCheckForPath(child.child);
  }
  if(hasNestedChild) {
  	let childrenTags = '';
  	child.forEach(tag => {
  		let attr = '';
    for (let key in tag.attr) {
   	 if (key == 'id') continue;
    	attr += `${key}="${tag.attr[key]}" `;
    }
    childrenTags += `<${tag.tag} ${attr}/>\n`;
  	});
   return childrenTags;
  } else {
  	let attr = '';
  
   for (let key in child.attr) {
   	if(key == 'id') continue;
    attr += `${key}="${child.attr[key]}" `;
   }
  
   return `<${child.tag} ${attr}/>`;
  }
 }

 return function(props = {}) {
 	let otherAttr = '';
 	if(props) {
 		for(let key in props) {
 			if(key == 'color' || key == 'width') continue;
 			otherAttr += `${key}="${props[key]}" `;
 		}
 	}
 	
  return `<${data.tag} stroke="currentColor" fill="${props.color || 'currentColor'}" stroke-width="0" viewBox="${data.attr.viewBox}" ${props.width ? '' : 'width="1em"' } height="${props.width || '1em'}" ${otherAttr} xmlns="http://www.w3.org/2000/svg">
 ${data.child.map(genChild).join('')}
</${data.tag}>`;
 }
}
