const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data; // node value
    this.left = null; // left node child reference
    this.right = null; // right node child reference
  }
}

class BinarySearchTree {
  constructor() {
    this.root1 = null;
  }

  root() {
    return this.root1;
  }

  add(data) {
    let newNode = new Node(data);

    if (this.root1 === null) {
      this.root1 = new Node(data);
    } else {
      this.insertNode(this.root1, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.search2(this.root1, data);
  }

  search2(node, data) {
    if (node === null) {
      return false;
    } else if (data < node.data) {
      return this.search2(node.left, data);
    } else if (data > node.data) {
      return this.search2(node.right, data);
    } else {
      return true;
    }
  }

  find(data) {
    return this.search(this.root1, data);
  }

  search(node, data) {
    if (node === null) {
      return null;
    } else if (data < node.data) {
      return this.search(node.left, data);
    } else if (data > node.data) {
      return this.search(node.right, data);
    } else {
      return node;
    }
  }

  remove(data) {
    this.root1 = this.removeNode(this.root1, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
      // если данные, которые нужно удалить, меньше, чем данные корня, переходим к левому поддереву
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
      // если данные, которые нужно удалить, больше, чем данные корня, переходим к правому поддереву
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
      // если данные такие как данные корня, удаляем узел
    } else {
      // удаляем узел без потомков (листовой узел (leaf) или крайний)
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // удаляем узел с одним потомком
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // удаляем узел с двумя потомками
      // minNode правого поддерева хранится в новом узле
      let newNode = this.findMinNode(node.right);
      node.data = newNode.data;
      node.right = this.removeNode(node.right, newNode.data);
      return node;
    }
  }

  min() {
    if (!this.root1) {
      return null;
    }
    const node = this.findMinNode(this.root1);
    return node.data;
  }

  findMinNode(node) {
    if (node.left === null) return node;
    else return this.findMinNode(node.left);
  }

  max() {
    if (!this.root1) {
      return null;
    }
    const node = this.findMaxNode(this.root1);
    return node.data;
  }

  findMaxNode(node) {
    if (node.right === null) {
      return node;
    } else {
      return this.findMaxNode(node.right);
    }
  }
}

module.exports = {
  BinarySearchTree,
};
