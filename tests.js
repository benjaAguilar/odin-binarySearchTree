import { Tree } from "./index.js";
import { prettyPrint } from "./prettyPrint.js";

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

console.log('');
console.log('---- Find -----');
console.log(BST.find(7));
console.log(BST.find(33));

console.log('');
console.log('----- LevelOrder -----');
console.log(BST.levelOrder());
console.log(BST.levelOrder(BST.find(9)));

console.log('');
console.log('----- inOrder -----');
console.log(BST.inOrder());
console.log(BST.inOrder(BST.find(9)));

console.log('');
console.log('----- preOrder -----');
console.log(BST.preOrder());
console.log(BST.preOrder(BST.find(9)));

console.log('');
console.log('----- postOrder -----');
console.log(BST.postOrder());
console.log(BST.postOrder(BST.find(9)));

console.log('');
console.log('----- Height -----');
console.log(BST.height());

console.log('');
console.log('----- Depth -----');
console.log(BST.depth(BST.find(9)));

console.log('');
console.log('----- IsBalanced -----');
console.log(BST.isBalanced());