import { OnClick } from 'src/ui/arrow-button/ArrowButton';
import { useState, RefObject } from 'react';

interface IModalAction {
	isMenuOpen: boolean;
	close: OnClick;
	toggleMenu: () => void;
}

export function useModal(
	initialState: boolean,
	wrapper: RefObject<HTMLElement>,
	overlay: RefObject<HTMLElement>
): IModalAction {
	const [isMenuOpen, setMenuOpen] = useState<boolean>(initialState);

	function open(): void {
		setMenuOpen(true);

		overlay.current?.addEventListener('click', overlayHandler);
		document.addEventListener('keydown', handlerByEscape);
	}

	function close(): void {
		setMenuOpen(false);

		overlay.current?.removeEventListener('click', overlayHandler);
		document.removeEventListener('keydown', handlerByEscape);
	}

	function toggleMenu(): void {
		isMenuOpen ? close() : open();
	}

	function handlerByEscape(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			close();
		}
	}

	function overlayHandler(e: MouseEvent): void {
		const clickHasWrapper = wrapper.current?.contains(e.target as Node);

		if (clickHasWrapper) return;

		close();
	}

	return {
		isMenuOpen,
		close,
		toggleMenu,
	};
}
