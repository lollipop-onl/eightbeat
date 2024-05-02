import { useState } from "react";

export const useCounter = () => {
	const [count, setCount] = useState(0);

	const reset = () => {
		setCount(0);
	};

	const increment = () => {
		setCount((count) => count + 1);
	};

	return [count, { reset, increment }] as const;
};
