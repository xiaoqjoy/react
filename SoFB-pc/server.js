// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const process = require('process');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// 二手房列表url正则
const ASSISTANT_LIST_PAGE_REGEXP = /^\/ershoufang\/([a-z\-]+)?(\/)?([a-z-0-9]+)?(\/)?([0-9]+\/)?$/;
// 二手房详情url正则
const ASSISTANT_DETAIL_PAGE_REGEXP = /^\/ershoufang\/[0-9]+\.html$/;

// 小区列表url正则
const COMMUNITY_LIST_PAGE_REGEXP = /^\/xiaoqu\/(([a-z\-]+)\/)?(([a-z-0-9]+)\/)?(([0-9]+)\/)?$/;
const COMMUNITY_DETAIL_PAGE_REGEXP = /^\/xiaoqu\/[0-9]+\.html$/;

// 学校列表url正则
const SCHOOL_LIST_PAGE_REGEXP = /^\/xuexiao\/(([a-z\-]+)\/)?(([a-z-0-9]+)\/)?(([0-9]+)\/)?$/;
const SCHOOL_DETAIL_PAGE_REGEXP = /^\/xuexiao\/\w{8}(-\w{4}){3}-\w{12}\.html$/;

const ROOTFILES = [
    '/baidu_verify_ECsIolP4ZX.html',
    '/baidu_verify_hczBZGXkRh.html'
];

var port = (function() {
    if (typeof process.argv[2] !== 'undefined') {
        // 如果输入了端口号，则提取出来
        if (isNaN(process.argv[2])) {
            // 如果端口号不为数字，提示格式错误
            throw 'Please write a correct port number.';
        } else {
            // 如果端口号输入正确，将其应用到端口
            return process.argv[2];
        }
    } else {
        // 如果未输入端口号，则使用下面定义的默认端口
        return 8080;
    }
})();

app.prepare().then(() => {
    createServer((req, res) => {
        // Be sure to pass `true` as the second argument to `url.parse`.
        // This tells it to parse the query portion of the URL.
        global.BaseURL = `http://${req.headers.host}`;
        const parsedUrl = parse(req.url, true);
        const { pathname, query } = parsedUrl;
        if (ASSISTANT_DETAIL_PAGE_REGEXP.test(pathname)) {
            // 二手房详情
            app.render(req, res, '/house/assistant/detail', query);
        } else if (ASSISTANT_LIST_PAGE_REGEXP.test(pathname)) {
            // 二手房列表
            app.render(req, res, '/house/assistant/list', query);
        } else if (COMMUNITY_LIST_PAGE_REGEXP.test(pathname)) {
            // 小区列表
            app.render(req, res, '/community/list', query);
        } else if (COMMUNITY_DETAIL_PAGE_REGEXP.test(pathname)) {
            // 小区详情
            app.render(req, res, '/community/detail', query);
        } else if (SCHOOL_LIST_PAGE_REGEXP.test(pathname)) {
            // 学校列表
            app.render(req, res, '/school/list', query);
        } else if (SCHOOL_DETAIL_PAGE_REGEXP.test(pathname)) {
            // 学校详情
            app.render(req, res, '/school/detail', query);
        } else if (ROOTFILES.indexOf(pathname) !== -1) {
            parsedUrl.pathname = `/static${pathname}`;
            handle(req, res, parsedUrl);
        } else {
            handle(req, res, parsedUrl);
        }
    }).listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
