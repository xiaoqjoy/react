import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import Script from '../components/Script';

class SoFBDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        // 1.这里采用react里High Order Component的方式，可以重新包装APP和所有渲染的组件
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        // App挂载样式
                        sheet.collectStyles(<App {...props} />)
                });
            // 因为覆盖了Document，所以要重新返回页面的props
            const props = await Document.getInitialProps(ctx);
            return {
                ...props,
                styles: (
                    <>
                        {props.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <style>{`
                    html, body {
                        height: 100%;
                    }
                    body,h1,h2,h3,h4, h5,h6,p,ul,ol,li,dl,dt,dd,form,input,select,textarea,button,th, td {
                        margin: 0;
                        padding: 0;
                    }
                    a {
                        text-decoration: none;
                    }
                    ul, ol {
                        list-style: none;
                    }
                    img {
                        border: none;
                        vertical-align: middle;
                    }
                    input, button, textarea {
                        border: none;
                        outline: none;
                    }
                    textarea {
                        resize: none;
                    }
                    button {
                        background-color: transparent;
                    }
                    div {
                        box-sizing: border-box;
                    }
                    body {
                        min-width: 1200px;
                    }
                    .BMap_vectex_node {
                        background-image: url(/static/icons/icon-xiangqing-regulation@2x.png) !important;
                        background-size: 100% 100%;
                    }
                    .BMap_vectex_node:first-child {
                        display: none;
                    }
                    .BMap_vectex_node:last-child {
                        width: 30px;
                        height: 18px;
                    }
                `}</style>
                </body>
                <script
                    async
                    src='https://www.googletagmanager.com/gtag/js?id=UA-143956261-1'
                />
                <Script>
                    {() => {
                        window.dataLayer = window.dataLayer || [];
                        function gtag() {
                            dataLayer.push(arguments);
                        }
                        gtag('js', new Date());

                        gtag('config', 'UA-143956261-1');
                        flexibility && flexibility(document.documentElement);
                    }}
                </Script>
            </Html>
        );
    }
}

export default SoFBDocument;
