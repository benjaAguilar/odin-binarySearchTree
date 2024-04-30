import { prettyPrint } from "./prettyPrint.js";
import { Tree } from "./index.js";

function random(min, max){
    return Math.floor(Math.random() * max) + min;
}

let arr = [];
for(let i = 1; i <= 20; i++){
    arr.push(random(1, 100));
}

let myTree = new Tree(arr);
prettyPrint(myTree.root);
console.log(myTree.isBalanced());

console.log('---- UNBALNCE ----');
for(let i = 1; i <= 5; i++){
    myTree.insert(random(101, 1000));
}
prettyPrint(myTree.root);
console.log(myTree.isBalanced());

console.log('---- BALANCE ----');
myTree = myTree.rebalance();
prettyPrint(myTree.root);
console.log(myTree.isBalanced());

console.log('--preorder--');
console.log(myTree.preOrder());
console.log('');
console.log('--inorder--');
console.log(myTree.inOrder());
console.log('');
console.log('--postorder--');
console.log(myTree.postOrder());
