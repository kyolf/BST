'use strict';

class BST {
    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    
    insert(key, value) {
        if (this.key === null) { // input root node
            this.key = key;
            this.value = value;
        } else if (key < this.key) {
            if (this.left === null) {
                this.left = new BST(key, value, this);
            } else {
                this.left.insert(key, value);
            }
        } else {
            if (this.right === null) {
                this.right = new BST(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }
    
    get(key) {
        if (this.key === key) {
            return this.value;
        } else if (key < this.key && this.left) {
            return this.left;
        } else if (key > this.key && this.right) {
            return this.right;
        } else {
            return undefined;
        }
    }
    
    remove(key) {
        if (this.key === key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            } else if (this.left) {
                this._replaceWith(this.left);
            } else if (this.right) {
                this._replaceWith(this.right);
            } else {
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            return undefined;
        }
    }
    
    _replaceWith(node) {
        if (this.parent) {
            if (this === this.parent.left) {
                this.parent.left = node;
            } else if (this === this.parent.right) {
                this.parent.right = node;
            }
            
            if (node) {
                node.parent = this.parent;
            }
        } else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }    
        }
    }
    
    _findMin() {
        if (!this.left) {
            return this;
        } else {
            return this.left._findMin();
        }
    }
}
let tick = 0;
function findBSTDepth(node){
  tick++;
  if(node === null){
    return -1;
  }
  let leftCounter = findBSTDepth(node.left);
  let rightCounter = findBSTDepth(node.right);

  if(leftCounter > rightCounter){
    console.log('leftCounter', leftCounter, node.key);
    return leftCounter+1;
  }else{
    console.log('rightCounter', rightCounter, node.key);
    return rightCounter+1;
  }

}
let counter = 0;
function isBST(node) {  
  if (node === null) 
    return(true); 
  
  if ((node.left !== null && node.key < node.left.key) || 
        (node.right !== null && node.key > node.right.key)) return false;
        
   /* false if the max of the left is > than us */
  if (node.left !== null && node.left.right !== null && node.left.right.key > node.key) 
    return(false); 
     
  /* false if the min of the right is <= than us */
  if (node.right !== null && node.right.left !== null && node.right.left.key < node.key) 
    return(false); 
 
  
  /* false if, recursively, the left or right is not a BST */
  if ((node.left && !isBST(node.left)) || (node.right && !isBST(node.right))) 
    return(false); 
     
  /* passing all that, it's a BST */
  return(true); 
} 

// function thirdLargest(node){
//   let rootNode = node;

//   while(node.right !== null){
//     node = node.right;
//   }

//   if(node.left !== null){
//     return node.parent.key;
//   }

//   if(node.parent !== null){
//     if(node.parent.left !== null){
//       return node.parent.left.key;
//     }
//     else if(node.parent.parent !== null){
//       return node.parent.parent.key;
//     }
//     else{
//       console.log('BST length less than 3 ');
//       return undefined;
//     }
//   }
//   else{
//     console.log('BST length less than 3');
//     return undefined;
//   }
// }

const bst = new BST();
class Node {
    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
}

const root = new Node(3);
root.left = new Node(5);
root.right = new Node(2);
// root.left.left = new Node(1);
// root.left.right = new Node(6);
// root.right.left = new Node(-20);
// root.right.right = new Node(-50);

// const string = 'EASYQUESTION';
// const arr = string.split('');
// arr.map(el => bst.insert(el,el.charCodeAt(0)));
bst.insert(10,'');
bst.insert(5,'');
bst.insert(4, '');
bst.insert(6,'');
bst.insert(15,'');
bst.insert(14,'');
bst.insert(16,'');

// console.log(findBSTDepth(bst));

// console.log(JSON.parse(JSON.stringify(bst, null, 2)));
console.log(isBST(bst));
console.log('counter:',counter);

// console.log(isBST(root));

// bst.insert(5,'');
// bst.insert(8,'');
// bst.insert(2,'');
// bst.insert(7,'');

// console.log(thirdLargest(bst));
