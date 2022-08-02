---
title: python爬取集思录数据分析
date: 2018-06-18 18:18:18
categories: 
 - 爬虫
tags:
 - 爬虫
sticky: 91
---

# python爬取集思录数据分析

```python
import requests
import json
import pandas as pd
etfapi ="https://www.jisilu.cn/data/etf/etf_list/?___jsl=LST___t=1642587922344&rp=25&page=1"
etfurl = json.loads(requests.get(etfapi).text)["rows"]
omapi ="https://www.jisilu.cn/data/qdii/qdii_list/E?___jsl=LST___t=1642769396802&rp=22&page=1"
omurl= json.loads(requests.get(omapi).text)["rows"]
yzapi ="https://www.jisilu.cn/data/qdii/qdii_list/A?___jsl=LST___t=1642781466758&rp=22&page=1"
yzurl= json.loads(requests.get(yzapi).text)["rows"]
reitsapi ="https://www.jisilu.cn/data/cnreits/list/?___jsl=LST___t=1642838550685"
reitsurl = json.loads(requests.get(reitsapi).text)["rows"]
#print(reitsurl)
etfdatas =[]
for i in range(len(etfurl)):
    etfdatas.append({
        "代码":etfurl[i]["cell"]["fund_id"],"名称":etfurl[i]["cell"]["fund_nm"],"净值":etfurl[i]["cell"]["fund_nav"],"涨跌":etfurl[i]["cell"]["increase_rt"],"现价":etfurl[i]["cell"]["price"],"溢价率":etfurl[i]["cell"]["discount_rt"],"成交额":etfurl[i]["cell"]["volume"],"规模":etfurl[i]["cell"]["unit_total"],
    })
print("------" + "etf买" + "------")
buy =[]
for i in etfdatas:
    if float(i["涨跌"]) < -4 and float(i["成交额"]) > 10000 and float(i["溢价率"]) < 0 and float(i["现价"]) < float(i["净值"]) and float(i["规模"]) > 2:
        buy.append(i)
buy = pd.DataFrame(buy)[["现价","净值","涨跌","溢价率","代码","名称"]]
print(buy)
print("------" + "etf卖" + "------")
sell = []
for i in etfdatas:
    if float(i["涨跌"]) > 1 and float(i["成交额"]) > 10000 and float(i["现价"]) > float(i["净值"]) and float(i["规模"]) > 2:
        sell.append(i)
sell = pd.DataFrame(sell)[["现价","净值","涨跌","溢价率","代码","名称"]]
print(sell)


omdatas =[]
for i in range(len(omurl)):
    omdatas.append({
        "代码":omurl[i]["cell"]["fund_id"],"名称":omurl[i]["cell"]["fund_nm"],"净值":omurl[i]["cell"]["fund_nav"],"估值":omurl[i]["cell"]["estimate_value"],"涨跌":omurl[i]["cell"]["increase_rt"],"现价":omurl[i]["cell"]["price"],"溢价率":omurl[i]["cell"]["discount_rt"],"成交额":omurl[i]["cell"]["volume"],
    })
print("------" + "欧美etf买" + "------")
buy =[]
for i in omdatas:
    if float(i["涨跌"][:-1]) < -2 and i["现价"] < i["净值"] and i["现价"] < i["估值"] and float(i["成交额"]) > 10000:
        buy.append(i)
buy = pd.DataFrame(buy)[["现价","净值","涨跌","溢价率","代码","名称"]]
print(buy)
print("------" + "欧美etf卖" + "------")
sell = []
for i in omdatas:
    if float(i["涨跌"][:-1]) > 0 and i["现价"] > i["净值"] and i["现价"] > i["估值"] and float(i["成交额"]) > 10000 :
        sell.append(i)
sell = pd.DataFrame(sell)[["现价","估值","涨跌","溢价率","代码","名称"]]
print(sell)


yzdatas =[]
for i in range(len(yzurl)):
    yzdatas.append({
        "代码":yzurl[i]["cell"]["fund_id"],"名称":yzurl[i]["cell"]["fund_nm"],"净值":yzurl[i]["cell"]["fund_nav"],"估值":yzurl[i]["cell"]["estimate_value"],"涨跌":yzurl[i]["cell"]["increase_rt"],"现价":yzurl[i]["cell"]["price"],"溢价率":yzurl[i]["cell"]["discount_rt"],"成交额":yzurl[i]["cell"]["volume"],
    })
#print(omdatas)
print("------" + "亚洲etf买" + "------")
buy =[]
for i in yzdatas:
    if float(i["涨跌"][:-1]) < -0.4 and i["现价"] < i["净值"] and i["现价"] < i["估值"] and float(i["成交额"]) > 10000:
        buy.append(i)
buy = pd.DataFrame(buy)[["现价","净值","涨跌","溢价率","代码","名称"]]
print(buy)
print("------" + "亚洲etf卖" + "------")
sell = []
for i in yzdatas:
    if float(i["涨跌"][:-1]) > 0 and i["现价"] > i["净值"] and i["现价"] > i["估值"] and float(i["成交额"]) > 10000 :
        sell.append(i)
sell = pd.DataFrame(sell)[["现价","估值","涨跌","溢价率","代码","名称"]]
print(sell)



reitsdatas =[]
for i in range(len(reitsurl)):
    reitsdatas.append({
        "代码":reitsurl[i]["cell"]["fund_id"],"名称":reitsurl[i]["cell"]["fund_nm"],"净值":reitsurl[i]["cell"]["nav"],"涨跌":reitsurl[i]["cell"]["increase_rt"],"现价":reitsurl[i]["cell"]["price"],"溢价率":reitsurl[i]["cell"]["discount_rt"],"成交额":reitsurl[i]["cell"]["volume"],
    })
#print(reitsdatas)
print("------" + "reits买" + "------")
buy =[]
for i in reitsdatas:
    if float(i["涨跌"]) > 5 and float(i["成交额"]) > 1000:
        buy.append(i)
buy = pd.DataFrame(buy)[["现价","涨跌","代码","名称"]]
print(buy)
print("------" + "reits卖" + "------")
sell = []
for i in reitsdatas:
    if float(i["涨跌"]) > 3 and float(i["成交额"]) > 1000 :
        sell.append(i)
sell = pd.DataFrame(sell)[["现价","涨跌","代码","名称"]]
print(sell)
```

