import { createFileRoute } from "@tanstack/react-router";
import { clsx } from "clsx";
import { useEffect, useState } from "react";
import beep1 from "~assets/beep1.wav";
import beep2 from "~assets/beep2.wav";
import { useBpm } from "~hooks/useBpm";
import { useCounter } from "~hooks/useCounter";
import a from "./_assets/a.svg";
import b from "./_assets/b.svg";
import c from "./_assets/c.svg";
import divider from "./_assets/divider.svg";
import lines from "./_assets/lines.svg";
import note from "./_assets/note.svg";

const beep1Audio = new Audio(beep1);
const beep2Audio = new Audio(beep2);

const getNotes = () => {
	return Array.from({ length: 4 }).map(() => ({
		id: Math.random(),
		src: [a, b, c][Math.floor(Math.random() * 3)],
	}));
};

const Component = () => {
	const [count, { increment, reset }] = useCounter();
	const [bpmCount, bpm, { updateBpm, isPaused, play, pause }] = useBpm();
	const [notes, setNotes] = useState(
		Array.from({ length: 4 }).map(() => getNotes()),
	);

	const activatedIndex = bpmCount % 16;
	const currentNote = Math.floor(activatedIndex / 4);

	useEffect(() => {
		increment();

		beep1Audio.pause();
		beep2Audio.pause();

		if (bpmCount % 4 === 0) {
			beep1Audio.currentTime = 0;
			beep1Audio.play();
		} else {
			beep2Audio.currentTime = 0;
			beep2Audio.play();
		}
	}, [bpmCount]);

	useEffect(() => {
		setNotes((notes) => {
			const index = (currentNote + 2) % 4;

			console.log(index);

			notes[index] = getNotes();

			return notes;
		});
	}, [currentNote]);

	return (
		<div>
			<p>bpm: {bpm}</p>
			<div className="flex gap-x-4">
				<button disabled={!isPaused} onClick={() => play()}>
					Play
				</button>
				<button disabled={isPaused} onClick={() => pause()}>
					Pause
				</button>
				{[40, 70, 120].map((value) => (
					<button key={value} onClick={() => updateBpm(value)}>
						BPM: {value}
					</button>
				))}
			</div>
			<div>
				count: {count} / <button onClick={reset}>Reset count</button>
			</div>
			<div className="grid place-items-center gap-y-10 py-10">
				{Array.from({ length: 2 }).map((_, i) => (
					<div key={i} className="flex">
						{/* 小節 */}
						{Array.from({ length: 2 }).map((_, j) => (
							<div className="flex" key={j}>
								<img src={lines} />
								<div className="flex">
									{Array.from({ length: 2 }).map((_, k) => (
										<div key={k} className="relative z-1 flex h-[166] w-[224]">
											<img src={note} />
											{i * 4 + j * 2 + k === Math.floor(activatedIndex / 2) && (
												<div
													className={clsx(
														"absolute h-full w-1/2 bg-red-100/50",
														{
															"left-1/2": activatedIndex % 2 === 1,
														},
													)}
												/>
											)}
											{notes[i * 2 + j]
												.slice(k * 2, k * 2 + 2)
												.map(({ id, src }, l) => (
													<img
														key={id}
														className={clsx("absolute h-full w-1/2", {
															"left-1/2": l === 1,
														})}
														src={src}
													/>
												))}
										</div>
									))}
								</div>
								<img src={divider} />
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export const Route = createFileRoute("/apps/001/")({
	component: Component,
});
