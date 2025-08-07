---
title: 'repost c++的指针和类'
date: 2024-09-22 20:47:27
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
c++的指针和类
· 2022-11-30 ·
啊 这是多大的一个话题呀！

以前我对类（或者其他数据结构）是如何存在于计算机中这件事情毫无概念。后来感觉后者可能就是一个地址加上数据长度。对于类，可能是（开始处）的地址，加上每个字段的长度。在计算机中定长这件事情很重要。变长的东西处理起来更困难。

在c++中我们用这样的结构定义一个类

class monkey{
public:
int num;
void death();

private:

int age;
}
类中需要的函数是这样的：
void monkey::death(){

return;
}

下面是猴子环形链表：



#include<stdio.h>


class monkey{
public:
 int num;
 monkey* prev;
 monkey* next;
 };


int main(){


int i=0;
monkey f;
f.prev=&f;
f.next=&f;
f.num=1;

int n=9;


monkey* cur;
cur=&f; //first monkey
printf("ok\n");
monkey *x;
for (i=2;i<=n;i++){
	x=new monkey;
	x->num=i;
	x->prev=cur;
	x->next=cur->next;
	cur->next->prev=x;
	cur->next=x;
	cur=x;
	printf("%i: %i\n",i, x);
}

printf("going:\n");
cur=&f;
for(i=1;i<=n;i++){
	printf("%i %i \n",cur, cur->num);
	cur=cur->next;}

return 0;
}
这个程序可以在win10, devcpp下编译通过给出正确的结果（GCC编译）。在win3.1的turbo c++ 4.5下可以给出一个环形链表，但num是错误的。（可能是显示问题，两个%i都在显示cur的地址）

为了写这个程序，我莽莽撞撞犯了许多错误。比如：

x=new monkey可以用monkey* x代替吗？不行。第二次以后就不开辟新的内存位置了。（实际上在gcc下不能重复定义一个变量。）

这里x和cur 都是猴子指针。如果都是猴子本身可以吗？不行。cur=x是把x的各个属性的值传过去了。而非让cur指向x这个猴子。

下面是一些对符号的解释。简单地说，&是取地址运算：&x是变量x的地址。对于计算机，地址当然是一个二进制整数。但在c++里不能把地址送入一个整型变量里。你可以进行加法运算，比如对整数的地址加1，结果地址就增加了4，因为一个整数是4byte的。

相反，*是&的逆运算。

给了地址y，*y就是内存在该地址的值。

这基本上是mathematical的了。实际使用上，为了定义一个整数，你可以int a; 然后用&取a的地址。但为了定义一个整数地址变量，你需要

int* a ;
或者
int a；
这两者似乎是一样的，但后者从数学上更好理解的：一个整数，形如a.但在计算机上说不过去。前者呢，似乎是说
int*是一种变量，但这也不对。更多的可以参考stroupe的文章，他说前者是c++风格的，后者更接近c风格。

对于自定义类的变量，也是一样的。方便的是，为了少些(*ptr).value这样的东西，你可以直接写ptr->value. 就是ptr这个指针对应的类元素的value属性。

更难以理解的是指针数组:例如

int *p[3];
是什么？完全无法理解。(当然也有人从运算符的优先级角度解释 -- 但我并没有看出这里有运算符。)如果写成下面形式就可以理解了（如果你承认“指向整数的指针”这一数据类型）：

	int* p[3]; //p is an array of int* -s.
	int a=99,b=111,c=144;
	p[0]= &a;
	p[1]= &b;
	p[2]= &c;
	
	a++;
	b++;
	c++;
	cout<<*(p[0])<<*(p[1])<<*(p[2])<<endl;
	// output: 100,112,145
这里p就一个数组，每个元素是int*这一类型。

另一种指针数组是int (*p)[3],这是指向3-数组的指针吗？如果你写出


	int (*p)[3];
	(*p)[0]=44;
	cout<<(*p)[0]<<endl;
是出bug的，因为这时候p指向的地方还是一片混沌？就好像下面的程序一定要有一句new一样。

    int *a;
	a=new int;
	*a=3;
	cout<<*a<<endl;
	```
所以我们可以让p指向一个已经存在的数组：

int (*p)[3];
int q[3];
p=&q;
cout<<"q="<<q<<" p="<<p<<endl;
cout<<"&q="<<&q<<" *p="<<*p<<endl;  //all four are identical!

(*p)[0]=44;
q[0]=88;
cout<<(*p)[0]<<endl;
return 0;
这里p和q值相同，但不能用
p=q代替p=&q. 我猜他们数据结构不同：q是int[], p是 &(int[])

单行写法就是
int (*r)[3]=&q;
这里理解的要点是，这一行是定义r的，r是被定义的新对象，所以等号右边是r的取值。而不是辗转定义了一个新int或什么的。




//问题：可以new一个东西出来让p取值吗？比如的	```p=new (int[3]);```
//会出bug [Error] cannot convert 'int*' to 'int (*)[3]' in assignment)

可以用类似的方法，通过定义数组的“头”指针来制造动态大小数组：
int n;
cin>>n;
int* p = new int [n];


比如你写的类涉及到不确定数量的顶点v：


class pt{
// something
};//comma after class definition
class obj{
int num;
pt * v;
int** adj;
void init(int numOfVertices);
};

void obj::init(int numOfVertices){
num=numOfVertices;
v=new pt[num];
adj=new int*[3];
for(int i=0;i<=2;i++){
adj[i]=new int[3];
}
}



ref:
https://blog.csdn.net/qqyuanhao163/article/details/100769118
int *p[4]; //定义一个指针数组，该数组中每个元素是一个指针，每个指针指向哪里就需要程序中后续再定义了。
int (*p)[4]; //定义一个数组指针，该指针指向含4个元素的一维数组（数组中每个元素是int型）。
