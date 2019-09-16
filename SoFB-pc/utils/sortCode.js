const CODES = {
    totalPrice: {
        true: 'o2',
        false: 'o1'
    },
    unitPrice: {
        true: 'o4',
        false: 'o3'
    },
    area: {
        true: 'o6',
        false: 'o5'
    },
    updateTime: {
        true: 'o7',
        false: 'o8'
    },
    equalPrice: {
        true: 'd2',
        false: 'd1'
    },
    buildingAge: {
        true: 'd3',
        false: 'd4'
        // true: 'd4',
        // false: 'd3'
    },
    schoolEqualPrice: {
        true: 'h2',
        false: 'h1'
    }
};

const TYPES = {
    o3: {
        type: 'unitPrice',
        inverted: false
    },
    o4: {
        type: 'unitPrice',
        inverted: true
    },
    o1: {
        type: 'totalPrice',
        inverted: false
    },
    o2: {
        type: 'totalPrice',
        inverted: true
    },
    o5: {
        type: 'area',
        inverted: false
    },
    o6: {
        type: 'area',
        inverted: true
    },
    o7: {
        type: 'updateTime',
        inverted: false
    },
    o8: {
        type: 'updateTime',
        inverted: true
    },
    d1: {
        type: 'equalPrice',
        inverted: false
    },
    d2: {
        type: 'equalPrice',
        inverted: true
    },
    d3: {
        type: 'buildingAge',
        inverted: false
    },
    d4: {
        type: 'buildingAge',
        inverted: true
    },
    h1: {
        type: 'schoolEqualPrice',
        inverted: false
    },
    h2: {
        type: 'schoolEqualPrice',
        inverted: true
    }
};

// 编码
export function enSortCode(type, inverted) {
    const typeCode = CODES[type] || {};
    return typeCode[inverted] || '';
}

// 解码
export function deSortCode(code) {
    return TYPES[code] || null;
}
