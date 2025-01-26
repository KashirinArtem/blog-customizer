import { OnClick } from 'src/ui/arrow-button/ArrowButton';
import { RefObject, useState } from 'react';

interface IModalAction {
	isOpen: boolean;
	close: OnClick;
	toggle: OnClick;
}

export function useModal(
	initialState: boolean,
	wrapperRef?: RefObject<HTMLElement>
): IModalAction {
	const [isOpen, setIsOpen] = useState<boolean>(initialState);

	function open(): void {
		setIsOpen(true);

		wrapperRef && document.addEventListener('click', overlayHandler);
		document.addEventListener('keydown', handlerByEscape);
	}

	function close(): void {
		setIsOpen(false);

		document.removeEventListener('click', overlayHandler);
		document.removeEventListener('keydown', handlerByEscape);
	}

	function toggle(): void {
		console.log(isOpen);
		isOpen ? close() : open();
	}

	function handlerByEscape(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			close();
		}
	}

	function overlayHandler(e: MouseEvent): void {
		e.stopPropagation();

		if (!wrapperRef?.current?.contains(e.target as HTMLElement)) return;
		else open();
	}

	return {
		isOpen,
		close,
		toggle,
	};
}
