# Heapsort

Exploring the Heapsort algorithm.

## Overview

Heapsort is an algorithm that is fairly efficient on large data sets and can work without using any additional storage space.

Unlike other sorting algorithms that require additional storage or sort items in a linear way, heapsort leverages the properties of a Binary Tree to rapidly arrange items in a predefined order.

This exercise was prompted by reading excerpts from Rod Stephens' _Essential Algorithms_ (Wiley, 2013).

## About Trees

A tree is a data structure that hold value or objects within nodes that also hold references to other nodes, similar to the way a Linked List's nodes are connected. By applying techniques like comparing data values, and the properties of binary decision making, rules about where data belongs in the tree can be made.

Tree terminology that applies to a Heap:

- Root: This is the head node or array index 0 element.
- Node: An element that contains data and references to child nodes.
- Child Node: A Node that is referenced from a parent node.
- Left and Right: References to child nodes in a binary tree.
- Leaf: A node that has no child references. Left and Right are null.
- Level: The Root node is the first level. Its child nodes are on the second level, and grand-child nodes are on the third level, etc.
- Full Tree, Full Node: A full Tree is a Tree where every node has either zero or two child nodes. A node with zero children and a node with both children are considered Full.
- Complete Tree: A tree with every level full except possibly the last, where all child nodes are as far left as possible.

It is helpful to understand these terms to get to know how to traverse and manipulate a Heap.

## How A Heap Is Arranged

Although a Heap can be viewed through the lens of a Tree, it is actually a specially-sorted array. While traversing the array, related nodes (and therefore related data) can easily be found using simple math.

- The Root node is always the element at index 0.
- Root node children are in the next indices, 1 and 2, respectively.
- Grand-child nodes would be stored in indices 3 through 6.
- Finding the index of a child is simple: Take the Parent Node index, multiply it by 2 (it's a binary tree), and then add 1 for left child index, or 2 for right child index.

```text
Idx:  0   1   2   3   4
      |_______|
```

The above depiction shows lines connecting the Root node to its right child, but shown as it would look within an array (linearly).

Here is the same idea, but in a Binary Tree format and the link between Root and its right child are highlighted with `\\`.

```text
        root
       /   \\
    left   right
```

Generally speaking, a heap is organized so that the Root node value is the `largest` (whatever that means for the dataset being stored), although it could just as easily be the smallest. Sticking with the largest value at root, the heap rule is:

> Every child item value is smaller than its parent value.

If a function can traverse a binary tree and at every test of parent and child(ren) nodes this rule is true, it is a Heap.

Using the idea of turning a tree on its side and squashing it into a linear structure allows an algorithm like heapsort to more rapidly organize input values and arrange output values in a sorted order.

## What Heapsort Does

Heapsort operates on an array of data in two primary functions:

1. Organizes items in the array from Root to whatever end index as a Heap. In this case the Root node will contain the largest value, following the heap rule stated above.
2. Rearranges the array by swapping the Root node with the last index element in the array, and then updating the "end of array index" so that the array is 1 element shorter than before. When control is returned to the previous function, it will only operate on the portion of the array that does _not_ include the "largest value" from last time it executed.

These functions are executed recursively or in a controlled iterating structure until the zeroeth index element is about to compare with itself. By the Heap rule, a lonely (childless) node is a heap. Also by Heap rule, all nodes with larger indices in the remaining array are of greater value. The (sorted) array is returned to the caller.

### Depiction In Words And Arrays

If an input like `[0, 5, 10, 15, 20, 25]` is provided to the `heapsort()` function, it will mutate the array like so:

1. Into a heap datastructure so it will look like this: `[25, 20, 0, 15, 5, 10]`
2. Swap the Root item and last _included_ item in array: `[10, 20, 0, 15, 5,  25]`
3. Evaluate all but the last 1 items and convert back into a heap: `[20, 10, 15, 5, 0, 25]`
4. Swap the Root item and the last _included_ item in current array: `[10, 15, 5, 0,  20, 25]`
5. Evaluate all but the last _2_ items and convert back into a heap: `[15, 10, 5, 0, 20, 25]`
6. Repeat the two steps again: `[0, 10, 5, 15, 20, 25]` :arrow_right: `[10, 0, 5,  15, 20, 25]`
7. And again: `[5, 0, 10, 15, 20, 25]` :arrow_right: `[5, 0,  10, 15, 20, 25]`
8. One more time: `[0, 5, 10, 15, 20, 25]` :arrow_right: `[0, 5, 10, 15, 20, 25]`
9. The algorithm detects the first element of the array has no children and dubs it a Heap, breaks out of iterating steps, and returns the caller's array to them, sorted as display at the end of step 8.

## About This Code

Project layout:

- `heapsorter.js`: A JavaScript `Class` module with static and non-static methods.
- `__tests__`: Directory contains Jest tests.

Usage:

0. Recommend using Linux or WSL-2.
1. Clone this repo.
2. Install VSCode.
3. Install/upgrade NPM to the latest LTS.
4. `npm install` to install Jest.
5. `npm test` to run Jest tests.

Recommended: Install VS Code extensions 'DevContainers' by Microsoft and 'Jest' by Orta.

## Analysis

According to _Stephens_ Heapsort is relatively efficient at O(N log(N)) in time, uses O(1) space, and is well adapted to sorting very large collections with unknown distributions. It is not considered to be a _stable_ sorting algorithm.

Note: Both of the primary functions are the big time consumers, and since both of them operate at O(n log(n)) the entire algorithm is considered the same.

## Why I Did This

I have learned that learning requires interaction. Attempting to understand these concepts simply by reading (and enjoying) a book or article about algorithms just isn't enough.

Yes, I used JavaScript and Jest for this exercise. While I generally go to C# for coding exercises like this one, it is important (to me) to learn both languages:

- Generally speaking, coding languages follow many similar patterns. Learning these patterns in multiple languages helps build experience and capability.
- Frameworks like .NET Blazor allow integrating JavaScript to handle specialized or custom requirements (and I like working with Blazor).
- There will (for the foreseeable future) be a need for web apps and online forms, where JavaScript sprinkles enables functionality.
- JavaScript is a pretty quick prototyping language. I've built a few project prototypes using JavaScript, and later built a working version using something else (C# or Java, generally).

Practicing JS and frameworks like Jest provide me with opportunities to further develop my software design and develop skills.

## References

- [Essential Algorithms: A Practical Approach to Computer Algorithms, Stephens, Rod, 2013](https://booksupport.wiley.com)
- [Wikipedia: heapsort](https://en.wikipedia.org/wiki/Heapsort)
- [Big-O Cheatsheet](https://www.bigocheatsheet.com/)
