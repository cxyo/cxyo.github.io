import csv
import json
import os
from datetime import datetime

# 基金分类映射
CATEGORY_MAP = {
    '000016': 'E',  # 上证50
    '000300': 'E',  # 沪深300
    '399006': 'E',  # 创业板指
    '000905': 'E',  # 中证500
    '000852': 'E',  # 中证1000
    '000922': 'B',  # 中证红利
    '399971': 'B',  # 中证环保
    '000827': 'B',  # 中证能源
    '000933': 'B',  # 中证医药
    '000991': 'B',  # 全指金融
    '000978': 'B',  # 全指公用
    '399986': 'B',  # 中证银行
    '399996': 'B',  # 中证白酒
    '000932': 'B',  # 中证消费
    '399808': 'B',  # 中证军工
    '000832': 'B',  # 中证材料
    '000977': 'B',  # 全指信息
    '000930': 'B',  # 中证工业
    '000988': 'B',  # 中证交通
    '399806': 'B',  # 中证基建
    '399807': 'B',  # 中证煤炭
    '399975': 'B',  # 证券公司
    '000918': 'B',  # 全指制造
    '399979': 'B',  # 中证有色
    '399981': 'B',  # 中证钢铁
    '399983': 'B',  # 中证石油
    '399992': 'B',  # 中证创新
    '399995': 'B',  # 中证500低波动
    '399997': 'B',  # 中证500成长
    '399998': 'B',  # 中证500价值
    '399999': 'B',  # 中证500质量
    '000849': 'B',  # 中证TMT
    '000968': 'B',  # 中证海外中国互联网50
    '000001': 'B',  # 上证指数
    '399001': 'B',  # 深证成指
    '000015': 'B',  # 红利指数
    '000036': 'B',  # 上证180
    '000043': 'B',  # 上证380
    '000050': 'B',  # 上证50
    '000063': 'B',  # 上证央企
    '000065': 'B',  # 上证民企
    '000068': 'B',  # 上证周期
    '000069': 'B',  # 上证非周期
    '000070': 'B',  # 上证金融
    '000071': 'B',  # 上证能源
    '000072': 'B',  # 上证材料
    '000073': 'B',  # 上证工业
    '000074': 'B',  # 上证可选
    '000075': 'B',  # 上证消费
    '000076': 'B',  # 上证医药
    '000077': 'B',  # 上证公用
    '000078': 'B',  # 上证信息
    '000079': 'B',  # 上证电信
    '000133': 'B',  # 上证龙头
    '000134': 'B',  # 上证小盘
    '000135': 'B',  # 上证中盘
    '000136': 'B',  # 上证大盘
    '000137': 'B',  # 上证超大盘
    '000150': 'B',  # 上证180金融
    '000151': 'B',  # 上证180基建
    '000152': 'B',  # 上证180资源
    '000153': 'B',  # 上证180消费
    '000154': 'B',  # 上证180医药
    '000155': 'B',  # 上证180服务
    '000156': 'B',  # 上证180成长
    '000157': 'B',  # 上证180价值
    '000158': 'B',  # 上证180风格
    '000209': 'B',  # 上证380金融
    '000210': 'B',  # 上证380基建
    '000211': 'B',  # 上证380资源
    '000212': 'B',  # 上证380消费
    '000213': 'B',  # 上证380医药
    '000214': 'B',  # 上证380服务
    '000215': 'B',  # 上证380成长
    '000216': 'B',  # 上证380价值
    '000217': 'B',  # 上证380风格
    '000339': 'B',  # 中证100
    '000940': 'B',  # 中证信息安全
    '000941': 'B',  # 中证一带一路
    '000942': 'B',  # 中证高铁
    '000943': 'B',  # 中证港通
    '000944': 'B',  # 中证新能源
    '000945': 'B',  # 中证新基建
    '000946': 'B',  # 中证半导体
    '000947': 'B',  # 中证芯片
    '000948': 'B',  # 中证云计算
    '000949': 'B',  # 中证人工智能
    '000950': 'B',  # 中证大数据
    '000951': 'B',  # 中证区块链
    '000952': 'B',  # 中证5G通信
    '000953': 'B',  # 中证物联网
    '000954': 'B',  # 中证车联网
    '000955': 'B',  # 中证卫星互联网
    '000956': 'B',  # 中证高端制造
    '000957': 'B',  # 中证智能制造
    '000958': 'B',  # 中证工业互联网
    '000959': 'B',  # 中证机器人
    '000960': 'B',  # 中证新能源汽车
    '000961': 'B',  # 中证充电桩
    '000962': 'B',  # 中证光伏
    '000963': 'B',  # 中证风电
    '000964': 'B',  # 中证水电
    '000965': 'B',  # 中证核电
    '000966': 'B',  # 中证煤炭
    '000967': 'B',  # 中证钢铁
    '000968': 'B',  # 中证石油
    '000969': 'B',  # 中证化工
    '000970': 'B',  # 中证建材
    '000971': 'B',  # 中证有色
    '000972': 'B',  # 中证金属
    '000973': 'B',  # 中证农产品
    '000974': 'B',  # 中证林业
    '000975': 'B',  # 中证渔业
    '000976': 'B',  # 中证牧业
    '000978': 'B',  # 中证纺织
    '000979': 'B',  # 中证服装
    '000980': 'B',  # 中证食品
    '000981': 'B',  # 中证饮料
    '000982': 'B',  # 中证烟草
    '000983': 'B',  # 中证医药
    '000984': 'B',  # 中证医疗
    '000985': 'B',  # 中证健康
    '000986': 'B',  # 中证养老
    '000987': 'B',  # 中证教育
    '000989': 'B',  # 中证文旅
    '000990': 'B',  # 中证体育
    '000992': 'B',  # 中证金融地产
    '000993': 'B',  # 中证可选消费
    '000994': 'B',  # 中证必需消费
    '000995': 'B',  # 中证信息技术
    '000996': 'B',  # 中证电信服务
    '000997': 'B',  # 中证公用事业
    '000998': 'B',  # 中证能源
    '000999': 'B',  # 中证材料
    '001000': 'B',  # 中证工业
    '001001': 'B',  # 中证房地产
    '001002': 'B',  # 中证建筑
    '001003': 'B',  # 中证运输
    '001004': 'B',  # 中证仓储
    '001005': 'B',  # 中证邮政
    '001006': 'B',  # 中证航空
    '001007': 'B',  # 中证铁路
    '001008': 'B',  # 中证公路
    '001009': 'B',  # 中证水运
    '001010': 'B',  # 中证港口
    '001011': 'B',  # 中证物流
    '001012': 'B',  # 中证快递
    '001013': 'B',  # 中证电商
    '001014': 'B',  # 中证零售
    '001015': 'B',  # 中证餐饮
    '001016': 'B',  # 中证住宿
    '001017': 'B',  # 中证旅游
    '001018': 'B',  # 中证娱乐
    '001019': 'B',  # 中证传媒
    '001020': 'B',  # 中证广告
    '001021': 'B',  # 中证出版
    '001022': 'B',  # 中证电影
    '001023': 'B',  # 中证体育用品
    '001024': 'B',  # 中证健身
    '001025': 'B',  # 中证美容
    '001026': 'B',  # 中证医疗美容
    '001027': 'B',  # 中证健康管理
    '001028': 'B',  # 中证养老服务
    '001029': 'B',  # 中证教育服务
    '001030': 'B',  # 中证职业教育
    '001031': 'B',  # 中证高等教育
    '001032': 'B',  # 中证基础教育
    '001033': 'B',  # 中证学前教育
    '001034': 'B',  # 中证在线教育
    '001035': 'B',  # 中证教育科技
    '001036': 'B',  # 中证教育装备
    '001037': 'B',  # 中证教育出版
    '001038': 'B',  # 中证教育服务
    '001039': 'B',  # 中证教育投资
    '001040': 'B',  # 中证教育咨询
    '001041': 'B',  # 中证教育培训
    '001042': 'B',  # 中证教育研究
    '001043': 'B',  # 中证教育评估
    '001044': 'B',  # 中证教育认证
    '001045': 'B',  # 中证教育考试
    '001046': 'B',  # 中证教育竞赛
    '001047': 'B',  # 中证教育营地
    '001048': 'B',  # 中证教育游学
    '001049': 'B',  # 中证教育留学
    '001050': 'B',  # 中证教育移民
}

def calculate_temperature(data, code):
    """
    计算基金温度
    """
    # 首先检查是否有必要的数据
    pe_percentile = data.get('pe_percentile')
    pb_percentile = data.get('pb_percentile')
    
    # 如果两个百分位都有值，使用平均值
    if pe_percentile is not None and pb_percentile is not None:
        return (pe_percentile + pb_percentile) / 2 * 100
    # 如果只有PB百分位有值，使用PB百分位
    elif pb_percentile is not None:
        return pb_percentile * 100
    # 如果只有PE百分位有值，使用PE百分位
    elif pe_percentile is not None:
        return pe_percentile * 100
    # 如果都没有值，返回None
    else:
        return None

def parse_csv_file(file_path):
    """
    解析CSV文件
    """
    data = {}
    
    with open(file_path, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        
        for row in reader:
            # 辅助函数：获取字段值，处理BOM字符
            def get_field_value(row, field_name):
                # 尝试直接获取字段值
                value = row.get(field_name, '')
                if value:
                    return value
                # 如果直接获取失败，尝试遍历所有字段，处理BOM字符
                for key, val in row.items():
                    # 移除key中的BOM字符
                    clean_key = key.lstrip('\ufeff')
                    if clean_key == field_name:
                        return val
                return ''
            
            # 提取指数代码
            code_field = get_field_value(row, '指数代码')
            if code_field:
                # 处理指数代码格式，如 "931039" 或 ="931039"
                code = code_field
                if code.startswith('='):
                    code = code[1:]
                if code.startswith('"') and code.endswith('"'):
                    code = code[1:-1]
                
                if code:
                    # 提取并处理PE-TTM(分位点%)
                    pe_percentile_str = get_field_value(row, 'PE-TTM(分位点%)')
                    pe_percentile = None
                    if pe_percentile_str:
                        # 处理格式，如 =0.7966
                        if pe_percentile_str.startswith('='):
                            pe_percentile_str = pe_percentile_str[1:]
                        try:
                            pe_percentile = float(pe_percentile_str)
                        except ValueError:
                            pass
                    
                    # 提取并处理PB(分位点%)
                    pb_percentile_str = get_field_value(row, 'PB(分位点%)')
                    pb_percentile = None
                    if pb_percentile_str:
                        # 处理格式，如 =0.4361
                        if pb_percentile_str.startswith('='):
                            pb_percentile_str = pb_percentile_str[1:]
                        try:
                            pb_percentile = float(pb_percentile_str)
                        except ValueError:
                            pass
                    
                    # 提取其他字段
                    pe_str = get_field_value(row, 'PE-TTM(当前值)')
                    pe = None
                    if pe_str:
                        if pe_str.startswith('='):
                            pe_str = pe_str[1:]
                        try:
                            pe = float(pe_str)
                        except ValueError:
                            pass
                    
                    pb_str = get_field_value(row, 'PB(当前值)')
                    pb = None
                    if pb_str:
                        if pb_str.startswith('='):
                            pb_str = pb_str[1:]
                        try:
                            pb = float(pb_str)
                        except ValueError:
                            pass
                    
                    roe_str = get_field_value(row, '净资产收益率(ROE)(2025Q3)')
                    roe = None
                    if roe_str:
                        if roe_str.startswith('='):
                            roe_str = roe_str[1:]
                        try:
                            roe = float(roe_str)
                        except ValueError:
                            pass
                    
                    dividend_rate_str = get_field_value(row, '股息率')
                    dividend_rate = None
                    if dividend_rate_str:
                        if dividend_rate_str.startswith('='):
                            dividend_rate_str = dividend_rate_str[1:]
                        try:
                            dividend_rate = float(dividend_rate_str)
                        except ValueError:
                            pass
                    
                    # 构建数据项
                    item = {
                        'code': code,
                        'name': get_field_value(row, '指数名称'),
                        'pe': pe,
                        'pb': pb,
                        'pe_percentile': pe_percentile,
                        'pb_percentile': pb_percentile,
                        'roe': roe,
                        'dividend_rate': dividend_rate
                    }
                    data[code] = item
    
    return data

def main():
    # 获取当前目录下的所有CSV文件
    csv_files = []
    for file in os.listdir('.'):
        if file.endswith('.csv'):
            try:
                # 验证文件名是否为日期格式
                date_str = file.replace('.csv', '')
                datetime.strptime(date_str, '%Y-%m-%d')
                csv_files.append(file)
            except ValueError:
                # 忽略非日期格式的CSV文件
                pass
    
    # 按日期排序
    csv_files.sort()
    
    # 处理每个CSV文件
    temperature_data = {}
    
    for file in csv_files:
        date_str = file.replace('.csv', '')
        print(f'处理文件: {file}')
        
        # 解析CSV文件
        csv_data = parse_csv_file(file)
        
        # 计算每个基金的温度
        date_temperatures = {}
        for code, data in csv_data.items():
            temperature = calculate_temperature(data, code)
            if temperature is not None:
                date_temperatures[code] = {
                    'temperature': round(temperature, 2),
                    'name': data.get('name', '')
                }
        
        print(f'文件 {file} 处理完成，计算出 {len(date_temperatures)} 个基金的温度')
        
        if date_temperatures:
            temperature_data[date_str] = date_temperatures
        else:
            # 打印一些调试信息
            if csv_data:
                # 取第一个基金数据看看
                first_code = list(csv_data.keys())[0]
                first_data = csv_data[first_code]
                print(f'调试信息 - 第一个基金: {first_code}, {first_data.get("name", "")}')
                print(f'PE-TTM(分位点%): {first_data.get("pe_percentile", "N/A")}')
                print(f'PB(分位点%): {first_data.get("pb_percentile", "N/A")}')
                print(f'计算温度结果: {calculate_temperature(first_data, first_code)}')
    
    # 保存为JSON文件
    output_file = 'fund_temperature.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(temperature_data, f, ensure_ascii=False, indent=2)
    
    print(f'生成基金温度数据文件: {output_file}')
    print(f'共处理 {len(csv_files)} 个CSV文件')
    print(f'生成 {len(temperature_data)} 天的基金温度数据')

if __name__ == '__main__':
    main()
