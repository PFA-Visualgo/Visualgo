# ref F.1.8

import unittest
from visualgo.types import Node


class TestNode(unittest.TestCase):
    def test_creation(self):
        """
        Tests the instanciations of nodes :
        -empty node
        -node with child
        -node with a node as value
        -node with value without child
        """
        node = Node()
        node2 = Node(3, node)
        node3 = Node(node, node2)
        node4 = Node([13])

        self.assertEqual(node.content(), None)
        self.assertEqual(node.next(), None)

        self.assertEqual(node2.content(), 3)
        self.assertEqual(node2.next(), node)

        self.assertEqual(node3.content(), node)
        self.assertEqual(node3.next(), node2)
        self.assertEqual(node3.next().next(), node)

        self.assertEqual(node4.content(), [13])

    def test_set(self):
        """
        Tests the assignment to a value of a node :
        -Different types of value
        -Stability of children
        """
        node = Node()
        self.assertEqual(node.content(), None)
        node.set_content(4)
        self.assertEqual(node.content(), 4)
        node2 = Node(9)
        self.assertEqual(node2.next(), None)
        node2.set_next(node)
        self.assertEqual(node2.next(), node)
        node.set_content(90)
        self.assertEqual(node.content(), 90)

    def test_has_next(self):
        """
        Tests the has_next method
        """
        node = Node()
        self.assertEqual(node.has_next(), False)

        node2 = Node("h", node)
        self.assertEqual(node2.has_next(), True)


if __name__ == '__main__':
    unittest.main()
