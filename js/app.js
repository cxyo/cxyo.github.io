// 基金温度表应用

// 类别配置
const CATEGORIES = {
    'B': { name: '大盘', weight: 20, max_funds: 1, backgroundColor: '#f5f5f5' },
    'C': { name: '小盘', weight: 20, max_funds: 1, backgroundColor: '#cce5ff' },
    'D': { name: '策略', weight: 10, max_funds: 2, backgroundColor: '#f5f5f5' },
    'E': { name: '行业', weight: 10, max_funds: 2, backgroundColor: '#cce5ff' },
    'F': { name: '主题', weight: 10, max_funds: 2, backgroundColor: '#f5f5f5' },
    'G': { name: '海外', weight: 10, max_funds: 1, backgroundColor: '#cce5ff' },
    'H': { name: '债券', weight: 20, max_funds: 2, backgroundColor: '#f5f5f5' },
};

// 指数类别映射（完整配置）
const CATEGORY_MAP = {
    // B大盘
    '399006': 'B', '399550': 'B', '000010': 'B', '399330': 'B',
    '399001': 'B', '000300': 'B', '000016': 'B', '000903': 'B',
    
    // C小盘
    '399673': 'C', '399008': 'C', '000852': 'C', '000905': 'C', '000688': 'C', '399303': 'C',
    
    // D策略
    '399348': 'D', '399701': 'D', '000029': 'D', '399702': 'D',
    '399324': 'D', '000919': 'D', '000922': 'D', '930782': 'D',
    'H30089': 'D', '000925': 'D', '000821': 'D', 'H30269': 'D',
    '000015': 'D', '950090': 'D', '930740': 'D',
    
    // E行业
    '399807': 'E', '399396': 'E', '399995': 'E', '000932': 'E',
    '399987': 'E', '399393': 'E', '930697': 'E', '399812': 'E',
    'H30533': 'E', 'H11136': 'E', '000992': 'E', '399975': 'E',
    '399986': 'E', '000989': 'E', '931747': 'E', '399806': 'E',
    '399973': 'E', '931008': 'E', '000941': 'E', '399967': 'E',
    '399998': 'E', '000928': 'E', '980027': 'E', '399395': 'E',
    '000993': 'E', '000979': 'E', '931594': 'E',
    
    // F主题
    '930653': 'F', '399997': 'F', '399814': 'F', '399976': 'F',
    '399971': 'F', '931152': 'F', '000827': 'F', '931151': 'F',
    '931087': 'F', '990001': 'F', '980017': 'F', 'H30590': 'F',
    '931752': 'F', '931079': 'F', '931071': 'F', '930598': 'F',
    '931247': 'F', '000685': 'F', 'CN5075': 'F', 'H30199': 'F', '980018': 'F',
    
    // G海外
    'HSCGSI': 'G', 'HSTECH': 'G', 'HSI': 'G', 'HSCEI': 'G',
    'HSCAIT': 'G', 'HSMSI': 'G', '.INX': 'G',
};

// 指数代码与场内/场外基金映射表
const FUND_CODES_MAP = {
    '399550': {场内代码: '159965', 场外代码: '217027'},
    '399006': {场内代码: '159952', 场外代码: '01593'},
    '000010': {场内代码: '510180', 场外代码: '519180'},
    '399330': {场内代码: '159901', 场外代码: '110019'},
    '399001': {场内代码: '159903', 场外代码: '006262'},
    '000300': {场内代码: '510310', 场外代码: '007339'},
    '000016': {场内代码: '510850', 场外代码: '007380'},
    '000903': {场内代码: '512910', 场外代码: '240014'},
    '399673': {场内代码: '159949', 场外代码: '160422'},
    '399008': {场内代码: '159907', 场外代码: '270026'},
    '000852': {场内代码: '512100', 场外代码: '017038'},
    '000905': {场内代码: '159922', 场外代码: '070039'},
    '000688': {场内代码: '588000', 场外代码: '011609'},
    '399303': {场内代码: '159628', 场外代码: '017548'},
    '399701': {场内代码: '159916', 场外代码: '530015'},
    '399348': {场内代码: '159913', 场外代码: '519706'},
    '000029': {场内代码: '510030', 场外代码: '240016'},
    '399324': {场内代码: '159905', 场外代码: '481012'},
    '399702': {场内代码: '159910', 场外代码: '070023'},
    'H30089': {场内代码: '515570', 场外代码: '007671'},
    '930782': {场内代码: '512260', 场外代码: '003318'},
    '000922': {场内代码: '515180', 场外代码: '100032'},
    '000919': {场内代码: '562320', 场外代码: '519671'},
    '000925': {场内代码: '512750', 场外代码: '160716'},
    'H30269': {场内代码: '512890', 场外代码: '005561'},
    '000821': {场内代码: '512530', 场外代码: '012713'},
    '000015': {场内代码: '510880', 场外代码: '016441'},
    '950090': {场内代码: '501050', 场外代码: '501050'},
    '930740': {场内代码: '159963', 场外代码: '007605'},
    '399807': {场内代码: '160135', 场外代码: '160135'},
    '399396': {场内代码: '159843', 场外代码: '160222'},
    '399995': {场内代码: '165525', 场外代码: '165525'},
    '000932': {场内代码: '159928', 场外代码: '000248'},
    '399987': {场内代码: '512690', 场外代码: '160632'},
    '399393': {场内代码: '160218', 场外代码: '160218'},
    '399812': {场内代码: '-', 场外代码: '000968'},
    '930697': {场内代码: '159996', 场外代码: '005063'},
    'H30533': {场内代码: '513050', 场外代码: '006327'},
    'H11136': {场内代码: '164906', 场外代码: '164906'},
    '000992': {场内代码: '159940', 场外代码: '001469'},
    '399975': {场内代码: '512000', 场外代码: '004070'},
    '399986': {场内代码: '512800', 场外代码: '01594'},
    '931747': {场内代码: '-', 场外代码: '-'},
    '000989': {场内代码: '159936', 场外代码: '001133'},
    '399806': {场内代码: '164908', 场外代码: '164908'},
    '399973': {场内代码: '512670', 场外代码: '012041'},
    '000941': {场内代码: '516160', 场外代码: '012831'},
    '931008': {场内代码: '159512', 场外代码: '004854'},
    '399998': {场内代码: '013275', 场外代码: '161032'},
    '399967': {场内代码: '512660', 场外代码: '002199'},
    '980027': {场内代码: '159566', 场外代码: '-'},
    '000928': {场内代码: '159930', 场外代码: '-'},
    '399395': {场内代码: '160221', 场外代码: '160221'},
    '000993': {场内代码: '159939', 场外代码: '000942'},
    '000979': {场内代码: '161715', 场外代码: '161715'},
    '931594': {场内代码: '512630', 场外代码: '024749'},
    '930653': {场内代码: '159736', 场外代码: '001632'},
    '399997': {场内代码: '161725', 场外代码: '161725'},
    '399814': {场内代码: '516550', 场外代码: '019280'},
    '399976': {场内代码: '515030', 场外代码: '161028'},
    '399971': {场内代码: '512980', 场外代码: '004752'},
    '931152': {场内代码: '159992', 场外代码: '012738'},
    '000827': {场内代码: '512580', 场外代码: '001064'},
    '931151': {场内代码: '515790', 场外代码: '011102'},
    '931087': {场内代码: '515000', 场外代码: '007873'},
    '990001': {场内代码: '512760', 场外代码: '008281'},
    '980017': {场内代码: '159995', 场外代码: '008888'},
    '931752': {场内代码: '560280', 场外代码: '020904'},
    'H30590': {场内代码: '562500', 场外代码: '014881'},
    '931079': {场内代码: '515050', 场外代码: '008087'},
    '931071': {场内代码: '515980', 场外代码: '014881'},
    '930598': {场内代码: '516150', 场外代码: '014332'},
    '931247': {场内代码: '560850', 场外代码: '-'},
    '000685': {场内代码: '588200', 场外代码: '017470'},
    'CN5075': {场内代码: '562570', 场外代码: '-'},
    'H30199': {场内代码: '159611', 场外代码: '016186'},
    '980018': {场内代码: '159206', 场外代码: '-'},
    'HSCGSI': {场内代码: '159699', 场外代码: '023242'},
    'HSTECH': {场内代码: '513500', 场外代码: '050025'},
    'HSI': {场内代码: '159920', 场外代码: '164705'},
    'HSCEI': {场内代码: '510900', 场外代码: '110031'},
    'HSMSI': {场内代码: '160922', 场外代码: '160922'},
    'HSCAIT': {场内代码: '-', 场外代码: '540012'},
    '.INX': {场内代码: '513500', 场外代码: '050025'}
};

// 全局变量
let fundsData = null;
let oldData = null;
let codeConfig = null;
let searchResults = [];
let selectedIndex = null;
let selectedCategory = null;

// 缓存相关设置
const CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 缓存过期时间：24小时
let fundNavCache = {}; // 基金净值数据缓存
let fundTempCache = {}; // 基金温度数据缓存



// 初始化缓存（从localStorage加载）
function initCache() {
    try {
        // 加载基金净值缓存
        const navCacheStr = localStorage.getItem('fundNavCache');
        if (navCacheStr) {
            fundNavCache = JSON.parse(navCacheStr);
        }
        
        // 加载基金温度缓存
        const tempCacheStr = localStorage.getItem('fundTempCache');
        if (tempCacheStr) {
            fundTempCache = JSON.parse(tempCacheStr);
        }
    } catch (error) {
        fundNavCache = {};
        fundTempCache = {};
    }
}

// 保存缓存到localStorage
function saveCache() {
    try {
        localStorage.setItem('fundNavCache', JSON.stringify(fundNavCache));
        localStorage.setItem('fundTempCache', JSON.stringify(fundTempCache));
    } catch (error) {
        console.error('[基金温度] 保存缓存失败:', error.message);
    }
}

// 图表状态变量，用于存储当前图表的信息
let currentChartState = {
    type: null,  // 'temperature' 或 'nav'
    code: null,   // 指数代码或基金代码
    name: null,   // 指数名称或基金名称
    fundType: null, // 场内或场外，仅对净值图表有效
    days: 20      // 当前显示天数，默认20天
};

// 初始化缓存
document.addEventListener('DOMContentLoaded', function() {
    initCache();
});

// 更新日期显示
function updateDate(dateStr) {
    const dateElement = document.getElementById('dataDate');
    if (dateElement) {
        dateElement.textContent = dateStr || '未知日期';
    }
}

// 显示温度图表
async function showTemperatureChart(code, name, days = 0) {
    console.log('显示温度图表:', code, name, '天数:', days);
    
    try {
        showLoading(true);
        
        // 从JSON文件加载基金温度数据
        const response = await fetch('fund_temperature.json', { cache: 'no-cache' });
        if (!response.ok) {
            throw new Error('加载基金温度数据失败');
        }
        
        const temperatureJson = await response.json();
        
        // 提取所有日期并按升序排序
        const allDates = Object.keys(temperatureJson).sort();
        
        if (allDates.length === 0) {
            alert('未找到任何基金温度数据');
            showLoading(false);
            return;
        }
        
        // 根据传入的天数参数筛选日期
        let filteredDates;
        if (days > 0) {
            // 如果指定了天数，显示最近的days天数据
            const startIndex = Math.max(0, allDates.length - days);
            filteredDates = allDates.slice(startIndex);
        } else {
            // 如果没有指定天数，显示所有数据
            filteredDates = allDates;
        }
        
        // 提取该基金的温度数据
        const temperatureData = [];
        const dates = [];
        
        for (const date of filteredDates) {
            const dateData = temperatureJson[date];
            if (dateData && dateData[code]) {
                const fundData = dateData[code];
                temperatureData.push(fundData.temperature.toFixed(2));
                dates.push(date);
            }
        }
        
        if (dates.length === 0) {
            alert('未找到该指数的历史数据');
            showLoading(false);
            return;
        }
        
        // 找出最高和最低温度及其索引
        let maxTemp = -Infinity;
        let minTemp = Infinity;
        let maxIndex = -1;
        let minIndex = -1;
        
        for (let i = 0; i < temperatureData.length; i++) {
            const temp = parseFloat(temperatureData[i]);
            if (temp > maxTemp) {
                maxTemp = temp;
                maxIndex = i;
            }
            if (temp < minTemp) {
                minTemp = temp;
                minIndex = i;
            }
        }
        
        // 更新图表状态
        currentChartState = {
            type: 'temperature',
            code: code,
            name: name,
            days: filteredDates.length
        };
        
        // 显示图表
        const chartSection = document.querySelector('.chart-section');
        const chartTitle = document.getElementById('chartTitle');
        const chartTypeTitle = document.getElementById('chartTypeTitle');
        const chartContainer = document.getElementById('temperatureChart');
        
        chartSection.style.display = 'block';
        chartTitle.textContent = `${name} (${code}) - 最近${filteredDates.length}天`;
        chartTypeTitle.textContent = '📈 基金温度历史趋势图';
        
        // 初始化ECharts
        if (window.myChart) {
            window.myChart.dispose();
        }
        
        window.myChart = echarts.init(chartContainer);
        
        const option = {
            title: {
                text: '基金温度历史趋势',
                left: 'center'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    return `${params[0].name}<br/>温度: ${params[0].value}°C`;
                }
            },
            xAxis: {
                type: 'category',
                data: dates,
                axisLabel: {
                    rotate: 45,
                    interval: Math.ceil(dates.length / 10)
                }
            },
            yAxis: {
                type: 'value',
                name: '温度(°C)',
                axisLabel: {
                    formatter: '{value}°C'
                }
            },
            series: [{
                name: '温度',
                type: 'line',
                data: temperatureData,
                smooth: true,
                markPoint: {
                    data: [
                        {
                            name: '最高',
                            coord: [dates[maxIndex], maxTemp],
                            itemStyle: {
                                color: '#ff0000'
                            },
                            label: {
                                show: true,
                                position: 'top',
                                offset: [0, -10],
                                formatter: maxTemp + '°C',
                                color: '#ff0000',
                                fontWeight: 'bold'
                            }
                        },
                        {
                            name: '最低',
                            coord: [dates[minIndex], minTemp],
                            itemStyle: {
                                color: '#00ff00'
                            },
                            label: {
                                show: true,
                                position: 'top',
                                offset: [0, -10],
                                formatter: minTemp + '°C',
                                color: '#00ff00',
                                fontWeight: 'bold'
                            }
                        }
                    ]
                },
                itemStyle: {
                    color: '#1a237e'
                },
                lineStyle: {
                    color: '#1a237e',
                    width: 2
                },
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(26, 35, 126, 0.1)'
                        }, {
                            offset: 1,
                            color: 'rgba(26, 35, 126, 0.3)'
                        }]
                    }
                }
            }],
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            }
        };
        
        window.myChart.setOption(option);
        
        // 更新时间范围按钮
        updateTimeButtons();
        
        showLoading(false);
    } catch (error) {
        console.error('显示温度图表失败:', error);
        alert('显示温度图表失败: ' + error.message);
        showLoading(false);
    }
}

// 显示基金净值图表
function showFundNavChart(code, type) {
    console.log('显示基金净值图表:', code, type);
    // 这里可以添加显示基金净值图表的逻辑
    // 由于没有具体的图表实现，暂时只打印日志
}

// 计算并显示温度星级
function calculateAndShowStarRating() {
    // 检查是否有数据
    if (!fundsData) {
        // 如果没有数据，显示默认值
        const avgStarElement = document.getElementById('avgStar');
        const starValueElement = document.getElementById('starValue');
        if (avgStarElement) avgStarElement.innerHTML = '';
        if (starValueElement) starValueElement.textContent = '--';
        return;
    }
    
    // 参考螺丝钉星级计算方式：
    // 中证全指数5000一星，5280二星，5560三星，5840四星，6120五星，6400六星
    // 先计算平均温度作为中证全指数的近似值
    let totalTemperature = 0;
    let count = 0;
    
    for (const category of Object.keys(codeConfig)) {
        const codes = codeConfig[category];
        if (!codes || codes.length === 0) continue;
        
        for (const code of codes) {
            const data = fundsData[code];
            if (!data) continue;
            
            // 计算温度
            let temperature;
            if (category === 'E') {
                // 行业类：温度 = PB分位点 × 100
                temperature = data.pb_percentile * 100;
            } else {
                // 其他类：温度 = (PE分位点 + PB分位点) / 2 × 100
                temperature = (data.pe_percentile + data.pb_percentile) / 2 * 100;
            }
            
            totalTemperature += temperature;
            count++;
        }
    }
    
    // 如果没有有效数据，显示默认值
    if (count === 0) {
        const avgStarElement = document.getElementById('avgStar');
        const starValueElement = document.getElementById('starValue');
        if (avgStarElement) avgStarElement.innerHTML = '';
        if (starValueElement) starValueElement.textContent = '--';
        return;
    }
    
    // 计算平均温度，作为中证全指数的近似值（调整为5000-6400范围）
    // 这里我们需要将温度值映射到中证全指数的点数范围
    // 假设温度范围是0-100，我们将其映射到5000-6400
    const avgTemperature = totalTemperature / count;
    // 映射公式：中证全指数 = 5000 + (avgTemperature / 100) * 1400
    const csi300Index = 5000 + (avgTemperature / 100) * 1400;
    
    // 根据中证全指数计算星级
    // 星级计算公式：星级 = 1 + (中证全指数 - 5000) / 280
    // 每280点对应1星的变化（从5000到6400共1400点，对应5星的变化）
    let starRating = 1 + (csi300Index - 5000) / 280;
    
    // 限制星级范围在1-6星之间
    starRating = Math.max(1, Math.min(6, starRating));
    
    // 更新页面显示
    const avgStarElement = document.getElementById('avgStar');
    const starValueElement = document.getElementById('starValue');
    
    if (avgStarElement) {
        // 显示对应数量的星星（取整数部分）
        avgStarElement.innerHTML = '⭐'.repeat(Math.floor(starRating));
    }
    
    if (starValueElement) {
        // 显示精确的小数星级（保留两位小数）
        starValueElement.textContent = starRating.toFixed(2);
    }
}

// 计算并显示股市晴雨表数据
function calculateAndShowStockWeather() {
    if (!fundsData || !codeConfig) {
        return;
    }
    
    // 计算大盘数据
    let minBigCapPE = Infinity;
    let minBigCapPB = Infinity;
    
    console.log('[基金温度] 开始计算大盘温度');
    if (codeConfig['B']) {
        for (const code of codeConfig['B']) {
            const data = fundsData[code];
            if (data) {
                console.log('[基金温度] 大盘指数', code, data.name, 'PE:', data.pe, 'PB:', data.pb, 'PE分位点:', data.pe_percentile, 'PB分位点:', data.pb_percentile);
                if (data.pe_percentile < minBigCapPE) {
                    minBigCapPE = data.pe_percentile;
                    console.log('[基金温度] 新的大盘PE最小值:', minBigCapPE);
                }
                if (data.pb_percentile < minBigCapPB) {
                    minBigCapPB = data.pb_percentile;
                    console.log('[基金温度] 新的大盘PB最小值:', minBigCapPB);
                }
            }
        }
    }
    
    // 计算小盘数据
    let minSmallCapPE = Infinity;
    let minSmallCapPB = Infinity;
    
    console.log('[基金温度] 开始计算小盘温度');
    if (codeConfig['C']) {
        for (const code of codeConfig['C']) {
            const data = fundsData[code];
            if (data) {
                console.log('[基金温度] 小盘指数', code, data.name, 'PE:', data.pe, 'PB:', data.pb, 'PE分位点:', data.pe_percentile, 'PB分位点:', data.pb_percentile);
                if (data.pe_percentile < minSmallCapPE) {
                    minSmallCapPE = data.pe_percentile;
                    console.log('[基金温度] 新的小盘PE最小值:', minSmallCapPE);
                }
                if (data.pb_percentile < minSmallCapPB) {
                    minSmallCapPB = data.pb_percentile;
                    console.log('[基金温度] 新的小盘PB最小值:', minSmallCapPB);
                }
            }
        }
    }
    
    // 转换为百分比
    const bigCapPEPercent = (minBigCapPE * 100).toFixed(2) + '%';
    const bigCapPBPercent = (minBigCapPB * 100).toFixed(2) + '%';
    const smallCapPEPercent = (minSmallCapPE * 100).toFixed(2) + '%';
    const smallCapPBPercent = (minSmallCapPB * 100).toFixed(2) + '%';
    
    console.log('[基金温度] 计算结果 - 大盘PE:', bigCapPEPercent, '大盘PB:', bigCapPBPercent, '小盘PE:', smallCapPEPercent, '小盘PB:', smallCapPBPercent);
    
    // 计算入市条件
    const bigCapPEValue = parseFloat(minBigCapPE * 100);
    const bigCapPBValue = parseFloat(minBigCapPB * 100);
    const smallCapPEValue = parseFloat(minSmallCapPE * 100);
    const smallCapPBValue = parseFloat(minSmallCapPB * 100);
    
    // 判断是否满足入市条件
    const canEnterMarket = (bigCapPEValue < 50 && bigCapPBValue < 20) || (smallCapPEValue < 50 && smallCapPBValue < 20);
    const marketAdvice = canEnterMarket ? '可以入市' : '不宜入市';
    const adviceColor = canEnterMarket ? '#00ff00' : '#ff0000';
    
    console.log('[基金温度] 入市条件判断 - 大盘PE:', bigCapPEValue, '大盘PB:', bigCapPBValue, '小盘PE:', smallCapPEValue, '小盘PB:', smallCapPBValue, '是否可以入市:', canEnterMarket);
    
    // 获取表格元素并更新数据
    const stockWeatherTable = document.querySelector('.stock-weather-table');
    if (stockWeatherTable) {
        const rows = stockWeatherTable.querySelectorAll('tbody tr');
        
        // 更新大盘行
        if (rows[0]) {
            const cells = rows[0].querySelectorAll('td');
            if (cells[1]) {
                cells[1].textContent = bigCapPEPercent;
                // 设置样式
                cells[1].style.color = '#000000'; // 字体改为黑色
                // PE温度背景色：小于50%浅粉色，大于等于50%浅绿色
                cells[1].style.backgroundColor = bigCapPEValue < 50 ? '#ffe6e6' : '#e6ffe6';
                // 居中显示
                cells[1].style.textAlign = 'center';
                cells[1].style.verticalAlign = 'middle';
            }
            if (cells[2]) {
                cells[2].textContent = bigCapPBPercent;
                // 设置样式
                cells[2].style.color = '#000000'; // 字体改为黑色
                // PB温度背景色：小于20%浅粉色，大于等于20%浅绿色
                cells[2].style.backgroundColor = bigCapPBValue < 20 ? '#ffe6e6' : '#e6ffe6';
                // 居中显示
                cells[2].style.textAlign = 'center';
                cells[2].style.verticalAlign = 'middle';
            }
        }
        
        // 更新小盘行
        if (rows[1]) {
            const cells = rows[1].querySelectorAll('td');
            if (cells[1]) {
                cells[1].textContent = smallCapPEPercent;
                // 设置样式
                cells[1].style.color = '#000000'; // 字体改为黑色
                // PE温度背景色：小于50%浅粉色，大于等于50%浅绿色
                cells[1].style.backgroundColor = smallCapPEValue < 50 ? '#ffe6e6' : '#e6ffe6';
                // 居中显示
                cells[1].style.textAlign = 'center';
                cells[1].style.verticalAlign = 'middle';
            }
            if (cells[2]) {
                cells[2].textContent = smallCapPBPercent;
                // 设置样式
                cells[2].style.color = '#000000'; // 字体改为黑色
                // PB温度背景色：小于20%浅粉色，大于等于20%浅绿色
                cells[2].style.backgroundColor = smallCapPBValue < 20 ? '#ffe6e6' : '#e6ffe6';
                // 居中显示
                cells[2].style.textAlign = 'center';
                cells[2].style.verticalAlign = 'middle';
            }
        }
        
        // 更新入市建议和建议列（只有一行，大盘小盘共用）
        // 只更新第一行（大盘）的入市建议和建议列，因为这些单元格是合并的，涵盖两行
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.querySelectorAll('td');
            if (cells[3]) {
                // 只更新第一行（大盘）的入市建议，因为该单元格是合并的
                cells[3].textContent = marketAdvice;
                // 设置样式
                cells[3].style.color = '#000000'; // 字体改为黑色
                // 入市建议背景色：可以入市浅粉色，不宜入市浅绿色
                cells[3].style.backgroundColor = canEnterMarket ? '#ffe6e6' : '#e6ffe6';
                // 居中显示
                cells[3].style.textAlign = 'center';
                cells[3].style.verticalAlign = 'middle';
            }
            if (cells[4]) {
                // 只更新第一行（大盘）的建议列，因为该单元格是合并的
                // 根据入市条件显示不同的建议内容和背景色
                const adviceText = canEnterMarket ? '白马股' : '烟蒂股';
                const adviceBgColor = canEnterMarket ? '#ffe6e6' : '#e6ffe6';
                
                cells[4].textContent = adviceText;
                // 设置样式
                cells[4].style.color = '#000000'; // 字体改为黑色
                cells[4].style.backgroundColor = adviceBgColor;
                // 居中显示
                cells[4].style.textAlign = 'center';
                cells[4].style.verticalAlign = 'middle';
                break; // 找到第一个建议单元格后就停止，因为它是合并的
            }
        }
    }
    
    // 更新中证全指EPV表格数据
    const epvTable = document.querySelector('.epv-table');
    console.log('[基金温度] 找到中证全指EPV表格:', epvTable);
    if (epvTable) {
        // 获取指数代码为1000002的数据
        const indexData = fundsData['1000002'];
        if (indexData) {
            console.log('[基金温度] 中证全指EPV数据', indexData.name, 'PE:', indexData.pe);
            
            // 获取PE-TTM(当前值)的值，转换为百分比格式
            const peValue = indexData.pe;
            const pePercentValue = peValue.toFixed(4) + '%';
            console.log('[基金温度] 中证全指EPV PE-TTM(当前值):', pePercentValue);
            
            // 更新PE_TTM单元格
            const epvRows = epvTable.querySelectorAll('tbody tr');
            if (epvRows[0]) {
                const epvCells = epvRows[0].querySelectorAll('td');
                if (epvCells[0]) {
                    epvCells[0].textContent = pePercentValue;
                    // 居中显示
                    epvCells[0].style.textAlign = 'center';
                    epvCells[0].style.verticalAlign = 'middle';
                }
                
                // 更新10年期国债收益单元格
                if (epvCells[1]) {
                    // 优先从localStorage加载金融数据
                    let bondYield = '1.803%'; // 默认值
                    
                    try {
                        const financialDataStr = localStorage.getItem('financialData');
                        if (financialDataStr) {
                            const financialData = JSON.parse(financialDataStr);
                            if (financialData.bond_yield && financialData.bond_yield.yield) {
                                bondYield = financialData.bond_yield.yield;
                                console.log('[基金温度] 从缓存读取到10年期国债收益率:', bondYield);
                            }
                        }
                    } catch (error) {
                        console.error('[基金温度] 读取缓存金融数据失败:', error.message);
                    }
                    
                    // 如果缓存中没有，从文件读取
                    if (bondYield === '1.803%') {
                        fetch('bond_yield.txt')
                            .then(response => response.text())
                            .then(data => {
                                const yieldData = data.trim();
                                if (yieldData) {
                                    bondYield = yieldData;
                                    console.log('[基金温度] 从文件读取到10年期国债收益率:', bondYield);
                                }
                            })
                            .catch(error => {
                                console.log('[基金温度] 读取债券收益率文件失败:', error);
                            })
                            .finally(() => {
                                updateEpvData(epvCells, bondYield);
                            });
                    } else {
                        // 缓存中有数据，直接使用
                        updateEpvData(epvCells, bondYield);
                    }
                }
            }
        }
    }
    
    // 更新四大魔盒表格数据
    const magicBoxTable = document.querySelector('.magic-box-table');
    console.log('[基金温度] 找到四大魔盒表格:', magicBoxTable);
    if (magicBoxTable) {
        // 获取指数代码为000906的数据（中证800）
        const index800Data = fundsData['000906'];
        if (index800Data) {
            console.log('[基金温度] 中证800数据', index800Data.name, 'PE分位点:', index800Data.pe_percentile, 'PB分位点:', index800Data.pb_percentile);
            
            // 计算中证800PE的值：PE-TTM(分位点%) * 100，加%号
            const pe800Value = index800Data.pe_percentile * 100;
            const pe800PercentValue = pe800Value.toFixed(2) + '%';
            console.log('[基金温度] 中证800PE值:', pe800PercentValue);
            
            // 计算中证800PB的值：PB(分位点%) * 100，加%号
            const pb800Value = index800Data.pb_percentile * 100;
            const pb800PercentValue = pb800Value.toFixed(2) + '%';
            console.log('[基金温度] 中证800PB值:', pb800PercentValue);
            
            // 计算股市吸引力
            let stockAttraction = 0;
            // 从CSV数据中获取ROE(2025Q3)值（从截图中看到是0.0745）
            const roeValue = 0.0745; // 净资产收益率(ROE)(2025Q3)
            
            // 优先从localStorage加载债券收益率
            let bondYield = '1.803%';
            
            try {
                const financialDataStr = localStorage.getItem('financialData');
                if (financialDataStr) {
                    const financialData = JSON.parse(financialDataStr);
                    if (financialData.bond_yield && financialData.bond_yield.yield) {
                        bondYield = financialData.bond_yield.yield;
                        console.log('[基金温度] 从缓存读取到10年期国债收益率:', bondYield);
                    }
                }
            } catch (error) {
                console.error('[基金温度] 读取缓存金融数据失败:', error.message);
            }
            
            // 如果缓存中没有，从文件读取
            if (bondYield === '1.803%') {
                fetch('bond_yield.txt')
                    .then(response => response.text())
                    .then(data => {
                        const yieldData = data.trim();
                        if (yieldData) {
                            bondYield = yieldData;
                        }
                    })
                    .catch(error => {
                        console.log('[基金温度] 读取债券收益率文件失败:', error);
                    })
                    .finally(() => {
                        calculateStockAttraction(bondYield, roeValue, magicBoxTable);
                    });
            } else {
                // 缓存中有数据，直接计算
                calculateStockAttraction(bondYield, roeValue, magicBoxTable);
            }
            
            // 更新四大魔盒表格数据
            const allRows = magicBoxTable.querySelectorAll('tbody tr');
            console.log('[基金温度] 找到四大魔盒表格行数:', allRows.length);
            
            for (let row of allRows) {
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const boxName = cells[0].textContent.trim();
                    
                    // 更新中证800PE值
                    if (boxName === '中证800PE') {
                        if (cells.length > 1) {
                            cells[1].textContent = pe800PercentValue;
                            cells[1].style.textAlign = 'center';
                            cells[1].style.verticalAlign = 'middle';
                        }
                    }
                    
                    // 更新中证800PB值
                    if (boxName === '中证800PB') {
                        if (cells.length > 1) {
                            cells[1].textContent = pb800PercentValue;
                            cells[1].style.textAlign = 'center';
                            cells[1].style.verticalAlign = 'middle';
                        }
                    }
                }
            }
            
            // 计算是否开启中证800魔盒
            const isBoxOpen = pe800Value > 70 && pb800Value > 70;
            const boxStatus = isBoxOpen ? '开启' : '关闭';
            const boxBgColor = isBoxOpen ? '#ffe6e6' : '#e6ffe6';
            console.log('[基金温度] 中证800魔盒开启条件检查 - PE:', pe800Value, 'PB:', pb800Value, '是否开启:', isBoxOpen, '状态:', boxStatus, '背景色:', boxBgColor);
            
            // 更新中证800魔盒的是否开启状态
            const rows = magicBoxTable.querySelectorAll('tbody tr');
            for (let row of rows) {
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    const boxName = cells[0].textContent.trim();
                    if (boxName === '中证800PE' || boxName === '中证800PB') {
                        if (cells.length > 3) {
                            const statusCell = cells[3];
                            statusCell.textContent = boxStatus;
                            const bgColor = isBoxOpen ? '#ffe6e6' : '#e6ffe6';
                            statusCell.setAttribute('style', `
                                color: #000000 !important;
                                background-color: ${bgColor} !important;
                                text-align: center !important;
                                vertical-align: middle !important;
                            `);
                            console.log('[基金温度] 已更新', boxName, '是否开启:', boxStatus, '背景色:', bgColor);
                        }
                    }
                }
            }
            
            // 验证最终状态
            console.log('[基金温度] 中证800魔盒最终状态:', boxStatus);
            console.log('[基金温度] 开启条件:', isBoxOpen ? '满足' : '不满足');
            console.log('[基金温度] 显示颜色:', isBoxOpen ? '淡粉色(#ffcccc)' : '淡绿色(#ccffcc)');
        }
    }
}

// 更新EPV数据
function updateEpvData(epvCells, bondYield) {
    // 更新单元格内容
    epvCells[1].textContent = bondYield;
    epvCells[1].style.textAlign = 'center';
    epvCells[1].style.verticalAlign = 'middle';
    console.log('[基金温度] 已更新10年期国债收益:', bondYield);
    
    // 计算并更新EPV值
    if (epvCells[0] && epvCells[2] && epvCells[3]) {
        const peText = epvCells[0].textContent.trim();
        const bondText = bondYield.trim();
        
        // 提取数值（去除%符号）
        const peValue = parseFloat(peText.replace('%', ''));
        const bondValue = parseFloat(bondText.replace('%', ''));
        
        if (!isNaN(peValue) && !isNaN(bondValue) && bondValue > 0) {
            // 计算EPV: PE_TTM / 10年期国债收益
            const epvValue = peValue / bondValue;
            console.log('[基金温度] 计算EPV - PE:', peValue, '国债收益:', bondValue, 'EPV:', epvValue);
            
            // 更新EPV单元格
            epvCells[2].textContent = epvValue.toFixed(8);
            epvCells[2].style.textAlign = 'center';
            epvCells[2].style.verticalAlign = 'middle';
            console.log('[基金温度] 已更新EPV值:', epvValue.toFixed(8));
            
            // 更新建议栏内容
            let advice = '';
            if (epvValue > 2.5) {
                advice = '黄金坑';
            } else if (epvValue >= 2 && epvValue <= 2.5) {
                advice = '白银坑';
            } else if (epvValue >= 1.5 && epvValue < 2) {
                advice = '青铜坑';
            } else {
                advice = '废坑';
            }
            
            epvCells[3].textContent = advice;
            epvCells[3].style.textAlign = 'center';
            epvCells[3].style.verticalAlign = 'middle';
            console.log('[基金温度] 已更新建议:', advice);
        }
    }
}

// 计算股市吸引力
function calculateStockAttraction(bondYield, roeValue, magicBoxTable) {
    // 提取国债收益率数值
    const bondValue = parseFloat(bondYield.replace('%', ''));
    
    if (!isNaN(bondValue) && bondValue > 0) {
        // 计算股市吸引力：ROE / 10年期国债收益
        const stockAttraction = roeValue / bondValue;
        // 将结果转换为百分比（乘以100）
        const stockAttractionPercent = stockAttraction * 100;
        console.log('[基金温度] 计算股市吸引力 - ROE:', roeValue, '国债收益:', bondValue, '股市吸引力:', stockAttraction, '百分比:', stockAttractionPercent);
        
        // 更新股市吸引力单元格
        const magicBoxRows = magicBoxTable.querySelectorAll('tbody tr');
        for (let row of magicBoxRows) {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const boxName = cells[0].textContent.trim();
                if (boxName === '股市吸引力') {
                    if (cells.length > 1) {
                        cells[1].textContent = stockAttractionPercent.toFixed(2) + '%';
                        cells[1].style.textAlign = 'center';
                        cells[1].style.verticalAlign = 'middle';
                        console.log('[基金温度] 已更新股市吸引力:', stockAttractionPercent.toFixed(2) + '%');
                    }
                }
            }
        }
    }
    
    // 计算巴菲特指数和七日换手率
    calculateBuffettIndexAndTurnover();
}

// 计算巴菲特指数和七日换手率
function calculateBuffettIndexAndTurnover() {
    console.log('[基金温度] 开始计算巴菲特指数和七日换手率');
    
    // 优先从localStorage加载金融数据
    let totalMarketValue = 1298644.19; // 默认值
    let gdp = 1401879.2; // 默认值
    let sevenDayTurnover = 42.6961; // 默认值
    
    try {
        const financialDataStr = localStorage.getItem('financialData');
        if (financialDataStr) {
            const financialData = JSON.parse(financialDataStr);
            if (financialData.a_stock && financialData.a_stock.total_market_value) {
                totalMarketValue = parseFloat(financialData.a_stock.total_market_value);
                console.log('[基金温度] 从缓存读取到A股总市值:', totalMarketValue);
            }
            if (financialData.gdp && financialData.gdp.gdp) {
                gdp = parseFloat(financialData.gdp.gdp);
                console.log('[基金温度] 从缓存读取到GDP:', gdp);
            }
        }
    } catch (error) {
        console.error('[基金温度] 读取缓存金融数据失败:', error.message);
    }
    
    // 计算巴菲特指数
    const buffettIndex = (totalMarketValue / gdp) * 100;
    console.log('[基金温度] 计算巴菲特指数 - 总市值:', totalMarketValue, 'GDP:', gdp, '巴菲特指数:', buffettIndex);
    
    // 更新页面显示
    const magicBoxTable = document.querySelector('.magic-box-table');
    if (magicBoxTable) {
        const rows = magicBoxTable.querySelectorAll('tbody tr');
        
        for (let row of rows) {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const boxName = cells[0].textContent.trim();
                
                // 更新巴菲特指数
                if (boxName === '巴菲特指数') {
                    if (cells.length > 1) {
                        cells[1].textContent = buffettIndex.toFixed(2) + '%';
                        cells[1].style.textAlign = 'center';
                        cells[1].style.verticalAlign = 'middle';
                        console.log('[基金温度] 已更新巴菲特指数:', buffettIndex.toFixed(2) + '%');
                    }
                }
                
                // 更新七日换手率
                if (boxName === '七日换手率') {
                    if (cells.length > 1) {
                        cells[1].textContent = sevenDayTurnover.toFixed(2) + '%';
                        cells[1].style.textAlign = 'center';
                        cells[1].style.verticalAlign = 'middle';
                        console.log('[基金温度] 已更新七日换手率:', sevenDayTurnover.toFixed(2) + '%');
                    }
                }
                
                // 更新是否开启状态
                if (cells.length > 3) {
                    if (boxName === '股市吸引力' || boxName === '巴菲特指数' || boxName === '七日换手率') {
                        const statusCell = cells[3];
                        let isOpen = false;
                        let statusText = '关闭';
                        let bgColor = '#e6ffe6'; // 浅绿色
                        
                        // 根据不同魔盒的开启条件判断
                        if (boxName === '股市吸引力') {
                            const value = parseFloat(cells[1].textContent.replace('%', ''));
                            isOpen = value < 1.5;
                        } else if (boxName === '巴菲特指数') {
                            const value = parseFloat(cells[1].textContent.replace('%', ''));
                            isOpen = value > 100;
                        } else if (boxName === '七日换手率') {
                            const value = parseFloat(cells[1].textContent.replace('%', ''));
                            isOpen = value > 10;
                        }
                        
                        // 设置状态和颜色
                        if (isOpen) {
                            statusText = '开启';
                            bgColor = '#ffe6e6'; // 浅粉色
                        }
                        
                        // 更新状态单元格
                        statusCell.textContent = statusText;
                        
                        // 使用setAttribute强制设置所有样式，确保优先级
                        statusCell.setAttribute('style', `
                            color: #000000 !important;
                            background-color: ${bgColor} !important;
                            text-align: center !important;
                            vertical-align: middle !important;
                            font-weight: normal !important;
                            font-size: 14px !important;
                            padding: 12px !important;
                            border: 1px solid #ddd !important;
                            border-radius: 0 !important;
                            box-shadow: none !important;
                            margin: 0 !important;
                            width: 100% !important;
                            height: 100% !important;
                            min-height: 60px !important;
                            line-height: 1.5 !important;
                            font-family: Arial, sans-serif !important;
                            display: table-cell !important;
                        `);
                        
                        console.log('[基金温度] 已更新', boxName, '是否开启:', statusText, '背景色:', bgColor);
                    }
                }
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    updateDate();
    calculateAndShowStarRating();
    loadAllData();
});

// 加载所有数据
async function loadAllData() {
    try {
        console.log('[基金温度] 开始加载所有数据');
        
        // 1. 首先尝试从缓存加载数据，快速显示
        const cacheKey = 'fundTempData_v5';
        const cachedDataStr = localStorage.getItem(cacheKey);
        
        if (cachedDataStr) {
            try {
                const tempData = JSON.parse(cachedDataStr);
                fundsData = tempData.fundsData;
                oldData = tempData.oldData;
                codeConfig = tempData.codeConfig;
                
                // 快速显示缓存数据
                console.log('[基金温度] 从缓存加载数据并快速显示');
                renderFundTable();
                updateDate(tempData.actualDataDate);
                calculateAndShowStarRating();
                calculateAndShowStockWeather();
                
                // 缓存数据显示后，异步更新最新数据
                console.log('[基金温度] 缓存数据已显示，开始异步更新最新数据');
                updateLatestData().catch(error => {
                    console.error('[基金温度] 异步更新数据失败:', error.message);
                });
                
                return;
            } catch (e) {
                console.error('[基金温度] 解析缓存数据失败:', e.message);
            }
        }
        
        // 2. 如果没有缓存，显示加载动画并加载数据
        showLoading(true);
        await loadDataSync();
        showLoading(false);
        
    } catch (error) {
        console.error('[基金温度] 加载数据失败:', error.message);
        showLoading(false);
        
        // 尝试从缓存加载数据
        const cacheKey = 'fundTempData_v5';
        const cachedDataStr = localStorage.getItem(cacheKey);
        if (cachedDataStr) {
            try {
                const tempData = JSON.parse(cachedDataStr);
                fundsData = tempData.fundsData;
                oldData = tempData.oldData;
                codeConfig = tempData.codeConfig;
                
                // 显示缓存数据
                renderFundTable();
                updateDate(tempData.actualDataDate);
                calculateAndShowStarRating();
                calculateAndShowStockWeather();
            } catch (e) {
                console.error('[基金温度] 解析缓存数据失败:', e.message);
                updateDate('未知日期');
            }
        } else {
            updateDate('未知日期');
        }
    }
}

// 同步加载数据（当没有缓存时使用）
async function loadDataSync() {
    // 加载 code.json
    console.log('[基金温度] 尝试加载 code.json');
    const codeRes = await fetch('code.json');
    if (!codeRes.ok) {
        throw new Error('code.json 加载失败');
    }
    codeConfig = await codeRes.json();
    console.log('[基金温度] code.json 加载成功');
    
    // 并行加载CSV文件，提高速度
    const existingCsvFiles = await findExistingCsvFiles();
    
    if (existingCsvFiles.length === 0) {
        throw new Error('未找到任何CSV文件');
    }
    
    // 加载最新的两个CSV文件
    const [latestFile, secondLatestFile] = existingCsvFiles;
    console.log(`[基金温度] 最新文件: ${latestFile}`);
    console.log(`[基金温度] 次新文件: ${secondLatestFile}`);
    
    // 并行加载两个文件
    const [latestData, secondLatestData] = await Promise.all([
        loadCsvFile(latestFile),
        secondLatestFile ? loadCsvFile(secondLatestFile) : Promise.resolve(null)
    ]);
    
    fundsData = latestData.data;
    oldData = secondLatestData ? secondLatestData.data : {};
    const actualDataDate = latestFile.replace('.csv', '');
    
    // 合并数据
    for (const [code, data] of Object.entries(oldData)) {
        if (fundsData[code]) {
            fundsData[code].two_day_change_pct = data.change_pct;
        }
    }
    
    // 合并自定义配置
    mergeCustomConfig();
    
    // 显示数据
    renderFundTable();
    updateDate(actualDataDate);
    calculateAndShowStarRating();
    calculateAndShowStockWeather();
    
    // 保存到缓存
    saveDataToCache(fundsData, oldData, codeConfig, actualDataDate);
    
    // 异步加载金融数据
    loadFinancialData().catch(error => {
        console.error('[基金温度] 加载金融数据失败:', error.message);
    });
}

// 异步更新最新数据
async function updateLatestData() {
    try {
        console.log('[基金温度] 开始异步更新最新数据');
        
        // 加载 code.json
        const codeRes = await fetch('code.json');
        if (codeRes.ok) {
            codeConfig = await codeRes.json();
        }
        
        // 查找最新的CSV文件
        const existingCsvFiles = await findExistingCsvFiles();
        if (existingCsvFiles.length === 0) {
            return;
        }
        
        // 加载最新的两个文件
        const [latestFile, secondLatestFile] = existingCsvFiles;
        const [latestData, secondLatestData] = await Promise.all([
            loadCsvFile(latestFile),
            secondLatestFile ? loadCsvFile(secondLatestFile) : Promise.resolve(null)
        ]);
        
        const newFundsData = latestData.data;
        const newOldData = secondLatestData ? secondLatestData.data : {};
        const actualDataDate = latestFile.replace('.csv', '');
        
        // 合并数据
        for (const [code, data] of Object.entries(newOldData)) {
            if (newFundsData[code]) {
                newFundsData[code].two_day_change_pct = data.change_pct;
            }
        }
        
        // 合并自定义配置
        mergeCustomConfig();
        
        // 更新数据并重新渲染
        fundsData = newFundsData;
        oldData = newOldData;
        
        console.log('[基金温度] 最新数据已加载，更新显示');
        renderFundTable();
        updateDate(actualDataDate);
        calculateAndShowStarRating();
        calculateAndShowStockWeather();
        
        // 保存到缓存
        saveDataToCache(fundsData, oldData, codeConfig, actualDataDate);
        
        // 加载金融数据
        await loadFinancialData();
        
    } catch (error) {
        console.error('[基金温度] 异步更新数据失败:', error.message);
    }
}

// 查找存在的CSV文件
async function findExistingCsvFiles() {
    const existingCsvFiles = [];
    const today = new Date();
    
    // 生成过去30天的日期文件
    const dateFiles = [];
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const fileName = date.toISOString().split('T')[0] + '.csv';
        dateFiles.push(fileName);
    }
    
    // 并行检查文件是否存在
    const promises = dateFiles.map(async (fileName) => {
        try {
            const response = await fetch(fileName, { cache: 'no-cache' });
            if (response.ok) {
                return fileName;
            }
            return null;
        } catch (error) {
            return null;
        }
    });
    
    const results = await Promise.all(promises);
    const validFiles = results.filter(file => file !== null);
    
    // 按日期降序排序
    validFiles.sort((a, b) => b.localeCompare(a));
    console.log('[基金温度] 找到的CSV文件:', validFiles);
    
    return validFiles;
}

// 加载CSV文件
async function loadCsvFile(fileName) {
    try {
        const response = await fetch(fileName, { cache: 'no-cache' });
        if (response.ok) {
            const csvText = await response.text();
            const data = parseCSVFull(csvText);
            return { data, fileName };
        }
        return { data: {}, fileName };
    } catch (error) {
        console.error(`[基金温度] 加载文件 ${fileName} 失败:`, error);
        return { data: {}, fileName };
    }
}

// 合并自定义配置
function mergeCustomConfig() {
    const customConfigStr = localStorage.getItem('customCodeConfig');
    if (customConfigStr && codeConfig) {
        try {
            const customConfig = JSON.parse(customConfigStr);
            for (const [category, codes] of Object.entries(customConfig)) {
                if (codeConfig[category]) {
                    const existingCodes = new Set(codeConfig[category]);
                    for (const code of codes) {
                        if (!existingCodes.has(code)) {
                            codeConfig[category].push(code);
                        }
                    }
                } else {
                    codeConfig[category] = codes;
                }
            }
        } catch (e) {
            console.error('[基金温度] 合并自定义配置失败:', e.message);
        }
    }
}

// 保存数据到缓存
function saveDataToCache(fundsData, oldData, codeConfig, actualDataDate) {
    const cacheKey = 'fundTempData_v5';
    fundTempCache[cacheKey] = {
        fundsData: fundsData,
        oldData: oldData,
        codeConfig: codeConfig,
        actualDataDate: actualDataDate,
        timestamp: Date.now()
    };
    
    // 保存到localStorage
    try {
        localStorage.setItem(cacheKey, JSON.stringify(fundTempCache[cacheKey]));
        console.log('[基金温度] 数据已保存到缓存');
    } catch (error) {
        console.error('[基金温度] 保存缓存失败:', error.message);
    }
}

// 加载金融数据（债券收益率、A股数据、GDP数据）
async function loadFinancialData() {
    try {
        console.log('[基金温度] 开始加载金融数据');
        
        // 加载合并的金融数据文件
        const response = await fetch('combined_data.json', { cache: 'no-cache' });
        if (response.ok) {
            const financialData = await response.json();
            console.log('[基金温度] 金融数据加载成功:', financialData);
            
            // 保存到localStorage
            try {
                localStorage.setItem('financialData', JSON.stringify(financialData));
                console.log('[基金温度] 金融数据已保存到缓存');
            } catch (error) {
                console.error('[基金温度] 保存金融数据缓存失败:', error.message);
            }
            
            // 更新相关UI
            calculateAndShowStockWeather();
        }
    } catch (error) {
        console.error('[基金温度] 加载金融数据失败:', error.message);
    }
}

// 加载所有历史CSV文件数据
async function loadHistoricalData() {
    try {
        // 显示加载中
        showLoading(true);
        
        // 动态生成CSV文件名，从2025年12月开始到当前日期，尝试加载所有可能的历史文件
        const allCsvFiles = [];
        const startDate = new Date('2025-12-01');
        const endDate = new Date();
        
        // 生成从startDate到endDate的所有日期
        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const fileName = d.toISOString().split('T')[0] + '.csv';
            allCsvFiles.push(fileName);
        }
        
        // 按日期排序（虽然我们生成时已经是按日期顺序，但为了安全起见）
        allCsvFiles.sort();
        
        // 加载所有CSV文件数据
        const historicalData = {};
        
        for (const file of allCsvFiles) {
            try {
                const response = await fetch(file);
                if (response.ok) {
                    const csvText = await response.text();
                    const data = parseCSVFull(csvText);
                    const date = file.replace('.csv', '');
                    
                    // 处理每个指数的数据
                    for (const [code, indexData] of Object.entries(data)) {
                        if (!historicalData[code]) {
                            historicalData[code] = [];
                        }
                        
                        // 检查是否已经存在该日期的数据（避免重复）
                        const existingIndex = historicalData[code].findIndex(item => item.date === date);
                        if (existingIndex === -1) {
                            // 计算温度
                            let temperature;
                            const category = CATEGORY_MAP[code] || '';
                            if (category === 'E') {
                                // 行业类：温度 = PB分位点 × 100
                                temperature = indexData.pb_percentile * 100;
                            } else {
                                // 其他类：温度 = (PE分位点 + PB分位点) / 2 × 100
                                temperature = (indexData.pe_percentile + indexData.pb_percentile) / 2 * 100;
                            }
                            
                            historicalData[code].push({
                                date,
                                temperature,
                                name: indexData.name
                            });
                        }
                    }
                }
            } catch (fileError) {
                // 忽略不存在的文件错误
            }
        }
        
        // 按日期排序每个指数的历史数据
        for (const code in historicalData) {
            historicalData[code].sort((a, b) => new Date(a.date) - new Date(b.date));
        }
        
        showLoading(false);
        return historicalData;
    } catch (error) {
        showLoading(false);
        return {};
    }
}

// 显示/隐藏加载中
function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.style.display = show ? 'flex' : 'none';
    }
}

// 关闭图表
function closeChart() {
    const chartSection = document.querySelector('.chart-section');
    if (chartSection) {
        chartSection.style.display = 'none';
    }
    if (window.myChart) {
        window.myChart.dispose();
        window.myChart = null;
    }
}

// 切换图表显示天数
function changeChartDays(days) {
    if (currentChartState.type === 'temperature') {
        showTemperatureChart(currentChartState.code, currentChartState.name, days);
    } else if (currentChartState.type === 'nav') {
        showFundNavChart(currentChartState.code, currentChartState.fundType);
    }
}

// 更新时间范围按钮状态
function updateTimeButtons() {
    const buttons = document.querySelectorAll('.time-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`.time-btn[onclick="changeChartDays(${currentChartState.days})"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// 渲染基金温度表格
function renderFundTable() {
    const tbody = document.getElementById('fundTableBody');
    if (!tbody) return;
    
    // 检查数据是否加载
    if (!codeConfig || !fundsData) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">数据加载中...</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    // 每个类别需要选出的数量
    const categorySelectionCount = {
        'B': 1, // 大盘选1个
        'C': 1, // 小盘选1个
        'D': 2, // 策略选2个
        'E': 2, // 行业选2个
        'F': 2, // 主题选2个
        'G': 1, // 海外选1个
        'H': 2  // 债券选2个
    };
    
    // 收集每个类别的数据并计算温度
    const categoryDataMap = {};
    const missingCodes = []; // 记录缺失的代码
    const matchedCodes = []; // 记录匹配的代码
    
    for (const category of Object.keys(codeConfig)) {
        const codes = codeConfig[category];
        if (!codes || codes.length === 0) continue;
        
        categoryDataMap[category] = [];
        
        for (const code of codes) {
            const data = fundsData[code];
            if (!data) {
                // 记录缺失的代码
                if (!missingCodes.includes(code)) {
                    missingCodes.push(code);
                }
                continue;
            }
            
            // 记录匹配的代码
            if (!matchedCodes.includes(code)) {
                matchedCodes.push(code);
            }
            
            // 计算温度
            let temperature;
            if (category === 'E') {
                // 行业类：温度 = PB分位点 × 100
                temperature = data.pb_percentile * 100;
            } else {
                // 其他类：温度 = (PE分位点 + PB分位点) / 2 × 100
                temperature = (data.pe_percentile + data.pb_percentile) / 2 * 100;
            }
            
            // 解析关注度数值用于排序
            let attentionValue = 0;
            if (data.attention) {
                attentionValue = parseFloat(data.attention.replace(/[^0-9.]/g, '')) || 0;
            }
            
            categoryDataMap[category].push({
                category,
                code,
                data,
                temperature,
                attentionValue
            });
        }
        
        // 每个类别内按温度升序排序（温度最低的排前面）
        categoryDataMap[category].sort((a, b) => {
            if (Math.abs(a.temperature - b.temperature) > 0.01) {
                return a.temperature - b.temperature;
            }
            // 温度相同则按关注度降序
            return b.attentionValue - a.attentionValue;
        });
    }
    
    // 收集最终要显示的数据
    const finalData = [];
    const processedCategories = new Set();
    
    // 首先添加每个类别选出的top数据（总数11个）
    for (const category of ['B', 'C', 'D', 'E', 'F', 'G', 'H']) {
        const selectionCount = categorySelectionCount[category] || 1;
        const categoryData = categoryDataMap[category];
        
        if (categoryData && categoryData.length > 0) {
            // 选出指定数量的数据
            const selectedCount = Math.min(selectionCount, categoryData.length);
            for (let i = 0; i < selectedCount; i++) {
                finalData.push({
                    ...categoryData[i],
                    isTopSelection: true  // 标记为精选
                });
            }
            processedCategories.add(category);
        }
    }
    
    // 然后添加其余数据
    for (const category of Object.keys(categoryDataMap)) {
        const categoryData = categoryDataMap[category];
        const selectionCount = categorySelectionCount[category] || 1;
        
        if (categoryData && categoryData.length > selectionCount) {
            for (let i = selectionCount; i < categoryData.length; i++) {
                finalData.push({
                    ...categoryData[i],
                    isTopSelection: false
                });
            }
        }
    }
    
    // 渲染表格
    let displayedCount = 0;
    
    for (const item of finalData) {
        const { category, code, data, temperature, isTopSelection } = item;
        const categoryInfo = CATEGORIES[category];
        
        // 温度颜色：高温绿色，正常黄色，低温红色
        let tempClass;
        if (temperature >= 50) {
            tempClass = 'temperature-hot'; // 高温绿色
        } else if (temperature >= 30) {
            tempClass = 'temperature-normal'; // 正常黄色
        } else {
            tempClass = 'temperature-cold'; // 低温红色
        }
        
        // 格式化涨跌幅
        const yearChangeHtml = formatChange(data.year_change_pct);
        const changeHtml = formatChange(data.change_pct);
        const twoDayChangeHtml = data.two_day_change_pct !== undefined 
            ? formatChange(data.two_day_change_pct) 
            : '<span>--</span>';
        
        // 关注度
        const attentionHtml = formatAttention(data.attention);
        
        // 创建表格行
        const row = document.createElement('tr');
        
        // 设置类别背景色
        if (categoryInfo.backgroundColor) {
            row.style.backgroundColor = categoryInfo.backgroundColor;
        }
        
        // 添加点击事件
        row.onclick = () => showTemperatureChart(code, data.name);
        
        // 获取场内代码和场外代码
        const fundCodes = FUND_CODES_MAP[code] || {场内代码: '-', 场外代码: '-'};
        const 场内代码 = fundCodes.场内代码;
        const 场外代码 = fundCodes.场外代码;
        
        // 为精选数据添加特殊标记 - 使用边框和背景色区分
        if (isTopSelection) {
            row.style.cssText = `
                border: 3px solid #FFD700;
                background-color: #cce5ff;
            `;
            row.innerHTML = `
                <td>${categoryInfo.name} ⭐</td>
                <td>${code}</td>
                <td>${data.name}</td>
                <td class="temperature-cell" style="cursor: pointer;">
                    <span class="temp-value ${tempClass}">${temperature.toFixed(2)}°C</span>
                </td>
                <td>${yearChangeHtml}</td>
                <td>${changeHtml}</td>
                <td>${twoDayChangeHtml}</td>
                <td style="${场内代码 !== '-' ? 'cursor: pointer; text-decoration: underline;' : ''}">${场内代码}</td>
                <td style="${场外代码 !== '-' ? 'cursor: pointer; text-decoration: underline;' : ''}">${场外代码}</td>
                <td>${attentionHtml}</td>
            `;
        } else {
            row.innerHTML = `
                <td>${categoryInfo.name}</td>
                <td>${code}</td>
                <td>${data.name}</td>
                <td class="temperature-cell" style="cursor: pointer;">
                    <span class="temp-value ${tempClass}">${temperature.toFixed(2)}°C</span>
                </td>
                <td>${yearChangeHtml}</td>
                <td>${changeHtml}</td>
                <td>${twoDayChangeHtml}</td>
                <td style="${场内代码 !== '-' ? 'cursor: pointer; text-decoration: underline;' : ''}">${场内代码}</td>
                <td style="${场外代码 !== '-' ? 'cursor: pointer; text-decoration: underline;' : ''}">${场外代码}</td>
                <td>${attentionHtml}</td>
            `;
        }
        
        // 添加点击事件
        row.querySelectorAll('td')[3].onclick = (e) => {
            e.stopPropagation();
            showTemperatureChart(code, data.name);
        };
        
        // 为场内代码添加点击事件
        row.querySelectorAll('td')[7].onclick = (e) => {
            e.stopPropagation();
            if (场内代码 && 场内代码 !== '-') {
                showFundNavChart(场内代码, '场内');
            }
        };
        
        // 为场外代码添加点击事件
        row.querySelectorAll('td')[8].onclick = (e) => {
            e.stopPropagation();
            if (场外代码 && 场外代码 !== '-') {
                showFundNavChart(场外代码, '场外');
            }
        };
        
        // 整行点击事件
        row.onclick = () => showTemperatureChart(code, data.name);
        
        tbody.appendChild(row);
        displayedCount++;
    }
    
    // 添加提示信息
    if (displayedCount > 0) {
        const infoRow = document.createElement('tr');
        infoRow.innerHTML = `
            <td colspan="10" style="text-align: center; padding: 10px;">
                <span>💡 提示：点击任意指数行查看历史温度曲线图</span>
            </td>
        `;
        tbody.appendChild(infoRow);
    }
    
    // 如果没有显示任何数据，显示提示
    if (displayedCount === 0) {
        tbody.innerHTML = '<tr><td colspan="10" style="text-align: center;">没有找到匹配的指数数据，请检查CSV数据是否包含有效代码</td></tr>';
    }
}

// 格式化涨跌幅
function formatChange(value) {
    if (value > 0) {
        return `<span class="positive">+${value.toFixed(2)}%</span>`;
    } else if (value < 0) {
        return `<span class="negative">${value.toFixed(2)}%</span>`;
    }
    return '<span>0.00%</span>';
}

// 格式化关注度
function formatAttention(value) {
    if (!value) return '--';
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    if (!isNaN(numValue) && numValue > 10000) {
        return `<span class="attention-high">${value}</span>`;
    }
    return value;
}

// 完整解析CSV数据
// 处理Excel格式的CSV值（处理="代码"格式）
function parseValue(val) {
    if (!val) return '';
    // 处理Excel格式：="12345" -> 12345
    val = val.trim();
    if (val.startsWith('="') && val.endsWith('"')) {
        val = val.slice(2, -1);
    } else if (val.startsWith('=')) {
        // 处理 =12345 或 ="12345" 格式
        val = val.slice(1).replace(/^"|"$/g, '');
    }
    // 去除所有残留引号
    val = val.replace(/"/g, '');
    return val;
}

// 处理数值
function parseNumber(val) {
    if (!val) return 0;
    val = parseValue(val);
    // 移除百分号
    val = val.replace(/%$/g, '');
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
}

// 处理涨跌幅（带百分号，需要乘以100）
function parsePercent(val) {
    if (!val) return 0;
    val = parseValue(val);
    // 移除百分号
    val = val.replace(/%$/g, '');
    const num = parseFloat(val);
    // 乘以100，将小数转换为百分比，例如 0.0368 -> 3.68%, 0.0022 -> 0.22%
    return isNaN(num) ? 0 : num * 100;
}

function parseCSVFull(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return {};
    
    // 解析表头，支持中英文列名
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    // 创建列名映射
    const colMap = {};
    headers.forEach((h, idx) => {
        const hLower = h.trim().toLowerCase();
        // 处理更多的中文和英文列名，确保能匹配2026-01-15.csv的字段名
        if (h === '指数代码' || hLower === 'code') colMap.code = idx;
        else if (h === '指数名称' || hLower === 'name') colMap.name = idx;
        // 处理"涨跌幅"、"上一日涨跌"、"今日涨跌幅"等字段名
        else if (h === '涨跌幅' || h === '上一日涨跌' || h === '今日涨跌幅' || hLower === 'change_pct') 
            colMap.change_pct = idx;
        // 处理"今年以来涨跌幅"、"今年涨跌幅"等字段名
        else if (h === '今年以来涨跌幅' || h === '今年涨跌幅' || h === '今年涨幅' || h === '今年涨跌' || hLower === 'year_change_pct') 
            colMap.year_change_pct = idx;
        // 处理"上两日涨跌"字段名
        else if (h === '上两日涨跌' || hLower === 'two_day_change_pct') 
            colMap.two_day_change_pct = idx;
        // 处理PE相关字段名
        else if (h === 'PE-TTM(当前值)' || hLower === 'pe') colMap.pe = idx;
        else if (h === 'PE-TTM(分位点%)' || hLower === 'pe_percentile') colMap.pe_percentile = idx;
        // 处理PB相关字段名
        else if (h === 'PB(当前值)' || h === 'PB' || hLower === 'pb') colMap.pb = idx;
        else if (h === 'PB(分位点%)' || hLower === 'pb_percentile') colMap.pb_percentile = idx;
        // 处理关注度字段名
        else if (h === '关注度' || hLower === 'attention') colMap.attention = idx;
    });
    
    // 调试日志，确保关键字段被正确映射
    console.log('[基金温度] 列名映射:', colMap);
    
    const data = {};
    
    for (let i = 1; i < lines.length; i++) {
        // 处理CSV行，可能包含引号内的逗号
        const values = [];
        let currentVal = '';
        let inQuotes = false;
        
        for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentVal);
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        values.push(currentVal);
        
        // 去除每个值两端的引号（如果有）
        for (let k = 0; k < values.length; k++) {
            values[k] = values[k].replace(/^"|"$/g, '');
        }
        
        // 确保有code列
        if (colMap.code === undefined || colMap.code >= values.length) continue;
        const rawCode = values[colMap.code];
        const code = parseValue(rawCode);
        
        // 跳过无效代码
        if (!code || code.length < 2) continue;
        
        // 解析并存储数据
        const itemData = {
            name: parseValue(values[colMap.name]) || '',
            change_pct: parsePercent(values[colMap.change_pct]),
            year_change_pct: parsePercent(values[colMap.year_change_pct]),
            two_day_change_pct: parsePercent(values[colMap.two_day_change_pct]),
            pe: parseNumber(values[colMap.pe]),
            pb: parseNumber(values[colMap.pb]),
            pe_percentile: parseNumber(values[colMap.pe_percentile]), // 直接使用原始数值，CSV中已经是小数形式
            pb_percentile: parseNumber(values[colMap.pb_percentile]), // 直接使用原始数值，CSV中已经是小数形式
            attention: parseValue(values[colMap.attention])
        };
        
        // 只存储有效的数据
        if (itemData.name) {
            data[code] = itemData;
        }
    }
    
    console.log('[基金温度] 解析完成，共解析', Object.keys(data).length, '个指数');
    return data;
}

function parseOldCSVFull(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return {};
    
    // 解析表头，支持中英文列名
    const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
    
    // 创建列名映射
    const colMap = {};
    headers.forEach((h, idx) => {
        const hLower = h.toLowerCase();
        if (h === '指数代码' || hLower === 'code') colMap.code = idx;
        else if (h === '今日涨跌幅' || hLower === 'change_pct' || h === '涨跌幅') colMap.change_pct = idx;
    });
    
    const data = {};
    
    for (let i = 1; i < lines.length; i++) {
        // 处理CSV行，可能包含引号内的逗号
        const values = [];
        let currentVal = '';
        let inQuotes = false;
        
        for (let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(currentVal);
                currentVal = '';
            } else {
                currentVal += char;
            }
        }
        values.push(currentVal);
        
        // 去除每个值两端的引号（如果有）
        for (let k = 0; k < values.length; k++) {
            values[k] = values[k].replace(/^"|"$/g, '');
        }
        
        // 确保有code列
        if (colMap.code === undefined || colMap.code >= values.length) continue;
        const rawCode = values[colMap.code];
        const code = parseValue(rawCode);
        
        // 跳过无效代码
        if (!code || code.length < 2) continue;
        
        // 解析并存储数据
        const itemData = {
            change_pct: parsePercent(values[colMap.change_pct])
        };
        
        // 只存储有效的数据
        if (itemData.change_pct) {
            data[code] = itemData;
        }
    }
    
    console.log('[基金温度] 旧数据解析完成，共解析', Object.keys(data).length, '个指数');
    return data;
}