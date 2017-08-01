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

function findBSTDepth(node){
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


const bst = new BST();


const string = 'EASYQUESTION';
const arr = string.split('');
arr.map(el => bst.insert(el,el.charCodeAt(0)));
console.log(findBSTDepth(bst));
// console.log(JSON.parse(JSON.stringify(bst, null, 2)));
