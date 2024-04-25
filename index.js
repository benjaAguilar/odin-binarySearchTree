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

    insert(value){
        let node = new Node(value);
        let currentNode = this.root;
        let placed = false;

        while(!placed){

            //check and add the value
            if(currentNode.data > node.data && currentNode.left === null){
                currentNode.left = node;
                placed = true;
            } else if(currentNode.data < node.data && currentNode.right === null){
                currentNode.right = node;
                placed = true;
            }

            //check and travel between nodes
            if(currentNode.data > node.data && currentNode.left != null){
                currentNode = currentNode.left;
            } else if(currentNode.data < node.data && currentNode.right != null){
                currentNode = currentNode.right
            }

            //if the new node is equal do not add
            if(currentNode.data === node.data) placed = true;
        }
    }

    delete(value){
        let currentNode = this.root;
        let placed = false;
        
        while(!placed){
            //travel to find the value
            if(currentNode.data != value && currentNode.data > value && currentNode.left != null){
                currentNode = currentNode.left;
            } else if(currentNode.data != value && currentNode.data < value && currentNode.right != null){
                currentNode = currentNode.right;
            }

            //if the new node is equal stop
            if(currentNode.data === value) placed = true;

            //return null if the value was not found
            if(currentNode.data > value && currentNode.left === null) return null;
            if(currentNode.data < value && currentNode.right === null) return null;
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

let BST = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
BST.insert(15);
BST.insert(3);
BST.insert(10);

prettyPrint(BST.root);
