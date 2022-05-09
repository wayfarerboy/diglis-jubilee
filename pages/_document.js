import 'regenerator-runtime/runtime';
import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';

import { theme } from '../helpers/theme';
import createEmotionCache from '../helpers/createEmotionCache';

export default class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="theme-color" content={theme.palette.primary.main} />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="canonical" href="https://diglisjubilee.co.uk" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@300;700&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicons/apple-touch-icon.png?v=001"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicons/favicon-32x32.png?v=001"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicons/favicon-16x16.png?v=001"
					/>
					<link rel="manifest" href="/manifest.json" />
					<link
						rel="mask-icon"
						href="/favicons/safari-pinned-tab.svg?v=001"
						color="#362653"
					/>
					<link rel="shortcut icon" href="/favicons/favicon.ico?v=001" />
					<meta name="apple-mobile-web-app-title" content="Diglis Jubilee" />
					<meta name="application-name" content="Diglis Jubilee" />
					<meta name="msapplication-TileColor" content="#00aba9" />
					<meta
						name="msapplication-config"
						content="/favicons/browserconfig.xml?v=001"
					/>
					<meta name="theme-color" content="#362653" />
					<meta
						name="description"
						content="On the 5th of June 2022, the community of Diglis in Worcester, UK is having a party."
					/>
					{this.props.emotionStyleTags}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
	// Resolution order
	//
	// On the server:
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. document.getInitialProps
	// 4. app.render
	// 5. page.render
	// 6. document.render
	//
	// On the server with error:
	// 1. document.getInitialProps
	// 2. app.render
	// 3. page.render
	// 4. document.render
	//
	// On the client
	// 1. app.getInitialProps
	// 2. page.getInitialProps
	// 3. app.render
	// 4. page.render

	const originalRenderPage = ctx.renderPage;

	// You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
	// However, be aware that it can have global side effects.
	const cache = createEmotionCache();
	const { extractCriticalToChunks } = createEmotionServer(cache);

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) =>
				function EnhanceApp(props) {
					return <App emotionCache={cache} {...props} />;
				},
		});

	const initialProps = await Document.getInitialProps(ctx);
	// This is important. It prevents emotion to render invalid HTML.
	// See https://github.com/mui-org/material-ui/issues/26561#issuecomment-855286153
	const emotionStyles = extractCriticalToChunks(initialProps.html);
	const emotionStyleTags = emotionStyles.styles.map((style) => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			// eslint-disable-next-line react/no-danger
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	));

	return {
		...initialProps,
		emotionStyleTags,
	};
};
