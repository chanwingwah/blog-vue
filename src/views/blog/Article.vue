<template>
  <section class="wrap-outer">
    <div class="wrap-inner">
      <div style="padding:20px 0" class="article-content">
        <transition name="article-menu">
          <article-menu
            class="article-menu shadow-1  article-left"
            :menuKey="menuKey"
          ></article-menu>
        </transition>
        <div class="article-text">
          <Markdown
            :source="contents.replace(/↵/gm, '\r')"
            @rendered="rendered"
          ></Markdown>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Markdown } from "@/components";
import ArticleMenu from "@/views/blog/ArticleMenu";
export default {
  name: "Article",
  components: {
    Markdown,
    ArticleMenu
  },
  data() {
    return {
      menuKey: 1,
      contents:
        "## 前言↵ 随着Web相关技术的发展，JavaScript所要承担的工作也越来越多，这就更需要快速的解析和执行JavaScript脚本。↵在我们实际的运用中，数组绝对算得上是编码过程中一个重要的角色，那么V8对于我们常用的数组又做了哪些优化来使其跑得更快呢？↵↵## 1. 先讲讲number↵相信很多人都会被问到这样一个面试的问题↵↵> 0.2+0.1为什么不等于0.3?↵↵而你也可以很轻易地回答出这是因为js采用的是`IEEE754双精度浮点表示法`来表示数字，当数字进行计算的时候，需要先进行二进制转换然后进行对阶运算。在进行二进制转换的时候，0.1和0.2因为转换成的是一个无限循环的数，超出了双精度表示法可以表示的长度，因此裁掉了部分的尾数，从而导致0.1和0.2变成了一个近似0.1或者0.2的值，那么它们相加的和就不会等于0.3了↵↵**那么，这里就有一个问题了**↵> js中是64位来表示数字，那么在V8引擎层面是否也是使用64位来表示数字呢？↵↵为什么会这么问？↵**因为我们知道，数字在内存中的表示可以有多种（如下），而64位，显然是最慢的**↵↵| representation | bits |↵| --- | --- |↵| 8位二进制补码 | 0010 1001 |↵| 32位二进制补码 | 0000 0000 0000 0000 0000 0000 0010 1010 |↵| 二进制编码的十进数码 | 0100 0010 |↵| 32位 IEEE-754 单精度浮点 | 0100 0010 0010 1000 0000 0000 0000 0000 |↵| 64位 IEEE-754 双精度浮点 | 0100 0000 0100 0101 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 |↵↵我们在使用js这门语言来编程的时候，其实使用的大部分是32位就可以表示的数，因此，引擎做了这样一个优化↵↵> ECMAScript 标准约定number数字需要被当成 64 位双精度浮点数处理，但事实上，一直使用 64 位去存储任何数字实际是非常低效的，所以 JavaScript 引擎并不总会使用 64 位去存储数字，引擎在内部采用其他内存表示方式（如 32 位），只要保证数字外部所有能被监测到的特性对齐 64 位的表现就行。↵↵## 2.对数字的分类 Smi和HeapNumber↵不仅仅是使用32位来表示数字那么简单，V8还对数字进行了分类，将数字分为了`Smi` 和 `HeapNumber`↵> 注意：这个仅仅是引擎层面的处理，js内部只认识数字，不区分整数和浮点数↵↵```↵//32位平台是 2的30次方↵//64位平台是 2的31次方↵ -Infinity // HeapNumber↵-(2**30)-1 // HeapNumber↵  -(2**30) // Smi↵       -42 // Smi↵        -0 // HeapNumber↵         0 // Smi↵       4.2 // HeapNumber↵        42 // Smi↵   2**30-1 // Smi↵     2**30 // HeapNumber↵  Infinity // HeapNumber↵       NaN // HeapNumber↵```↵↵**可以从上面看出，`Smi`代表的是`小整数`,而`HeapNumber`则代表了一些浮点数以及无法用32位表示的数，比如`NaN,Infinity,-0` **↵↵**为什么要区分这两种？**↵原因还是之前说的，因为小整数在我们的编码过程中太常见了，所以，V8专门把它领出来，并且对其进行了优化操作，它可以进行`快速整型操作`↵↵**那么大概是怎么优化处理呢？**↵如图所示我们声明了一个对象，对象的x值是一个`Smi`，而y值是一个`HeapNumber`，v8给`HeapNumber`专门分配了一个内存对象来存储值，并将`o.y`的对象指针指向该内存实体。↵![imges.png](/static/uploads/v8数组1-1.jpg)↵↵当我们更新他们的值的时候，`Smi`的值会原地更新，而`HeapNumber`由于它`不可变`的特性，V8会开辟一个新的内存实体用来储存新的值，然后将`o.y`的对象指针指向该内存实体。↵![imges.png](/static/uploads/v8数组1-2.jpg)↵↵如果我们需要频繁更新`HeapNumber`的值，执行效率会比`Smi`慢得多：↵在这个短暂的循环中，引擎不得不创建 6 个`HeapNumber`实例，`0.1`、`1.1`、`2.1`、`3.1`、`4.1`、`5.1`，而等到循环结束，其中 5 个实例都会成为垃圾。↵![imges.png](/static/uploads/v8数组1-3.jpg)↵↵为了防止这个问题，V8 提供了一种优化方式去原地更新非`Smi`的值：**当一个数字内存区域拥有一个非`Smi`范围内的数值时，V8 会将这块区域标志为`Double`区域，并会为其分配一个用 64 位浮点表示的`MutableHeapNumber`实例。**↵![imges.png](/static/uploads/v8数组1-4.jpg)↵↵此后当你再次更新这块区域，V8 就不再需要创建一个新的`HeapNumber`实例，而可以直接在`MutableNumber`实例中进行更新了。↵![imges.png](/static/uploads/v8数组1-5.jpg)↵↵前面说到，`HeapNumber`和`MutableNumber`都是使用指针引用的方式指向内存实体，而`MutableNumber`是可变的，如果此时你将属于`MutableNumber`的值`o.x`赋值给其他变量`y`，你一定不希望你下次改变`o.x`时，`y`也跟着改变。 为了防止这种情况，当`o.x`被共享时，`o.x`内的`MutableHeapNumber`需要被重新封装成`HeapNumber`传递给`y`：↵![imges.png](/static/uploads/v8数组1-6.jpg)↵↵## 3.数组的常见元素种类↵从上面我们学到了一个简单的知识，那就是数字会被v8分为两种，一种是`Smi`，另一种是`HeapNumber`，那么这两种表现方式会给其他东西带了什么改变呢？↵↵在 V8 中，如果属性名是数字（最常见的形式是 `Array` 构造函数生成的对象）会被特殊处理。尽管在许多情况下，这些数字索引属性的行为与其他属性一样，V8 选择将它们与非数字属性分开存储以进行优化。在引擎内部，V8 甚至给这些属性一个特殊的名称：**元素**。↵↵举个例子↵```↵const array = [1, 2, 3];↵```↵它包含什么样的元素？如果你使用 `typeof` 操作符，它会告诉你数组包含 `number`。在语言层面，这就是你所得到的：JavaScript 不区分整数，浮点数和双精度 - 它们只是数字。然而，在引擎级别，我们可以做出更精确的区分。这个数组的元素是 `PACKED_SMI_ELEMENTS`，而这个`SMI`就是我们刚刚所说的小整数。↵↵我们可以这个数组中添加一个浮点数将其转换为更通用的元素类型，这里并不叫`HeapNumber`而是`Double`，但是我们知道v8确实是把小整数和浮点数分开进行优化处理的。↵```↵const array = [1, 2, 3];↵// 元素类型: PACKED_SMI_ELEMENTS↵array.push(4.56);↵// 元素类型: PACKED_DOUBLE_ELEMENTS↵```↵↵向数组添加字符串再次改变其元素类型↵```↵const array = [1, 2, 3];↵// 元素类型: PACKED_SMI_ELEMENTS↵array.push(4.56);↵// 元素类型: PACKED_DOUBLE_ELEMENTS↵array.push('x');↵// 元素类型: PACKED_ELEMENTS↵```↵这里重要的一点是，元素种类转换只能从一个方向进行：从特定的（例如 `PACKED_SMI_ELEMENTS`）到更一般的（例如 `PACKED_ELEMENTS`）。例如，一旦数组被标记为 `PACKED_ELEMENTS`，它就不能回到 `PACKED_DOUBLE_ELEMENTS`。↵↵## 4.密集数组 PACKED 和稀疏数组 HOLEY↵```↵const array = [1, 2, 3, 4.56, 'x'];↵// 元素类型: PACKED_ELEMENTS↵array.length; // 5↵array[9] = 1; // array[5] until array[8] are now holes↵// 元素类型: HOLEY_ELEMENTS↵```↵V8 之所以做这个区别是因为 `PACKED` 数组的操作比在 `HOLEY` 数组上的操作更利于进行优化。对于 `PACKED` 数组，大多数操作可以有效执行。相比之下， `HOLEY` 数组的操作需要对原型链进行额外的检查和昂贵的查找。↵↵## 5.元素种类的过渡方向↵我们上面就开始一直说 元素类型只能从**往**方向过渡，那么这个方向有一个名字，叫做[格 lattice](https://en.wikipedia.org/wiki/Lattice_%28order%29)(数学概念)。这是一个简化的可视化，仅显示最常见的元素种类↵![imges.png](/static/uploads/v8数组1-7.jpg)↵↵只能通过格子向下过渡。一旦将单精度浮点数添加到 Smi 数组中，即使稍后用 Smi 覆盖浮点数，它也会被标记为 DOUBLE。类似地，一旦在数组中创建了一个洞，它将被永久标记为有洞 HOLEY，即使稍后填充它也是如此。↵↵V8 目前有 [21 种不同的元素种类](https://cs.chromium.org/chromium/src/v8/src/elements-kind.h?l=14&rcl=ec37390b2ba2b4051f46f153a8cc179ed4656f5d)，每种元素都有自己的一组可能的优化。↵↵**一般来说，更具体的元素种类可以进行更细粒度的优化。元素类型的在格子中越是向下，该对象的操作越慢。为了获得最佳性能，请避免不必要的不具体类型 - 坚持使用符合您情况的最具体的类型。**↵↵## 6.性能优化↵从上一部分的我们介绍`格`的结论当中，我们就可以大致摸清楚我们优化的方向，那就是↵**尽量使你的元素种类单一并且处于比较上层的格，避免元素类型转换**↵↵那么落在实处的话，我们有这几种比较具体的优化策略↵↵### 6.1避免创建洞↵```↵const array = new Array(3);↵// 此时，数组是稀疏的，所以它被标记为 `HOLEY_SMI_ELEMENTS`↵array[0] = 'a';↵// 接着，这是一个字符串，而不是一个小整数...所以过渡到`HOLEY_ELEMENTS`。↵array[1] = 'b';↵array[2] = 'c';↵// 这时，数组中的所有三个位置都被填充，所以数组被打包（即不再稀疏）。↵// 但是，我们无法转换为更具体的类型，例如 “PACKED_ELEMENTS”。↵// 元素类保留为“HOLEY_ELEMENTS”。↵```↵那么我们可以怎么做来避免创建洞呢？↵```↵let array = []↵array.push(newElement) //循环↵```↵或者`字面量方式`↵```↵let array = [1,2,3,4,5]↵```↵↵### 6.2避免元素种类转换↵```↵const array = [3, 2, 1, +0];↵// PACKED_SMI_ELEMENTS↵array.push(-0);↵// PACKED_DOUBLE_ELEMENTS↵```↵避免 `-0`，除非你需要在代码中明确区分 `-0` 和 `+0`。（你可能并不需要）↵↵同样还有 `NaN` 和 `Infinity`。它们被表示为双精度，因此添加一个 `NaN` 或 `Infinity` 会将 `SMI_ELEMENTS` 转换为  ↵`DOUBLE_ELEMENTS`。↵↵如果您计划对整数数组执行大量操作，在初始化的时候请考虑规范化 `-0`，并且防止 `NaN` 以及 `Infinity`。这样数组就会保持 `PACKED_SMI_ELEMENTS`。↵↵### 6.3避免多态↵如果您的代码需要处理包含多种不同元素类型的数组，则可能会比单个元素类型数组要慢，因为你的代码要对不同类型的数组元素进行多态操作。↵```↵const each = (array, callback) => {↵  for (let index = 0; index < array.length; ++index) {↵    const item = array[index];↵    callback(item);↵  }↵};↵const doSomething = (item) => console.log(item);↵↵↵each([1, 2, 3], doSomething);↵each([1.1, 2.2, 3.3], doSomething);↵each(['a', 'b', 'c'], doSomething);↵```↵我们调用了`each`3次，并且每次都没有给它相同的元素类型，**在V8中，它采用内联缓存（Inline Caches，简称 IC）来缓存调用的实现以优化这些操作的执行过程。**↵当我们第一次只传入类型为`packed_smi_element`的`[1,2,3]`，v8会使用`IC`来缓存这个方法的调用，记录元素类型以及其他信息，那么我们下一次传入`packed_smi_element`时，直接就可以从缓存里取到优化后的调用方法，然后进行调用。↵但是我们第二次如果传入的不一样的元素类型，比如`packed_double_number`，那么v8又会重新缓存一个新的调用实现（适用于`packed_double_number`），那么我们传入元素的时候就需要进行2次判断了，先判断是不是`smi`，如果不是，就判断是不是`packed_double_number`，如果是其他，那么又会重新缓存一个新的调用实现...↵> 这上面说的其实是多态IC，多态IC缓存数也是有上限的↵↵### 6.4 类数组对象↵类数组对象类似于数组，都有这数字属性和lenth属性，而且我们也可以通过`call,apply`的方式来让类数组对象使用数组方法↵↵**但是，这比在真正的数组中调用数组方法慢，数组的方法在 V8 中是高度优化的**↵↵所以，如果你打算对类数组对象（比如`Dom`，或者是`arguments`）进行操作，请先将其转换为数组对象↵↵可以使用es6的语法或者Array的slice方法↵```↵Array.from(arrayLike)↵↵Array.prototype.slice.call(arrayLike,0)↵```↵↵## 总结↵主要有以下几点知识需要记住↵- 数字在js中是64位双精度浮点表示法表示的，但是V8内部做了优化，还可以使用32位来表示部分的整数↵- v8把数字分为小整数`Smi`和堆数字`HeapNumber`,`Smi`可以进行快速整型操作，比`HeapNumber`快↵- 数组会将属性进行分类，并且称之为元素种类↵- 数组的元素种类只可以从`比较特定的方向`转变为`比较普遍的方向`，并且后者的效率会低得多↵↵参考文章：↵[Mathias Bynens - V8 internals for JavaScript developers](https://www.youtube.com/watch?v=m9cTaYI95Zc&feature=emb_title)↵↵[The story of a V8 performance cliff in React](https://v8.dev/blog/react-cliff)"
    };
  },
  methods: {
    rendered() {
      setTimeout(() => {
        this.menuKey++;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
ul,
ol {
  list-style: none;
  outline: none;
  padding: 0;
  margin: 0;
}

.article-content {
  // display: flex;
  // float: left;
  position: relative;
}
.article-left {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 40px;
  width: 315px;
  background: #ffffff;
  padding: 25px;
  height: auto;
  float: left;
}
.article-text {
  margin-left: 335px;
  padding: 20px;
  background: #ffffff;
  overflow: hidden;
}

.article {
  background-color: transparent;
  display: flex;
  align-items: flex-start;

  &-menu {
    animation: menuFadeIn 0.8s ease;
    &-enter-active,
    &-leave-active {
      transition: all ease 0.5s;
    }
    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  @keyframes menuFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
