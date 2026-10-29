const problems = [
  // ─── ARRAYS ──────────────────────────────────────────────────────────────
  {
    title: "Two Sum",
    slug: "two-sum",
    difficulty: "Easy",
    topic: "Arrays",
    tags: ["Array", "Hash Map"],
    companies: ["Google", "Amazon", "Microsoft", "Adobe", "Flipkart"],
    acceptanceRate: 49.1,
    frequency: 95,
    isProblemOfTheDay: true,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9",  output: "[0,1]",   explanation: "nums[0] + nums[1] = 2 + 7 = 9." },
      { input: "nums = [3,2,4], target = 6",       output: "[1,2]",   explanation: "nums[1] + nums[2] = 2 + 4 = 6." },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    hints: ["Try using a hash map to store values you've seen.", "For each element, check if target - element exists in your map."],
    testCases: [
      { input: "4\n2 7 11 15\n9",   expectedOutput: "[0,1]",  isHidden: false },
      { input: "3\n3 2 4\n6",       expectedOutput: "[1,2]",  isHidden: false },
      { input: "2\n3 3\n6",         expectedOutput: "[0,1]",  isHidden: true  },
      { input: "5\n1 2 3 4 5\n9",   expectedOutput: "[3,4]",  isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    followUp: "Can you solve it in O(N) time and O(1) space? (Not possible with unsorted array — but what if the array was sorted?)",
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
      python: `class Solution:
    def twoSum(self, nums, target):
        `,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      javascript: `var twoSum = function(nums, target) {
    
};`,
    },
  },

  {
    title: "Best Time to Buy and Sell Stock",
    slug: "best-time-to-buy-and-sell-stock",
    difficulty: "Easy",
    topic: "Arrays",
    tags: ["Array", "Greedy", "Sliding Window"],
    companies: ["Amazon", "Microsoft", "Goldman Sachs", "Paytm", "Walmart"],
    acceptanceRate: 54.4,
    frequency: 90,
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i-th\` day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve. If you cannot achieve any profit, return \`0\`.`,
    examples: [
      { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price=1), sell on day 5 (price=6). Profit = 6-1 = 5." },
      { input: "prices = [7,6,4,3,1]",   output: "0", explanation: "No transactions done." },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    hints: ["Track the minimum price seen so far.", "At each step, check if selling now gives maximum profit."],
    testCases: [
      { input: "6\n7 1 5 3 6 4", expectedOutput: "5", isHidden: false },
      { input: "5\n7 6 4 3 1", expectedOutput: "0", isHidden: false },
      { input: "2\n1 2", expectedOutput: "1", isHidden: true  },
      { input: "4\n2 4 1 7", expectedOutput: "6", isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "What if you could buy and sell multiple times? (Leetcode 122)",
    starterCode: {
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`,
      python: `class Solution:
    def maxProfit(self, prices):
        `,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        
    }
}`,
      javascript: `var maxProfit = function(prices) {
    
};`,
    },
  },

  {
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    difficulty: "Medium",
    topic: "Arrays",
    tags: ["Array", "Dynamic Programming", "Kadane's Algorithm"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe", "Accenture"],
    acceptanceRate: 50.7,
    frequency: 88,
    description: `Given an integer array \`nums\`, find the subarray with the largest sum and return its sum.`,
    examples: [
      { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum = 6." },
      { input: "nums = [1]",output: "1"  },
      { input: "nums = [5,4,-1,7,8]", output: "23" },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    hints: ["Think about Kadane's algorithm.", "At each index, decide: extend the current subarray or start fresh?"],
    testCases: [
      { input: "9\n-2 1 -3 4 -1 2 1 -5 4", expectedOutput: "6",  isHidden: false },
      { input: "1\n1", expectedOutput: "1",  isHidden: false },
      { input: "1\n-1", expectedOutput: "-1", isHidden: true  },
      { input: "5\n5 4 -1 7 8", expectedOutput: "23", isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "If you need to return the actual subarray (not just the sum), how would you modify the algorithm?",
    starterCode: {
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        
    }
};`,
      python: `class Solution:
    def maxSubArray(self, nums):
        `,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        
    }
}`,
      javascript: `var maxSubArray = function(nums) {
    
};`,
    },
  },

  {
    title: "3Sum",
    slug: "3sum",
    difficulty: "Medium",
    topic: "Arrays",
    tags: ["Array", "Two Pointers", "Sorting"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "TCS"],
    acceptanceRate: 34.1,
    frequency: 85,
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.\n\nThe solution set must not contain duplicate triplets.`,
    examples: [
      { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The distinct triplets are [-1,-1,2] and [-1,0,1]." },
      { input: "nums = [0,1,1]", output: "[]"  },
      { input: "nums = [0,0,0]", output: "[[0,0,0]]" },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    hints: ["Sort the array first.", "Fix one element and use two pointers for the remaining two.", "Skip duplicates carefully."],
    testCases: [
      { input: "6\n-1 0 1 2 -1 -4", expectedOutput: "[[-1,-1,2],[-1,0,1]]", isHidden: false },
      { input: "3\n0 0 0", expectedOutput: "[[0,0,0]]", isHidden: false },
      { input: "3\n0 1 1", expectedOutput: "[]", isHidden: true  },
    ],
    timeComplexity: "O(N²)",
    spaceComplexity: "O(1)",
    followUp: "Can you solve 4Sum using the same approach?",
    starterCode: {
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        
    }
};`,
      python: `class Solution:
    def threeSum(self, nums):
        `,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}`,
      javascript: `var threeSum = function(nums) {
    
};`,
    },
  },

  {
    title: "Trapping Rain Water",
    slug: "trapping-rain-water",
    difficulty: "Hard",
    topic: "Arrays",
    tags: ["Array", "Two Pointers", "Stack", "Dynamic Programming"],
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs", "Uber"],
    acceptanceRate: 60.1,
    frequency: 82,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6", explanation: "6 units of rainwater are trapped." },
      { input: "height = [4,2,0,3,2,5]",              output: "9" },
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    hints: ["For each bar, water trapped = min(maxLeft, maxRight) - height[i].", "Precompute left and right maximums, or use two pointers to avoid extra space."],
    testCases: [
      { input: "12\n0 1 0 2 1 0 1 3 2 1 2 1", expectedOutput: "6", isHidden: false },
      { input: "6\n4 2 0 3 2 5",              expectedOutput: "9", isHidden: false },
      { input: "5\n3 0 2 0 4",                expectedOutput: "7", isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "Can you solve it with O(1) space using two pointers?",
    starterCode: {
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        
    }
};`,
      python: `class Solution:
    def trap(self, height):
        `,
      java: `class Solution {
    public int trap(int[] height) {
        
    }
}`,
      javascript: `var trap = function(height) {
    
};`,
    },
  },

  // ─── STRINGS ─────────────────────────────────────────────────────────────

  {
    title: "Valid Anagram",
    slug: "valid-anagram",
    difficulty: "Easy",
    topic: "Strings",
    tags: ["String", "Hash Map", "Sorting"],
    companies: ["Amazon", "Microsoft", "Adobe", "Zoho"],
    acceptanceRate: 63.7,
    frequency: 75,
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.\n\nAn anagram is a word or phrase formed by rearranging the letters of a different word, using all the original letters exactly once.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true"  },
      { input: 's = "rat", t = "car"',         output: "false" },
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    hints: ["Count character frequencies in both strings.", "Or sort both strings and compare."],
    testCases: [
      { input: "anagram\nnagaram", expectedOutput: "true",  isHidden: false },
      { input: "rat\ncar",         expectedOutput: "false", isHidden: false },
      { input: "a\na",             expectedOutput: "true",  isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "What if the inputs contain Unicode characters?",
    starterCode: {
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        
    }
};`,
      python: `class Solution:
    def isAnagram(self, s, t):
        `,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        
    }
}`,
      javascript: `var isAnagram = function(s, t) {
    
};`,
    },
  },

  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating-characters",
    difficulty: "Medium",
    topic: "Strings",
    tags: ["String", "Sliding Window", "Hash Map"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Wipro"],
    acceptanceRate: 33.8,
    frequency: 92,
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc" with length 3.' },
      { input: 's = "bbbbb"',    output: "1", explanation: 'The answer is "b" with length 1.'   },
      { input: 's = "pwwkew"',   output: "3", explanation: 'The answer is "wke" with length 3.' },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    hints: ["Use a sliding window with a set to track characters.", "Move the left pointer when a duplicate is found."],
    testCases: [
      { input: "abcabcbb", expectedOutput: "3", isHidden: false },
      { input: "bbbbb",    expectedOutput: "1", isHidden: false },
      { input: "pwwkew",   expectedOutput: "3", isHidden: false },
      { input: "",         expectedOutput: "0", isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(min(N, M))",
    followUp: "What if you need to return the actual substring, not just its length?",
    starterCode: {
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        
    }
};`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s):
        `,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}`,
      javascript: `var lengthOfLongestSubstring = function(s) {
    
};`,
    },
  },

  {
    title: "Longest Palindromic Substring",
    slug: "longest-palindromic-substring",
    difficulty: "Medium",
    topic: "Strings",
    tags: ["String", "Dynamic Programming", "Expand Around Center"],
    companies: ["Amazon", "Microsoft", "Google", "Infosys"],
    acceptanceRate: 32.9,
    frequency: 78,
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.`,
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"',  output: '"bb"'  },
    ],
    constraints: ["1 <= s.length <= 1000", "s consists of only digits and English letters."],
    hints: ["Expand around the center for each character.", "Handle both odd-length and even-length palindromes."],
    testCases: [
      { input: "babad", expectedOutput: '"bab"', isHidden: false },
      { input: "cbbd",  expectedOutput: '"bb"',  isHidden: false },
      { input: "a",     expectedOutput: '"a"',   isHidden: true  },
    ],
    timeComplexity: "O(N²)",
    spaceComplexity: "O(1)",
    followUp: "Can you solve it in O(N) using Manacher's algorithm?",
    starterCode: {
      cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        
    }
};`,
      python: `class Solution:
    def longestPalindrome(self, s):
        `,
      java: `class Solution {
    public String longestPalindrome(String s) {
        
    }
}`,
      javascript: `var longestPalindrome = function(s) {
    
};`,
    },
  },

  // ─── LINKED LIST ─────────────────────────────────────────────────────────

  {
    title: "Reverse Linked List",
    slug: "reverse-linked-list",
    difficulty: "Easy",
    topic: "Linked List",
    tags: ["Linked List", "Recursion", "Iteration"],
    companies: ["Amazon", "Microsoft", "Adobe", "Flipkart", "TCS"],
    acceptanceRate: 73.9,
    frequency: 88,
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
      { input: "head = [1,2]",       output: "[2,1]"        },
      { input: "head = []",           output: "[]"           },
    ],
    constraints: ["The number of nodes in the list is in the range [0, 5000].", "-5000 <= Node.val <= 5000"],
    hints: ["Try the iterative approach with three pointers: prev, curr, next.", "Or solve recursively — reverse the rest and attach head at the end."],
    testCases: [
      { input: "5\n1 2 3 4 5", expectedOutput: "[5,4,3,2,1]", isHidden: false },
      { input: "2\n1 2",        expectedOutput: "[2,1]",        isHidden: false },
      { input: "0",              expectedOutput: "[]",           isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "Can you solve it both iteratively and recursively?",
    starterCode: {
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def reverseList(self, head):
        `,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        
    }
}`,
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var reverseList = function(head) {
    
};`,
    },
  },

  {
    title: "Merge Two Sorted Lists",
    slug: "merge-two-sorted-lists",
    difficulty: "Easy",
    topic: "Linked List",
    tags: ["Linked List", "Recursion"],
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
    acceptanceRate: 62.5,
    frequency: 84,
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
      { input: "list1 = [], list2 = []",             output: "[]"            },
      { input: "list1 = [], list2 = [0]",            output: "[0]"           },
    ],
    constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both lists are sorted in non-decreasing order."],
    hints: ["Use a dummy head node to simplify edge cases.", "Compare heads of both lists and attach the smaller one."],
    testCases: [
      { input: "3\n1 2 4\n3\n1 3 4", expectedOutput: "[1,1,2,3,4,4]", isHidden: false },
      { input: "0\n0",                expectedOutput: "[]",             isHidden: false },
      { input: "0\n1\n0",             expectedOutput: "[0]",            isHidden: true  },
    ],
    timeComplexity: "O(N+M)",
    spaceComplexity: "O(1)",
    followUp: "How would you merge K sorted linked lists?",
    starterCode: {
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        
    }
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def mergeTwoLists(self, list1, list2):
        `,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        
    }
}`,
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var mergeTwoLists = function(list1, list2) {
    
};`,
    },
  },

  {
    title: "Detect Cycle in Linked List",
    slug: "linked-list-cycle",
    difficulty: "Easy",
    topic: "Linked List",
    tags: ["Linked List", "Two Pointers", "Floyd's Algorithm"],
    companies: ["Amazon", "Microsoft", "Oracle", "Paytm"],
    acceptanceRate: 46.3,
    frequency: 82,
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.\n\nReturn \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.`,
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true",  explanation: "Tail connects to node at index 1." },
      { input: "head = [1,2], pos = 0",       output: "true",  explanation: "Tail connects to node at index 0." },
      { input: "head = [1], pos = -1",         output: "false", explanation: "No cycle in the list."            },
    ],
    constraints: ["The number of nodes is in range [0, 10^4].", "-10^5 <= Node.val <= 10^5"],
    hints: ["Floyd's Cycle Detection: use a slow and fast pointer.", "If fast ever equals slow, there's a cycle."],
    testCases: [
      { input: "4\n3 2 0 -4\n1",  expectedOutput: "true",  isHidden: false },
      { input: "2\n1 2\n0",       expectedOutput: "true",  isHidden: false },
      { input: "1\n1\n-1",        expectedOutput: "false", isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "Can you find the node where the cycle begins?",
    starterCode: {
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    bool hasCycle(ListNode *head) {
        
    }
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def hasCycle(self, head):
        `,
      java: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        
    }
}`,
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
var hasCycle = function(head) {
    
};`,
    },
  },

  {
    title: "Remove Nth Node From End of List",
    slug: "remove-nth-node-from-end-of-list",
    difficulty: "Medium",
    topic: "Linked List",
    tags: ["Linked List", "Two Pointers"],
    companies: ["Amazon", "Microsoft", "Adobe", "Infosys"],
    acceptanceRate: 42.6,
    frequency: 75,
    description: `Given the head of a linked list, remove the \`n-th\` node from the end of the list and return its head.`,
    examples: [
      { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
      { input: "head = [1], n = 1",          output: "[]"         },
      { input: "head = [1,2], n = 1",        output: "[1]"        },
    ],
    constraints: ["The number of nodes is sz.", "1 <= sz <= 30", "0 <= Node.val <= 100", "1 <= n <= sz"],
    hints: ["Use two pointers separated by N nodes.", "When the fast pointer reaches the end, slow points to the node before the one to remove."],
    testCases: [
      { input: "5\n1 2 3 4 5\n2", expectedOutput: "[1,2,3,5]", isHidden: false },
      { input: "1\n1\n1",          expectedOutput: "[]",         isHidden: false },
      { input: "2\n1 2\n1",        expectedOutput: "[1]",        isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "Can you do it in one pass?",
    starterCode: {
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        
    }
};`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def removeNthFromEnd(self, head, n):
        `,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        
    }
}`,
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
var removeNthFromEnd = function(head, n) {
    
};`,
    },
  },

  // ─── STACK / QUEUE ───────────────────────────────────────────────────────

  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    difficulty: "Easy",
    topic: "Stack",
    tags: ["String", "Stack"],
    companies: ["Amazon", "Google", "Microsoft", "Adobe", "Zoho"],
    acceptanceRate: 40.3,
    frequency: 90,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nA string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.`,
    examples: [
      { input: 's = "()"',    output: "true"  },
      { input: 's = "()[]{}"',output: "true"  },
      { input: 's = "(]"',    output: "false" },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    hints: ["Push opening brackets onto a stack.", "For closing brackets, check if the top of the stack matches."],
    testCases: [
      { input: "()",     expectedOutput: "true",  isHidden: false },
      { input: "()[]{}", expectedOutput: "true",  isHidden: false },
      { input: "(]",     expectedOutput: "false", isHidden: false },
      { input: "([)]",   expectedOutput: "false", isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    followUp: "What if you needed to also count the minimum number of additions to make it valid?",
    starterCode: {
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
      python: `class Solution:
    def isValid(self, s):
        `,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
      javascript: `var isValid = function(s) {
    
};`,
    },
  },

  {
    title: "Min Stack",
    slug: "min-stack",
    difficulty: "Medium",
    topic: "Stack",
    tags: ["Stack", "Design"],
    companies: ["Amazon", "Bloomberg", "Google", "Uber"],
    acceptanceRate: 52.2,
    frequency: 78,
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the \`MinStack\` class:\n- \`push(val)\` — pushes the element onto the stack.\n- \`pop()\` — removes the element on the top.\n- \`top()\` — gets the top element.\n- \`getMin()\` — retrieves the minimum element in the stack.`,
    examples: [
      {
        input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        output: '[null,null,null,null,-3,null,0,-2]',
      },
    ],
    constraints: ["-2^31 <= val <= 2^31 - 1", "pop, top and getMin operations will always be called on non-empty stacks."],
    hints: ["Maintain a second auxiliary stack that tracks the minimum at each level.", "Push to the min stack only when the new value is <= current minimum."],
    testCases: [
      { input: "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", expectedOutput: '-3\n0\n-2', isHidden: false },
    ],
    timeComplexity: "O(1) all ops",
    spaceComplexity: "O(N)",
    followUp: "Can you do it with just one stack?",
    starterCode: {
      cpp: `class MinStack {
public:
    MinStack() {
        
    }
    
    void push(int val) {
        
    }
    
    void pop() {
        
    }
    
    int top() {
        
    }
    
    int getMin() {
        
    }
};`,
      python: `class MinStack:

    def __init__(self):
        

    def push(self, val):
        

    def pop(self):
        

    def top(self):
        

    def getMin(self):
        `,
      java: `class MinStack {

    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        
    }
    
    public int getMin() {
        
    }
}`,
      javascript: `var MinStack = function() {
    
};

MinStack.prototype.push = function(val) {
    
};

MinStack.prototype.pop = function() {
    
};

MinStack.prototype.top = function() {
    
};

MinStack.prototype.getMin = function() {
    
};`,
    },
  },

  {
    title: "Next Greater Element I",
    slug: "next-greater-element-i",
    difficulty: "Easy",
    topic: "Stack",
    tags: ["Array", "Stack", "Monotonic Stack"],
    companies: ["Amazon", "Walmart", "Adobe"],
    acceptanceRate: 70.5,
    frequency: 70,
    description: `The next greater element of some element \`x\` in an array is the first greater element that is to the right of \`x\` in the same array.\n\nYou are given two distinct 0-indexed integer arrays \`nums1\` and \`nums2\` where \`nums1\` is a subset of \`nums2\`.\n\nFor each element in \`nums1\`, find the next greater element in \`nums2\`. If no greater element exists, return \`-1\`.`,
    examples: [
      { input: "nums1 = [4,1,2], nums2 = [1,3,4,2]", output: "[-1,3,-1]" },
      { input: "nums1 = [2,4], nums2 = [1,2,3,4]",   output: "[3,-1]"    },
    ],
    constraints: ["1 <= nums1.length <= nums2.length <= 1000", "All integers are unique."],
    hints: ["Use a monotonic decreasing stack on nums2.", "Store results in a hash map, then look up for each element in nums1."],
    testCases: [
      { input: "3\n4 1 2\n4\n1 3 4 2", expectedOutput: "[-1,3,-1]", isHidden: false },
      { input: "2\n2 4\n4\n1 2 3 4",   expectedOutput: "[3,-1]",    isHidden: false },
    ],
    timeComplexity: "O(N+M)",
    spaceComplexity: "O(N)",
    followUp: "How would you solve Next Greater Element II where the array is circular?",
    starterCode: {
      cpp: `class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        
    }
};`,
      python: `class Solution:
    def nextGreaterElement(self, nums1, nums2):
        `,
      java: `class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        
    }
}`,
      javascript: `var nextGreaterElement = function(nums1, nums2) {
    
};`,
    },
  },

  // ─── TREES ───────────────────────────────────────────────────────────────

  {
    title: "Maximum Depth of Binary Tree",
    slug: "maximum-depth-of-binary-tree",
    difficulty: "Easy",
    topic: "Trees",
    tags: ["Tree", "DFS", "BFS", "Recursion"],
    companies: ["Amazon", "Google", "Microsoft", "Flipkart"],
    acceptanceRate: 74.5,
    frequency: 85,
    description: `Given the \`root\` of a binary tree, return its maximum depth.\n\nThe maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3" },
      { input: "root = [1,null,2]",               output: "2" },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
    hints: ["Recursively, depth = 1 + max(depth(left), depth(right)).", "Or use BFS and count levels."],
    testCases: [
      { input: "7\n3 9 20 null null 15 7", expectedOutput: "3", isHidden: false },
      { input: "3\n1 null 2",               expectedOutput: "2", isHidden: false },
      { input: "0",                          expectedOutput: "0", isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    followUp: "How would you find the minimum depth?",
    starterCode: {
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    }
};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root):
        `,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        
    }
}`,
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var maxDepth = function(root) {
    
};`,
    },
  },

  {
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order-traversal",
    difficulty: "Medium",
    topic: "Trees",
    tags: ["Tree", "BFS", "Queue"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe"],
    acceptanceRate: 65.4,
    frequency: 82,
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
      { input: "root = [1]",                       output: "[[1]]"               },
      { input: "root = []",                         output: "[]"                  },
    ],
    constraints: ["The number of nodes in the tree is in [0, 2000].", "-1000 <= Node.val <= 1000"],
    hints: ["Use a queue. At each level, process all nodes currently in the queue.", "Track the size of the queue at the start of each level."],
    testCases: [
      { input: "7\n3 9 20 null null 15 7", expectedOutput: "[[3],[9,20],[15,7]]", isHidden: false },
      { input: "1\n1",                      expectedOutput: "[[1]]",               isHidden: false },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    followUp: "Return the level order traversal in zigzag (alternating left-to-right and right-to-left).",
    starterCode: {
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        
    }
};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def levelOrder(self, root):
        `,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        
    }
}`,
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var levelOrder = function(root) {
    
};`,
    },
  },

  {
    title: "Lowest Common Ancestor of a Binary Search Tree",
    slug: "lowest-common-ancestor-bst",
    difficulty: "Medium",
    topic: "Trees",
    tags: ["Tree", "BST", "DFS", "Recursion"],
    companies: ["Amazon", "Microsoft", "Facebook", "Google"],
    acceptanceRate: 63.8,
    frequency: 79,
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nThe LCA is the lowest node that has both \`p\` and \`q\` as descendants.`,
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6" },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2" },
    ],
    constraints: ["The number of nodes is in [2, 10^5].", "-10^9 <= Node.val <= 10^9", "All Node.val are unique."],
    hints: ["Use BST properties: if both p and q are less than root, go left; if both greater, go right; else root is the LCA."],
    testCases: [
      { input: "7\n6 2 8 0 4 7 9\n2\n8", expectedOutput: "6", isHidden: false },
      { input: "7\n6 2 8 0 4 7 9\n2\n4", expectedOutput: "2", isHidden: false },
    ],
    timeComplexity: "O(H)",
    spaceComplexity: "O(1)",
    followUp: "How would you solve it for a general binary tree (not a BST)?",
    starterCode: {
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        
    }
};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None
class Solution:
    def lowestCommonAncestor(self, root, p, q):
        `,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        
    }
}`,
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
var lowestCommonAncestor = function(root, p, q) {
    
};`,
    },
  },

  {
    title: "Validate Binary Search Tree",
    slug: "validate-binary-search-tree",
    difficulty: "Medium",
    topic: "Trees",
    tags: ["Tree", "DFS", "BST", "Recursion"],
    companies: ["Amazon", "Bloomberg", "Microsoft", "Walmart"],
    acceptanceRate: 32.4,
    frequency: 77,
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST: the left subtree contains only nodes with keys less than the root; the right subtree contains only nodes with keys greater than the root; both subtrees must also be valid BSTs.`,
    examples: [
      { input: "root = [2,1,3]",         output: "true"  },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "Root is 5 but right child is 4 which is less." },
    ],
    constraints: ["The number of nodes is in [1, 10^4].", "-2^31 <= Node.val <= 2^31 - 1"],
    hints: ["Pass min and max bounds down recursively.", "Each node's value must be strictly within (min, max)."],
    testCases: [
      { input: "3\n2 1 3",               expectedOutput: "true",  isHidden: false },
      { input: "7\n5 1 4 null null 3 6", expectedOutput: "false", isHidden: false },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    followUp: "Can you solve it iteratively using inorder traversal?",
    starterCode: {
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    bool isValidBST(TreeNode* root) {
        
    }
};`,
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isValidBST(self, root):
        `,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean isValidBST(TreeNode root) {
        
    }
}`,
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var isValidBST = function(root) {
    
};`,
    },
  },

  // ─── GRAPHS ──────────────────────────────────────────────────────────────

  {
    title: "Number of Islands",
    slug: "number-of-islands",
    difficulty: "Medium",
    topic: "Graphs",
    tags: ["Array", "DFS", "BFS", "Union Find", "Matrix"],
    companies: ["Amazon", "Google", "Microsoft", "Facebook", "Uber"],
    acceptanceRate: 57.5,
    frequency: 90,
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.`,
    examples: [
      { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
      { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    hints: ["Do DFS from each '1' you haven't visited yet.", "Mark cells as visited by setting them to '0'."],
    testCases: [
      { input: "3 3\n111\n010\n101", expectedOutput: "3", isHidden: false },
      { input: "2 2\n11\n11",                       expectedOutput: "1", isHidden: false },
    ],
    timeComplexity: "O(M×N)",
    spaceComplexity: "O(M×N)",
    followUp: "How would you solve it using Union Find?",
    starterCode: {
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        
    }
};`,
      python: `class Solution:
    def numIslands(self, grid):
        `,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        
    }
}`,
      javascript: `var numIslands = function(grid) {
    
};`,
    },
  },

  {
    title: "Course Schedule",
    slug: "course-schedule",
    difficulty: "Medium",
    topic: "Graphs",
    tags: ["DFS", "BFS", "Topological Sort", "Graph", "Cycle Detection"],
    companies: ["Amazon", "Microsoft", "Google", "Facebook"],
    acceptanceRate: 45.9,
    frequency: 80,
    description: `There are \`numCourses\` courses labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a, b]\` indicates you must take course \`b\` first if you want to take course \`a\`.\n\nReturn \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]",      output: "true",  explanation: "Take 0 first, then 1." },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",output: "false", explanation: "Cycle: 0 depends on 1 and 1 depends on 0." },
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    hints: ["Model this as cycle detection in a directed graph.", "Use DFS with 3 states: unvisited, visiting, visited."],
    testCases: [
      { input: "2\n1\n1 0",       expectedOutput: "true",  isHidden: false },
      { input: "2\n2\n1 0\n0 1", expectedOutput: "false", isHidden: false },
    ],
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V+E)",
    followUp: "If it's possible, return the actual order of courses to take. (Course Schedule II)",
    starterCode: {
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        
    }
};`,
      python: `class Solution:
    def canFinish(self, numCourses, prerequisites):
        `,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        
    }
}`,
      javascript: `var canFinish = function(numCourses, prerequisites) {
    
};`,
    },
  },

  // ─── DYNAMIC PROGRAMMING ─────────────────────────────────────────────────

  {
    title: "Climbing Stairs",
    slug: "climbing-stairs",
    difficulty: "Easy",
    topic: "Dynamic Programming",
    tags: ["Math", "Dynamic Programming", "Memoization"],
    companies: ["Amazon", "Microsoft", "Google", "Adobe", "Infosys"],
    acceptanceRate: 51.7,
    frequency: 86,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: "n = 2", output: "2", explanation: "1+1 or 2." },
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, or 2+1." },
    ],
    constraints: ["1 <= n <= 45"],
    hints: ["f(n) = f(n-1) + f(n-2). This is Fibonacci.", "Use bottom-up DP with just two variables."],
    testCases: [
      { input: "2", expectedOutput: "2", isHidden: false },
      { input: "3", expectedOutput: "3", isHidden: false },
      { input: "10",expectedOutput: "89",isHidden: true  },
    ],
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    followUp: "What if you could take 1, 2, or 3 steps at a time?",
    starterCode: {
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
      python: `class Solution:
    def climbStairs(self, n):
        `,
      java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`,
      javascript: `var climbStairs = function(n) {
    
};`,
    },
  },

  {
    title: "Coin Change",
    slug: "coin-change",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    tags: ["Array", "Dynamic Programming", "BFS"],
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs", "Walmart"],
    acceptanceRate: 42.6,
    frequency: 85,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.`,
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3",  explanation: "11 = 5 + 5 + 1." },
      { input: "coins = [2], amount = 3",       output: "-1" },
      { input: "coins = [1], amount = 0",        output: "0"  },
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    hints: ["dp[i] = minimum coins to make amount i.", "For each amount, try all coins: dp[i] = min(dp[i], dp[i - coin] + 1)."],
    testCases: [
      { input: "3\n1 2 5\n11", expectedOutput: "3",  isHidden: false },
      { input: "1\n2\n3",       expectedOutput: "-1", isHidden: false },
      { input: "1\n1\n0",       expectedOutput: "0",  isHidden: true  },
    ],
    timeComplexity: "O(amount × N)",
    spaceComplexity: "O(amount)",
    followUp: "What if you needed to count the number of combinations instead of the minimum?",
    starterCode: {
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        
    }
};`,
      python: `class Solution:
    def coinChange(self, coins, amount):
        `,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        
    }
}`,
      javascript: `var coinChange = function(coins, amount) {
    
};`,
    },
  },

  {
    title: "Longest Common Subsequence",
    slug: "longest-common-subsequence",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    tags: ["String", "Dynamic Programming"],
    companies: ["Amazon", "Google", "Microsoft", "Atlassian"],
    acceptanceRate: 56.7,
    frequency: 80,
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return \`0\`.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: 'LCS is "ace".' },
      { input: 'text1 = "abc", text2 = "abc"',    output: "3"  },
      { input: 'text1 = "abc", text2 = "def"',    output: "0"  },
    ],
    constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of only lowercase English letters."],
    hints: ["dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1].", "If chars match: dp[i][j] = 1 + dp[i-1][j-1]. Else: max(dp[i-1][j], dp[i][j-1])."],
    testCases: [
      { input: "abcde\nace", expectedOutput: "3", isHidden: false },
      { input: "abc\nabc",   expectedOutput: "3", isHidden: false },
      { input: "abc\ndef",   expectedOutput: "0", isHidden: true  },
    ],
    timeComplexity: "O(M×N)",
    spaceComplexity: "O(M×N)",
    followUp: "Can you reconstruct the actual LCS string, not just its length?",
    starterCode: {
      cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        
    }
};`,
      python: `class Solution:
    def longestCommonSubsequence(self, text1, text2):
        `,
      java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        
    }
}`,
      javascript: `var longestCommonSubsequence = function(text1, text2) {
    
};`,
    },
  },

  // ─── SORTING / BINARY SEARCH ─────────────────────────────────────────────

  {
    title: "Merge Intervals",
    slug: "merge-intervals",
    difficulty: "Medium",
    topic: "Sorting",
    tags: ["Array", "Sorting"],
    companies: ["Amazon", "Google", "Facebook", "Microsoft", "Bloomberg"],
    acceptanceRate: 46.2,
    frequency: 88,
    description: `Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "[1,3] and [2,6] overlap, merge into [1,6]." },
      { input: "intervals = [[1,4],[4,5]]",                output: "[[1,5]]"                                                                            },
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"],
    hints: ["Sort intervals by start time.", "Iterate and merge if current start <= previous end."],
    testCases: [
      { input: "4\n1 3\n2 6\n8 10\n15 18", expectedOutput: "[[1,6],[8,10],[15,18]]", isHidden: false },
      { input: "2\n1 4\n4 5",                expectedOutput: "[[1,5]]",                isHidden: false },
      { input: "2\n1 4\n2 3",                expectedOutput: "[[1,4]]",                isHidden: true  },
    ],
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    followUp: "What if you were given a new interval and needed to insert it into the sorted non-overlapping list?",
    starterCode: {
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        
    }
};`,
      python: `class Solution:
    def merge(self, intervals):
        `,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        
    }
}`,
      javascript: `var merge = function(intervals) {
    
};`,
    },
  },

  {
    title: "Search in Rotated Sorted Array",
    slug: "search-in-rotated-sorted-array",
    difficulty: "Medium",
    topic: "Binary Search",
    tags: ["Array", "Binary Search"],
    companies: ["Amazon", "Microsoft", "Google", "Facebook", "Uber"],
    acceptanceRate: 39.4,
    frequency: 84,
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values). Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index.\n\nGiven the array \`nums\` and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.`,
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1"},
      { input: "nums = [1], target = 0",              output: "-1"},
    ],
    constraints: ["1 <= nums.length <= 5000", "All values are unique.", "-10^4 <= nums[i], target <= 10^4"],
    hints: ["In binary search, determine which half is sorted.", "If target is within the sorted half, search there; otherwise search the other half."],
    testCases: [
      { input: "7\n4 5 6 7 0 1 2\n0", expectedOutput: "4",  isHidden: false },
      { input: "7\n4 5 6 7 0 1 2\n3", expectedOutput: "-1", isHidden: false },
      { input: "1\n1\n0",              expectedOutput: "-1", isHidden: true  },
    ],
    timeComplexity: "O(log N)",
    spaceComplexity: "O(1)",
    followUp: "What if there are duplicates in the array?",
    starterCode: {
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`,
      python: `class Solution:
    def search(self, nums, target):
        `,
      java: `class Solution {
    public int search(int[] nums, int target) {
        
    }
}`,
      javascript: `var search = function(nums, target) {
    
};`,
    },
  },

  // ─── RECURSION / BACKTRACKING ─────────────────────────────────────────────

  {
    title: "Generate Parentheses",
    slug: "generate-parentheses",
    difficulty: "Medium",
    topic: "Recursion",
    tags: ["String", "Recursion", "Backtracking", "Dynamic Programming"],
    companies: ["Google", "Amazon", "Microsoft", "Atlassian"],
    acceptanceRate: 73.6,
    frequency: 76,
    description: `Given \`n\` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.`,
    examples: [
      { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: "n = 1", output: '["()"]' },
    ],
    constraints: ["1 <= n <= 8"],
    hints: ["Use backtracking. Track count of open and close parens used.", "Add '(' if open < n. Add ')' if close < open."],
    testCases: [
      { input: "3", expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]', isHidden: false },
      { input: "1", expectedOutput: '["()"]',                                          isHidden: false },
    ],
    timeComplexity: "O(4^N / √N)",
    spaceComplexity: "O(N)",
    followUp: "How many valid combinations are there for n pairs? (Catalan number)",
    starterCode: {
      cpp: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        
    }
};`,
      python: `class Solution:
    def generateParenthesis(self, n):
        `,
      java: `class Solution {
    public List<String> generateParenthesis(int n) {
        
    }
}`,
      javascript: `var generateParenthesis = function(n) {
    
};`,
    },
  },

  {
    title: "Subsets",
    slug: "subsets",
    difficulty: "Medium",
    topic: "Recursion",
    tags: ["Array", "Backtracking", "Bit Manipulation"],
    companies: ["Amazon", "Facebook", "Google", "Microsoft"],
    acceptanceRate: 74.4,
    frequency: 72,
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "nums = [0]",     output: "[[],[0]]"                                    },
    ],
    constraints: ["1 <= nums.length <= 10", "All elements are unique."],
    hints: ["At each index, you have two choices: include or exclude the element.", "Build recursively, or use bit masking for all 2^n combinations."],
    testCases: [
      { input: "3\n1 2 3", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", isHidden: false },
      { input: "1\n0",     expectedOutput: "[[],[0]]",                                    isHidden: false },
    ],
    timeComplexity: "O(2^N × N)",
    spaceComplexity: "O(2^N × N)",
    followUp: "How would you handle duplicates in the input array? (Subsets II)",
    starterCode: {
      cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        
    }
};`,
      python: `class Solution:
    def subsets(self, nums):
        `,
      java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        
    }
}`,
      javascript: `var subsets = function(nums) {
    
};`,
    },
  },

];

export default problems;