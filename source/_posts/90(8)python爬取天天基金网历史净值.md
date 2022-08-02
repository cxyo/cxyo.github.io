---
title: python爬取天天基金网历史净值
date: 2018-06-08 18:18:18
categories: 
 - 爬虫
tags:
 - 爬虫
sticky: 90
---

# python爬取天天基金网历史净值

```python
import pandas as pd
import requests

def get_fund_k_history(fund_code: str, pz: int = 40000) -> pd.DataFrame:
    '''
    根据基金代码和要获取的页码抓取基金净值信息

    Parameters
    ----------
    fund_code : 6位基金代码
    page : 页码 1 为最新页数据

    Return
    ------
    DataFrame : 包含基金历史k线数据
    '''
    # 请求头
    EastmoneyFundHeaders = {
        'User-Agent': 'EMProjJijin/6.2.8 (iPhone; iOS 13.6; Scale/2.00)',
        'GTOKEN': '98B423068C1F4DEF9842F82ADF08C5db',
        'clientInfo': 'ttjj-iPhone10,1-iOS-iOS13.6',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'fundmobapi.eastmoney.com',
        'Referer': 'https://mpservice.com/516939c37bdb4ba2b1138c50cf69a2e1/release/pages/FundHistoryNetWorth',
    }
    # 请求参数
    data = {
        'FCODE': f'{fund_code}',
        'appType': 'ttjj',
        'cToken': '1',
        'deviceid': '1',
        'pageIndex': '1',
        'pageSize': f'{pz}',
        'plat': 'Iphone',
        'product': 'EFund',
        'serverVersion': '6.2.8',
        'version': '6.2.8'
    }
    url = 'https://fundmobapi.eastmoney.com/FundMNewApi/FundMNHisNetList'
    json_response = requests.get(
        url, headers=EastmoneyFundHeaders, data=data).json()
    rows = []
    columns = ['日期', '单位净值', '累计净值', '涨跌幅']
    if json_response is None:
        return pd.DataFrame(rows, columns=columns)
    datas = json_response['Datas']
    if len(datas) == 0:
        return pd.DataFrame(rows, columns=columns)
    rows = []
    for stock in datas:
        date = stock['FSRQ']
        rows.append({
            '日期': date,
            '单位净值': stock['DWJZ'],
            '累计净值': stock['LJJZ'],
            '涨跌幅': stock['JZZZL']
        })

    df = pd.DataFrame(rows)
    df['单位净值'] = pd.to_numeric(df['单位净值'], errors='coerce')

    df['累计净值'] = pd.to_numeric(df['累计净值'], errors='coerce')

    df['日期'] = pd.to_datetime(df['日期'], errors='coerce')
    return df


# 多个 6 位基金代码构成的列表
fund_codes = ['510050', '510300', '510500', '159949',  # 大小盘
              '510880', '159905',  # 策略
              '515050', '159995', '515700', '512980', '515790', '512660',  # 主题
              '159928', '512170', '512800', '512690', '512000', '512010', '515220', '515170', '513050',   # 行业
              '159920', '510900', '513500', '513520'  # 海外
              ]
# 创建空列表存储数据
lsjz =[]
# 遍历基金代码列表获取数据
for fund_code in fund_codes:
    # 调用函数获取基金历史净值数据（取前20行的单位净值）
    dwjz = get_fund_k_history(fund_code).iloc[0:20]['单位净值']
    # 获取最大值、最小值
    max = dwjz.max()
    min = dwjz.min()
    # 存储在空列表
    lsjz.append([fund_code, max, min])
print('全部获取完毕！')
lsjz = pd.DataFrame(lsjz)
print(lsjz)
lsjz.to_csv('历史净值.csv')
```

