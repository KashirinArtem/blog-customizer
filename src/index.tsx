import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		contentWidth,
		backgroundColor,
	} = state;

	const applyState = (newState: ArticleStateType) => {
		setState((oldState) => ({ ...oldState, ...newState }));
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': fontFamilyOption.value,
					'--font-size': fontSizeOption.value,
					'--font-color': fontColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applyState={applyState} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
