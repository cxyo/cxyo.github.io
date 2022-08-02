---
title: 《超简单用python让excel飞起来》
date: 2018-06-08 18:18:18
categories: 
 - python
tags: 
 - python
sticky: 999994
---

# 第1章python快速上手

## 1.1 为什么要学习用python控制excel

## 1.2python编程环境的搭建

### 1.2.1安装python官方的编程环境IDLE

[python官网](https://www.python.org)

### 1.2.2安装与配置anaconda和pycharm

[anaconda官网](https://www.anaconda.com/products/individual)

[pycharm官网](https://www.jetbrains.com/pycharm/download/#section=windows)

## 1.3python模块

### 1.3.1初识模块

#### 1、 内置模块

sys、time、math

#### 2、第三方的开源模块

xlwings

#### 3、自定义模块

### 1.3.2模块的安装

#### 1、用pip命令安装模块

步骤1、 开始、运行、cmd、确认、输入命令

```python
pip install 模块名
```

步骤2、回车、出现“successfully installed”说明模块安装成功。

##### 通过镜像服务器安装模块

```python
pip install 模块名 -i 镜像服务器地址
```

#### 2、 在pycharm中安装模块

步骤1、file-setting

![img](https://cdn.jsdelivr.net/gh/cxyo/hexo/img1651584778316-29a4d7b2-01c5-4b6b-bd20-73919e5d20c2.png)

步骤2、project:python-project interpreter，单击下面加号

![img](https://cdn.nlark.com/yuque/0/2022/png/12615983/1651585015080-341487cc-071d-47fa-a398-8694e40afcc8.png)

步骤3、输入模块名，回车，点击左下角install package



## 1.4让excel飞一下

#### 新建20个表格

```python
import xlwings as xw
app = xw.App(visible=True, add_book=False)
for i in range(1, 21):
    workbook = app.books.add()
    workbook.save(f'd:\\excel\\表格{i}.xlsx')
    workbook.close()
app.quit()
```



## 第2章python的基础语法知识

## 2.1 变量

```python
x = 10
print(x)
y = x + 15
print(y)
# 打印结果
'''
10
25
'''

```

## 2.2 数据类型：数字与字符串

### 2.2.1数字

#### 整型

integer

正整数、负整数、0

#### 浮点型

float

### 2.2.2字符串

string

需要用引号引起来

##### 三引号支持换行

##### 文件路径

```python
# r取消转义字符\n的换行功能
print(r'd:\number.xlsx')
# \\表示转义字符\ 
print('d:\\number.xlsx')
```

### 2.2.3数据类型的查询

```python
type(变量名) # 语法
```

### 2.2.4数据类型的转换

#### 1、str()函数

转换成字符串

#### 2、int()函数

转换成整数

#### 3、float()函数

转换成小数

## 2.3 数据类型：列表、字典、元组与集合

### 2.3.1列表

#### 1、列表入门

```python
列表名 = [元素1,元素2,元素3,元素4,……] # 语法
```

**for循环遍历列表中的所有元素**

```python
name = ['张三', '李四', '王二', '赵六']
for i in name:
    print(i)
    
# 打印结果
'''
张三
李四
王二
赵六
'''
```

#### 2、统计列表元素个数

```python
len(列表名) # 语法
```

**统计个数**

```python
name = ['张三', '李四', '王二', '赵六']
a = len(name)
print(a)
# 打印结果
'''
4
'''
```

#### 3、提取列表单个元素

```python
#列表名[序号]
name = ['张三', '李四', '王二', '赵六']
a = name[0]
print(a)
# 打印内容
'''
张三
'''
```

#### 4、提取列表多个元素——列表切片

**语法**

```python
# 左闭右开（1可以取到，2取不到）
列表名[序号1:序号2]
# 不确定列表元素的序号时，可以只写一个序号
列表名[1:] # 提取第2个到最后一个
列表名[-3:] # 提取倒数第3个到最后一个
列表名[:-2] # 提取倒数第2个之前的所有元素（因为左开右闭，所以不包含第2个）
```

**提取列表多个元素**

```python
# 提取列表多个元素
name = ['张三', '李四', '王二', '赵六']
a = name[1:3]
print(a)
# 打印结果
'''
['李四', '王二']
'''
```

#### 5、添加列表元素

**语法**

```python
append(元素) # 语法
```

**添加元素**

```python
score = []
score.append(80)
print(score)
score.append(90)
print(score)
# 打印结果
'''
[80]
[80, 90]
'''
```

#### 6、列表与字符串的相互转换

##### 列表转换成字符串

**语法**

```python
'连接符'.join(列表名) #语法
```

**列表转字符串**

```python
name = ['张三', '李四', '王二', '赵六']
a = ','.join(name)
print(a)
# 打印结果
'''
张三,李四,王二,赵六
'''
```

##### 字符串转换成列表

**语法**

```python
字符串.split('分隔符')
```

**字符串转列表**

```python
字符串.split('分隔符')
name = "张三 李四 王二 赵六"
a = name.split(' ')
print(a)
# 打印结果
'''
['张三', '李四', '王二', '赵六']
'''
```

### 2.3.2字典

**语法**

```python
字典名 = {键1:值1, 键2:值2, 键3:值3, ……}
```

**字典取值**

```python
zidian = {'张三': 85, '李四': 95, '王二': 75, '赵六': 55}
# 取王二的分数
score = zidian['王二']
print(score)

# 取所有人的姓名和分数(循环拼接)
for i in zidian:
    print(i + ':' + str(zidian[i]))

# 取所有人的姓名和分数(字典items()函数)
a = zidian.items()
print(a)

# 打印结果
'''
75
张三:85
李四:95
王二:75
赵六:55
dict_items([('张三', 85), ('李四', 95), ('王二', 75), ('赵六', 55)])
'''
```

### 2.3.3元组和集合

#### 元组

和列表很相似，区别在于定义列表是中括号，元组是小括号，并且元组的元素不可修改。

```python
name = ('张三', '李四', '王二', '赵六')
print(name[1:3])
# 打印结果
'''
('李四', '王二')
'''
```

#### 集合

是一个无序的不重复序列，set()函数创建集合会自动删除重复元素

```python
name = ('张三', '李四', '王二', '张三', '赵六')
print(set(name))
# 打印结果
'''
{'赵六', '李四', '张三', '王二'}
'''
```

## 2.4运算符

算术运算符

字符串运算符

比较运算符

赋值运算符

逻辑运算符

### 2.4.1算数运算符和字符串运算符

| 运算符 | 含义                               |
| ------ | ---------------------------------- |
| +      | 加，计算两数的和                   |
| -      | 减，计算两数的差                   |
| *      | 乘，计算两数的积                   |
| /      | 除，计算两数的商                   |
| **     | 幂，计算数的某次方                 |
| //     | 取整除，计算两数相除的商的整数部分 |
| %      | 取模，计算两和正整数相除的余数     |

#### 字符串运算符

-  \+ 拼接字符串
- \* 将字符串复制指定份数

```python
a = 'hello'
b = 'world'
c = a + ' ' +b
print(c)

d = 'python' * 3
print(d)
# 打印结果
'''
hello world
pythonpythonpython
'''
```

### 2.4.2比较运算符（关系运算符）

| 运算符 | 含义                               |
| ------ | ---------------------------------- |
| >      | 大于，判断左边是否大于右边         |
| <      | 小于，判断左边是否小于右边         |
| >=     | 大于等于，判断左边是否大于等于右边 |
| <=     | 小于等于，判断左边是否小于等于右边 |
| ==     | 等于，判断左边是否和右边相等       |
| !=     | 不等于，判断左边是否和右边不相等   |

**条件判断**

```python
score = 10
if score < 60:
    print('需要努力')
    
#　打印结果
'''
需要努力
'''
```

**赋值运算符**

```python
a = 1
b = 2
if a == b:
    print('a和b相等')
else:
    print('a和b不相等')
# 打印结果

'''
a和b不相等
'''
```

### 2.4.3赋值运算符

| 运算符 | 含义                                       |
| ------ | ------------------------------------------ |
| =      | 简单赋值，将右边的值分配给左边             |
| +=     | 加法赋值，执行加法运算的结果分配给左边     |
| -=     | 减法赋值，执行减法运算的结果分配给左边     |
| *=     | 乘法赋值，执行乘法运算的结果分配给左边     |
| /=     | 除法赋值，执行除法运算的结果分配给左边     |
| **=    | 幂赋值，执行求幂运算的结果分配给左边       |
| //=    | 取整除赋值，执行取整除运算的结果分配给左边 |
| %=     | 取模赋值，执行取模运算的结果分配给左边     |

```python
# 加法赋值运算符
price = 100
price += 10
print(price)
# 乘法赋值运算符
price = 100
discount = 0.5
price *= discount
print(price)
#  打印结果

'''
110
50.0
'''
```

### 2.4.4逻辑运算符

| 运算符 | 含义                                               |
| ------ | -------------------------------------------------- |
| and    | 与，左右的值都为true时，才返回true，否则返回false  |
| or     | 或，左右的值都为false时，才返回false，否则返回true |
| not    | 非，右边的值为true返回true，为false返回false       |

```python
# 同时满足
score = -10
year = 2022
if (score < 0) and (year == 2022):
    print('录入数据库')
else:
    print('不录入数据库')
    
# 打印结果
'''
录入数据库
'''
```

## 2.5编码基本规范

### 2.5.1缩进

#### 快捷键：tab

#### 减少缩进：shift+tab

**if判断**

```python
x = 10
if x > 0:
    print('正数')
else:
    print('负数')
    
# 打印结果
'''
正数
'''
```

### 2.5.2注释

#### 1、单行注释

代码上方：#后空一格，再输入注释

代码后面：代码后至少空两格，#后空一格，再输入注释

```python
# 条件判断比较运算符
a = 1
b = 2
if a == b:
    print('a和b相等')
else:
    print('a和b不相等')
# 打印结果
'''
a和b不相等
'''
```

#### 2、多行注释

```python
'''
这是多行注释，用三个单引号
这是多行注释，用三个单引号
这是多行注释，用三个单引号
'''
print('Hello,Python!')

# 打印结果
'''
Hello,Python!
'''
```

## 2.6控制语句

#### 条件语句

if

#### 循环语句

for

while

### 2.6.1if语句

**语法**

```python
if 条件:  # 注意不要遗漏冒号
    代码1  # 注意代码前要有缩进
else:  # 注意不要遗漏冒号
    代码2  # 注意代码前要有缩进
```

**成绩判断**

```python
score = 55
if score >= 80:
    print('优秀')
elif (score >= 60) and (score < 80):
    print('及格')
else:
    print('不及格')
# 打印结果
'''
不及格
'''
```

### 2.6.2for语句

**语法**

```python
for i in 序列:  # 注意不要遗漏冒号
    要重复执行的代码  # 注意代码前要有缩进
```

**循环随机数**

```python
for i in range(3):
    print('第', i+1 , '次')
# 打印结果

'''
第 1 次
第 2 次
第 3 次
'''
```

### 2.6.3while语句

**语法**

```python
while 条件:  # 注意不要遗漏冒号
    要重复执行的代码  # 注意代码前要有缩进
```

**条件循环**

```python
a = 1
while a < 3:
    print(a)
    a = a + 1  # 也可以写成 a += 1
# 打印结果
'''
1
2
'''
```

**死循环**

```python
while True:
    要重复执行的代码
```

### 2.6.4控制语句的嵌套

```python
for i in range(5):
    if i == 1:
        print('加油')
    else:
        print('安静')
# 打印结果
'''
安静
加油
安静
安静
安静
'''
```

## 2.7函数

内置函数

自定义函数

### 2.7.1内置函数

#### len函数

```python
title = ['标题1','标题2','标题3']
for i  in range(len(title)):
    print(str(i+1)+ '.'+ title[i])
# 打印结果
'''
1.标题1
2.标题2
3.标题3
'''
```

#### replace函数

**语法**

```python
字符串.replace(要查找的内容，要替换的内容)
```

**去掉不需要的符号**

```python
a = '<em>面朝大海,</em>春暖花开'
a = a.replace('<em>','')
a = a.replace('</em>','')
print(a)
# 打印结果
'''
面朝大海,春暖花开
'''
```

#### srip函数

**语法**

```python
字符串.strip()
```

**删除首尾不需要的空格**

```python
a = '         学而时习之 不亦说乎            '
a = a.strip()
print(a)
# 打印结果
'''
学而时习之 不亦说乎
'''
```

#### split函数

**语法**

```python
字符串.split('分隔符')
```

**获取年月日**

```python
today = '2022-5-5'
a = today.split('-')
print(a)
a = today.split('-')[0]
print(a)
# 打印结果
'''
['2022', '5', '5']
2022
'''
```

### 2.7.2自定义函数

#### 1、函数的定义和调用

**自定义函数语法语法**

```python
def 函数名(参数):
    代码
```

**自定义单参函数语法**

```python
def y(x):  # 定义一个函数y()，该函数有一个参数x
    print(x + 1)  # 函数的功能是输出x+1的运算结果
y(1)  # 调用y()函数，并将1作为其参数

# 打印结果
'''
2
'''
```

**自定义多参函数语法**

```python
def y(x, z):  # 定义一个函数y()，该函数有两个参数x和z
    print(x + z + 1)  # 函数的功能是输出x+z+1的运算结果
y(1, 2)  # 调用y()函数，并将1,2分别作为其参数

# 打印结果
'''
4
'''
```

**自定义无参函数**

```python
def y():  # 定义一个函数y()，该函数没有参数
    x = 1  # 变量赋值
    print(x + 1)  # 函数的功能是输出x+1的运算结果
y()  # 调用y()函数

# 打印结果
'''
2
'''
```

#### 2、定义有返回值的函数

```python
def y(x):  # 定义一个函数y()，该函数由一个参数x
    return x + 1  # 将x+1的结果返回给调用函数
a = y(1)  # 调用y()函数，并将1作为其参数，y()函数内部使用参数计算出的结果返回给变量a
print(a)  # 输出打印

# 打印结果
'''
2
'''
```

#### 3、变量的作用域

y(x)中的x只在函数内部生效，并不会影响外部的变量。

函数的形式参数知识一个代号，属于函数的局部变量，因此不会影响函数外部的变量。

```python
x = 1
def y(x):
    x = x + 1
    print(x)
y = 3
print(x)
# 打印结果
'''
1
'''
```

# 第3章python模块

## 3.1模块的导入

导入方法两种：一种是用import语句导入，另一种是用from语句导入

### 3.1.1 import语句导入法

```python
import 模块名
```

调用模块的时候，要在函数前加模块的前缀

```python
import math
a = math.sqrt(16)
print(a)
# 打印结果
'''
4.0
'''
```

### 3.1.2 from语法导入法

**语法**

```python
from 模块名 import 函数名
# 导入math模块中的sqrt函数
```

**计算平方根**

```python
from math import sqrt
a = sqrt(16)
print(a)
# 打印结果
'''
4.0
'''
```

**as 简化关键字**

**格式：模块或函数 as 简写**

```python
from 模块名 import *
```

## 3.2 处理文件和文件夹的模块——os

### 3.2.1 获取当前运行的python代码文件路径

```python
import os
path = os.getcwd()
print(path)
# 打印结果
'''
D:\pythonProject\excel
'''
```

### 3.2.2 列出指定路径下的文件夹包含的文件和子文件夹名称

```python
import os
path = 'e:\\python'
file_list = os.listdir(path)
print(file_list)
# 打印结果
'''
['DLLs', 'Doc', 'include', 'Lib', 'libs', 'LICENSE.txt', 'NEWS.txt', 'python.exe', 'python3.dll', 'python39.dll', 'pythonw.exe', 'Scripts', 'tcl', 'Tools', 'vcruntime140.dll', 'vcruntime140_1.dll']

'''
```

### 3.2.3 分离文件主名和扩展名

```python
import os
path = 'excel.xlsx'
separate = os.path.splitext(path)
print(separate)
# 打印结果
'''
('excel', '.xlsx')
'''
```

### 3.2.4 重命名文件和文件夹

**语法**

```python
rename(src,dst)
# 参数src指定要重命名的文件或文件夹
# 参数dst指定文件或文件夹的新名称
```

**重命名文件**

```python
import os
# 重命名文件
# oldname = 'a.xlsx'
# newname = 'b.xlsx'
# os.rename(oldname, newname)

# 修改文件路径
old = 'e:\\python\\excel\\b.xlsx'
new = 'e:\\python\\excel\\a\\a.xlsx'
os.rename(old, new)

#　重命名文件夹
name1 = 'e:\\python'
name2 = 'e:\\excel'
os.rename(name1, name2)
```

## 3.3批量处理excel文件的模块——xlwings

### 3.3.1创建工作表

```python
# 导入批量处理excel文件模块,并简写为xw
import xlwings as xw
# 启动excel程序，但不新建工作薄，参数visible设置表格可见性，add_book设置是否新建工作薄
app = xw.App(visible=True, add_book=False)
# 新建一个工作薄
workbook = app.books.add()
```

### 3.3.2保存工作表

#### 绝对路径

workbook.save('d:\\demo.xlsx')

或

workbook.save(r'd:\demo.xlsx')

#### 相对路径

workbook.save('.\demo.xlsx')

或

workbook.save('demo.xlsx')

```python
# save 保存当前工作薄，
workbook.save('温度表.xlsx')
# close 关闭工作薄
workbook.close()
# quit 退出excel程序
app.quit()
```

### 3.3.3打开工作表

```python
# 导入批量处理excel文件模块,并简写为xw
import xlwings as xw
# 启动excel程序，但不新建工作薄，参数visible设置表格可见性，add_book设置是否新建工作薄
app = xw.App(visible=True, add_book=False)
# 打开工作表
workbook = app.books.open(r'温度表.xlsx')
```

### 3.3.4操控工作表和单元格

**添加数据**

```python
# 操控工作表和单元格
# 选中工作表‘sheet1’
worksheet = workbook.sheets['Sheet1']
# 在单元格A1中输入内容
worksheet.range('A1').value = '编号'
# 新增工作
worksheet = workbook.sheets.add('温度表')
```

**表格代码**

```python

"""
一、创建工作簿
"""
# 导入处理excel表格的模块
import xlwings as xw
# 启动表格窗口（visible显示或隐藏）（add_book是否新建工作簿）
app = xw.App(visible=True, add_book=False)
# 新建工作薄
workbook = app.books.add()

"""
二、保存工作薄
"""
# 保存工作簿到文件夹中
workbook.save('d:\\新数据.xlsx')
# 关闭工作簿
workbook.close()
# 退出表格
app.quit()

"""
三、打开工作薄
"""
# 导入处理excel表格的模块
import xlwings as xw
# 启动表格窗口（visible显示或隐藏）（add_book是否新建工作簿）
app = xw.App(visible=True, add_book=False)
# 打开工作薄
workbook = app.books.open(r'd:\数据.xlsx')

"""
四、操控工作表和单元格
"""
# 选中默认工作表Sheeet1
worksheet = workbook.sheets['Sheet1']
# 在单元格A1中输入内容
worksheet.range('A1').value = '编号'
# 新增一个名为‘产品’的工作表
worksheet = workbook.sheets.add('产品')
```

### 演示代码

```python
# 导入处理excel表格的模块
import xlwings as xw
# 启动表格窗口（visible显示或隐藏）
app = xw.App(visible=False)
# 新建工作薄
workbook = app.books.add()
# 添加工作表
worksheet = workbook.sheets.add('温度表')
# 在单元格A1中输入内容
worksheet.range('A1').value = '指数代码'
# 保存工作簿到文件夹中
workbook.save(r'd:\温度表.xlsx')
# 关闭工作簿
workbook.close()
# 退出表格
app.quit()
```

## 3.4数组计算的数学模块-Numpy

### 3.4.1数组的基本知识

```python
# 导入数组模块
import numpy as np
# 创建列表
a = [1, 2, 3, 4]
# 创建数组
b = np.array([1, 2, 3, 4])
# 打印
print(a)
print(b)
# 打印类型
print(type(a))
print(type(b))

# 打印结果
'''
[1, 2, 3, 4]
[1 2 3 4]
<class 'list'>
<class 'numpy.ndarray'>
'''
```

 **数学运算演示代码**

```python
# 导入数组模块
import numpy as np
# 创建列表
a = [1, 2, 3, 4]
# 创建数组
b = np.array([1, 2, 3, 4])
c = a * 2
d = b * 2
print(c)
# 列表把元素复制一遍
print(d)
# 数组对每个元素进行乘法运算

# 打印结果
'''
[1, 2, 3, 4, 1, 2, 3, 4]
[2 4 6 8]
'''
```

**二维数据演示**

**二维数组**

```python
# 导入数组模块
import numpy as np
# 创建列表嵌套
a = [[1, 2], [3, 4], [5, 6]]
# 创建二维数组
b = np.array([[1, 2], [3, 4], [5, 6]])
print(a)
# 列表结构还是一维数组
print(b)
# 数组结构是二维数组

# 打印结果
'''
[[1, 2], [3, 4], [5, 6]]
[[1 2]
 [3 4]
 [5 6]]
'''
```

**数组基本知识**

```python
import numpy as np
# 列表
a = [1, 2, 3, 4]
# 数组
b = np.array([1, 2, 3, 4])

print(a)
print(b)
# 打印结果
'''
[1, 2, 3, 4]
[1 2 3 4]
'''

print(type(a))
print(type(b))
# 打印类型结果
'''
<class 'list'>
<class 'numpy.ndarray'>
'''

print(a[1])
print(b[1])
# 提取单个元素结果
'''
2
2
'''

print(a[0:2])
print(b[0:2])
# 切片结果
'''
[1, 2]
[1 2]
'''

# 数组支持数学运算
c = a*2
d = b*2
print(c)
print(d)
# 运算结果
'''
列表把元素复制
[1, 2, 3, 4, 1, 2, 3, 4]
数组对每个元素进行运算
[2 4 6 8]
'''

# 数组可以储存多维数据
e = [[1, 2], [3, 4], [5, 6]]
f = np.array([[1, 2], [3, 4], [5, 6]])
# 运算结果
print(e)
print(f)
# 打印结果
'''
一维数组
[[1, 2], [3, 4], [5, 6]]
二维数组
[[1 2]
 [3 4]
 [5 6]]
'''
```

### 3.4.2数组的创建

```python
import numpy as np
# 创建一维数组
a = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9])
# 创建二维数组
b = np.array([[1, 2], [3, 4]])
# 创建三维数组
c = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(a)
print(b)
print(c)
# 打印结果
'''
[1 2 3 4 5 6 7 8 9]

[[1 2]
 [3 4]]
 
[[1 2 3]
 [4 5 6]
 [7 8 9]]
'''
```

### *用**np.arange()**函数创建一维数组*

```python
import numpy as np
# 用np.arange()函数创建一维数组
# 一个参数：起点取默认值0，参数值为重点，步长取默认值1，左闭右开
x = np.arange(5)
# 两个参数：第一个参数为起点，第二个参数为终点，步长取默认值1，左闭右开
y = np.arange(5, 10)
# 三个参数：第一个参数为起点，第二个参数为终点，第三个参数为步长，左闭右开
z = np.arange(5, 10, 2)
# 起点，终点，步长
print(x)
print(y)
print(z)
# 打印结果
'''
[0 1 2 3 4]
[5 6 7 8 9]
[5 7 9]
'''
```

#### 用np.random.randn()创建随机一维数组

```python
# 导入数组模块
import numpy as np
# 用np.random.randn()创建随机一维数组
c = np.random.randn(3)
print(c)

# 打印结果
'''
[-1.37399252  0.14236189  2.73184236]
'''
```

#### 用np.random.randn()创建随机二维数组

```python
# 导入数组模块
import numpy as np
# 用np.random.randn()创建3行4列二维数组
c = np.arange(12).reshape(3, 4)
print(c)

# 打印结果
'''
[[ 0  1  2  3]
 [ 4  5  6  7]
 [ 8  9 10 11]]
'''
```

#### 创建随机整数二维数组

```python
# 导入数组模块
import numpy as np
# 用np.random.randn()创建4行4列随机二维数组(起始数，终止数，几行几列二维数组)
c = np.random.randint(0, 10, (4, 4))
print(c)

# 打印结果
'''
[[2 8 5 7]
 [2 4 5 1]
 [7 8 1 4]
 [5 2 0 4]]
'''
```

## 3.5数据导入和整理模块——pandas

pandas主要有series（包括数值和索引的一维数组）和dataframe（表格）两种数据结构

```python
import pandas as pd
s = pd.Series(['张三', '李四', '王五'])
print(s)

# 打印结果
'''
0    张三
1    李四
2    王五
dtype: object
'''
```

### 3.5.1二维数据表格dataframe的创建与索引的修改

#### 1dataframe的创建

**（1）通过列表创建****dataframe**

```python
import pandas as pd
# 通过列表创建dataframe
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]])
print(a)

# 打印结果
'''
   0  1
0  1  2
1  3  4
2  5  6
'''
```

*#* *自定义列索引和行索引*

```python
import pandas as pd
# columns指定列索引名称，index指定行索引名称
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]], columns=['date', 'score'], index=['A', 'B', 'C'])
print(a)

# 打印结果
'''
   date  score
A     1      2
B     3      4
C     5      6
'''
```

\#方式二

```python
import pandas as pd
# 创建一个空的dataframe
a = pd.DataFrame()
date = [1, 3, 5]
score = [2, 4, 6]
a['date'] = date
a['score'] = score
print(a)

# 打印结果
'''
   date  score
0     1      2
1     3      4
2     5      6
'''
```

**（2）通过字典创建dataframe**

```python
import pandas as pd
# 通过字典创建dataframe
b = pd.DataFrame({'a': [1, 3, 5], 'b': [2, 4, 6]}, index=['x', 'y', 'z'])
print(b)

# 打印结果
'''
   a  b
x  1  2
y  3  4
z  5  6
'''
```

**用字典的键名作行索引**

```python
import pandas as pd
a = pd.DataFrame.from_dict({'a': [1, 2, 3], 'b': [4, 5, 6]}, orient='index')
b = pd.DataFrame.from_dict({'a': [1, 2, 3], 'b': [4, 5, 6]})
print(a)
print(b)
# 打印结果
'''
   0  1  2
a  1  2  3
b  4  5  6

   a  b
0  1  4
1  2  5
2  3  6
'''
```

**（3）通过二维数组****创建****dataframe**

```python
import numpy as np
import pandas as pd
# 创建一个三行四列的随机数（从5开始，到29结束，步长2）
a = np.arange(5, 29, 2).reshape(3, 4)
# 用pandas转换成二维数组
b = pd.DataFrame(a, index=[1, 2, 3], columns=['A', 'B', 'C', 'D'])
print(a)
print(b)
# 打印结果
'''
[[ 5  7  9 11]
 [13 15 17 19]
 [21 23 25 27]]
 
    A   B   C   D
1   5   7   9  11
2  13  15  17  19
3  21  23  25  27
'''import numpy as np
import pandas as pd
# 创建一个三行四列的随机数（从5开始，到29结束，步长2）
a = np.arange(5, 29, 2).reshape(3, 4)
# 用pandas转换成二维数组
b = pd.DataFrame(a, index=[1, 2, 3], columns=['A', 'B', 'C', 'D'])
print(a)
print(b)
# 打印结果
'''
[[ 5  7  9 11]
 [13 15 17 19]
 [21 23 25 27]]
 
    A   B   C   D
1   5   7   9  11
2  13  15  17  19
3  21  23  25  27
'''
```

#### 2dataframe索引的修改

```python
import pandas as pd
# dataframe索引的修改
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]], columns=['date', 'score'], index=['A', 'B', 'C'])
a.index.name = '公司'
print(a)
# 打印结果
'''
    date  score
公司             
A      1      2
B      3      4
C      5      6
'''
```

**重命名索引rename()**

**语法**

```python
import pandas as pd
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]], columns=['date', 'score'], index=['A', 'B', 'C'])
a.index.name = '公司'
a = a.rename(index={'A': '万科', 'B': '阿里', 'C': '百度'}, columns={'date': '日期', 'score': '分数'})
print(a)
# 打印结果
'''
    日期  分数
公司        
万科   1   2
阿里   3   4
百度   5   6
'''
```

**索引重命名inplace=Trueinplace=True**

```python

import pandas as pd
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]], columns=['date', 'score'], index=['A', 'B', 'C'])
a.index.name = '公司'
a.rename(index={'A': '万科', 'B': '阿里', 'C': '百度'}, columns={'date': '日期', 'score': '分数'}, inplace=True)
print(a)
# 打印结果
'''
    日期  分数
公司        
万科   1   2
阿里   3   4
百度   5   6
'''
```

reset_index()函数重置索引

**重置索引**

```python
import pandas as pd
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]], columns=['date', 'score'], index=['A', 'B', 'C'])
a.index.name = '公司'
a.rename(index={'A': '万科', 'B': '阿里', 'C': '百度'}, columns={'date': '日期', 'score': '分数'}, inplace=True)
a = a.reset_index()
print(a)
# 打印结果
'''
   公司  日期  分数
0  万科   1   2
1  阿里   3   4
2  百度   5   6
'''
```

**常规列转换行索引**

```python
import pandas as pd
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]], columns=['date', 'score'], index=['A', 'B', 'C'])
a.index.name = '公司'
a.rename(index={'A': '万科', 'B': '阿里', 'C': '百度'}, columns={'date': '日期', 'score': '分数'}, inplace=True)
a = a.reset_index()
# a = a.set_index('日期')
a.set_index('日期', inplace=True)
print(a)
# 打印结果
'''
    公司  分数
日期        
1   万科   2
3   阿里   4
5   百度   6
'''
```

### 3.5.2 文件的读取和写入

#### 1 文件读取

**表格读取**

```python
import pandas as pd
# 读取工作簿中的数据
# sheet_name 指定工作表,可以是工作名，也可以是数字
# encoding 编码方式
# index_col 索引列, 把某列放到最前面
# data = pd.read_excel('data.xlsx')
data = pd.read_excel('data.xlsx', sheet_name='0', index_col=1)
print(data)
# 打印结果
'''
    A1  C1  D1
B1            
B2  A2  C2  D2
B3  A3  C3  D3
'''
```

**csv读取**

```python
import pandas as pd
# 读取csv中的数据
# delimiter 指定csv文件的数据分隔符，默认为逗号
# encoding 编码方式
# index_col 索引列, 把某列放到最前面
data = pd.read_csv('data.csv')
data = pd.read_csv('data.csv', delimiter=',', encoding='utf-8', index_col=2)
print(data)
# 打印结果
'''
    A1  B1  D1
C1            
C2  A2  B2  D2
C3  A3  B3  D3
'''
```

#### 2文件写入

**文件写入**

```python
import pandas as pd
data = pd.DataFrame([[1, 2], [3, 4], [5, 6]], columns=['A列', 'B列'])
data.to_excel('data.xlsx')
```

**练习集合**

```python
import pandas as pd
import numpy as np
#文件的写入
#data=pd.DataFrame([[1,2],[3,4],[5,6]],columns=['A列','B列'])#先创建一个DataFrame
#data.to_excel('data01.xlsx')#将DataFrame中的数据写入Excel工作簿(已运行成功，重复运行会出错）
#data.to_excel('data02.xlsx',columns=['A列'],index=False)(已运行成功，重复运行会出错）
#文件的读取
#data=pd.read_excel('data.xlsx',sheet_name=0,encoding='utf-8')#读取EXCEL文件，data为DataFrame结构,sheetname指定工作表，此处是第一个工作表。编码为utf-8
#data01=pd.read_csv('data.csv',delimiter=',',encoding='utf-8')#读取csv文件，delimiter参数用于指定CSV文件中的分隔符，默认逗号
#print(data)
#数据的读取与编辑——按照行提取
#data03=pd.DataFrame([[1,2,3],[4,5,6],[7,8,9]],index=['r1','r2','r3'],columns=['c1','c2','c3'])#方法一
data03=pd.DataFrame(np.arange(1,10).reshape(3,3),index=['r1','r2','r3'],columns=['c1','c2','c3'])#方法二
a=data03['c1']#读取c1列，返回一维的series类型的数据
b=data03[['c1']]#返回二维数据
c=data03[['c1','c3']]#返回多列,[]中指定列表
d=data03[1:3]#按照行读取数据
h=data03.iloc[1:3]#pandas库推荐用iloc方法根据行序号读取数据，直观
g=data03.iloc[-1]#读取单行，需用iloc
e=data03.head(2)#通过loc读取头两行
f=data03.loc[['r2','r3']]#loc根据行名称读取

#数据的读取与编辑——按照区块读取数据
i=data03[['c1','c3']][0:2]#取第一道第三行，c1和c3列数据
j=data03.iloc[0:2][['c1','c3']]#采用iloc取第一道第三行，c1和c3列数据
k=data03.iloc[0]['c3']#取data03的第一行，c3列的值
l=data03.loc[['r1','r2'],['c1','c3']]#loc方法使用字符串作为索引
m=data03.iloc[0:2,[0,1,2]]#使用数字作为索引
#数据的运算
data03['c4']=data03['c3']-data03['c1']#通过c3列-c1列得出c4列数据，并创造新的一列写入
data03.head()#输出前5行，若少于5行则全部输出
print(data03)
#数据的筛选
n=data03[data03['c1']>1]#筛选出c1列中数字大于1的行
o=data03[(data03['c1']>1)&(data03['c2']==5)]#筛选出c1列中数字大于1的行和c2数字等于5行
#数据的排序
p=data03.sort_values(by='c2',ascending=False)#by参数用于指定根据c2列来排序，ascending参数为上升的意思,默认为true,false为降序
q=data03.sort_index(ascending=False)#根据行索引进行排序
#数据的删除
#DataFrame.drop(index=None,columns=None,inplace=False)#index用于指定删除的行，columns用于指定更要删除的列，inplace默认为False,表示该删除操作不改变原表格，而是返回一个执行后的新DataFrame
r=data03.drop(index=['r1'],columns=['c1'],inplace=False)
print(r)
```

### 3.5.3 数据的选取和处理

创建3行3列数据

**创建数据**

```python
import pandas as pd
data = pd.DataFrame([[1, 2, 3], [4, 5, 6], [7, 8, 9]], index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
print(data)
# 打印结果
'''
    c1  c2  c3
r1   1   2   3
r2   4   5   6
r3   7   8   9
'''
```

**二维数组创建数据**

```python
import numpy as np
import pandas as pd
# 二维数组创建
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
print(data)
# 打印结果
'''
    c1  c2  c3
r1   1   2   3
r2   4   5   6
r3   7   8   9
'''
```

#### **1数据的选取**

**（1）按列选取数据**

**获取一维数组**

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# 按列选取数据，获得一个一维数据，不包含列索引信息
data = data['c1']
print(data)
# 打印结果
'''
r1    1
r2    4
r3    7
Name:
 c1, dtype: int32
'''
```

**获取二维数组**

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# 获取一维数据
a = data['c1']
# 获取二维数据
b = data[['c1']]
print(a)
print(b)
# 打印结果
'''
r1    1
r2    4
r3    7
Name: c1, dtype: int32
    c1
r1   1
r2   4
r3   7
'''
```

**获取多列数据**

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# 获取一维数据
a = data['c1']
# 获取二维数据
b = data[['c1']]
# 获取多列数据
c = data[['c1', 'c3']]
print(a)
print(b)
print(c)
# 打印结果
'''
r1    1
r2    4
r3    7
Name: c1, dtype: int32
    c1
r1   1
r2   4
r3   7
    c1  c3
r1   1   3
r2   4   6
r3   7   9
'''
```

**（2）按行选取数据**

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# 选取2,3行数据，不建议使用
a = data[1: 3]
# 根据行序号选取数据
b = data.iloc[1: 3]
# 选取倒数第一行
c = data.iloc[-1]
# 根据行的名称来选取数据
d = data.loc[['r2', 'r3']]
# 选取前5行
e = data.head()
print(a)
print(b)
print(c)
print(d)
print(e)
# 打印结果
'''
    c1  c2  c3
r2   4   5   6
r3   7   8   9
    c1  c2  c3
r2   4   5   6
r3   7   8   9
c1    7
c2    8
c3    9
Name: r3, dtype: int32
    c1  c2  c3
r2   4   5   6
r3   7   8   9
    c1  c2  c3
r1   1   2   3
r2   4   5   6
r3   7   8   9

Process finished with exit code 0
'''
```

**（3）按区块选取数据**

loc使用字符串作为索引*
*iloc使用数字作为索引

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# 选取某几行几列数据
a = data[['c1', 'c3']][0:2] # 或data[0: 2][['c1', 'c3']]
# 官方推荐 先iloc选取行，在选取列
b = data.iloc[0:2][['c1', 'c3']]
# 选取单个数据
c = data.iloc[0]['c3']
# loc使用字符串做索引
d = data.loc[['r1', 'r3'], ['c1', 'c3']]
# iloc使用数字做索引
e = data.iloc[0:2, [0, 2]]
# loc使用字符串作为索引
# iloc使用数字作为索引

print(a)
print(b)
print(c)
print(d)
print(e)
# 打印结果
'''
    c1  c3
r1   1   3
r2   4   6
    c1  c3
r1   1   3
r2   4   6
3
    c1  c3
r1   1   3
r3   7   9
    c1  c3
r1   1   3
r2   4   6
'''
```

#### 2数据的筛选

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# c1大于1的行
a = data[data['c1'] > 1]
# 多个筛选条件，&且 | 或 （c1列大于1且c2列等于5）
b = data[(data['c1'] > 1) & (data['c2'] == 5)]
print(a)
print(b)
# 打印结果
'''
    c1  c2  c3
r2   4   5   6
r3   7   8   9
    c1  c2  c3
r2   4   5   6
'''
```

#### 3数据的排序

**数据的排列**

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# c2降序排列(BY哪列，ascending上升)
a = data.sort_values(by='c2', ascending=False)
print(a)
# 打印结果
'''
    c1  c2  c3
r3   7   8   9
r2   4   5   6
r1   1   2   3
'''
```

**索引排序**

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# c2降序排列(BY哪列，ascending上升)
a = data.sort_values(by='c2', ascending=False)
# 按行索引进行排序
a = a.sort_index()
print(a)

# 打印结果
'''
    c1  c2  c3
r1   1   2   3
r2   4   5   6
r3   7   8   9
'''
```

#### 4数据的运算

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
data['c4'] = data['c3'] - data['c1']
print(data)
# 打印结果
'''
    c1  c2  c3  c4
r1   1   2   3   2
r2   4   5   6   2
r3   7   8   9   2
'''
```

#### 5数据的删除

```python
import numpy as np
import pandas as pd
data = pd.DataFrame(np.arange(1, 10).reshape(3, 3), index=['r1', 'r2', 'r3'], columns=['c1', 'c2', 'c3'])
# 删除c1列数据
a = data.drop(columns='c1')
# 删除多列数据
b = data.drop(columns=['c1', 'c3'])
#  删除多行数据
c = data.drop(index=['r1', 'r3'])
# 改变结构
d = data.drop(index=['r1', 'r3'],inplace=True)
print(a)
print(b)
print(c)
print(d)
# 打印结果
'''
    c2  c3
r1   2   3
r2   5   6
r3   8   9
    c2
r1   2
r2   5
r3   8
    c1  c2  c3
r2   4   5   6
None
'''
```

### 3.5.4 数据表的拼接

#### 1.merge()函数merge合并，默认取交集，共有的，并集how

```python
import numpy as np
import pandas as pd
df1 = pd.DataFrame({'公司': ['恒盛', '创锐', '快学'], '分数': [90, 95, 85]})
df2 = pd.DataFrame({'公司': ['恒盛', '创锐', '京西'], '股价': [20, 180, 30]})
# merge合并，默认取交集，共有的，并集how
df3 = pd.merge(df1, df2)
# 如果同名的由多列，on指定按照哪列进行合并
df4 = pd.merge(df1, df2, on='公司')
# 取并集，选取所有内容
df5 = pd.merge(df1, df2, how='outer')
# 保留左边全部内容
df6 = pd.merge(df1, df2, how='left')
# 保留右边全部内容
df7 = pd.merge(df1, df2, how='right')
# 按照索引合并
df8 = pd.merge(df1, df2, left_index=True, right_index=True)
print(df1)
print(df2)
print(df3)
print(df4)
print(df5)
print(df6)
print(df7)
print(df8)
# 打印结果
'''
   公司  分数
0  恒盛  90
1  创锐  95
2  快学  85
   公司   股价
0  恒盛   20
1  创锐  180
2  京西   30
   公司  分数   股价
0  恒盛  90   20
1  创锐  95  180
   公司  分数   股价
0  恒盛  90   20
1  创锐  95  180
   公司    分数     股价
0  恒盛  90.0   20.0
1  创锐  95.0  180.0
2  快学  85.0    NaN
3  京西   NaN   30.0
   公司  分数     股价
0  恒盛  90   20.0
1  创锐  95  180.0
2  快学  85    NaN
   公司    分数   股价
0  恒盛  90.0   20
1  创锐  95.0  180
2  京西   NaN   30
  公司_x  分数 公司_y   股价
0   恒盛  90   恒盛   20
1   创锐  95   创锐  180
2   快学  85   京西   30
'''
```

#### 2.concat()函数 拼接

```python
import numpy as np
import pandas as pd
df1 = pd.DataFrame({'公司': ['恒盛', '创锐', '快学'], '分数': [90, 95, 85]})
df2 = pd.DataFrame({'公司': ['恒盛', '创锐', '京西'], '股价': [20, 180, 30]})
# concat()函数，拼接
df3 = pd.concat([df1, df2])
# 另一种写法
df4 = pd.concat([df1, df2], axis=0)
# 重置索引
df5 = pd.concat([df1, df2], ignore_index=True)
# 横向拼接，按列方向连接
df6 = pd.concat([df1, df2], axis=1)
print(df3)
print(df4)
print(df5)
print(df6)
# 打印结果
'''
   公司    分数     股价
0  恒盛  90.0    NaN
1  创锐  95.0    NaN
2  快学  85.0    NaN
0  恒盛   NaN   20.0
1  创锐   NaN  180.0
2  京西   NaN   30.0
   公司    分数     股价
0  恒盛  90.0    NaN
1  创锐  95.0    NaN
2  快学  85.0    NaN
0  恒盛   NaN   20.0
1  创锐   NaN  180.0
2  京西   NaN   30.0
   公司    分数     股价
0  恒盛  90.0    NaN
1  创锐  95.0    NaN
2  快学  85.0    NaN
3  恒盛   NaN   20.0
4  创锐   NaN  180.0
5  京西   NaN   30.0
   公司  分数  公司   股价
0  恒盛  90  恒盛   20
1  创锐  95  创锐  180
2  快学  85  京西   30
'''
```

#### 3.append()函数

```python
import numpy as np
import pandas as pd
df1 = pd.DataFrame({'公司': ['恒盛', '创锐', '快学'], '分数': [90, 95, 85]})
df2 = pd.DataFrame({'公司': ['恒盛', '创锐', '京西'], '股价': [20, 180, 30]})
# append()函数，纵向拼接
df3 = df1.append(df2)
# 新增元素
df4 = df1.append({'公司': '腾飞', '分数': '90'}, ignore_index=True)
print(df3)
print(df4)
# 打印结果
'''
   公司    分数     股价
0  恒盛  90.0    NaN
1  创锐  95.0    NaN
2  快学  85.0    NaN
0  恒盛   NaN   20.0
1  创锐   NaN  180.0
2  京西   NaN   30.0
   公司  分数
0  恒盛  90
1  创锐  95
2  快学  85
3  腾飞  90
'''
```

# 3.6 数据可视化模块——matplotlib

### 3.6.1绘制折线图

```python
import matplotlib.pylab as plt
x = [1, 2, 3, 4, 5， 6]
y = [2, 4, 6, 8, 10, 12]
# 绘制折线图
plt.plot(x, y)
plt.show()
```

![img](https://cdn.jsdelivr.net/gh/cxyo/hexo/img1652712911458-76ac6291-6327-4b02-b7cf-762437b86208.png)

### 3.6.2绘制柱状图

```python
import matplotlib.pyplot as plt
x = [1, 2, 3, 4, 5, 6]
y = [6, 5, 4, 3, 2, 1]
# 绘制柱状图
plt.bar(x, y)
plt.show()
```

![img](https://cdn.jsdelivr.net/gh/cxyo/hexo/img1652713005150-094b973d-3a70-4407-a760-0f7ad532450c.png)

# 3.7模块的交互

### 3.7.1 xlwings模块与pandas模块的交互

```python
import xlwings as xw
import pandas as pd
app = xw.App(visible=False)
workbook = app.books.add()
worksheet = workbook.sheets.add('新工作薄')
df = pd.DataFrame([[1, 2], [3, 4]], columns=['a', 'b'])
worksheet.range('A1').value = df
workbook.save(r'table.xlsx')
workbook.close()
app.quit()
```

![img](https://cdn.jsdelivr.net/gh/cxyo/hexo/img1652713216674-16aa791e-42d1-4782-9af7-bb90309842b5.png)

### 3.7.2 xlwings模块与matplotlib模块的交互

```python
import xlwings as xw
import matplotlib.pyplot as plt
figure = plt.figure()
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
plt.plot(x, y)
app = xw.App(visible=False)
workbook = app.books.add()
worksheet = workbook.sheets.add('新工作表')
# 将绘制的图标写入工作薄
# figure为固定写法，代表之前用matplotlib绘制图标
# name用于指定图表名称
# update设置为true，后续通过pictures.add()调用具有相同名称的图表时，可以只更新数据，不用更改位置和大小
# left 用于设置图表左侧边距，top为顶边距
worksheet.pictures.add(figure, name='图片1', update=True, left=100)
workbook.save(r'table1.xlsx')
workbook.close()
app.quit()
```

![img](https://cdn.jsdelivr.net/gh/cxyo/hexo/img1652713387533-ec18f569-4142-44e9-8197-a916d3213eef.png)

# 统计模型和统计数据模块statsmodels

# 数据挖掘和数据分析模块sklearn

# 第4章 使用python批量处理工作薄和工作表

## 案例1 批量新建并保存工作薄

```python
# 导入xlwings模块
import xlwings as xw
# 启动excel程序，但不新建工作薄，visible显示窗口，add_book新建空白工作簿
app = xw.App(visible=True, add_book=False)
#range里面是循环次数
for i in range(6):
    workbook = app.books.add()# 新建工作薄
    workbook.save(f'test{i}.xlsx')# 保存新建的多个工作薄
```

### f-string方法

该方法以f或F修饰引领字符串，然后在字符串中以大括号｛｝标明被替代的内容。该方法无需事先转换数据类型进呢将不同类型的数据拼接成字符串。

```python
name = '小明'
age = 18
a = f'{name}今年{age}岁。'
print(a)
# 打印结果
'''
小明今年18岁
'''
```

### 举一反三 批量新建并关闭工作薄

```python
# 导入xlwings模块
import xlwings as xw
# 启动excel程序，但不新建工作薄
app = xw.App(visible=True, add_book=False)
#循环
for i in range(6):
    workbook = app.books.add()# 新建工作薄
    workbook.save(f'test{i}.xlsx')# 保存新建的多个工作薄
    workbook.close()# 关闭当前工作薄
app.quit()# 退出excel程序
```

## 案例2 批量打开一个文件夹下的所有工作薄

**分离文件名和扩展名语法**

```python
os.path.splitext(path)
```

**打开该文件夹下所有表格**

```python
import os  # 导入OS模块
import xlwings as xw  # 导入xlwings模块
file_path = 'd:\\pythonProject\\table'  # 给出工作薄所在的文件夹路径
file_list = os.listdir(file_path)  # 列出路径下所有文件和子文件夹的名称
print(file_list)
app = xw.App(visible=True, add_book=False)  # 启动excel程序
for i in file_list:
	# if os.path.splitext(i)[1] == '.xlsx':  # 判断文件夹下文件的扩展名是否为xlsx
	if os.path.splitext(i)[1] == '.xlsx' or os.path.splitext(i)[1] == '.xls':  # 判断文件夹下文件的扩展名是否为xlsx或者为xls
		app.books.open(file_path + '\\' + i)  # 打开工作薄
```

### 举一反三 列出文件夹下所有文件和子文件夹的名称

```python
import os  # 导入OS模块
import xlwings as xw  # 导入xlwings模块
file_path = 'd:\\pythonProject\\table'  # 给出工作薄所在的文件夹路径
file_list = os.listdir(file_path)  # 列出路径下所有文件和子文件夹的名称
for i in file_list:
	print(i)
```

## 案例3批量重命名一个工作薄中的所有工作表

**获取工作薄中所有工作表**

```python
worksheets = workbook.sheets
```

**重命名工作表**

```python
worksheets[i].name = worksheets[i].name.replace('销售', '产品')  # 注意不能为空 
```

**直接保存工作簿**

```python
workbook.save()
```

**批量重命名一个工作薄中的所有工作表**

```python
import xlwings as xw  # 导入xlwings模块
app = xw.App(visible=False, add_book=False)  # 启动表格程序
workbook = app.books.open('d:\\pythonProject\\excel\\table\\产品统计表.xlsx')  # 打开工作薄
worksheets = workbook.sheets  # 获取工作薄中所有工作表
for i in range(len(worksheets)):  # 遍历获取到的工作表
	worksheets[i].name = worksheets[i].name.replace('销售', '产品')  # 重命名工作表
workbook.save('d:\\pythonProject\\excel\\table\\产品统计表1.xlsx')  # 另存重命名工作表后的工作簿
# 退出表格
app.quit()
```

### 获取所有工作表

#### 工作表的序列

workbook.sheets

#### 工作表的个数

for循环语句的循环次数

#### 序列的长度也就是工作表的个数

len(worksheets)

#### 根据序号来选中工作表，选中后用工作表的name属性获取工作表的字符串，再将获取到的字符串用replace()函数进行查找和替换，完成重新赋值给name属性。

worksheets[i].name = worksheets[i].name.replace('销售', '产品')

#### 根据工作表的个数生成一个从0开始的整数序列

range(len(worksheets))

### 举一反三 批量重命名一个工作薄中的部分工作表

```python
import xlwings as xw  # 导入xlwings模块
app = xw.App(visible=False, add_book=False)  # 启动表格程序
workbook = app.books.open('d:\\pythonProject\\excel\\table\\产品统计表.xlsx')  # 打开工作薄
worksheets = workbook.sheets  # 获取工作薄中所有工作表
for i in range(len(worksheets))[0:5]:  # 通过切片来选中部分表格
	worksheets[i].name = worksheets[i].name.replace('销售', '数据')  # 重命名工作表
workbook.save('d:\\pythonProject\\excel\\table\\产品统计表2.xlsx')  # 另存重命名工作表后的工作薄
app.quit()  # 退出程序
```

## 案例4批量重命名多个工作薄

```python
import os  # 导入 OS模块
file_path = 'd:\\pythonProject\\excel\\table\\产品销售表'  # 给出待重命名工作簿所在文件夹的路径
file_list = os.listdir(file_path)  # 列出文件夹下所有文件和子文件夹的名称
old_book_name = '销售表'  # 给出工作薄名中需要替换的旧关键字
new_book_name = '分部产品销售表'  # 给出工作薄名中要替换为的新关键字
for i in file_list:  # 循环遍历
	if i.startswith('~$'):  # 判断是否由文件名以“~$”开头的临时文件
		continue  # 如果有，则跳过这种类型的文件
	new_file = i.replace(old_book_name, new_book_name)  # 执行查找和替换，生成新的工作薄名
	old_file_path = os.path.join(file_path, i)  # 构造需要重命名工作薄的完整路径
	new_file_path = os.path.join(file_path, new_file)  # 构造重命名后工作薄的完整路径
	os.replace(old_file_path, new_file_path)  # 执行重命名
```

#### 判断字符串是否以指定字符或子字符串开头。

语法：str.endswith("suffix", start, end) 或

str[start,end].endswith("suffix")    用于判断字符串中某段字符串是否以指定字符或子字符串结尾。

—> bool    返回值为布尔类型（True,False）

suffix — 后缀，可以是单个字符，也可以是字符串，还可以是元组（"suffix"中的引号要省略）。

start —索引字符串的起始位置。

end — 索引字符串的结束位置。

str.endswith(suffix)  star默认为0，end默认为字符串的长度减一（len(str)-1）

```python
str = "hello,i love python"
print("1:",str.startswith("h"))
print("2:",str.startswith("l",2,10))# 索引 llo,i lo 是否以“n”结尾。
print("3:",str.startswith("")) #空字符
print("4:",str[0:6].startswith("h")) # 只索引  hello,
print("5:",str[0:6].startswith("e"))
print("6:",str[0:6].startswith(""))
print("7:",str.startswith(("h","z")))#遍历元组的元素，存在即返回True，否者返回False
print("8:",str.startswith(("k","m")))
# 打印结果
'''
1: True
2: True
3: True
4: True
5: False
6: True
7: True
8: False
'''
```

#### python路径拼接os.path.join()函数的用法

os.path.join()函数：连接两个或更多的路径名组件

​               1.如果各组件名首字母不包含’/’，则函数会自动加上

　　　　2.第一个以”/”开头的参数开始拼接，之前的参数全部丢弃,当有多个时，从最后一个开始

　　　　3.如果最后一个组件为空，则生成的路径以一个’/’分隔符结尾

print("2:",os.path.join('/aaaa','/bbbb','/ccccc.txt')) #不良写法习惯

​     \>>>2: /ccccc.txt

print("22:",os.path.join('/aaaa/','bbbb/','ccccc.txt')) #通常可以这样写

   \>>>22: aaaa/bbb/ccccc.txt

```python
import os

Path1 = 'home'
Path2 = 'develop'
Path3 = 'code'

Path10 = Path1 + Path2 + Path3
Path20 = os.path.join(Path1, Path2, Path3)
print('Path10 = ', Path10)
print('Path20 = ', Path20)
# 打印结果
'''
Path10 =  homedevelopcode
Path20 =  home\develop\code
'''
```

### 举一反三 批量重命名多个工作薄中的同名工作表

```python
import os  # 导入 OS模块
import xlwings as xw
file_path = 'd:\\pythonProject\\excel\\table\\信息表'  # 给出待重命名工作簿所在文件夹的路径
file_list = os.listdir(file_path)  # 列出文件夹下所有文件和子文件夹的名称
old_sheet_name = 'Sheet1'  # 给出工作薄名中需要替换的旧关键字
new_sheet_name = '员工信息'  # 给出工作薄名中要替换为的新关键字
app = xw.App(visible=False, add_book=False)  # 启动表格程序
for i in file_list:  # 循环遍历
	if i.startswith('~$'):  # 判断是否由文件名以“~$”开头的临时文件
		continue  # 如果有，则跳过这种类型的文件
	old_file_path = os.path.join(file_path, i)  # 构造需要重命名工作薄的完整路径
	workbook = app.books.open(old_file_path)  # 打开表格
	for j in workbook.sheets:
		if j.name == old_sheet_name:  # 判断工作表名是否为“Sheet1”
			j.name = new_sheet_name  # 如果是，则重命名工作表
	workbook.save()  # 保存工作表
app.quit()  # 退出表格
```

## 案例5在多个工作薄中批量新增工作表

```python
import os  # 导入OS模块
import xlwings as xw  # 导入xlwings模块
file_path = 'd:\\pythonProject\\excel\\table\\销售表'  # 给出要新增工作表的工作薄所在的文件夹路径
file_list = os.listdir(file_path)   # 列出文件夹下所有文件夹和子文件夹的名称
sheet_name = '产品销售区域'  # 给出要新增的工作表的名称
app = xw.App(visible=False, add_book=False)  # 启动excel程序
for i in file_list:
	if i.startswith('~$'):  # 判断是否由文件名以“~$”开头的文件
		continue  # 如果有，则跳过该文件
	file_paths = os.path.join(file_path, i)   # 构造需要新增工作表的工作薄的文件路径
	workbook = app.books.open(file_paths)  # 根据路径打开需要新增工作表的工作薄
	sheet_names = [j.name for j in workbook.sheets]  # 获取打开的工作薄中所有工作表的名称
	if sheet_name not in sheet_names:  # 判断工作薄中是否不存在名为“产品销售区域”的工作表
		workbook.sheets.add(sheet_name)  # 如果不存在，则新增工作表“产品销售区域”
		workbook.save()  # 保存工作薄
app.quit()  # 退出excel程序
```

### 举一反三 在多个工作薄中批量删除工作表

```python
import os  # 导入OS模块
import xlwings as xw  # 导入xlwings模块
file_path = 'd:\\pythonProject\\excel\\table\\销售表'  # 给出要新增工作表的工作薄所在的文件夹路径
file_list = os.listdir(file_path)   # 列出文件夹下所有文件夹和子文件夹的名称
sheet_name = '产品销售区域'  # 给出要新增的工作表的名称
app = xw.App(visible=False, add_book=False)  # 启动excel程序
for i in file_list:
	if i.startswith('~$'):  # 判断是否由文件名以“~$”开头的文件
		continue  # 如果有，则跳过该文件
	file_paths = os.path.join(file_path, i)   # 构造需要新增工作表的工作薄的文件路径
	workbook = app.books.open(file_paths)  # 根据路径打开需要新增工作表的工作薄
	for j in workbook.sheets:
		if j.name == sheet_name:  # 判断工作薄中是否有名为“产品销售区域”的工作表
			j.delete()  # 如果有，则删除该工作表
			break
	workbook.save()  # 保存工作薄
app.quit()  # 退出excel程序
```

## 案例6批量打印工作薄

```python
import os  # 导入OS模块
import xlwings as xw  # 导入xlwings模块
file_path = 'd:\\pythonProject\\excel\\table\\公司'  # 给出要新增工作表的工作薄所在的文件夹路径
file_list = os.listdir(file_path)   # 列出文件夹下所有文件夹和子文件夹的名称
sheet_name = '产品销售区域'  # 给出要新增的工作表的名称
app = xw.App(visible=False, add_book=False)  # 启动excel程序
for i in file_list:
	if i.startswith('~$'):  # 判断是否由文件名以“~$”开头的文件
		continue  # 如果有，则跳过该文件
	file_paths = os.path.join(file_path, i)  # 获取需要打印的工作薄
	workbook = app.books.open(file_paths)  # 打开要打印的工作薄
	workbook.api.PrintOut()  # 打印工作薄
app.quit()  # 退出excel程序
```

#### PrintOut()函数

**PrintOut()函数语法**

```python
Print(From, To, Copies, Preview, ActivePrinter, PrintToFile, Collate, PrToFileName)
```

**批量打印工作薄里面的所有工作表**

```python
import xlwings as xw
app = xw.App(visible=False,add_book=False) #启动Excel程序
workbook = app.books.open('各月销售数量表.xlsx') #打开要打印的工作簿
workbook.api.PrintOut(Copies=2,ActivePrinter='DESKTOP-HP01',Collate=True) #打印工作簿  
# 参数Copies用于指定打印份数，如果省略该参数，则只打印一份；
# 参数ActivePrinter用于设置要使用的打印机的名称，如果省略该参数，则表示使用操作系统的默认打印机；
# 参数Collate如果为True，表示逐份打印。
workbook.close()
app.quit()
```

**打印一个工作簿中的一个工作表**

```python
import xlwings as xw
app = xw.App(visible=False,add_book=False) #启动Excel程序
workbook = app.books.open('各月销售数量表.xlsx') #打开要打印的工作簿
worksheet = workbook.sheets['1月'] #要打印的工作表
worksheet.api.PrintOut(Copies=2,ActivePrinter='DESKTOP-HP01',Collate=True) #打印指定工作表
workbook.close()
app.quit()
```

**打印多个工作簿**

```python
from pathlib import Path
import xlwings as xw
folder_path = Path('D:\各地区销售数量') #给出工作簿所在文件夹的路径
file_list = folder_path.glob('*.xlsx*') #获取文件夹下所有工作簿的文件路径
app = xw.App(visible=False,add_book=False) #启动Excel程序
for i in file_list:
    workbook = app.books.open(i) #打开一个工作簿
    workbook.api.PrintOut(Copies=1, ActivePrinter='DESKTOP-HP01', Collate=True)  # 打印工作簿
    workbook.close()
app.quit()
```

**按指定的缩放比例打印工作表**

```python
import xlwings as xw
app = xw.App(visible=False,add_book=False) #启动Excel程序
workbook = app.books.open('销售表.xlsx') #打开指定的工作簿
worksheet = workbook.sheets['总表'] #指定工作簿中的工作表‘总表’
worksheet.api.PageSetup.Zoom = 80 #设置打印工作表的缩放比例
worksheet.api.PrintOut(Copies=2,ActivePrinter='DESKTOP-HP01',Collate=True) #打印工作表
workbook.close()
app.quit()
```

**在纸张的居中位置打印工作表**

```python
import xlwings as xw
app = xw.App(visible=False,add_book=False) #启动Excel程序
workbook = app.books.open('各月销售数量表.xlsx') #打开指定的工作簿
worksheet = workbook.sheets['1月'] #指定工作簿中的工作表‘总表’
worksheet.api.PageSetup.PrintHeadings = True #设置打印工作表时打印行号和列号
worksheet.api.PrintOut(Copies=1,ActivePrinter='DESKTOP-HP01',Collate=True) #打印工作表
workbook.close()
app.quit()
```

**重复打印工作表的标题行**

```python
import xlwings as xw
app = xw.App(visible=False,add_book=False) #启动Excel程序
workbook = app.books.open('销售表.xlsx') #打开指定的工作簿
worksheet = workbook.sheets['总表'] #指定工作簿中的工作表‘总表’
worksheet.api.PageSetup.PrintTitleRows = '$1:$1' #将工作表的第1行设置为要重复打印的标题行
worksheet.api.PageSetup.Zoom = 55 #设置打印工作表的缩放比例
worksheet.api.PrintOut(Copies=1,ActivePrinter='DESKTOP-HP01',Collate=True) #打印工作表
workbook.close()
app.quit()
```

### 举一反三 批量打印多个工作薄中的指定工作表

```python
import os
import xlwings as xw
file_path = 'e:\\table\\公司1'
file_list = os.listdir(file_path)
sheet_name = '产品分类表'  # 给出要打印的工作表的名称
app = xw.App(visible = False, add_book = False)
for i in file_list:
    if i.startswith('~$'):
        continue
    file_paths = os.path.join(file_path, i)
    workbook = app.books.open(file_paths)
    for j in workbook.sheets:
        if j.name == sheet_name:  # 判断工作薄中是否存在名为“产品分类表”的工作表
            j.api.PrintOut()  # 如果存在，就打印该工作表
            break
app.quit()  # 退出Excel表
```

## 案例7 将一个工作薄的所有工作表批量复制到其他工作薄的指定工作表中

```python
import os  # 导入os模块
import xlwings as xw  # 导入xlwings模块
app = xw.App(visible=False, add_book=False)
file_path = 'e:\\table\\销售表'   # 给出目标工作薄所在的文件夹路径
file_list = os.listdir(file_path)  # 列出文件夹下所有文件和子文件夹下的名称
workbook = app.books.open('e:\\table\\信息表.xlsx')  # 打开来源工作薄
worksheet = workbook.sheets  # 获取来源工作薄中的所有工作表
for i in file_list:  
    if os.path.splitext(i)[1] == '.xlsx':  # 判断文件是否是工作薄
        workbooks = app.books.open(file_path + '\\' + i)   # 如果是工作薄则将其打开
        for j in worksheet:  
            contents = j.range('A1').expand('table').value   # 读取来源工作薄中要复制的工作表数据
            name = j.name  # 获取来源工作薄中的工作表名称
            workbooks.sheets.add(name=name, after=len(workbooks.sheets))  # 在目标工作薄中新增同名工作表
            workbooks.sheets[name].range('A1').value = contents  # 将从来源工作薄中读取的工作表数据写入新增工作表
        workbooks.save()     # 保存目标工作薄
app.quit()  # 退出excel程序
```

##### 代码解析：

第4行和第6行代码中的文件夹路径和工作薄名称可根据实际情况更改。

第8-16行代码用于将来源工作薄中的所有工作表数据复制到目标工作薄中。

其中第9行代码用于判断文件夹中的文件是否是工作薄，

如果是就打开并做后续处理，否则不打开。

通过11-15行代码依次读取来源工作薄中的所有工作表数据，

然后在目标工作薄中新增同名工作簿并写入读取数据，

循环操作后，完成批量复制。

expand() 是xlwings模块中的函数，用于扩展选择范围，默认值为table，表示向整个数据表扩展。

也可以为down或right，表示向表的下方和右方扩展。

### 举一反三 将某个工作表的数据批量复制到其他工作薄的指定工作表中

```python
import os
import xlwings as xw
app = xw.App(visible=False, add_book=False)
file_patch = 'd:\\pythonProject\\excel\\table\\销售表1'
file_list = os.listdir(file_patch)
workbook = app.books.open('d:\\pythonProject\\excel\\table\\新增产品表.xlsx')
worksheet = workbook.sheets['新增产品']  # 选中工作表‘新增产品’
value = worksheet.range('A1').expand('table')  # 读取工作表‘新增产品’中的所有数据
start_cell = (2, 1)  # 给出要复制数据的单元格区域的起始单元格
end_cell = (value.shape[0], value.shape[1])  # 给出要复制数据的单元格区域的结束单元格
cell_area = worksheet.range(start_cell, end_cell).value  # 根据前面设定的单元格区域选取要复制的数据
for i in file_list:
	if os.path.splitext(i)[1] == '.xlsx':
		try:
			workbooks = xw.Book(file_patch + '\\' + i)
			sheet = workbooks.sheets['产品分类表']  # 选中要粘贴数据的工作表‘产品分类表’
			scope = sheet.range('A1').expand()  # 选中要粘贴数据的单元格区域
			sheet.range(scope.shape[0] + 1, 1).value = cell_area  # 粘贴数据
			workbooks.save()  # 保存目标工作薄
		finally:
			workbooks.close()  # 关闭目标工作薄
workbooks.close()  # 关闭来源工作薄
app.quit()  # 退出Excel程序
```



## 案例8 按条件将一个工作表拆分为多个工作薄（报错）

```python
import xlwings as xw
file_path = '产品统计表.xlsx'
sheet_name = '统计表'
app = xw.App(visible = True, add_book = False)
workbook = app.books.open(file_path)
worksheet = workbook.sheets[sheet_name]
value = worksheet.range('A2').expand('table').value
data = dict()
for i in range(len(value)):
    product_name = value[i][1]
    if product_name not in data:
        data[product_name] = []
    data[product_name].append(value[i])
for key,value in data.items():
    new_workbook = xw.books.add()
    new_worksheet = new_workbook.sheets.add(key)
    new_worksheet['A1'].value = worksheet['A1:H1'].value
    new_worksheet['A2'].value = value
    new_workbook.save('{}.xlsx'.format(key))
app.quit()
```



### 举一反三按条件将一个工作表拆分为多个工作表

**语法**

```python
1
```



### 举一反三将多个工作表拆分为多个工作薄

**语法**

```python
1
```



## 案例9批量合并多个工作薄中的同名工作表

**语法**

```python
1
```



### 举一反三将工作薄中有规律的工作表合并到一个工作表

**语法**

```python
1
```



# 第5章 使用python批量处理行、列和单元格

**语法**

```python
1
```



## 案例1精确调整多个工作薄的行高和列宽

**语法**

```python
1
```

### 举一反三 精确调整一个工作薄中所有工作表的行高和列宽

**语法**

```python
1
```

## 案例2 批量更改多个工作薄的数据格式

**语法**

```python
1
```

### 举一反三 批量更改多个工作薄的外观格式

**语法**

```python
1
```

## 案例3 批量替换多个工作薄的行数据

**语法**

```python
1
```

### 举一反三 批量替换多个工作薄中的单元格数据

**语法**

```python
1
```

### 举一反三 批量修改多个工作薄中指定工作表的列数据

**语法**

```python
1
```

## 案例4 批量提取一个工作薄中所有工作表的特定数据

**语法**

```python
1
```

### 举一反三 批量提取一个工作薄中所有工作表的列数据

**语法**

```python
1
```

### 举一反三 在多个工作薄中的指定工作表中批量追加行数据

**语法**

```python
1
```

## 案例5 对多个工作薄中指定工作表的数据进行分列

**语法**

```python
1
```

### 举一反三 批量合并多个工作薄中指定工作表的列数据

**语法**

```python
1
```

### 举一反三 将多个工作薄中指定工作表的列数据拆分为多行

**语法**

```python
1
```

## 案例6 批量提取一个工作薄中所有工作表的唯一值

**语法**

```python
1
```

### 举一反三 批量提取一个工作薄中所有工作表的唯一值并汇总

**语法**

```python
1
```

# 第6章 使用python批量进行数据分析

## 案例1批量升序排序一个工作薄中的所有工作表

```python
import xlwings as xw  # 导入xlwings模块
import pandas as pd  # 导入pandas模块
app = xw.App(visible=False, add_book=False)  # 启动excel程序
workbook = app.books.open('产品销售统计表.xlsx')  # 打开要升序排列的工作薄
worksheet = workbook.sheets  # 列出工作薄中的所有工作表
for i in worksheet:  # 遍历工作薄中的工作表
	values = i.range('A1').expand('table').options(pd.DataFrame).value  # 读取当前工作表的数据并转换为DataFrame格式
	result = values.sort_values(by='销售利润')  # 对销售利润列进行升序排列
	i.range('A1').value = result  # 将排序结果写入当前工作表，替换原有数据
workbook.save()  # 保存工作薄
workbook.close()  # 关闭工作薄
app.quit()  # 退出工作薄
```

### 举一反三 批量降序排序一个工作薄中的所有工作表

```python
import xlwings as xw  # 导入xlwings模块
import pandas as pd  # 导入pandas模块
app = xw.App(visible=False, add_book=False)  # 启动excel程序
workbook = app.books.open('产品销售统计表.xlsx')  # 打开要升序排列的工作薄
worksheet = workbook.sheets  # 列出工作薄中的所有工作表
for i in worksheet:  # 遍历工作薄中的工作表
	values = i.range('A1').expand('table').options(pd.DataFrame).value  # 读取当前工作表的数据并转换为DataFrame格式
	result = values.sort_values(by='销售利润', ascending= False)  # 对销售利润列进行降序排列
	i.range('A1').value = result  # 将排序结果写入当前工作表，替换原有数据
workbook.save()  # 保存工作薄
workbook.close()  # 关闭工作薄
app.quit()  # 退出工作薄
```

### 举一反三 批量排序多个工作薄中的数据

```python
import os
import xlwings as xw  # 导入xlwings模块
import pandas as pd  # 导入pandas模块
app = xw.App(visible=False, add_book=False)  # 启动excel程序
file_path = '产品销售统计表'
file_list = os.listdir(file_path)
for i in file_list:
	if os.path.splitext(i)[1] == '.xlsx':
		workbook = app.books.open(file_path + '\\' + i)
		worksheet = workbook.sheets
		for j in worksheet:
			values = j.range('A1').expand('table').options(pd.DataFrame).value
			result = values.sort_values(by='销售利润')
			j.range('A1').value = result
		workbook.save()  # 保存工作薄
		workbook.close()  # 关闭工作薄
app.quit()  # 退出工作薄
```

## 案例2 筛选一个工作薄中的所有工作表数据

**语法**

```python
1
```

### 举一反三 在一个工作薄中筛选一类别数据

**语法**

```python
1
```

## 案例3 对多个工作薄中的工作表分别进行分类汇总

**语法**

```python
import os  # 导入os模块
import xlwings as xw  # 导入xlwings模块
import pandas as pd  # 导入pandas模块
app = xw.App(visible=False, add_book=False)  # 启动excel表格
file_path = '销售表'  # 给出要分类汇总的工作薄所在的文件夹路径
file_list = os.listdir(file_path)  # 列出文件夹下所有文件和子文件夹的名称
for i in file_list:  # 遍历文件夹下的文件
	if os.path.splitext(i)[1] == '.xlsx':  # 判断文件是否是工作薄
		workbook = app.books.open(file_path + '\\' + i)  # 打开文件夹中的工作薄
		worksheet = workbook.sheets  # 列出工作簿中的所有工作表
		for j in worksheet:  # 遍历工作薄中的工作薄
			values = j.range('A1').expand('table').options(pd.DataFrame).value  # 读取当前工作表的数据
			values['销售利润'] = values['销售利润'].astype('float')  # 转换当前列的数据类型
			result = values.groupby('销售区域').sum()  # 根据当前列对数据进行分类汇总，汇总运算方式为求和
			j.range('j1').value = result['销售利润']  # 将各个区域的利润汇总结果写入当前工作表的当前列
		workbook.save()  # 保存
		workbook.close()  # 关闭
app.quit()  # 退出
```

### 举一反三 批量分类汇总多个工作吧中的指定工作表

**语法**

```python
1
```

### 举一反三 将多个工作薄数据分类汇总到一个工作薄

**语法**

```python
1
```

## 案例4 对一个工作薄中的所有工作表分别求和

**语法**

```python
1
```

### 举一反三 对一个工作薄中的所有工作表分别求和并将求和结果写入固定单元格

**语法**

```python
1
```

## 案例5 批量统计工作薄的最大值和最小值

**语法**

```python
1
```

### 举一反三 批量统计一个工作薄中所有工作表的最大值和最小值

**语法**

```python
1
```

## 案例6 批量制作数据透视表

**语法**

```python
1
```

### 举一反三 为一个工作薄的所有工作表制作数据透视表

**语法**

```python
1
```

## 案例7 使用相关系数判断数据的相关性

**语法**

```python
1
```

### 举一反三 求单个变量和其他变量间的相关性

**语法**

```python
1
```

## 案例8 使用方差分析对比数据的差异

**语法**

```python
1
```

### 举一反三 绘制箱形图识别异常值

**语法**

```python
1
```

## 案例9 使用描述统计和直方图制定目标

**语法**

```python
1
```

### 举一反三 使用之定义区间绘制直方图

**语法**

```python
1
```

## 案例10 使用回归分析预测未来值

**语法**

```python
1
```

### 举一反三 使用回归方程计算预测值

**语法**

```python
1
```

# 第7章 使用python制作简单的图表并设置图表元素

**语法**

```python
1
```

## 案例1 在python中制作简单的图表

**语法**

```python
1
```

### 举一反三 在python中制作柱状图

**语法**

```python
1
```

### 举一反三 在python中制作条形图

**语法**

```python
1
```

### 举一反三 在python中制作饼图

**语法**

```python
1
```

## 案例2 在python中导入excel数据制作简单的图表

**语法**

```python
1
```

### 举一反三 导入数据制作散点图

**语法**

```python
1
```

### 举一反三 导入数据制作面积图

**语法**

```python
1
```

## 案例3 在python中制作组合图表

**语法**

```python
1
```

### 举一反三 制作双折线图

**语法**

```python
1
```

## 案例4 添加并设置图表标题和坐标轴标题

**语法**

```python
1
```

### 举一反三 添加图例

**语法**

```python
1
```

## 案例5 添加并设置数据标签

**语法**

```python
1
```

### 举一反三 设置y轴的取值范围

**语法**

```python
1
```

## 案例6 为组合图表添加并设置次坐标轴

**语法**

```python
1
```

### 举一反三 添加并设置网格线

**语法**

```python
1
```

# 第8章 使用python制作常用图表

**语法**

```python
1
```

## 案例1 制作柱形图展示数据的对比关系

**语法**

```python
1
```

### 举一反三 批量制作条形图

**语法**

```python
1
```

## 案例2 制作折线图展示数据的变化趋势

**语法**

```python
1
```

### 举一反三 制作折线图并为最高点添加数据标签

**语法**

```python
1
```

### 举一反三 制作平滑折线图

**语法**

```python
1
```

## 案例3 制作散点图判断两组数据的相关性

**语法**

```python
1
```

### 举一反三 为散点图添加线性趋势线

**语法**

```python
1
```

### 举一反三 制作气泡图

**语法**

```python
1
```

## 案例4 制作饼图展示部分和总体的比列关系

**语法**

```python
1
```

### 举一反三 制作圆饼图

**语法**

```python
1
```

## 案例5 制作雷达图对比多项指标

**语法**

```python
1
```

### 举一反三 制作某一品牌性能评价指标雷达图

**语法**

```python
1
```

## 案例6 制作温度计图展示工作进度

**语法**

```python
1
```

### 举一反三 制作上半年销售业绩的温度计图

**语法**

```python
1
```

# 第9章 在excel中调用python代码

**语法**

```python
1
```

## 9.1 在工作表中调用python自定义函数

**语法**

```python
1
```

### 9.1.1 在excel中加载xlwings插件

**语法**

```python
1
```

### 9.1.2  导入并调用python自定义函数

**语法**

```python
1
```

## 9.2 在VBA中调用python自定义函数

**语法**

```python
1
```

### 9.2.1 通过命令创建文件并调用python自定义函数

**语法**

```python
1
```

### 9.2.2 手动创建文件并调用python自定义函数

**语法**

```python
1
```

### 9.2.3 vba代码和python代码的混合使用

**语法**

```python
1
```

## 9.3 将python代码转换为可执行程序

**语法**

```python
1
```

### 9.3.1 pyinstaller模块的语法和参数含义

**语法**

```python
1
```

### 9.3.2 将python代码打包成课执行程序

**语法**

```python
1
```

### 9.3.3 打包文件的实际应用

**语法**

```python
1
```

