class Node{
    constructor(data){
        this.data = data,
        this.left = null,
        this.right = null;
    }
}

export class Tree{
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

    //travel around the tree and find the value
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

    find(value){
        let node = this.travelRec(value);
        if(node.root === undefined) return null;
        return node.root;
    }

    //iterates over the tree in level order breadth first
    levelOrder(root = this.root){
        if(root === null) return null;
        let queue = [];
        queue.push(root);
        let levelOrderValues = [];

        while(queue.length != 0){
            //get the current element in the queue
            let currentNode = queue[0];
            levelOrderValues.push(currentNode.data);

            //queue the elements
            if(currentNode.left != null) queue.push(currentNode.left);
            if(currentNode.right != null) queue.push(currentNode.right);
            //unqueue the first element
            queue.shift();
        }
        return levelOrderValues;
    }

    //iterates over tree element inOrder, preOrder, postOrder (depth first)
    inOrder(root = this.root){
        let string = '';
        //if the current node is a leaf return the data
        if(root.right === null && root.left === null) return string += ` ${root.data}`;

        //travel to the left
        if(root.left != null) string += this.inOrder(root.left);
        string += ` ${root.data}`; //read the data
        //travel to right
        if(root.right != null) string += this.inOrder(root.right);
        return string;
    }

    preOrder(root = this.root){
        let string = '';
        if(root.right === null && root.left === null) return string += ` ${root.data}`;

        string += ` ${root.data}`;
        if(root.left != null) string += this.preOrder(root.left);
        if(root.right != null) string += this.preOrder(root.right);
        return string;
    }

    postOrder(root = this.root){
        let string = '';
        if(root.right === null && root.left === null) return string += ` ${root.data}`;

        if(root.left != null) string += this.postOrder(root.left);
        if(root.right != null) string += this.postOrder(root.right);
        string += ` ${root.data}`;
        return string;
    }

    height(root = this.root){
        //if root = null  return 0
        if(root === null) return 0;

        //recursive call for each node
        let leftH = this.height(root.left);
        let rightH = this.height(root.right);

        //return the max + the root node
        return Math.max(leftH, rightH) + 1;
    }

    depth(root = this.root, current = this.root){
        if(root === null) return null;
        //if the given root is equal to current return depth 1  
        if(root === current) return 1;

        //travel to find the node and plus the depth
        if(current.data > root.data) return 1 + this.depth(root, current.left);
        if(current.data < root.data) return 1 + this.depth(root, current.right);        
    }

    isBalanced(root = this.root){
        if(root === null) return null;

        let leftRootHeight = this.height(root.left);
        let rightRootHeight = this.height(root.right); 
        
        if(Math.abs(rightRootHeight - leftRootHeight) <= 1){
            return true;
        } else{
            return false;
        }
    }

    rebalance(){
        let unbalancedTree = this.levelOrder();
        return new Tree(unbalancedTree);
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



