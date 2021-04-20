import { useCallback, useRef, useState } from "react";
import produce from "immer";

const n = 40;
const m = 40;

const Game = () => {
    const [grid, setGrid] = useState(() => {
        const g = [];
        for(let i = 0; i < n; ++i) {
            g.push(Array.from(Array(m), () => 0));
        }
        return g;
    });
    const [isRunning, setIsRunning] = useState(false);

    const isRunningRef = useRef(isRunning);
    isRunningRef.current = isRunning;

    const runSimulation = useCallback(() => {
        if(!isRunningRef.current) {
            return;
        }

        setGrid((g) => {
            return produce(g, next => {
                for(let i = 0; i < n; ++i) {
                    for(let j = 0; j < m; ++j) {
                        let neighbors: number = 0;
                        for(let x = -1; x <= 1; ++x) {
                            for(let y = -1; y <= 1; ++y) {
                                if(!x && !y) continue;
                                const ii = x + i;
                                const jj = y + j;
                                if(0 <= ii && ii < n && 0 <= jj && jj < m && g[ii][jj]) {
                                    neighbors++;
                                }
                            }
                        }
                        if(g[i][j]) {
                            next[i][j] = (neighbors < 2 || neighbors > 3) ? 0 : 1;
                        } else {
                            next[i][j] = (neighbors === 3) ? 1 : 0;
                        }
                    }
                }
            })
        })

        setTimeout(runSimulation, 100);
    }, []);

    return (
        <>
            <section><button onClick={() => {
                setIsRunning(!isRunning);
                if(!isRunning) {
                    isRunningRef.current = true;
                    runSimulation();
                }
            }}>{isRunning ? "stop" : "start"}</button></section>
            <div
                id="grid"
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${n}, 20px)`,
                    margin: "2rem auto",
                    width: `calc(20px*${n})`
                }}
            >
                {grid.map((row, i) => (row.map((col, j) => (
                    <div
                        className={`ceil ${grid[i][j] ? "active": null}`}
                        key={`cell-${i}-${j}`}
                        onClick={() => {
                            setGrid(produce(grid, next => {
                                next[i][j] = grid[i][j] ? 0 : 1;
                            }));
                        }}
                    />
                ))))}
            </div>
        </>
    )
}

export default Game;
