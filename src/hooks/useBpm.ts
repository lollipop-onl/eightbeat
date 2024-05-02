import { useEffect, useState } from "react";

export const useBpm = (initialBpm = 120) => {
	const [bpm, setBpm] = useState(initialBpm);
	const [paused, setPaused] = useState(false);
	const [count, setCount] = useState(0);

	const updateBpm = (value: number | ((currentBpm: number) => number)) => {
		setBpm((bpm) => (typeof value === "function" ? value(bpm) : value));
	};

	const play = () => {
		setPaused(false);
	};

	const pause = () => {
		setPaused(true);
	};

	useEffect(() => {
		if (paused) return;

		const beatDuration = (60 / bpm) * 1000;

		const timer = setInterval(() => {
			setCount((count) => count + 1);
		}, beatDuration);

		return () => {
			clearInterval(timer);
		};
	}, [bpm, paused]);

	return [
		count,
		bpm,
		{
			updateBpm,
			isPaused: paused,
			play,
			pause,
		},
	] as const;
};
