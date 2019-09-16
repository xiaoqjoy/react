import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const propTypes = {
    // 页码改变回调 非必须
    onPageChange: PropTypes.func,
    // 总页数
    pageCount: PropTypes.number.isRequired,
    // 当前页码
    currentPage: PropTypes.number.isRequired,
    // baseUrl 非必须
    baseUrl: PropTypes.object
};

// const NULL_HREF = 'javascript:void(0)';
const NULL_HREF = '#';

const Container = styled.div`
    width: 100%;
    text-align: right;
`;

const TextButton = styled.a`
    display: inline-block;
    margin-left: 10px;
    padding: 7px 12px;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #475266;
    text-decoration: none;
    background: #f2f3f5;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        color: #ffffff;
        background: #6595f4;
    }
`;

const PageItem = styled(TextButton)`
    width: 30px;
    height: 30px;
    padding: 0;
    text-align: center;
    line-height: 30px;
`;

const ActivePageItem = styled(PageItem)`
    color: #ffffff;
    background: #6595f4;
`;

const Ellipsis = styled(PageItem)`
    background: none;
    &:hover {
        color: #475266;
        background: none;
    }
`;

class Pagination extends PureComponent {
    _pageChange = pageNum => {
        const { onPageChange } = this.props;
        typeof onPageChange === 'function' && onPageChange(pageNum);
    };
    _getShowPages = (pageCount, currentPage) => {
        let pages = [];
        const min = currentPage - 2;
        const max = currentPage + 3;
        const start = min > 0 ? min : 1;
        const end = max <= pageCount ? max : pageCount;
        for (let i = start; i < end; i++) {
            pages.push(i);
        }
        pages = pages.filter(item => {
            if (item > 0 && item <= pageCount) {
                return item;
            }
        });
        const len = pages.length;
        if (len < 5) {
            for (let i = pages[len - 1] + 1; i <= pageCount; i++) {
                pages.push(i);
                if (pages.length === 5) {
                    break;
                }
            }
        }
        return pages;
    };
    _renderPageItem = (pageNum, currentPage, prefix, suffix) => {
        const { onPageChange } = this.props;
        const PageItemComponent =
            pageNum === currentPage ? ActivePageItem : PageItem;
        return (
            <PageItemComponent
                key={`page-${pageNum}`}
                href={
                    !onPageChange ? `${prefix}${pageNum}${suffix}` : NULL_HREF
                }
                onClick={e => this._pageChange(pageNum)}
            >
                {pageNum}
            </PageItemComponent>
        );
    };
    render() {
        const {
            baseUrl = {},
            pageCount,
            currentPage,
            onPageChange
        } = this.props;
        const pages = this._getShowPages(pageCount, currentPage);
        const firstPage = pages[0];
        const len = pages.length;
        const prefix = `${baseUrl.prefix || ''}/`;
        const suffix = `/${baseUrl.suffix || ''}`;
        return (
            <Container>
                {currentPage > 1 ? (
                    <TextButton
                        href={
                            !onPageChange
                                ? `${prefix}${currentPage - 1}${suffix}`
                                : NULL_HREF
                        }
                        onClick={e => this._pageChange(currentPage - 1)}
                    >
                        上一页
                    </TextButton>
                ) : null}
                {firstPage > 1 ? (
                    <PageItem
                        href={!onPageChange ? `${prefix}1${suffix}` : NULL_HREF}
                        onClick={e => this._pageChange(1)}
                    >
                        1
                    </PageItem>
                ) : null}
                {firstPage > 2 ? <Ellipsis>...</Ellipsis> : null}
                {pages.map(page => {
                    return this._renderPageItem(
                        page,
                        currentPage,
                        prefix,
                        suffix
                    );
                })}
                {pages[len - 1] < pageCount ? <Ellipsis>...</Ellipsis> : null}
                {pages[len - 1] < pageCount ? (
                    <PageItem
                        href={
                            !onPageChange
                                ? `${prefix}${pageCount}${suffix}`
                                : NULL_HREF
                        }
                        onClick={e => this._pageChange(pageCount)}
                    >
                        {pageCount}
                    </PageItem>
                ) : null}
                {currentPage < pageCount ? (
                    <TextButton
                        href={
                            !onPageChange
                                ? `${prefix}${currentPage + 1}${suffix}`
                                : NULL_HREF
                        }
                        onClick={e => this._pageChange(currentPage + 1)}
                    >
                        下一页
                    </TextButton>
                ) : null}
            </Container>
        );
    }
}

Pagination.propTypes = propTypes;

export default Pagination;
