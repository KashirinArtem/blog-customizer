import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import React, { RefObject, useRef, useState } from 'react';
import { useModal } from 'src/hooks/useModal';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import clsx from 'clsx';

type ArticleParamsProps = {
	applyState: (newState: ArticleStateType) => void;
	overlay: RefObject<HTMLElement>;
};

export const ArticleParamsForm = ({
	applyState,
	overlay,
}: ArticleParamsProps) => {
	const wrapper = useRef<HTMLDivElement>(null)!;
	const { isMenuOpen, toggleMenu } = useModal(false, wrapper, overlay);
	const [formSetting, setFormSetting] =
		useState<ArticleStateType>(defaultArticleState);

	const resetForm = () => {
		setFormSetting(defaultArticleState);
		applyState(defaultArticleState);
	};

	const updateSetting = (newState: Partial<ArticleStateType>): void => {
		setFormSetting((oldState) => ({
			...oldState,
			...newState,
		}));
	};

	const applyChanged = (e: React.FormEvent) => {
		e.preventDefault();
		applyState(formSetting);
		toggleMenu();
	};

	const selectHandler = (state: OptionType, type: string) => {
		updateSetting({ [type]: state });
	};

	return (
		<div ref={wrapper}>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={(e) => applyChanged(e)}>
					<Text
						as={'h2'}
						uppercase={true}
						weight={800}
						size={31}
						family={'open-sans'}>
						Задайте параметры
					</Text>

					<Select
						type={'fontFamilyOption'}
						selected={formSetting.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={selectHandler}
					/>

					<RadioGroup
						type={'fontSizeOption'}
						name={'fontSize'}
						options={fontSizeOptions}
						selected={formSetting.fontSizeOption}
						title={'Размер шрифта'}
						onChange={selectHandler}
					/>

					<Select
						type={'fontColor'}
						selected={formSetting.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={selectHandler}
					/>

					<Separator />

					<Select
						type={'backgroundColor'}
						selected={formSetting.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={selectHandler}
					/>

					<Select
						type={'contentWidth'}
						selected={formSetting.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={selectHandler}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={resetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
