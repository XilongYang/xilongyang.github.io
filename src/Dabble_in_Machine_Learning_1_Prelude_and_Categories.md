---
title: 机器学习浅尝（一）——序言与分类
author: Xilong Yang
date: 2023-05-30 
---

<div class="abstract">


随着ChatGPT的出世，最近几年火得一塌糊涂的AI似乎终于掀开了历史书页的一角。身为一个技术人，我觉得是时候普及一些基础的AI知识了。

</div>

$$toc$$

## 序言：这个系列在做什么

这个系列是一个个人的AI领域知识扫盲过程的记录。鉴于自己贫瘠的知识储备与所剩无几的精力，无法涉足过深。因此这个系列的定位是粗略的建立起机器学习相关的知识框架，取名“浅尝”。

具体来说是跟随广受好评的[吴恩达机器学习](https://www.bilibili.com/video/BV164411b7dx/?spm_id_from=333.1007.0.0&vd_source=8f2c7ce799acf2166268d6f71a305aee)系列课程，途中记录下课程的内容与一些（估计不太多）自己的体会。由于精力有限，并没有选择更多的资料来对照学习，这个系列也可以说是这门课程的笔记。

## 机器学习算法的分类

机器学习算法分为**监督学习**与**无监督学习**两大类，关键区别为我们是否知道自己想要什么。

### 监督学习

监督学习的模式为：给算法一组`{特征} -> {结果}`的数据，之后让算法根据特征预测结果。视结果是连续量还是离散量，监督学习可细分为**回归**算法和**分类**算法两类。

#### 回归

例如要预测房价，我们已经有一些房产的特征，如面积，楼层等，以及对应的结果，即价格。回归算法使我们可以利用这些已知的信息建立一个模型，从而可以根据新房产的特征来预测其价格。

举一个极端理想化的例子。设想在某地存在一个小镇。小镇有一条秘密法律：任何房产的价格为其面积的两倍。由于这个规定被严格保密，外界无法获知。但小镇的房产信息是公开的，我们可以获取如下信息：

```
房产1：面积2，价格4
房产2：面积4，价格8
```

假设现在我们知道一处还未标价的房产A，面积为10，要猜测它的价格。

此时可以根据已知信息发现，房产的价格似乎总是面积的两倍，因此我们建立一个模型：

```
Price(space) = 2 * space
```

从而预测出房产A的价格为20。对这个例子而言，**特征**即为面积，**结果**就是价格。

同时我们发现，由于并不知道小镇的秘密法律，我们只能根据已知信息给出猜测模型，这使得我们预测的结果并不一定准确，如果我建立的模型为：

```
Price(space) = space^2 - 4 * space + 8
```

它仍然符合我们已知的数据，但预测值将变为：68，相距甚远。

这里引出两个问题：

1. 并非所有数据都能像这个例子这样浅显，面对更复杂的数据时我们应该**如何建立模型**。
    
2. 符合已知数据的模型有多个时，**如何选择更合适的模型**。

正如序言所说，这篇文章并不是一个教程，而是我的学习记录，因此我目前无法给出这两个问题的答案。在之后的学习中寻找吧。

#### 分类

分类算法与回归算法相似，都是**根据特征建立模型来预测结果**。两者的不同点在于，回归算法**在连续的结果中算出一个近似结果**，而分类算法**在多个离散的结果中选出一个确定结果**。

例如对于预测几率的模型，我们可以说结果是0.95。但对于一个分辨猫狗的模型，我们不能说结果是0.95的狗，而应该确切的给出结果：这是一条狗。

### 无监督学习

非监督学习的模式为：给算法一组数据，让算法帮我们分析出这些数据内含的关联。通常表现为**聚类算法**的形式。

#### 聚类

聚类算法在根本上不同于监督学习，我们的目的不是某个作为结果的属性的值，而是想要借助机器从繁杂的数据中获取这个数据内在的关联。

聚类不同于分类算法主要在于我们事先是否知道有哪些分类。分类算法是由我们**预设几个类别，让模型识别数据的特征并根据特征选择一个类别**。而聚类算法是**根据数据的特征，将相似的数据判定为一类**。

例如给模型大量的新闻稿，要求它将这些新闻按主题聚类。

## 小结

这篇文章确定了系列的目标，并大体描述了机器学习的分类。

你可能注意到了，我对分类算法与聚类算法的介绍比对回归算法的介绍简略的多。这其实是因为我写这篇文章时已经学习了回归算法的一些内容，因此理解比其它两个类别更多一些。