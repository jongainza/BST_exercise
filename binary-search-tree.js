class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (true) {
      if (newNode.val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else if (newNode.val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
    this.root = this.insertNode(this.root, val);
    return this;
  }
  insertNode(node, val) {
    if (node === null) {
      return new Node(val);
    }
    if (val < node.val) {
      node.left = this.insertNode(node.left, val);
    } else if (val > node.val) {
      node.right = this.insertNode(node.right, val);
    }
    return node;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this;
    while (currentNode) {
      if (currentNode.val === val) return currentNode;
      if (currentNode > val) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    return this.findNode(this.root, val);
  }

  findNode(node, val) {
    if (node === null) {
      return undefined;
    }
    if (node.val === val) {
      return node;
    }
    if (node.val > val) {
      return this.findNode(node.left, val);
    } else {
      return this.findNode(node.right, val);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root) {
    if (!node) return [];
    let arr = [node];
    if (node.left) {
      arr.concat(this.dfsPreOrder(node.left));
    }
    if (node.right) {
      arr.concat(this.dfsPreOrder(node.right));
    }
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root) {
    if (!node) return [];
    let arr = [];
    if (node.left) {
      arr = arr.concat(this.dfsInOrder(node.left));
    }
    arr.push(node.val);
    if (node.right) {
      arr = arr.concat(this.dfsInOrder(node.right));
    }
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root) {
    if (!node) return [];
    let arr = [];
    if (node.right) {
      arr = arr.concat(dfsPostOrder(node.right));
    }
    if (node.left) {
      arr = arr.concat(this.dfsPostOrder(node.left));
    }
    arr.push(node.val);
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    if (!this.root) return [];
    let visited = [];
    let queue = [this.root];

    while (queue.length) {
      const current = queue.shift();
      visited.push(current);
      if (current.left) {
        queue.push(current.left);
      }
      if (current.right) {
        queue.push(current.right);
      }
    }
    return visited;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    this.root = this.removeNode(this.root, val);
  }
  removeNode(node, val) {
    if (node === null) {
      return null;
    }
    if (val < node.val) {
      node.left = this.removeNode(node.left, val);
    } else if (val > node.val) {
      node.right = this.removeNode(node.right, val);
    } else {
      if (node.left === null && node.right === null) {
        return null;
      } else if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      } else {
        let successor = this.findMinNode(node.right);
        node.val = successor.val;
        node.right = this.removeNode(node.right, successor.val);
      }
    }
    return node;
  }

  findMinNode(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    return this.checkBalance(this.root);
  }

  checkBalance(node) {
    if (!node) {
      return true;
    }
    let leftHeight = this.getHeight(node.left);
    let rightHeight = this.getHeight(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.checkBalance(node.left) && this.checkBalance(node.right);
  }
  getHeight(node) {
    if (!node) {
      return 0;
    }
    let leftHeight = this.getHeight(node.left);
    let rightHeight = this.getHeight(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }
  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {}
}

module.exports = BinarySearchTree;
