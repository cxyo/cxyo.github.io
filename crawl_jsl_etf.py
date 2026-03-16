import requests
import json
import time
from datetime import datetime, time as dt_time
import schedule

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
    
    # 设置请求头，模拟浏览器访问，包含用户提供的cookie
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        "Referer": "https://www.jisilu.cn/data/etf/",
        "X-Requested-With": "XMLHttpRequest",
        "Cookie": "kbz_newcookie=1; kbzw__Session=4fo8avgul4fmbjpfgjt9qb4ss7; Hm_lvt_164fe01b1433a19b507595a43bf58262=1772468741,1773673734; HMACCOUNT=0BE242CD6BD4A152; kbzw__user_login=7Obd08_P1ebax9aX283a2u7jlLOO4MLn7OzY69DVv6GRqtuj3pKmx6jbpaDfodjEq8KoqqbbxtSXrdvWntyl2oOxjuzg19a-m5KksauZq52YnaOiy9XQo5KnmKevrJyworCDsY7MuNHVjL3Q7uLh1dqbrJCmgZ_O3ObF39jnmcO9mZ2nkKacl87c5peknJTxq52ijLjS5s3cztjarNnVo66ooKefrYKerL_LwMSNkM3d5NqJwNHazeWKl7rb6tDdxqOqqZ-nnKWSpJGXytTewuLKo66ooKefrQ..; Hm_lpvt_164fe01b1433a19b507595a43bf58262=1773673849"
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
        with open('jsl.json', 'w', encoding='utf-8') as f:
            json.dump(etf_data, f, ensure_ascii=False, indent=2)
        
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 数据已保存到 jsl.json")
        
        return etf_data
    except Exception as e:
        print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 爬取数据失败: {e}")
        return {}

# 检查当前是否在A股交易时间内
def is_trading_time():
    now = datetime.now()
    current_time = now.time()
    
    # 上午交易时间：9:30-11:30
    morning_start = dt_time(9, 30)
    morning_end = dt_time(11, 30)
    
    # 下午交易时间：13:00-15:00
    afternoon_start = dt_time(13, 0)
    afternoon_end = dt_time(15, 0)
    
    # 检查是否在交易时间内
    if (morning_start <= current_time <= morning_end) or (afternoon_start <= current_time <= afternoon_end):
        return True
    return False

# 定时任务
def scheduled_crawl():
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 执行定时爬取任务...")
    crawl_etf_data()

# 主函数
def main():
    print("=" * 60)
    print("集思录ETF涨跌数据定时爬取程序")
    print("=" * 60)
    print(f"启动时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"交易时间: 上午 9:30-11:30, 下午 13:00-15:00")
    print(f"交易时间内每15分钟爬取一次，非交易时间只爬取一次")
    print("=" * 60)
    
    # 启动时先爬取一次
    print("\n启动时爬取一次数据...")
    crawl_etf_data()
    
    # 设置定时任务（交易时间内每15分钟执行一次）
    schedule.every(15).minutes.do(scheduled_crawl)
    
    print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] 定时任务已启动，等待执行...")
    
    # 持续运行
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    main()
