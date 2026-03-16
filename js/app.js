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

// 指数类别映射 - 从 fund-code.js 动态生成
let CATEGORY_MAP = {};

// 初始化 CATEGORY_MAP（在 fund-code.js 加载后调用）
function initCategoryMap() {
    CATEGORY_MAP = generateCategoryMap();
    console.log('[基金温度] CATEGORY_MAP 已初始化:', CATEGORY_MAP);
}

// 指数代码与场内/场外基金映射表 - 从 fund-code.js 动态生成
let FUND_CODES_MAP = {};

// 初始化 FUND_CODES_MAP（在 fund-code.js 加载后调用）
function initFundCodesMap() {
    FUND_CODES_MAP = generateFundCodesMap();
    console.log('[基金温度] FUND_CODES_MAP 已初始化:', FUND_CODES_MAP);
}

// 全局变量
let fundsData = null;
let oldData = null;
let codeConfig = null;
let etfData = {}; // ETF涨幅数据

// 缓存相关设置
const CACHE_EXPIRE_TIME = 24 * 60 * 60 * 1000; // 缓存过期时间：24小时
let fundNavCache = {}; // 基金净值数据缓存
let fundTempCache = {}; // 基金温度数据缓存
let etfCache = {}; // ETF数据缓存



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
        
        // 加载ETF数据缓存
        const etfCacheStr = localStorage.getItem('etfCache');
        if (etfCacheStr) {
            etfCache = JSON.parse(etfCacheStr);
        }
    } catch (error) {
        fundNavCache = {};
        fundTempCache = {};
        etfCache = {};
    }
}

// 保存缓存到localStorage
function saveCache() {
    try {
        localStorage.setItem('fundNavCache', JSON.stringify(fundNavCache));
        localStorage.setItem('fundTempCache', JSON.stringify(fundTempCache));
        localStorage.setItem('etfCache', JSON.stringify(etfCache));
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
async function showTemperatureChart(code, name, days = 20) {
    console.log('显示温度图表:', code, name, '天数:', days);
    
    try {
        showLoading(true);
        
        // 扫描所有CSV文件
        const today = new Date();
        const existingCsvFiles = [];
        
        for (let i = 0; i < 60; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const fileName = date.toISOString().split('T')[0] + '.csv';
            
            try {
                const response = await fetch(fileName, { cache: 'no-cache' });
                if (response.ok) {
                    existingCsvFiles.push(fileName);
                }
            } catch (error) {
                // 文件不存在，忽略
            }
        }
        
        // 按日期升序排序（最早的在前）
        existingCsvFiles.sort((a, b) => a.localeCompare(b));
        
        if (existingCsvFiles.length === 0) {
            alert('未找到任何CSV文件');
            showLoading(false);
            return;
        }
        
        // 根据传入的天数参数筛选CSV文件（几个CSV文件就是几天）
        const startIndex = Math.max(0, existingCsvFiles.length - days);
        const filteredCsvFiles = existingCsvFiles.slice(startIndex);
        
        // 加载筛选后的CSV文件并计算温度
        const temperatureData = [];
        const dates = [];
        const category = CATEGORY_MAP[code] || 'B';
        
        for (const fileName of filteredCsvFiles) {
            try {
                const response = await fetch(fileName, { cache: 'no-cache' });
                const csvText = await response.text();
                const data = parseCSVFull(csvText);
                
                if (data[code]) {
                    const indexData = data[code];
                    let temperature;
                    
                    if (category === 'E') {
                        temperature = indexData.pb_percentile * 100;
                    } else {
                        temperature = (indexData.pe_percentile + indexData.pb_percentile) / 2 * 100;
                    }
                    
                    const dateStr = fileName.replace('.csv', '');
                    dates.push(dateStr);
                    temperatureData.push(temperature.toFixed(2));
                }
            } catch (error) {
                console.error(`加载文件 ${fileName} 失败:`, error);
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
            days: filteredCsvFiles.length
        };
        
        // 显示图表
        const chartSection = document.querySelector('.chart-section');
        const chartTitle = document.getElementById('chartTitle');
        const chartTypeTitle = document.getElementById('chartTypeTitle');
        const chartContainer = document.getElementById('temperatureChart');
        
        chartSection.style.display = 'block';
        chartTitle.textContent = `${name} (${code}) - 最近${filteredCsvFiles.length}天`;
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
    // 只计算大盘(B)和小盘(C)的温度，与股市晴雨表保持一致
    let totalTemperature = 0;
    let count = 0;
    
    // 只遍历大盘(B)和小盘(C)类别
    const targetCategories = ['B', 'C'];
    
    for (const category of targetCategories) {
        const codes = codeConfig[category];
        if (!codes || codes.length === 0) continue;
        
        for (const code of codes) {
            const data = fundsData[code];
            if (!data) continue;
            
            // 计算温度：(PE分位点 + PB分位点) / 2 × 100
            const temperature = (data.pe_percentile + data.pb_percentile) / 2 * 100;
            
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
    
    // 计算大盘数据（取平均值）
    let totalBigCapPE = 0;
    let totalBigCapPB = 0;
    let bigCapCount = 0;
    
    console.log('[基金温度] 开始计算大盘温度');
    if (codeConfig['B']) {
        for (const code of codeConfig['B']) {
            const data = fundsData[code];
            if (data) {
                console.log('[基金温度] 大盘指数', code, data.name, 'PE:', data.pe, 'PB:', data.pb, 'PE分位点:', data.pe_percentile, 'PB分位点:', data.pb_percentile);
                totalBigCapPE += data.pe_percentile;
                totalBigCapPB += data.pb_percentile;
                bigCapCount++;
            }
        }
    }
    
    // 计算小盘数据（取平均值）
    let totalSmallCapPE = 0;
    let totalSmallCapPB = 0;
    let smallCapCount = 0;
    
    console.log('[基金温度] 开始计算小盘温度');
    if (codeConfig['C']) {
        for (const code of codeConfig['C']) {
            const data = fundsData[code];
            if (data) {
                console.log('[基金温度] 小盘指数', code, data.name, 'PE:', data.pe, 'PB:', data.pb, 'PE分位点:', data.pe_percentile, 'PB分位点:', data.pb_percentile);
                totalSmallCapPE += data.pe_percentile;
                totalSmallCapPB += data.pb_percentile;
                smallCapCount++;
            }
        }
    }
    
    // 计算平均值
    const avgBigCapPE = bigCapCount > 0 ? totalBigCapPE / bigCapCount : 0;
    const avgBigCapPB = bigCapCount > 0 ? totalBigCapPB / bigCapCount : 0;
    const avgSmallCapPE = smallCapCount > 0 ? totalSmallCapPE / smallCapCount : 0;
    const avgSmallCapPB = smallCapCount > 0 ? totalSmallCapPB / smallCapCount : 0;
    
    // 转换为百分比
    const bigCapPEPercent = (avgBigCapPE * 100).toFixed(2) + '%';
    const bigCapPBPercent = (avgBigCapPB * 100).toFixed(2) + '%';
    const smallCapPEPercent = (avgSmallCapPE * 100).toFixed(2) + '%';
    const smallCapPBPercent = (avgSmallCapPB * 100).toFixed(2) + '%';
    
    console.log('[基金温度] 计算结果 - 大盘PE:', bigCapPEPercent, '大盘PB:', bigCapPBPercent, '小盘PE:', smallCapPEPercent, '小盘PB:', smallCapPBPercent);
    
    // 计算入市条件
    const bigCapPEValue = parseFloat(avgBigCapPE * 100);
    const bigCapPBValue = parseFloat(avgBigCapPB * 100);
    const smallCapPEValue = parseFloat(avgSmallCapPE * 100);
    const smallCapPBValue = parseFloat(avgSmallCapPB * 100);
    
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
    // 初始化从 fund-code.js 生成的映射表
    initFundCodesMap();
    initCategoryMap();
    
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
    // 使用 fund-code.js 中的配置作为唯一数据源
    console.log('[基金温度] 使用 fund-code.js 中的配置');
    codeConfig = generateCodeConfig();
    console.log('[基金温度] fund-code.js 配置加载成功:', codeConfig);
    
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
    
    // 加载ETF数据
    await loadEtfData().catch(error => {
        console.error('[基金温度] 加载ETF数据失败:', error.message);
    });
    
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
        
        // 使用 fund-code.js 中的配置作为唯一数据源
        codeConfig = generateCodeConfig();
        console.log('[基金温度] fund-code.js 配置已更新:', codeConfig);
        
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
        
        // 更新数据
        fundsData = newFundsData;
        oldData = newOldData;
        
        // 加载ETF数据
        await loadEtfData().catch(error => {
            console.error('[基金温度] 加载ETF数据失败:', error.message);
        });
        
        // 重新渲染
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

// 加载ETF数据
async function loadEtfData() {
    try {
        console.log('[基金温度] 开始加载ETF数据');
        
        // 从文件加载
        const response = await fetch('etf_data.json', { cache: 'no-cache' });
        if (response.ok) {
            etfData = await response.json();
            console.log('[基金温度] ETF数据加载成功:', etfData);
            
            // 保存到缓存
            const cacheKey = 'etfData';
            const now = Date.now();
            etfCache[cacheKey] = {
                data: etfData,
                timestamp: now
            };
            saveCache();
        }
    } catch (error) {
        console.error('[基金温度] 加载ETF数据失败:', error.message);
        etfData = {};
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
        tbody.innerHTML = '<tr><td colspan="12" style="text-align: center;">数据加载中...</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    // 从 fund-code.js 获取所有配置的指数代码
    const configuredCodes = getAllIndexCodes();
    console.log('[基金温度] 配置的指数代码:', configuredCodes);
    
    // 收集数据并计算温度 - 只显示 fund-code.js 中配置的指数
    const finalData = [];
    const missingCodes = []; // 记录缺失的代码
    const matchedCodes = []; // 记录匹配的代码
    
    // 按类别分组数据
    const categoryDataMap = {};
    
    for (const code of configuredCodes) {
        const data = fundsData[code];
        const category = CATEGORY_MAP[code];
        
        if (!data) {
            // 记录缺失的代码
            if (!missingCodes.includes(code)) {
                missingCodes.push(code);
            }
            continue;
        }
        
        if (!category) {
            console.warn('[基金温度] 指数代码未找到对应类别:', code);
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
        
        if (!categoryDataMap[category]) {
            categoryDataMap[category] = [];
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
    for (const category of Object.keys(categoryDataMap)) {
        categoryDataMap[category].sort((a, b) => {
            if (Math.abs(a.temperature - b.temperature) > 0.01) {
                return a.temperature - b.temperature;
            }
            // 温度相同则按关注度降序
            return b.attentionValue - a.attentionValue;
        });
    }
    
    // 按类别顺序收集最终要显示的数据（B->C->D->E->F->G->H）
    for (const category of ['B', 'C', 'D', 'E', 'F', 'G', 'H']) {
        const categoryData = categoryDataMap[category];
        if (categoryData && categoryData.length > 0) {
            for (const item of categoryData) {
                finalData.push({
                    ...item,
                    isTopSelection: false  // 不再标记精选，所有数据平等显示
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
        const fundCodes = FUND_CODES_MAP[code] || {场内代码: '-', 场外代码A: '-', 场外代码C: '-'};  
        const 场内代码 = fundCodes.场内代码;
        const 场外代码A = fundCodes.场外代码A;
        const 场外代码C = fundCodes.场外代码C;
        
        // 获取ETF涨幅数据
        const 涨幅 = etfData[场内代码] || '--';
        const 涨幅Html = 涨幅 !== '--' ? formatChange(parseFloat(涨幅)) : '<span>--</span>';
        
        // 计算策略
        const yearChange = data.year_change_pct || 0;
        const change = data.change_pct || 0;
        const twoDayChange = data.two_day_change_pct || 0;
        const 涨幅数值 = 涨幅 !== '--' ? parseFloat(涨幅) : 0;
        
        let 策略 = '持有';
        // 买入条件：今年涨幅>0，且上一日涨跌<0，且上两日涨跌<0，且涨幅>0
        if (yearChange > 0 && change < 0 && twoDayChange < 0 && 涨幅数值 > 0) {
            策略 = '买入';
        }
        // 卖出条件：上一日涨跌>0，且上两日涨跌>0，且涨幅<0
        else if (change > 0 && twoDayChange > 0 && 涨幅数值 < 0) {
            策略 = '卖出';
        }
        
        const 策略Html = 策略 === '买入' ? '<span class="strategy-buy">买入</span>' : 
                         策略 === '卖出' ? '<span class="strategy-sell">卖出</span>' : 
                         '<span class="strategy-hold">持有</span>';
        
        // 渲染行内容
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
            <td>${涨幅Html}</td>
            <td>${策略Html}</td>
            <td style="${场外代码A !== '-' ? 'cursor: pointer; text-decoration: underline;' : ''}">${场外代码A}</td>
            <td style="${场外代码C !== '-' ? 'cursor: pointer; text-decoration: underline;' : ''}">${场外代码C}</td>
            <td>${attentionHtml}</td>
        `;
        
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
        
        // 为场外代码A添加点击事件
        row.querySelectorAll('td')[8].onclick = (e) => {
            e.stopPropagation();
            if (场外代码A && 场外代码A !== '-') {
                showFundNavChart(场外代码A, '场外');
            }
        };
        
        // 为场外代码C添加点击事件
        row.querySelectorAll('td')[9].onclick = (e) => {
            e.stopPropagation();
            if (场外代码C && 场外代码C !== '-') {
                showFundNavChart(场外代码C, '场外');
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
            <td colspan="12" style="text-align: center; padding: 10px;">
                <span>💡 提示：点击任意指数行查看历史温度曲线图</span>
            </td>
        `;
        tbody.appendChild(infoRow);
    }
    
    // 如果没有显示任何数据，显示提示
    if (displayedCount === 0) {
        tbody.innerHTML = '<tr><td colspan="12" style="text-align: center;">没有找到匹配的指数数据，请检查CSV数据是否包含有效代码</td></tr>';
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