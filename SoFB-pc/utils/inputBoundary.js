const CODES = {
    area: {
        min: 'afm',
        max: 'atm'
    },
    price: {
        min: 'pfy',
        max: 'pty'
    },
    averagePrice: {
        min: 'jb',
        max: 'je'
    }
};

const NAMES = {
    area: '平米',
    price: '万',
    averagePrice: '万'
};

const OPTIONS = {
    afm: {
        type: 'area',
        cell: '平米'
    },
    atm: {
        type: 'area',
        cell: '平米'
    },
    pfy: {
        type: 'price',
        cell: '万'
    },
    pty: {
        type: 'price',
        cell: '万'
    },
    jb: {
        type: 'averagePrice',
        cell: '万'
    },
    je: {
        type: 'averagePrice',
        cell: '万'
    }
};

// 获取输入范围值对应的显示名字
export function getInputBoundaryName(type, min, max) {
    let suffix = '';
    if (min && !max) {
        suffix = '以上';
    }
    if (!min && max) {
        suffix = '以下';
    }
    return `${[min, max].filter(item => item && item).join('-')}${NAMES[type] ||
        ''}${suffix}`;
}

// 获取输入范围值对应的code
export function getInputBoundaryCode(type, min, max) {
    return [getCode(min, type, 'min'), getCode(max, type, 'max')]
        .filter(item => (item || item === 0) && item)
        .join('-');
}

// 获取code
function getCode(value, type, ck) {
    if (!value && value !== 0) {
        return '';
    }
    const key = CODES[type] || {};
    return `${key[ck] || ''}${value}`;
}

// 拼接option.name
function getOption(code, option, values) {
    if (!option || !values) {
        return null;
    }
    const [min, max] = values;
    const name = getInputBoundaryName(option.type, min, max);
    return {
        code,
        min,
        max,
        name,
        ...option
    };
}

// 获取Option
export function getOptionByCode(code) {
    const PREFIXREGEXP = /^[a-z]{2,3}/g;
    const NUMREGEXP = /[0-9]+/g;
    const prefix = code.match(PREFIXREGEXP).shift();
    const values = code.match(NUMREGEXP);
    return getOption(code, OPTIONS[prefix], values);
}
