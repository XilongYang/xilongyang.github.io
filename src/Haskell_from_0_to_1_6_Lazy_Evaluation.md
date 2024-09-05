---
title:  从零开始的Haskell（六）——惰性求值
author: Xilong Yang
date: 2021-09-15 
---

<div class="abstract">


系列第六篇，介绍惰性求值。

经过了前几篇的折磨，是时候介绍惰性求值了。

</div>

$$toc$$

## 直接求值

在讨论惰性求值之前首先来了解一下直接求值。在直接求值方式下，参数在传入函数之前就已经计算过了，传入函数的是计算结果。考虑如下函数：

```haskell
f x y = x + 2
```

在直接求值的语言中，`f 5 (29^35792)`会先分别计算出`5`和`29^35792`的值，然后才将这两个值传入函数中进行处理。对于我们这个函数而言，这样做显然浪费了计算`29^35792`耗费的计算资源。因为我们跟本没有使用参数`y`。

那么为什么要使用直接求值呢？一个显著的好处是直接求值可以很方便的预测处理表达式的时机，对于有副作用的语言而言，比如C++中：

```cpp
f (x(), y());
```

可以确保在函数`f`调用之前已经对`x()`与`y()`函数进行了处理，比如更改全局变量的值。因此我们可以使程序的行为和我们的预期相符。

## 副作用和纯净

所谓的副作用就是指表达式计算时对该表达式之外的事物造成了影响。这里的关键是对外界事物的影响是时间敏感的。比如：

* 更改全局变量：当全局变量的值改变时可能会对其它表达式的结果造成影响。
* 在屏幕上打印内容：需要一个确定的打印顺序。
* 读取文件或网络内容：文件中的内容会影响表达式的结果。

就像我们之前看到的，惰性求值使得确定事情何时发生变得很难。因此如果引入副作用将会使得程序非常不直观。这就是Haskell没有副作用的历史原因，当时设计者想设计一门惰性求值语言，但他很快意识到只有禁止表达式产生副作用才可能实现。

但是没有副作用的语言几乎没有什么用。你能做的唯一一件事就是使用你的程序去翻译和计算表达式。你不能获取任何用户输入或是读写文件，也不能在屏幕上输出任何东西。Haskell的设计者面对的挑战是设计一种严格且规范的方式去允许一部分副作用，并且不能影响到基础语言部分的纯净。他们最终搞出来一个叫做`IO monad`的东西，这个我们之后再说。

## 惰性求值

现在我们已经知道了什么是直接求值，是时候看看惰性求值长什么样了。在惰性求值方式下，对函数参数的计算会尽可能地拖延：只有在必须用到它们的值的时候才计算它们。当向函数传递一个参数的时候，它们被整个打包（这个包称为thunk），以未计算表达式的方式传入。这过程中不作任何实际处理。

举例来说，计算`f 5 (29^35792)`时，第二个参数被简单的打包成thunk并且不做任何实际的计算，并且`f`会被立刻调用。因为`f`实际上根本没用到第二个参数，这个thunk会被GC系统直接抛弃。

## 模式匹配驱动计算

所以一个表达式什么时候才必须进行计算呢？一个关键是看它什么时候被使用，但实际上这 并不是最重要的区别。考虑下面的例子：

```haskell
f1 :: Maybe a -> [Maybe a]
f1 m = [m, m]

f2 :: Maybe a -> [a]
f2 Nothing = []
f2 Just x = [x]
```

这里的`f1`与`f2`都使用了它们的参数，但其中有很大的区别。`f1`并不在乎参数是个什么东西，只要把它整个地丢进列表里就行了。而`f2`就必须知道参数的值，来决定如何处理参数。

另一个关键是，thunk只会被计算到足够使用的程度，比如说`safeHead [3 ^ 500, 49]`会得到结果`Just (3^500)`，而不会接着计算`3 ^ 500`（属实够懒的......）。至于这个`3 ^ 500`之后会不会被计算，取决于这个thunk的使用方式。

一个方便记忆的口诀就是本节标题：**模式匹配驱动计算**。两个重点：

* 表达式仅在被模式匹配时计算。
* 表达式仅计算到足够当前模式使用的程度。

来看一个更有趣的例子，`take 3 (repeat 7)`。作为参考，`take`和`repeat`的定义如下：

```haskell
repeat a -> [a]
repeat x = x : repeat x

take :: Int -> [a] -> [a]
take n _ | n <= 0 = []
take _ [] = []
take n (x:xs) = x : take (n - 1) xs
```

来一步一步地考虑这个式子：

```haskell
take 3 (repeat 7) -- 首先对take的第一个模式进行匹配，3 <= 0为False，因此第一个模式不匹配，此时尝试匹配第二模式，这里需要知道第二个参数是不是空列表，因此我们必须展开repeat 7。但我们是惰性求值，所以先展开一步看看。
take 3 (7 : repeat 7) -- 这里已经足够看出第二个参数不是空列表了，所以不用继续展开，尝试匹配第三个模式，匹配。因此使用第三个表达式进行处理。注意（3-1）还不需要计算。
7 : take (3 - 1) (repeat 7) -- 尝试对第一个模式进行匹配，判断(3 - 1) <= 0时需要对（3 - 1）进行计算。
7 : take 2 (repeat 7) -- 2 <= 0为False，试图匹配第二个模式，过程不再赘述。
7 : take 2 (7 : repeat 7)
7 : 7 : take (2 - 1) (repeat 7)
7 : 7 : take 1 (repeat 7)
7 : 7 : take 1 (7 : repeat 7)
7 : 7 : 7 : take (1 - 1) (repeat 7)
7 : 7 : 7 : take 0 (repeat 7) -- 0 <= 0为True，匹配第一个模式。
7 : 7 : 7 : []
```

注意，虽然逻辑上一个表达示是这样步步展开的，但大多数Haskell的编译器实现会使用一些更有效率的方式进行处理，以提高性能。

## 惰性求值带来的影响

惰性求值带来了一些有趣、无处不在而又不甚明显的影响，试说明几例。 

### 纯净

正如之前所说，惰性求值特性迫使了我们选择纯净（除非你不想要程序员活了）。

### 理解空间消耗

惰性求值也有其缺点，其中之一就是很难估算程序对空间资源的消耗。考虑下例：

```haskell
-- 给出标准库foldl定义作为参考
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ z []  = z
foldl f z (x:xs) = foldl f (f z x) xs
```

来看看如何处理`foldl (+) 0 [1,2,3]`：

```haskell
foldl (+) 0 [1,2,3]
= foldl (+) (0+1) [2,3]
= foldl (+) ((0+1)+2) [3]
= foldl (+) (((0+1)+2)+3) []
= (((0+1)+2)+3)
= ((1+2)+3)
= (3+3)
= 6
```

这个式子一开始被处理为一个大的thunk`(((0+1)+2)+3)`并且没有进行实际上的运算，然后最终才由thunk计算出一个数值。这里至少存在两个问题，其一是将一个列表转换成一个类似列表的东西并没有任何价值。其二是处理这样的thunk将会消耗很多空间资源，比如在计算`1+2`时要先将`3`推入栈中。在这样的小例子中可能看不出什么消耗，但在处理大列表时这样的空间消耗是非常巨大的。

这个问题的解决方案是使用`foldl'`，它是一个更接近直接求值的`foldl`实现，因此不会构建出一个巨大的thunk：

```haskell
foldl' (+) 0 [1,2,3]
= foldl' (+) (0 + 1) [2,3]
= foldl' (+) 1 [2,3]
= foldl' (+) (1 + 2) [3]
= foldl' (+) 3 [3]
= foldl' (+) (3 + 3) []
= foldl' (+) 6 []
= 6
```

### 短路运算符

对C++和Java比较熟悉的话，一定知道其中`&&`和`||`运算符的短路现象。对于这样的直接求值语言而言，函数的参数在传入之前应该先计算。显然短路是不符合这个特性的，因此短路其实是这些语言的一个特例。

而对于Haskell，短路就显得非常自然了，比如`(&&)`函数定义如下：

```haskell
(&&) :: Bool -> Bool -> Bool
True  && x = x
False && _ = False
```

同时也有一个不短路的版本`&&!`，定义为：

```haskell
(&&!) :: Bool -> Bool -> Bool
True  &&! True  = True
True  &&! False = True
False &&! True  = True
False &&! False = True
```

### 用户定义的控制结构

基于与上面的短路同样的思路，我们可以定义自己的用户控制结构。大多数语言有内置的`if`语句，而在Haskell中可以简单的将`if`定义为一个函数，定义如下：

```haskell
if' Bool -> a -> a -> a
if' True  x _ = x
if' False _ y = y
```

然而Haskell还是存在一个内置的`if`语句，可能是语言设计者觉得大家需要吧。不过`if`在Haskell中并没有许多用处，最好还是使用模式匹配和哨卫。

我们也能定议其它的控制结构，这些会在讨论`monad`时展开。

### 无限数据结构

由于惰性求值特性，我们可以定义无限的数据结构，比如`repeat 7`这样的无限列表，或是一个完整的记录状态空间的树（比如棋类游戏）。由于我们只会计算使用到的部分，这样的定义并不会带来额外的负担。

### 管道/全麦编程

之前我们说过使用管道的形式组合小函数成获得更好的内存性能，现在可以解释为什么了。因为管道中的每个小函数的值在传递给下一个函数时都会被计算出来。因此对内存的浪费局限在了一个小的范围内。

### 动态规划

惰性求值给我们带来了更方便的动态规划技术。通常我们使用动态规划时要小心考虑状态表的求值顺序，如果顺序错了就将得到一个完全错误的结果。

然而，我们可以使用惰性求值特性来让Haskell运行时为我们选择求值顺序。比如对于经典的0-1背包问题，我们可以这样解决：

```haskell
import Data.Array

knapsack01 :: [Double]   --物品价值
           -> [Integer]  --物品重量
           -> Integer    --背包载量
           -> Double     --最大价值
knaspsack01 vs ws maxW = m!(numItems - 1, maxW)
    where numItems = length vs
          m = array ((-1, 0), (numItems - 1, maxW)) $
                [((-1, w), 0) | w <- [0 .. maxW]] ++
                [((i, 0), 0) | i <- [0 .. numItems - 1]] ++
                [((i, w), best)
                    | i <- [0 .. numItems - 1]
                    , w <- [1 .. maxW]
                    , let best
                           | ws!!i > w = m!(i - 1, w)
                           | otherwise = max (m!(i - 1, w))
                                          (m!(i - 1, w - ws!!i) + vs!!i)
                ]
```

为了理解这个程序，首先解释一下`array`，其作用为封装一个指定范围内索引到值的映射列表，并提供运算符`!`实现方便的`k-v`映射，用法为：

```haskell
-- array key范围 映射列表
-- array (min, max) [(index, value)]
array :: Ix i => (i, i) -> [(i, e)] -> Array i e
-- 如下例生成一个索引范围从1到10的映射，每个索引对应的值为索引值+1
a = array (1, 10) [(i, i + 1) | i <- [1..10]]
-- 取该映射中的一个value时，使用array！key的方式，如
a!1 == 1
-- 似乎等效于直接对列表进行如下操作
l = [(i, i + 1) | i <- [1..10]]
snd $ l!!1 == 1
```

再回顾一下0-1背包问题，问题描述为:

> 给定n个物品与一个最大载重为maxW的背包。每个物品的重量w与价值v各不相同，可以选定任意物品装入背包，但背包中物品重量总和不可超过背包的最大载重。求背包最多可以装入多少价值的物品。

而解决思路可以概括为：

> maxV(i, w)视作前i个物品在限重w时的最大价值。此时，如果没有将第i个物品加入背包，则其值等于maxV(i - 1, w)；如果将第i个物品加入了背包，其值则等于maxV(i - 1, w - ws[i]) + vs[i]。因此，只要选择两种情况下值比较大的作为maxV(i,w)的值就可以确保这个值是最优解。
>
> 同时要注意，如果当前物品价值超过了背包最大载重，则只有不加入背包一个选择。

现在来逐步解析这个程序：

```haskell
import Data.Array

knapsack01 :: [Double]   --物品价值
           -> [Integer]  --物品重量
           -> Integer    --背包载量
           -> Double     --最大价值
-- 我们知道了m是一个Array类型，!运算可以取其对应索引的值
-- m (i, w)这个形式即是之前所说的maxV(i,w)，求前n个物品的在限重w下的最大价值
-- 这里numItems - 1是因为数组下标从0开始，第一个物品对应的i值为0
knaspsack01 vs ws maxW = m!(numItems - 1, maxW)
    where numItems = length vs
          -- 这里构建一个二维数组作状态表
          -- 索引范围是(-1, 0)到(numItems - 1, maxW)
          m = array ((-1, 0), (numItems - 1, maxW)) $
                -- 对边界条件初始化，所有0个物品与载重为0是情况取值都为0
                [((-1, w), 0) | w <- [0 .. maxW]] ++
                [((i, 0), 0) | i <- [0 .. numItems - 1]] ++
                -- 定义一般情况的映射关系
                [((i, w), best)
                    | i <- [0 .. numItems - 1]
                    , w <- [1 .. maxW]
                    -- 这里就是上面说的对两种情况的比较
                    , let best
                           | ws!!i > w = m!(i - 1, w)
                           | otherwise = max (m!(i - 1, w))
                                          (m!(i - 1, w - ws!!i) + vs!!i)
                ]
```

这样看除了语法默生一点外似乎并没有什么太特别的地方，为了对比，给出这个问题的C++实现：

```cpp
#include <vector>

using namespace std;

double kanpsack01(const vector<double> &vs, const vector<int> &ws
                , int maxW) {

    auto numItems = vs.size();

    // 留出物品数与载重为0的情况所需空间
    auto m = vector(numItems + 1, vector<double>(maxW + 1， 0));

    for (int i = 1; i <= numItems; ++i) {
        for (int w = 1; w <= maxW; ++w) {
            auto unadd = m[i - 1][w];

            // 由于物品数量从1开始，物品属性下标从0开始，当前物品索引应为i-1
            auto index = i - 1;
            if (ws[index] > w) {
                m[i][w] = unadd;
                continue;
            }

            auto added = m[i - 1][w - ws[index]] + vs[index];
            m[i][w] = (added > unadd) ? added : unadd;
        }
    }
    return m[numItems][maxW];
}
```

亲自动手写出这两个程序，就会发现C++程序要格外地考虑状态表的求值顺序。另一方面，C++程序在运行时要浪费许多计算资源在可能根本没用到的状态上（然而还是比较快）。而Haskell在这些方面的心智负担要小得多。