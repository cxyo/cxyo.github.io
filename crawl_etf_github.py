import requests
import json
from datetime import datetime

# 爬取集思录ETF数据
def crawl_etf_data():
    # 爬取国内ETF数据
    domestic_url = "https://www.jisilu.cn/data/etf/etf_list/?___jsl=LST___t=1773673883592&volume=&unit_total=2&rp=100"
    # 爬取欧美ETF数据
    overseas_url = "https://www.jisilu.cn/data/qdii/qdii_list/E?___jsl=LST___t=1773677535569&only_lof=y&only_etf=y&rp=22"
    # 爬取亚洲ETF数据
    asia_url = "https://www.jisilu.cn/data/qdii/qdii_list/A?___jsl=LST___t=1773677945895&only_lof=y&only_etf=y&rp=22"
    # 爬取黄金ETF数据
    gold_url = "https://www.jisilu.cn/data/etf/gold_list/?___jsl=LST___t=1773678396326&rp=25"
    
    # 设置请求头，模拟浏览器访问
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Referer": "https://www.jisilu.cn/data/etf/",
        "X-Requested-With": "XMLHttpRequest"
    }
    
    etf_data = {}
    
    try:
        # 爬取国内ETF数据
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始爬取国内ETF数据...")
        response = requests.get(domestic_url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        for item in data.get('rows', []):
            cell = item.get('cell', {})
            fund_id = cell.get('fund_id')
            increase_rt = cell.get('increase_rt')
            if fund_id and increase_rt:
                etf_data[fund_id] = increase_rt
        
        print(f"成功爬取 {len(etf_data)} 条国内ETF数据")
        
        # 爬取欧美ETF数据
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始爬取欧美ETF数据...")
        response = requests.get(overseas_url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        overseas_count = 0
        for item in data.get('rows', []):
            cell = item.get('cell', {})
            fund_id = cell.get('fund_id')
            increase_rt = cell.get('increase_rt')
            if fund_id and increase_rt:
                increase_rt = increase_rt.replace('%', '')
                etf_data[fund_id] = increase_rt
                overseas_count += 1
        
        print(f"成功爬取 {overseas_count} 条欧美ETF数据")
        
        # 爬取亚洲ETF数据
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始爬取亚洲ETF数据...")
        response = requests.get(asia_url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        asia_count = 0
        for item in data.get('rows', []):
            cell = item.get('cell', {})
            fund_id = cell.get('fund_id')
            increase_rt = cell.get('increase_rt')
            if fund_id and increase_rt:
                increase_rt = increase_rt.replace('%', '')
                etf_data[fund_id] = increase_rt
                asia_count += 1
        
        print(f"成功爬取 {asia_count} 条亚洲ETF数据")
        
        # 爬取黄金ETF数据
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 开始爬取黄金ETF数据...")
        response = requests.get(gold_url, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        gold_count = 0
        for item in data.get('rows', []):
            cell = item.get('cell', {})
            fund_id = cell.get('fund_id')
            increase_rt = cell.get('increase_rt')
            if fund_id and increase_rt:
                etf_data[fund_id] = increase_rt
                gold_count += 1
        
        print(f"成功爬取 {gold_count} 条黄金ETF数据")
        print(f"总共爬取 {len(etf_data)} 条ETF数据")
        
        # 保存为JSON文件
        with open('etf_data.json', 'w', encoding='utf-8') as f:
            json.dump(etf_data, f, ensure_ascii=False, indent=2)
        
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 数据已保存到 etf_data.json")
        
        return etf_data
    except Exception as e:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 爬取数据失败: {e}")
        return {}

if __name__ == "__main__":
    print("=" * 60)
    print("集思录ETF涨跌数据爬取程序 (GitHub Actions版本)")
    print("=" * 60)
    crawl_etf_data()
