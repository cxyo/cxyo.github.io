---
title: python爬取东方财富reits数据分析
date: 2018-06-28 18:18:18
categories: 
 - 爬虫
tags:
 - 爬虫
sticky: 92
---

# python爬取东方财富reits数据分析

```python
import requests
import json
import pandas as pd
reitsapi = "http://1.push2.eastmoney.com/api/qt/clist/get?cb=jQuery112403910406027562112_1642603320503&pn=1&pz=20&po=1&np=1&ut=bd1d9ddb04089700cf9c27f6f7426281&fltt=2&invt=2&fid=f3&fs=m:1+t:9+e:97,m:0+t:10+e:97&fields=f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f12,f13,f14,f15,f16,f17,f18,f20,f21,f23,f24,f25,f22,f11,f62,f128,f136,f115,f152&_=1642603320504"
reitsurl = json.loads(requests.get(reitsapi).text[115:-4])
#print(url)
etfapi ="https://www.jisilu.cn/data/etf/etf_list/?___jsl=LST___t=1642587922344&rp=25&page=1"
etfurl = json.loads(requests.get(etfapi).text)["rows"]
reitsdatas = []
for i in reitsurl:
    reitsdatas.append({
        "名称":i["f14"],"代码":i["f12"],"涨跌":i["f3"],"现价":i["f2"],"最高":i["f15"],"最低":i["f16"],"开盘":i["f17"],"昨收":i["f18"]
    })
print("------" + "reits买" + "------")
buy =[]
for i in reitsdatas:
    if i["涨跌"] < 0 and i["现价"] < i["昨收"] and i["现价"] < i["开盘"]:
        buy.append(i)
buy = pd.DataFrame(buy)[["现价","最低","涨跌","代码"]]
print(buy)
print("------" + "reits卖" + "------")
sell = []
for i in reitsdatas:
    if i["涨跌"] > 1 and i["现价"] > i["昨收"] and i["现价"] > i["开盘"]:
        sell.append(i)
sell = pd.DataFrame(sell)[["现价","最高","涨跌","代码"]]
print(sell)
```

