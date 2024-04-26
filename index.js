import { prettyPrint } from "./prettyPrint.js";

class Node{
    constructor(data){
        this.data = data,
        this.left = null,
        this.right = null;
    }
}

class Tree{
    constructor (arr){
        this.sortedArr = this.order(arr);
        this.root = buildTree(this.sortedArr, 0, this.sortedArr.length - 1);
    }

    order(arr){
        //Order the array and delete duplicates
        arr.sort((a, b) => {
        return a - b;
        });
        let array = [...new Set(arr)];
        return array;
    }

    travelRec(value, root = this.root, last = this.root){
        //if the root node is empty return null
        if(root === null){ 
            return null;
        } else if(root.data === value){ //return the same value root
            return {root, last};                            
        } else if(value < root.data && root.left === null){
            return root;
        } else if(value > root.data && root.right === null){
            return root;
        }

        if(value < root.data) return this.travelRec(value, root.left, root);
        if(value > root.data) return this.travelRec(value, root.right, root);
    }

    insert(value){
        let root = this.travelRec(value);
        //if the root is null create the node
        if(root === null) return this.root = new Node(value);

        //if tha val is equal to a existing node return null
        if(root.data === value) return null;

        if(value < root.data){
            return root.left = new Node(value);
        } else{
            return root.right = new Node(value);
        }
    }

    minValue(node) {
        let minv = node.data;
        while (node.left !== null) {
            minv = node.left.data;
            node = node.left;
        }
        return minv;
    }

    delete(value, node = this.root, las){
        let root = this.travelRec(value, node, las);
        let last = root.last;
        root = root.root;

        //if value was not found return null
        if(root === undefined) return null;

        //if the value has both childs
        if(root.left != null && root.right != null){
            let data = this.minValue(root.right);
            root.data = data;
            return this.delete(data, root.right, root);
        }

        //if the node is a leave just delete
        if(root.left === null && root.right === null){
            return last.data > root.data ? last.left = null : last.right = null;
        } 

        //if only has one children
        if(root.left != null){
            return last.left = root.left;
        } else if(root.right != null){
            return last.right = root.right;
        }
    }
}

function buildTree(arr, start, end){

    if(start > end ) return null;
    let mid = parseInt((start + end) / 2);
    let root = new Node(arr[mid]);

    root.left = buildTree(arr, start, mid - 1);
    root.right = buildTree(arr, mid + 1, end);

    return root;
}

let BST = new Tree([1, 2, 3, 5, 7, 8, 9]);
console.log('---- Insertions -----');
BST.insert(10);
BST.insert(3);
BST.insert(4);
BST.insert(6);
prettyPrint(BST.root);

console.log('');
console.log('---- Deletions -----');
BST.delete(8);
BST.delete(2);
prettyPrint(BST.root);
