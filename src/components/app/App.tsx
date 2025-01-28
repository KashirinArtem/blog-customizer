import { useState, CSSProperties, useRef } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import styles from './App.module.scss';

export const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);
	const overlay = useRef<HTMLMapElement>(null)!;

	const {
		fontFamilyOption,
		fontSizeOption,
		fontColor,
		contentWidth,
		backgroundColor,
	} = articleState;

	const applyState = (newState: ArticleStateType) => {
		setArticleState((oldState) => ({ ...oldState, ...newState }));
	};

	return (
		<main
			ref={overlay}
			className={styles.main}
			style={
				{
					'--font-family': fontFamilyOption.value,
					'--font-size': fontSizeOption.value,
					'--font-color': fontColor.value,
					'--container-width': contentWidth.value,
					'--bg-color': backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applyState={applyState} overlay={overlay} />
			<Article />
		</main>
	);
};
