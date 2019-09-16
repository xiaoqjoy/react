
const legend = {
    bottom: 20,
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
        fontSize: 12,
        color: '#475266',
    },
    orient: 'horizontal',
    y: 'bottom',

};

const grid = {
    top: 68,
    right: 30,
    bottom: 94,
    left: 76,
    height: 300,
    borderColor: '#D9D9D9 ',
};

const colors = ['#FFB887', '#92BF7B', '#EBEEF5', '#87AFFF', '#FF964E', '#FFDE86', '#EBEEF5', '#3F5E51', '#AC3737'];

function getTitleOption(title) {
    return {
        text: title,
        top: 20,
        left: 20,
        textStyle: {
            color: '#475266',
            fontSize: 14,
            lineHeight: 20,
        },
    };
};

function getBarSeriesOption(size) {
    const series = new Array(size);
    return series.fill(0, 0, size).map(() => {
        return {
            type: 'bar',
            barWidth: 20,
        };
    });
};



export function getBarChartOption(title, data) {
    return {
        title: getTitleOption(title),
        legend: legend,
        grid: grid,
        tooltip: {
            show: true,
            showContent: true,
            trigger: 'axis',
            renderMode: 'richText',
            backgroundColor: 'rgba(0,0,0,0.6)',
            padding: [10, 6],
            textStyle: {
                color: '#FFFFFF',
                fontSize: 12,
                lineHeight: 18,
            },
        },
        dataset: {
            // 提供一份数据。
            source: data,
        },
        // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
        xAxis: {
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                margin: 20,
                fontSize: 12,
                align: 'center',
                color: '#878D99',
            },
            axisPointer: {
                show: true,
            }
        },
        // 声明一个 Y 轴，数值轴。
        yAxis: {
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                margin: 15,
                fontSize: 12,
                color: '#878D99',
            },
            splitLine: {
            },
        },
        // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
        series: getBarSeriesOption(data[0].length - 1),
        color: colors
    };
};

export function getPieChartOption(data, selfColors) {
    return {
        title: getTitleOption('经纪人所在公司分布'),
        legend: legend,
        dataset: {
            source: data,
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: ['35%', '60%'],
                // selectedMode: 'multiple',
                // hoverAnimation: true,
                // avoidLabelOverlap: true,
                label: {
                    padding: 8,
                    fontSize: 12,
                    borderRadius: 2,
                    borderWidth: 1,
                    color: '#475266',
                    borderColor: '#E3E5E6',
                    backgroundColor: '#F2F3F5',
                    formatter: (option) => {
                        const { name, data: { value } } = option;
                        return `${name} ${value}`
                    },
                },
                labelLine: {
                    length: 50,
                    length2: 30,
                    lineStyle: {
                        type: 'dotted',
                        color: '#D9D9D9',
                    }
                },
                itemStyle: {
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    shadowBlur: 10,
                },
            },
        ],
        color: selfColors,
    };
};